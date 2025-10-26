import {
  FaTrophy,
  FaPercentage,
  FaClock,
  FaChartBar,
} from 'react-icons/fa'
import { formatTime } from '@/utils/formatters/formatters'

const ScoreCard = ({ title, value, icon: Icon, gradientFrom, gradientTo, borderColor, textColor }) => (
  <div
    className={`rounded-xl border ${borderColor} bg-gradient-to-br ${gradientFrom} ${gradientTo} p-4`}
  >
    <div className="mb-2 flex items-center justify-between">
      <span className={`text-sm font-medium ${textColor}`}>{title}</span>
      <Icon className={textColor} />
    </div>
    <p className={`text-2xl font-bold ${textColor.replace('text-', 'text-').replace('-700', '-900').replace('-300', '-100')}`}>
      {value}
    </p>
  </div>
)

const ResultScoreCards = ({ actualScore, totalMarks, percentage, timeTaken, performance }) => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <ScoreCard
        title="Score"
        value={`${actualScore}/${totalMarks}`}
        icon={FaTrophy}
        gradientFrom="from-blue-50"
        gradientTo="to-blue-100"
        borderColor="border-blue-200 dark:border-blue-700 dark:from-blue-900/20 dark:to-blue-800/20"
        textColor="text-blue-700 dark:text-blue-300"
      />
      <ScoreCard
        title="Percentage"
        value={`${percentage}%`}
        icon={FaPercentage}
        gradientFrom="from-green-50"
        gradientTo="to-green-100"
        borderColor="border-green-200 dark:border-green-700 dark:from-green-900/20 dark:to-green-800/20"
        textColor="text-green-700 dark:text-green-300"
      />
      <ScoreCard
        title="Time Taken"
        value={formatTime(timeTaken)}
        icon={FaClock}
        gradientFrom="from-purple-50"
        gradientTo="to-purple-100"
        borderColor="border-purple-200 dark:border-purple-700 dark:from-purple-900/20 dark:to-purple-800/20"
        textColor="text-purple-700 dark:text-purple-300"
      />
      <div className="rounded-xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 dark:border-yellow-700 dark:from-yellow-900/20 dark:to-yellow-800/20">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
            Performance
          </span>
          <FaChartBar className="text-yellow-500 dark:text-yellow-400" />
        </div>
        <p className={`text-xl font-bold ${performance.color}`}>
          {performance.text}
        </p>
      </div>
    </div>
  )
}

export default ResultScoreCards
