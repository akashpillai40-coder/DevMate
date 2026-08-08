import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import type { AppDispatch, RootState } from "../store/store.ts"
import { registerUser } from "../store/authSlice"

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { isLoading, error } = useSelector(
    (state: RootState) => state.auth
  )

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await dispatch(registerUser(formData))

    if (registerUser.fulfilled.match(result)) {
      navigate("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#111111]">

      {/* Home */}
      <div className="absolute top-7 left-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black transition"
        >
          <span className="text-lg">←</span>
          Home
        </Link>
      </div>

      {/* Register container */}
      <div className="min-h-screen flex items-center justify-center px-6">

        <div className="w-full max-w-md">

          {/* Brand */}
          <div className="text-center mb-8">
            <Link
              to="/"
              className="text-2xl font-black tracking-tight"
            >
              DEVMATE
            </Link>

            <p className="text-gray-500 mt-2 text-sm">
              Start your daily engineering ritual.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

            <h1 className="text-2xl font-bold tracking-tight">
              Create your account
            </h1>

            <p className="text-gray-500 mt-2 mb-7 text-sm">
              Build momentum, one day at a time.
            </p>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>

            </form>

            {/* Login */}
            <p className="text-center text-sm text-gray-500 mt-7">
              Already have an account?{" "}

              <Link
                to="/login"
                className="text-black font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>

          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Ship daily. Build momentum.
          </p>

        </div>
      </div>
    </div>
  )
}

export default RegisterPage