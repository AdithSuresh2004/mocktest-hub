import { useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { getAllAttempts } from '@/data/attemptRepository'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-600 dark:bg-gray-700">
        <p className="font-medium text-gray-900 dark:text-gray-100">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}{entry.dataKey === 'score' ? '%' : ' min'}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const PerformanceChart = ({ attempts, days = 30, initialChartType = 'area' }) => {
  const [chartType, setChartType] = useState(initialChartType)
  const allAttempts = getAllAttempts()
    .filter((a) => a.status === 'completed')
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  const chartData = allAttempts
    .filter((a) => new Date(a.timestamp) >= cutoffDate)
    .map((a, index) => ({
      date: new Date(a.timestamp).toLocaleDateString(),
      score: a.score || 0,
      time: Math.floor((a.time_taken || 0) / 60),
      attempt: index + 1
    }))

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="date"
              className="text-xs text-gray-600 dark:text-gray-400"
            />
            <YAxis
              className="text-xs text-gray-600 dark:text-gray-400"
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={3}
              name="Score (%)"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        )

      case 'bar':
        return (
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="date"
              className="text-xs text-gray-600 dark:text-gray-400"
            />
            <YAxis
              className="text-xs text-gray-600 dark:text-gray-400"
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="score"
              fill="#3b82f6"
              name="Score (%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        )

      case 'area':
      default:
        return (
          <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="date"
              className="text-xs text-gray-600 dark:text-gray-400"
            />
            <YAxis
              className="text-xs text-gray-600 dark:text-gray-400"
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.3}
              name="Score (%)"
            />
          </AreaChart>
        )
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Performance Trend (Last {days} days)
        </h3>
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setChartType('area')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
              chartType === 'area'
                ? 'bg-white text-blue-700 shadow-sm dark:bg-gray-600 dark:text-blue-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
            }`}
          >
            Area
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
              chartType === 'line'
                ? 'bg-white text-blue-700 shadow-sm dark:bg-gray-600 dark:text-blue-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
              chartType === 'bar'
                ? 'bg-white text-blue-700 shadow-sm dark:bg-gray-600 dark:text-blue-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
            }`}
          >
            Bar
          </button>
        </div>
      </div>
      {chartData.length > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No data available for this period
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Complete some tests to see your performance trends
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PerformanceChart
