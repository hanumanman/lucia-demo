import * as oslo_encoding from "@oslojs/encoding"
import { ISession, IValidatedSession } from "./types"

const EXPIRATION_SECONDS = 60

const jwtHS256Key = new Uint8Array(32)

export async function createSessionJWT(session: ISession) {
  const nowDate = new Date()
  const now = Math.floor(nowDate.getTime() / 1000)

  const headerJson = JSON.stringify({
    alg: "HS256",
    typ: "JWT",
  })

  const headerJsonByte = new TextEncoder().encode(headerJson)
  const encodedHeader = oslo_encoding.encodeBase64url(headerJsonByte)

  const bodyJson = JSON.stringify({
    // Should omit the secret hash
    session: {
      id: session.id,
      create_at: now,
    },
    iat: now,
    exp: now + EXPIRATION_SECONDS,
  })
  const bodyJsonByte = new TextEncoder().encode(bodyJson)
  const encodedBody = oslo_encoding.encodeBase64url(bodyJsonByte)

  const headerAndBody = encodedHeader + "." + encodedBody

  const headerAndBodyBytes = new TextEncoder().encode(headerAndBody)

  const hmacCryptoKey = await crypto.subtle.importKey(
    "raw",
    jwtHS256Key,
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  )

  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    hmacCryptoKey,
    headerAndBodyBytes
  )
  const signature = new Uint8Array(signatureBuffer)
  const encodedSignature = oslo_encoding.encodeBase64url(signature)

  const jwt = headerAndBody + "." + encodedSignature
  return jwt
}

/** 
 * NOTE: To validate sessions, first validate the JWT and validate the session token if the JWT is invalid.
 *
 *
```typescript
let sessionToken: string;
let sessionJWT: string;

let validatedSession = await validateSessionJWT(sessionJWT);
// If jwt is invalid/expired, check the main session token.
if (validatedSession === null) {
	validatedSession = await validateSessionToken(sessionToken);
}
if (validatedSession === null) {
	// no session
} 
``
*/
export async function validateSessionJWT(
  jwt: string
): Promise<IValidatedSession | null> {
  const nowDate = new Date()

  const [headerPart, bodyPart, signaturePart] = jwt.split(".")

  let header: object

  try {
    const headerJsonByte = oslo_encoding.decodeBase64url(headerPart)
    const headerJson = new TextDecoder().decode(headerJsonByte)
    const parsedHeader = JSON.parse(headerJson)
    if (typeof parsedHeader !== "object" || parsedHeader === null) {
      return null
    }
    header = parsedHeader
  } catch {
    return null
  }

  // Verify header claims
  if ("typ" in header && header.typ !== "JWT") {
    return null
  }

  if ("alg" in header && header.alg !== "HS256") {
    return null
  }

  // Verify signature
  const signature = oslo_encoding.decodeBase64url(signaturePart)
  const headerAndBodyBytes = new TextEncoder().encode(
    headerPart + "." + bodyPart
  )
  const hmacCryptoKey = await crypto.subtle.importKey(
    "raw",
    jwtHS256Key,
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["verify"]
  )

  const validSignature = await crypto.subtle.verify(
    "HMAC",
    hmacCryptoKey,
    signature,
    headerAndBodyBytes
  )

  if (!validSignature) {
    return null
  }

  // Parse body
  let body: object
  try {
    const bodyJsonPart = oslo_encoding.decodeBase64url(bodyPart)
    const bodyJSON = new TextDecoder().decode(bodyJsonPart)
    const parsedBody = JSON.parse(bodyJSON)

    if (typeof parsedBody !== "object" || parsedBody === null) {
      return null
    }
    body = parsedBody
  } catch {
    return null
  }

  if (!("exp" in body) || typeof body.exp !== "number") {
    return null
  }

  const expiresAt = new Date(body.exp * 1000)
  if (nowDate.getTime() > expiresAt.getTime()) {
    return null
  }

  if (
    !("session" in body) ||
    typeof body.session !== "object" ||
    body.session === null
  ) {
    return null
  }
  const parsedSession = body.session
  if (!("id" in parsedSession) || typeof parsedSession.id !== "string") {
    return null
  }
  if (
    !("created_at" in parsedSession) ||
    typeof parsedSession.created_at !== "number"
  ) {
    return null
  }

  const session: IValidatedSession = {
    id: parsedSession.id,
    createdAt: new Date(parsedSession.created_at * 1000),
  }

  return session
}
