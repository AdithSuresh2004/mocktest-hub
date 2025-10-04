import { FaChartLine, FaBullseye, FaTrophy } from 'react-icons/fa'

const StatCard = ({ icon: Icon, label, value, iconColor }) => (
  <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-700/50">
    <Icon className={`mb-2 h-8 w-8 ${iconColor}`} />
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {value.toFixed(1)}%
      </p>
    </div>
  </div>
)

const PerformanceSnapshot = ({ stats }) => {
  const metrics = [
    {
      icon: FaTrophy,
      label: 'Average Score',
      value: stats?.averageScore ?? 0,
      iconColor: 'text-yellow-500',
    },
    {
      icon: FaChartLine,
      label: 'Best Score',
      value: stats?.highScore ?? 0,
      iconColor: 'text-green-500',
    },
    {
      icon: FaBullseye,
      label: 'Average Accuracy',
      value: stats?.averageAccuracy ?? 0,
      iconColor: 'text-blue-500',
    },
  ]

  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
        Performance Snapshot
      </h2>
      <div className="grid flex-grow grid-cols-1 gap-4 sm:grid-cols-3">
        {metrics.map((metric, index) => (
          <StatCard key={index} {...metric} />
        ))}
      </div>
    </div>
  )
}

export default PerformanceSnapshot
