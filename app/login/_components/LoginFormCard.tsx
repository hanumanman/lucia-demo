import { AtSignSVG } from "@/components/svgs/AtSign"
import { ClosedEyeSVG, OpenEyeSVG } from "@/components/svgs/EyeSVG"
import { GithubSVG } from "@/components/svgs/GithubSVG"
import { GoogleSVG } from "@/components/svgs/GoogleSVG"
import Link from "next/link"
import { Dispatch, SetStateAction, useState } from "react"
import { useFormContext } from "react-hook-form"
import { TUser } from "../page"

interface Props {
  setUser: Dispatch<SetStateAction<TUser | undefined>>
}

export const LoginFormCard = ({ setUser }: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit } = useFormContext<TUser>()

  function handleLogin(data: TUser) {
    setUser(data)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Logo/Brand Section */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold text-white mb-2">Welcome back</h1>
        <p className="text-gray-400">Sign in to your account</p>
      </div>

      {/* Login Form */}
      <div className="bg-gray-800 rounded-3xl shadow-2xl border border-gray-700 p-8">
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
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
                id="email"
                type="email"
                {...register("email")}
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
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showPassword ? <OpenEyeSVG /> : <ClosedEyeSVG />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-400">Remember me</span>
            </label>
            <button
              type="button"
              className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-800 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
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

      {/* Sign Up Link */}
      <div className="text-center mt-8">
        <p className="text-gray-400">
          Don't have an account?{" "}
          <Link
            href={"/signup"}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
