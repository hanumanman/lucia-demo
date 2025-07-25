import { LightningSVG } from "@/components/svgs/LightningSVG"
import { LockSVG } from "@/components/svgs/LockSVG"
import { SpreadSVG } from "@/components/svgs/SpreadSVG"
import { RoundedUserSVG } from "@/components/svgs/UserSVG"
import Link from "next/link"

export default function Home() {
  return (
    <div className="w-full max-w-2xl text-center">
      {/* Hero Section */}
      <div className="mb-16">
        {/* Logo */}
        <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
          <RoundedUserSVG />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            AuthWDS
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed">
          A modern authentication system with a sleek, intuitive design.
        </p>

        {/* Description */}
        <p className="text-gray-500 max-w-lg mx-auto">
          Secure, elegant, and user-friendly authentication.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4 mb-16">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Sign Up Button - Primary */}
          <Link
            href="/signup"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Get Started
          </Link>

          {/* Sign In Button - Secondary */}
          <Link
            href="/login"
            className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 border border-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Sign In
          </Link>
        </div>

        {/* Helper Text */}
        <p className="text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Sign in here
          </Link>{" "}
          or{" "}
          <Link
            href="/signup"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            create a new account
          </Link>
        </p>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {/* Feature 1 */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50">
          <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <LockSVG />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Secure</h3>
          <p className="text-gray-400 text-sm">
            Built with industry-standard security practices and modern
            encryption.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50">
          <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <SpreadSVG />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Beautiful</h3>
          <p className="text-gray-400 text-sm">
            Sleek design with smooth, intuitive interactions.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50">
          <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <LightningSVG />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Fast</h3>
          <p className="text-gray-400 text-sm">
            Optimized performance with Next.js and modern web technologies.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center">
        <p className="text-gray-500 text-sm">
          © 2025 AuthWDS. Built with Next.js, TypeScript, and Tailwind CSS.
        </p>
      </div>
    </div>
  )
}
