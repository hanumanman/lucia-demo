import { db } from "@/db"

import { sessionsTable } from "@/db/schema"
import { constantTimeEqual } from "@/lib/utils/constantTimeEqual"
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"
import { cache } from "react"
import { ISession, ISessionWithToken } from "./types"

// This encoder wastes 3/8 of the random bits. You can optimize it and get better performance by using all the generated random bits
export function generateSecureRandomString(): string {
  const alphabet = "abcdefghijklmnpqrstuvwxyz23456789" // Custom alphabet excluding easily confused characters (o, 0, 1, l). Length is 32 (2^5).

  // Generate 24 bytes (24*8 = 192 bits) of cryptographically secure random data.
  const bytes = new Uint8Array(24)
  crypto.getRandomValues(bytes) // Fills the Uint8Array with random values using the Web Crypto API.

  let id: string = ""
  for (let i = 0; i < bytes.length; i++) {
    // For each byte, take the 5 most significant bits (by right-shifting 3 bits).
    // This results in a number between 0 and 31, which is used as an index for the 32-character alphabet.
    id += alphabet[bytes[i] >> 3]
  }
  return id
}

/**
 * Hashes a given secret string using SHA-256.
 *
 * This function takes a string, converts it into a byte array using UTF-8 encoding,
 * and then computes its cryptographic hash using the SHA-256 algorithm via the
 * Web Crypto API (`crypto.subtle.digest`). The result is a fixed-length,
 * irreversible hash represented as a Uint8Array.
 *
 * @param secret The string to be hashed.
 * @returns A Promise that resolves to a Uint8Array containing the SHA-256 hash.
 */
async function hashSecret(secret: string): Promise<Uint8Array> {
  const secretBytes = new TextEncoder().encode(secret)
  const secretHashbuffer = await crypto.subtle.digest("SHA-256", secretBytes)
  return new Uint8Array(secretHashbuffer)
}

/**
 * Create a new session and store it in the database.
 *
 * @returns A Promise that resolves to a SessionWithToken object containing the session ID and token.
 */
export async function createSession(): Promise<ISessionWithToken> {
  const nowDate = new Date()
  const now = Math.floor(nowDate.getTime() / 1000)

  const id = generateSecureRandomString()
  const secret = generateSecureRandomString()
  const secretHash = await hashSecret(secret)

  const token = id + "." + secret

  const session: ISessionWithToken = {
    id,
    secretHash,
    createdAt: nowDate,
    lastVerifiedAt: nowDate,
    token,
  }

  await db.insert(sessionsTable).values({
    id: session.id,
    secretHash: session.secretHash,
    createdAt: now,
    lastVerifiedAt: now,
  })

  return session
}

const ACTIVITY_CHECK_INTERVAL_SECONDS = 60 * 60 // 1 hour

async function validateSessionToken(token: string): Promise<ISession | null> {
  const tokenParts = token.split(".")
  if (tokenParts.length !== 2) {
    return null
  }

  const [sessionId, sessionSecret] = tokenParts

  const session = await getSession(sessionId)

  if (!session) {
    return null
  }

  const tokenSecretHash = await hashSecret(sessionSecret)
  const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash)

  if (!validSecret) {
    return null
  }

  const nowDate = new Date()
  const now = Math.floor(nowDate.getTime() / 1000)

  if (
    nowDate.getTime() - session.lastVerifiedAt.getTime() >=
    ACTIVITY_CHECK_INTERVAL_SECONDS * 1000
  ) {
    session.lastVerifiedAt = nowDate
    await db
      .update(sessionsTable)
      .set({
        lastVerifiedAt: now,
      })
      .where(eq(sessionsTable.id, sessionId))
  }
  return session
}

const INACTIVITY_TIMEOUT = 60 * 60 * 24 // 1 day
async function getSession(sessionId: string): Promise<ISession | null> {
  const now = new Date()

  const result = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.id, sessionId))

  if (result.length !== 1) {
    return null
  }

  const session: ISession = {
    id: result[0].id,
    secretHash: result[0].secretHash as Uint8Array,
    createdAt: new Date(result[0].createdAt! * 1000),
    lastVerifiedAt: new Date(result[0].lastVerifiedAt! * 1000),
  }

  // Check inactivity timeout: If expired, delete session and return null
  if (
    now.getTime() - session.lastVerifiedAt.getTime() >=
    INACTIVITY_TIMEOUT * 1000
  ) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId))
    return null
  }

  return session
}

/**
 * If we have an endpoint(s) that return a session object, make sure to omit the session's secret hash. Instead of using JSON.stringify directly, use something like this */
export function encodeSessionPublicJson(session: ISession): string {
  const json = JSON.stringify({
    id: session.id,
    created_at: Math.floor(session.createdAt.getTime() / 1000),
  })
  return json
}

export const getCurrentSession = cache(async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value ?? null
  if (token === null) {
    return { session: null, user: null }
  }
  const result = await validateSessionToken(token)
  return result
})
