import { db } from "@/db"

import { SessionWithToken } from "./types"
import { sessionsTable } from "@/db/schema"

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
