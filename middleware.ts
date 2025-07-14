import { NextRequest, NextResponse } from "next/server"
import { env } from "./lib/env"

const ONE_YEAR = 60 * 60 * 24 * 365
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const sessionToken = request.cookies.get("session")?.value ?? null

  if (sessionToken !== null) {
    response.cookies.set({
      name: "session",
      value: sessionToken,
      maxAge: ONE_YEAR,
      path: "/",
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    })
  }

  return response
}
