"use client"

import { useState } from "react"
import { LoginFormCard } from "./_components/LoginFormCard"
import { UserInfoCard } from "./_components/UserInfoCard"

export interface IUser {
  name: string
  desc: string
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useState<IUser>()

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    // Mock login validation
    if (email && password && password.length > 3) {
      setUser({
        name: "John Doe",
        desc: "Welcome back to AuthWDS!",
      })
    } else {
      alert("Password must be longer than 3 chars")
    }
  }

  function handleLogout() {
    setUser(undefined)
    setEmail("")
    setPassword("")
  }

  // If user is logged in, show user info
  if (user) {
    return (
      <UserInfoCard user={user} handleLogout={handleLogout} email={email} />
    )
  }

  return (
    <LoginFormCard
      handleLogin={handleLogin}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
    />
  )
}
