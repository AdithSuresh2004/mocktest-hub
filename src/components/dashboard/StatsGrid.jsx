import { FaFile, FaHourglassHalf, FaHistory, FaTrophy } from 'react-icons/fa'
import Card from '@/components/common/Card'

const StatCard = ({ icon, label, value, color }) => (
  <Card hover padding="p-6">
    <div className="mb-4 flex items-center justify-between">
      <div className={`rounded-lg bg-${color}-100 p-3 dark:bg-${color}-900/30`}>
        {icon}
      </div>
    </div>
    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
      {value}
    </p>
    <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
  </Card>
)

export default function StatsGrid({ stats }) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={<FaFile className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        label="Total Attempts"
        value={stats.totalExams}
        color="blue"
      />
      <StatCard
        icon={
          <FaHourglassHalf className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
        }
        label="Pending Tests"
        value={stats.pendingTests}
        color="yellow"
      />
      <StatCard
        icon={
          <FaHistory className="h-6 w-6 text-green-600 dark:text-green-400" />
        }
        label="Completed Tests"
        value={stats.completedTests}
        color="green"
      />
      <StatCard
        icon={
          <FaTrophy className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        }
        label="Average Score"
        value={`${Number(stats.averageScore).toFixed(1)}%`}
        color="purple"
      />
    </div>
  )
}
