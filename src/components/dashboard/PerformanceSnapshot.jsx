import { FaChartLine, FaTrophy, FaClock } from 'react-icons/fa'
import Card from '@/components/common/Card'

const StatCard = ({ icon: Icon, label, value, iconColor }) => (
  <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-700/50">
    <Icon className={`mb-2 h-8 w-8 ${iconColor}`} />
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {label === 'Average Time'
          ? `${value.toFixed(1)}m`
          : `${value.toFixed(1)}%`}
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
      icon: FaClock,
      label: 'Average Time',
      value: stats?.averageTime ?? 0,
      iconColor: 'text-blue-500',
    },
  ]

  return (
    <Card className="flex h-full flex-col">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
        Performance Snapshot
      </h2>
      <div className="grid flex-grow grid-cols-1 gap-4 sm:grid-cols-3">
        {metrics.map((metric, index) => (
          <StatCard key={index} {...metric} />
        ))}
      </div>
    </Card>
  )
}

export default PerformanceSnapshot
