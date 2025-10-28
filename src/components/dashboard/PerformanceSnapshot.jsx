import { FaTrophy, FaCheckDouble, FaClock } from 'react-icons/fa'
import MetricCard from '@/components/dashboard/MetricCard'

const PerformanceSnapshot = ({ stats }) => {
  const passRate =
    stats?.completedTests > 0
      ? ((stats?.completedTests / stats?.totalExams) * 100).toFixed(0)
      : 0

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 h-full flex flex-col">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Performance Snapshot
        </h2>
      </div>
      <div className="grid gap-4 flex-1 content-evenly">
        <MetricCard
          icon={FaTrophy}
          label="Best Score"
          value={stats?.highScore?.toFixed(1) ?? 0}
          suffix="%"
          color="green"
          variant="prominent"
        />
        <MetricCard
          icon={FaCheckDouble}
          label="Completion Rate"
          value={passRate}
          suffix="%"
          color="blue"
          variant="prominent"
        />
        <MetricCard
          icon={FaClock}
          label="Avg Time Per Test"
          value={stats?.averageTime?.toFixed(0) ?? 0}
          suffix=" sec"
          color="purple"
          variant="prominent"
        />
      </div>
    </div>
  )
}

export default PerformanceSnapshot
