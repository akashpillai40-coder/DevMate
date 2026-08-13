import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { logout } from "../store/authSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#111111]">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-[#f7f6f2]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="text-xl font-black tracking-tight">
            DEVMATE
          </Link>

          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-500">Dashboard</span>

            <button
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
              className="text-sm font-semibold hover:text-gray-500 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome */}
        <section className="mb-10">
          <p className="text-sm text-gray-500 mb-2">
            Welcome back 👋 {user?.name as string}
          </p>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Ready for today?
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            Track your progress, stay consistent, and keep building.
          </p>
          {/* Date */}
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Streak */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="text-sm text-gray-500">Current streak</p>

            <div className="flex items-end gap-2 mt-4">
              <span className="text-4xl font-black">7</span>

              <span className="text-gray-500 mb-1">days 🔥</span>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Keep the momentum going.
            </p>
          </div>

          {/* GitHub */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="text-sm text-gray-500">GitHub commits</p>

            <div className="mt-4">
              <span className="text-4xl font-black">00</span>

              <span className="text-gray-500 ml-2">this week</span>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              You're shipping consistently.
            </p>
          </div>

          {/* DSA */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="text-sm text-gray-500">DSA problems</p>

            <div className="mt-4">
              <span className="text-4xl font-black">00</span>

              <span className="text-gray-500 ml-2">solved</span>
            </div>

            <p className="text-xs text-gray-400 mt-3">Keep practicing.</p>
          </div>
        </section>

        {/* Main dashboard grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly activity */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-7">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg font-bold">Weekly activity</h2>

                <p className="text-sm text-gray-500 mt-1">
                  Your consistency over the last 7 days.
                </p>
              </div>

              <span className="text-xs text-gray-400">This week</span>
            </div>

            {/* Activity bars */}
            <div className="h-48 flex items-end justify-between gap-4">
              {[
                { day: "Mon", height: "h-20" },
                { day: "Tue", height: "h-32" },
                { day: "Wed", height: "h-24" },
                { day: "Thu", height: "h-40" },
                { day: "Fri", height: "h-28" },
                { day: "Sat", height: "h-36" },
                { day: "Sun", height: "h-16" },
              ].map((item) => (
                <div
                  key={item.day}
                  className="flex-1 h-full flex flex-col justify-end items-center gap-3"
                >
                  <div
                    className={`${item.height} w-full max-w-10 bg-black rounded-md`}
                  />

                  <span className="text-xs text-gray-400">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily check-in */}
          <div className="bg-black text-white rounded-2xl p-7">
            <p className="text-xs text-gray-400 font-semibold tracking-wide">
              DAILY CHECK-IN
            </p>

            <h2 className="text-2xl font-bold mt-3">
              What did you done today?
            </h2>

            <p className="text-gray-400 text-sm mt-2 leading-6">
              Take a minute to record what you accomplished.
            </p>

            <button
              onClick={() => {
                navigate("/checkin");
              }}
              className="w-full mt-8 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition cursor-pointer"
            >
              Daily check-in
            </button>
          </div>
          <button
            onClick={() => {
              navigate("/summary");
            }}
            className="w-full mt-8 bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition cursor-pointer"
          >
            ✨ Generate Weekly Summary
          </button>
        </section>

        {/* Recent activity */}
        <section className="mt-8 bg-white border border-gray-200 rounded-2xl p-7">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold">Recent activity</h2>

              <p className="text-sm text-gray-500 mt-1">
                Your latest engineering progress.
              </p>
            </div>

            <button className="text-sm font-semibold hover:underline">
              View all
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            <div className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-green-600">✓</span>

                <div>
                  <p className="text-sm font-medium">
                    Fixed authentication flow
                  </p>

                  <p className="text-xs text-gray-400">Backend</p>
                </div>
              </div>

              <span className="text-xs text-gray-400">Today</span>
            </div>

            <div className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-green-600">✓</span>

                <div>
                  <p className="text-sm font-medium">Solved Valid Anagram</p>

                  <p className="text-xs text-gray-400">DSA</p>
                </div>
              </div>

              <span className="text-xs text-gray-400">Yesterday</span>
            </div>

            <div className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-green-600">✓</span>

                <div>
                  <p className="text-sm font-medium">Deployed API to EC2</p>

                  <p className="text-xs text-gray-400">DevOps</p>
                </div>
              </div>

              <span className="text-xs text-gray-400">Aug 6</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
