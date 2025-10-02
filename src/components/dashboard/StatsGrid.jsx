import { FaFile, FaHourglassHalf, FaHistory, FaTrophy } from 'react-icons/fa'

const StatCard = ({ icon, label, value, color }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
    <div className="mb-4 flex items-center justify-between">
      <div className={`p-3 bg-${color}-100 dark:bg-${color}-900/30 rounded-lg`}>
        {icon}
      </div>
    </div>
    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
      {value}
    </p>
    <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
  </div>
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
