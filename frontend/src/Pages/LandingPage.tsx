
import { Link } from 'react-router-dom'


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#111111]">

      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-7 flex items-center justify-between cursor-pointer">
        
        <Link
          to="/"
          className="text-xl font-black tracking-tight"
        >
          DEVMATE
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm text-gray-600">
          <a href="#workflow" className="hover:text-black transition">
            Workflow
          </a>

          <a href="#teams" className="hover:text-black transition">
            For Teams
          </a>

          <a href="#docs" className="hover:text-black transition">
            Docs
          </a>
        </div>

        <div className="flex items-center gap-5">
          <Link
            to="/login"
            className="text-sm font-medium hover:text-gray-600"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="bg-black text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
          >
            Sign Up
          </Link>
        </div>

      </nav>


      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 pt-20 pb-20">

        <section className="max-w-4xl">

          {/* Version badge */}
          <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-xs font-semibold tracking-wide mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            V1.0
            <span className="text-gray-400">•</span>
            SHIPPED DAILY
          </div>


          {/* Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.05em] leading-[0.95]">
            The daily ritual for
            <span className="block text-gray-400">
              focused engineering.
            </span>
          </h1>


          {/* Description */}
          <p className="mt-8 max-w-2xl text-lg md:text-xl leading-8 text-gray-600">
            Devmate turns the end-of-day scramble into a 60-second
            ritual. Log your wins, name tomorrow&apos;s plan, and close
            the terminal with your streak intact.
          </p>


          {/* Terminal */}
          <div className="mt-12 bg-[#151515] rounded-2xl overflow-hidden shadow-xl max-w-3xl">

            {/* Terminal header */}
            <div className="px-5 py-4 flex items-center gap-2 border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-gray-600" />
              <div className="w-3 h-3 rounded-full bg-gray-600" />
              <div className="w-3 h-3 rounded-full bg-gray-600" />

              <span className="ml-auto text-xs text-gray-500 font-mono">
                checkin_session_0808.sh
              </span>
            </div>


            {/* Terminal content */}
            <div className="p-7 font-mono text-sm md:text-base leading-8">

              <div>
                <span className="text-gray-500">$</span>{' '}
                <span className="text-white">
                  devmate checkin --today
                </span>
              </div>

              <div className="text-gray-400">
                → Shipped the AI rewrite endpoint, fixed JWT bug
              </div>

              <div className="text-gray-400">
                → Tomorrow: write streak calculation logic
              </div>

              <div className="mt-2">
                <span className="text-gray-500">$</span>{' '}
                <span className="text-white">
                  devmate streak --status
                </span>
              </div>

              <div className="text-gray-300">
                <span className="text-green-400">✓</span>{' '}
                LeetCode: 6 days · GitHub: 6 days
              </div>

            </div>
          </div>

        </section>


        {/* Features */}
        <section
          id="workflow"
          className="grid md:grid-cols-3 gap-10 border-t border-gray-200 mt-20 pt-8"
        >

          <div>
            <p className="text-xs text-gray-400 font-semibold mb-3">
              01 · LOG
            </p>

            <h3 className="text-lg font-bold">
              One box, two questions
            </h3>

            <p className="mt-2 text-gray-500 leading-6">
              What you done today. What you&apos;re doing tomorrow.
            </p>
          </div>


          <div>
            <p className="text-xs text-gray-400 font-semibold mb-3">
              02 · TRACK
            </p>

            <h3 className="text-lg font-bold">
              Streaks that don&apos;t lie
            </h3>

            <p className="mt-2 text-gray-500 leading-6">
              LeetCode and GitHub progress tracked honestly.
            </p>
          </div>


          <div>
            <p className="text-xs text-gray-400 font-semibold mb-3">
              03 · REFLECT
            </p>

            <h3 className="text-lg font-bold">
              A Sunday that writes itself
            </h3>

            <p className="mt-2 text-gray-500 leading-6">
              Seven days in, one AI-written summary out.
            </p>
          </div>

        </section>


        {/* CTA */}
        <section className="mt-24 text-center border-t border-gray-200 pt-20">

          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Build momentum.
          </h2>

          <p className="mt-4 text-gray-500">
            End every day knowing exactly what comes next.
          </p>

          <Link
            to="/register"
            className="inline-block mt-8 bg-black text-white px-7 py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Start with DevMate
          </Link>

        </section>

      </main>
    </div>
  )
}

export default LandingPage