import {
  FaChartBar,
  FaTrophy,
  FaThumbsDown,
  FaClock,
  FaHourglassHalf,
} from 'react-icons/fa'
import { formatTime } from '@/utils/helpers/examHelpers'

const StatCard = ({ icon, label, value, color, unit }) => (
  <div
    className={`flex items-center gap-6 rounded-2xl border-l-4 bg-white p-6 shadow-lg dark:bg-gray-800 ${color}`}
  >
    <div className="text-3xl">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </p>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {value}
        {unit && <span className="ml-1 text-lg font-medium">{unit}</span>}
      </p>
    </div>
  </div>
)

export default function AttemptStats({ stats }) {
  if (!stats) return null

  const statCards = [
    {
      icon: <FaChartBar className="text-blue-500" />,
      label: 'Average Score',
      value: stats.avgScore,
      color: 'border-blue-500',
      unit: '%',
    },
    {
      icon: <FaTrophy className="text-green-500" />,
      label: 'Best Score',
      value: stats.bestScore,
      color: 'border-green-500',
      unit: '%',
    },
    {
      icon: <FaThumbsDown className="text-red-500" />,
      label: 'Worst Score',
      value: stats.worstScore,
      color: 'border-red-500',
      unit: '%',
    },
    {
      icon: <FaClock className="text-purple-500" />,
      label: 'Average Time',
      value: formatTime(stats.avgTime),
      color: 'border-purple-500',
    },
    {
      icon: <FaHourglassHalf className="text-yellow-500" />,
      label: 'Total Time Spent',
      value: formatTime(stats.totalTime),
      color: 'border-yellow-500',
    },
  ]

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  )
}
