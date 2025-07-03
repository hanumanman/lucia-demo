import { UserSVG } from "@/components/svgs/UserSVG"
import Link from "next/link"
import { TUser } from "../page"

interface Props {
  user: TUser
  handleLogout: () => void
}
export const UserInfoCard = ({ user, handleLogout }: Props) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Logo/Brand Section */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold text-white mb-2">Welcome!</h1>
      </div>

      {/* User Info Card */}
      <div className="bg-gray-800 rounded-3xl shadow-2xl border border-gray-700 p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <UserSVG />
          </div>

          <p className="text-gray-400 mb-6">Logged in successfully</p>

          <div className="space-y-4">
            <div className="bg-gray-700 rounded-2xl p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Email</h3>
              <p className="text-white">{user.email}</p>
            </div>

            <div className="bg-gray-700 rounded-2xl p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Status</h3>
              <div className="flex justify-center items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mt-6"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="text-center mt-8">
        <p className="text-gray-400">
          Want to create a new account?{" "}
          <Link
            href={"/signup"}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  )
}
