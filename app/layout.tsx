import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "AuthWDS - Authentication System",
  description: "Modern authentication system with beautiful UI",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-gray-900 to-gray-200`}
      >
        <div className="min-h-screen flex items-center justify-center p-4 relative">
          {/* Background overlay for extra depth and cross-gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20  to-white/10"></div>
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  )
}
