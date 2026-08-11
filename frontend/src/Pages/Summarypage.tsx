import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'

interface Summary {
  id: string
  weekStart: string
  weekEnd: string
  summary: string
  createdAt: string
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const SummaryPage = () => {
  const navigate = useNavigate()

  const [currentSummary, setCurrentSummary] = useState<Summary | null>(null)
  const [history, setHistory] = useState<Summary[]>([])
  const [generating, setGenerating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchHistory = async () => {
  try {
    const res = await axiosInstance.get('/api/summary/history')
    
    const historyList = Array.isArray(res.data?.history) ? res.data.history : []
    
    setHistory(historyList)
    if (historyList.length > 0) {
      setCurrentSummary(historyList[0])
    }
  } catch (err: any) {
    setError('Failed to load summary history.')
    setHistory([]) 
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
    fetchHistory()
  }, [])

  const handleGenerate = async () => {
    setGenerating(true)
    setError('')
    try {
      const res = await axiosInstance.post('/summary/generate')
      setCurrentSummary(res.data.summary)
      fetchHistory()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to generate summary. Make sure you have check-ins this week.')
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-gray-200 border-t-[#141414] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading summaries...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] px-6 py-10">
      <div className="max-w-2xl mx-auto">

        <button
          onClick={() => navigate('/dashboard')}
          className="text-sm text-gray-500 hover:text-gray-800 mb-6"
        >
          ← Back to Dashboard
        </button>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black">Weekly summary</h1>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="bg-[#141414] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#2A2A2A] transition disabled:opacity-50"
          >
            {generating ? 'Generating...' : '✨ Generate this week'}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-6 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        {/* Current / most recent summary */}
        {currentSummary ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <p className="text-xs font-mono text-gray-400 mb-3">
              {formatDate(currentSummary.weekStart)} – {formatDate(currentSummary.weekEnd)}
            </p>
            <p className="text-[15px] leading-relaxed text-gray-800">
              {currentSummary.summary}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-10 mb-8 text-center">
            <p className="text-gray-400 text-sm mb-1">No summary yet</p>
            <p className="text-gray-500 text-sm">
              Generate one once you've checked in this week.
            </p>
          </div>
        )}

        {/* History */}
        {history.length > 1 && (
          <>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Past weeks
            </h2>
            <div className="space-y-3">
              {history.slice(1).map((s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer hover:border-gray-300 transition"
                  onClick={() => setCurrentSummary(s)}
                >
                  <p className="text-xs font-mono text-gray-400 mb-2">
                    {formatDate(s.weekStart)} – {formatDate(s.weekEnd)}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {s.summary}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default SummaryPage