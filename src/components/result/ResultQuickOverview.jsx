import {
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaBullseye,
} from 'react-icons/fa'
import ResultCard from '@/components/result/ResultCard'

const StatItem = ({ icon: Icon, value, label, color }) => (
  <div className="flex items-center rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
    <Icon className={`mr-3 h-6 w-6 ${color}`} />
    <div>
      <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
        {value}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  </div>
)

const AccuracyBar = ({ accuracy }) => (
  <div>
    <div className="mb-1 flex justify-between">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Accuracy
      </span>
      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
        {accuracy}%
      </span>
    </div>
    <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className="h-2.5 rounded-full bg-blue-500"
        style={{ width: `${accuracy}%` }}
      ></div>
    </div>
  </div>
)

const ResultQuickOverview = ({ analysis }) => {
  if (!analysis) return null

  return (
    <ResultCard
      title="Quick Overview"
      icon={FaBullseye}
      iconBgColor="bg-green-100 dark:bg-green-900/50"
      iconColor="text-green-600 dark:text-green-400"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatItem
            icon={FaCheckCircle}
            value={analysis.overall.correct}
            label="Correct"
            color="text-green-500"
          />
          <StatItem
            icon={FaTimesCircle}
            value={analysis.overall.incorrect}
            label="Incorrect"
            color="text-red-500"
          />
          <StatItem
            icon={FaQuestionCircle}
            value={analysis.overall.unanswered}
            label="Unanswered"
            color="text-gray-500 dark:text-gray-400"
          />
        </div>
        <AccuracyBar accuracy={analysis.overall.accuracy} />
      </div>
    </ResultCard>
  )
}

export default ResultQuickOverview
