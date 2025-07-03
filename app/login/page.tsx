"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import z from "zod/v4"
import { LoginFormCard } from "./_components/LoginFormCard"
import { UserInfoCard } from "./_components/UserInfoCard"

const loginSchema = z.object({
  email: z.email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(4, "Password must be at least 4 characters long"),
})

export type TUser = z.infer<typeof loginSchema>

const defaultValues: TUser = {
  email: "user@gmail.com",
  password: "alskjdzxmcz,c",
}

export default function LoginPage() {
  const [user, setUser] = useState<TUser>()

  function handleLogout() {
    setUser(undefined)
  }

  const methods = useForm<TUser>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  })

  // If user is logged in, show user info
  if (user) {
    return <UserInfoCard user={user} handleLogout={handleLogout} />
  }

  return (
    <FormProvider {...methods}>
      <LoginFormCard setUser={setUser} />
    </FormProvider>
  )
}
