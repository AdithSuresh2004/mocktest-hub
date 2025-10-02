import { useMemo } from 'react'
import { Line } from 'recharts'
import { getAllAttempts } from '@/data/attemptRepository'

export function PerformanceChart({ examType = 'all', days = 30 }) {
  const chartData = useMemo(() => {
    const attempts = getAllAttempts()
      .filter((a) => a.status === 'completed')
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    return attempts
      .filter((a) => new Date(a.timestamp) >= cutoffDate)
      .map((a) => ({
        date: new Date(a.timestamp).toLocaleDateString(),
        score: a.score || 0,
        time: Math.floor((a.time_taken || 0) / 60),
      }))
  }, [days])
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Performance Trend (Last {days} days)
      </h3>
      {chartData.length > 0 ? (
        <div className="h-64">
          <Line
            data={chartData}
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </div>
      ) : (
        <p className="py-8 text-center text-gray-600 dark:text-gray-400">
          No data available for this period
        </p>
      )}
    </div>
  )
}
