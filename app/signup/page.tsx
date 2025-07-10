"use client"

import { AtSignSVG } from "@/components/svgs/AtSign"
import { ClosedEyeSVG, OpenEyeSVG } from "@/components/svgs/EyeSVG"
import { GithubSVG } from "@/components/svgs/GithubSVG"
import { GoogleSVG } from "@/components/svgs/GoogleSVG"
import { UserSVG } from "@/components/svgs/UserSVG"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"

const signupSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.email(),
  password: z.string().min(1, "Password must be at least 1 characters long"),
  confirmPassword: z
    .string()
    .min(1, "Confirm password must be at least 1 characters long"),
  agreeToTerms: z.boolean().refine(val => val, {
    message: "You must agree to the terms and conditions",
  }),
})

type SignupFormData = z.infer<typeof signupSchema>

const defaultValues: SignupFormData = {
  firstName: "John",
  lastName: "Doe",
  email: "email@gmail.com",
  password: "qwoealsjdad",
  confirmPassword: "qwoealsjdad",
  agreeToTerms: true,
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues,
  })

  function onSubmit(data: SignupFormData) {
    alert(`Form submitted with data: ${JSON.stringify(data, null, 2)}`)
  }

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0]
      alert(`Error: ${firstError.message}`)
    }
  }, [errors])

  return (
    <div className="w-full max-w-md">
      {/* Logo/Brand Section */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <UserSVG />
        </div>
        <h1 className="text-3xl font-semibold text-white mb-2">
          Create Account
        </h1>
        <p className="text-gray-400">Create an account to get started</p>
      </div>

      {/* Signup Form */}
      <div className="bg-gray-800 rounded-3xl shadow-2xl border border-gray-700 p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                First Name
              </label>
              <input
                {...register("firstName")}
                id="firstName"
                type="text"
                className="w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Last Name
              </label>
              <input
                {...register("lastName")}
                id="lastName"
                type="text"
                className="w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <input
                {...register("email")}
                id="email"
                type="email"
                className="w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                placeholder="Enter your email"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <AtSignSVG />
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showConfirmPassword ? <OpenEyeSVG /> : <ClosedEyeSVG />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className="w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showConfirmPassword ? <OpenEyeSVG /> : <ClosedEyeSVG />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="text-xs text-gray-400 space-y-1">
            <p>Password must include:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>At least 8 characters</li>
              <li>One uppercase letter</li>
              <li>One lowercase letter</li>
              <li>One number</li>
            </ul>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="agreeToTerms"
              {...register("agreeToTerms")}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 mt-1"
              required
            />
            <label
              htmlFor="agreeToTerms"
              className="ml-3 text-sm text-gray-400"
            >
              I agree to the{" "}
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
              >
                Privacy Policy
              </button>
            </label>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-800 text-gray-400">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Social Signup Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center px-4 py-3 border border-gray-600 rounded-2xl hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <GoogleSVG />
              <span className="text-sm font-medium text-gray-300">Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center px-4 py-3 border border-gray-600 rounded-2xl hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <GithubSVG />
              <span className="text-sm font-medium text-gray-300">GitHub</span>
            </button>
          </div>
        </form>
      </div>

      {/* Sign In Link */}
      <div className="text-center mt-8">
        <p className="text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
