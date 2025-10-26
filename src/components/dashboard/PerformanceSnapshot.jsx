import { FaTrophy, FaCheckDouble, FaClock } from 'react-icons/fa'
import MetricCard from '@/components/dashboard/MetricCard'

const PerformanceSnapshot = ({ stats }) => {
  const passRate =
    stats?.completedTests > 0
      ? ((stats?.completedTests / stats?.totalExams) * 100).toFixed(0)
      : 0

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Performance Snapshot
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Track how your preparation is progressing across completed tests.
        </p>
      </div>
      <div className="grid gap-4">
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
          suffix=" min"
          color="purple"
          variant="prominent"
        />
      </div>
    </div>
  )
}

export default PerformanceSnapshot
