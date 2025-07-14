import { db } from "@/db"

import { sessionsTable } from "@/db/schema"
import { constantTimeEqual } from "@/lib/utils/constantTimeEqual"
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"
import { cache } from "react"
import { Session, SessionWithToken } from "./types"

// This encoder wastes 3/8 of the random bits. You can optimize it and get better performance by using all the generated random bits
export function generateSecureRandomString(): string {
  const alphabet = "abcdefghijklmnpqrstuvwxyz23456789"

  // Generate 24 bytes = 192 bits of entropy
  // We're only going to use 5 bits per byte so the total entropy will be 192*5/8 = 12
  const bytes = new Uint8Array(24)
  crypto.getRandomValues(bytes)

  let id: string = ""
  for (let i = 0; i < bytes.length; i++) {
    // >> 3 means removing the right-most 3 bits of the byte
    id += alphabet[bytes[i] >> 3]
  }
  return id
}

async function hashSecret(secret: string): Promise<Uint8Array> {
  const secretBytes = new TextEncoder().encode(secret)
  const secretHashbuffer = await crypto.subtle.digest("SHA-256", secretBytes)
  return new Uint8Array(secretHashbuffer)
}

export async function createSession(): Promise<SessionWithToken> {
  const now = new Date()

  const id = generateSecureRandomString()
  const secret = generateSecureRandomString()
  const secretHash = await hashSecret(secret)

  const token = id + "." + secret

  const session: SessionWithToken = {
    id,
    secretHash,
    createdAt: now,
    token,
  }

  await db.insert(sessionsTable).values({
    id: session.id,
    secretHash: session.secretHash,
    createdAt: Math.floor(session.createdAt.getTime() / 1000),
  })

  return session
}

async function validateSessionToken(token: string): Promise<Session | null> {
  const tokenParts = token.split(".")
  if (tokenParts.length !== 2) {
    return null
  }

  const sessionId = tokenParts[0]
  const sessionSecret = tokenParts[1]

  const session = await getSession(sessionId)

  if (!session) {
    return null
  }

  const tokenSecretHash = await hashSecret(sessionSecret)
  const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash)

  if (!validSecret) {
    return null
  }

  return session
}

const SESSION_EXPIRES_IN_SECONDS = 60 * 60 * 24 // 1 day

async function getSession(sessionId: string): Promise<Session | null> {
  const now = new Date()

  const result = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.id, sessionId))

  if (result.length !== 1) {
    return null
  }

  const session: Session = {
    id: result[0].id,
    secretHash: result[0].secretHash as Uint8Array,
    createdAt: new Date(result[0].createdAt! * 1000),
  }

  // Check expiration: If expired, delete session and return null
  if (
    now.getTime() - session.createdAt.getTime() >=
    SESSION_EXPIRES_IN_SECONDS * 1000
  ) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId))
    return null
  }

  return session
}

function encodeSessionPublicJson(session: Session): string {
  const json = JSON.stringify({
    id: session.id,
    created_at: Math.floor(session.createdAt.getTime() / 1000),
  })

  return json
}

export const getCurrentSession = cache(async () => {
  // TODO: What is the return type
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value ?? null
  if (token === null) {
    return { session: null, user: null }
  }
  const result = await validateSessionToken(token)
  return result
})
