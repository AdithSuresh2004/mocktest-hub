import {
  FaClipboardList,
  FaHourglassHalf,
  FaCheckCircle,
  FaTrophy,
} from 'react-icons/fa'
import MetricCard from '@/components/dashboard/MetricCard'

const StatsGrid = ({ stats }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <MetricCard
      icon={FaClipboardList}
      label="Total Attempts"
      value={stats.totalExams}
      color="blue"
      variant="prominent"
    />
    <MetricCard
      icon={FaHourglassHalf}
      label="Pending Tests"
      value={stats.pendingTests}
      color="yellow"
      variant="prominent"
    />
    <MetricCard
      icon={FaCheckCircle}
      label="Completed"
      value={stats.completedTests}
      color="green"
      variant="prominent"
    />
    <MetricCard
      icon={FaTrophy}
      label="Avg Score"
      value={Number(stats.averageScore).toFixed(1)}
      suffix="%"
      color="purple"
      variant="prominent"
    />
  </div>
)

export default StatsGrid
