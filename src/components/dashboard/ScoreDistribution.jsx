import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { calculateScoreDistribution } from '@/utils/calculations/resultAnalysis'

const ScoreDistribution = ({ completedExams }) => {
  if (!completedExams || completedExams.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Score Distribution
        </h3>
        <div className="flex h-64 items-center justify-center">
          <p className="text-gray-600 dark:text-gray-400">
            No completed exams to analyze
          </p>
        </div>
      </div>
    )
  }

  const distribution = calculateScoreDistribution(completedExams)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-600 dark:bg-gray-700">
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {payload[0].name}
          </p>
          <p className="text-sm" style={{ color: payload[0].payload.color }}>
            Tests: {payload[0].value}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Score Distribution
      </h3>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Breakdown of your performance across score ranges
      </p>
      {distribution.length > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No data available for distribution analysis
            </p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {distribution.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {item.name}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScoreDistribution
