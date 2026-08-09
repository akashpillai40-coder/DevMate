import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'

const moods = [
  { value: 1, emoji: '😞' },
  { value: 2, emoji: '😐' },
  { value: 3, emoji: '🙂' },
  { value: 4, emoji: '😊' },
  { value: 5, emoji: '🔥' },
]

const CheckInPage = () => {
  const navigate = useNavigate()

  const [todayLog, setTodayLog] = useState('')
  const [tomorrowLog, setTomorrowLog] = useState('')
  const [mood, setMood] = useState<number | null>(null)
  const [leetCode, setLeetCode] = useState(false)
  const [leetCodeProblem, setLeetCodeProblem] = useState('')
  const [gitPush, setGitPush] = useState(false)

  const [rewriting, setRewriting] = useState<'today' | 'tomorrow' | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleRewrite = async (field: 'today' | 'tomorrow') => {
    const text = field === 'today' ? todayLog : tomorrowLog
    if (!text.trim()) return

    setRewriting(field)
    setError('')
    try {
      const res = await axiosInstance.post('/api/checkin/rewrite', { text })
      if (field === 'today') {
        setTodayLog(res.data.correctedText)
      } else {
        setTomorrowLog(res.data.correctedText)
      }
    } catch (err: any) {
      setError('Failed to rewrite text. Please try again.')
    } finally {
      setRewriting(null)
    }
  }

  const handleSubmit = async () => {
    if (!todayLog.trim() || !tomorrowLog.trim() || !mood) {
      setError('Please fill in today\'s log, tomorrow\'s plan, and select a mood.')
      return
    }

    setSubmitting(true)
    setError('')
    try {
      await axiosInstance.post('/checkin', {
        todayLog,
        tomorrowLog,
        mood,
        leetCode,
        leetCodeProblem: leetCode ? leetCodeProblem : undefined,
        gitPush,
      })
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save check-in.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] px-6 py-10">
      <div className="max-w-2xl mx-auto">

        <button
          onClick={() => navigate('/dashboard')}
          className="text-sm text-gray-500 hover:text-gray-800 mb-6 cursor-pointer transition flex items-center gap-1"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-black mb-8">Daily check-in</h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        {/* Today's log */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">What did you do today?</label>
            <button
              onClick={() => handleRewrite('today')}
              disabled={rewriting === 'today' || !todayLog.trim()}
              className="text-xs text-purple-600 hover:text-purple-800 disabled:opacity-40 flex items-center gap-1"
            >
              {rewriting === 'today' ? '✨ Rewriting...' : '✏️ Rewrite with AI'}
            </button>
          </div>
          <textarea
            value={todayLog}
            onChange={(e) => setTodayLog(e.target.value)}
            placeholder="Built the CheckIn API, fixed the port conflict bug, applied to 5 jobs..."
            className="w-full min-h-[100px] p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none text-sm"
          />
        </div>

        {/* Tomorrow's plan */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">Plan for tomorrow</label>
            <button
              onClick={() => handleRewrite('tomorrow')}
              disabled={rewriting === 'tomorrow' || !tomorrowLog.trim()}
              className="text-xs text-purple-600 hover:text-purple-800 disabled:opacity-40 flex items-center gap-1"
            >
              {rewriting === 'tomorrow' ? '✨ Rewriting...' : '✏️ Rewrite with AI'}
            </button>
          </div>
          <textarea
            value={tomorrowLog}
            onChange={(e) => setTomorrowLog(e.target.value)}
            placeholder="Deploy to AWS RDS, wire the streak logic..."
            className="w-full min-h-[100px] p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none text-sm"
          />
        </div>

        {/* Mood */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <label className="text-sm font-semibold text-gray-700 block mb-3">How are you feeling today?</label>
          <div className="flex gap-3">
            {moods.map((m) => (
              <button
                key={m.value}
                onClick={() => setMood(m.value)}
                className={`text-2xl w-12 h-12 rounded-full border-2 transition-all ${
                  mood === m.value ? 'border-purple-500 bg-purple-50 scale-110' : 'border-gray-200'
                }`}
              >
                {m.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* LeetCode + GitHub */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={leetCode}
                onChange={(e) => setLeetCode(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-700">LeetCode done</span>
            </label>
            {leetCode && (
              <input
                type="text"
                value={leetCodeProblem}
                onChange={(e) => setLeetCodeProblem(e.target.value)}
                placeholder="Problem name"
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            )}
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={gitPush}
              onChange={(e) => setGitPush(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium text-gray-700">GitHub pushed</span>
          </label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-[#141414] text-white py-3.5 rounded-xl font-semibold hover:bg-[#2A2A2A] transition disabled:opacity-50"
        >
          {submitting ? 'Saving...' : 'Submit check-in'}
        </button>

      </div>
    </div>
  )
}

export default CheckInPage