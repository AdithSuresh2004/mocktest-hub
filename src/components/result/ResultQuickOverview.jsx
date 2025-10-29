import {
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaBullseye,
  FaClock,
  FaCalendar,
  FaTrophy,
  FaCrosshairs,
} from 'react-icons/fa'
import ResultCard from '@/components/result/ResultCard'
import { formatTime, formatDate } from '@/utils/formatters/formatters'

const StatItem = ({ icon: Icon, value, label, color, subtext = null }) => (
  <div className="flex items-center rounded-xl bg-white p-3 ring-1 ring-gray-200 transition-all duration-200 hover:shadow-sm dark:bg-gray-800 dark:ring-gray-700">
    <div
      className={`mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${color.replace('text-', 'bg-').replace('-500', '-100 dark:bg-opacity-20')} dark:bg-opacity-20`}
    >
      <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${color}`} />
    </div>
    <div className="flex-1">
      <p className="text-lg font-bold text-gray-900 dark:text-gray-100 sm:text-xl">
        {value}
      </p>
      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 sm:text-sm">
        {label}
      </p>
      {subtext && (
        <p className="text-xs text-gray-500 dark:text-gray-500">{subtext}</p>
      )}
    </div>
  </div>
)

const AccuracyBar = ({ accuracy, label }) => (
  <div>
    <div className="mb-2 flex items-center justify-between">
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 sm:text-base">
        {label}
      </span>
      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 sm:text-base tabular-nums">
        {parseFloat(accuracy).toFixed(1)}%
      </span>
    </div>
    <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-1000 ease-out"
        style={{ width: `${Math.max(parseFloat(accuracy), 8)}%` }}
      />
    </div>
  </div>
)

const ResultQuickOverview = ({ attempt, exam, analysis }) => {
  if (!analysis || !attempt || !exam) return null

  return (
    <div className="space-y-6">
      <ResultCard
        title="Performance Summary"
        icon={FaBullseye}
        iconBgColor="bg-green-100 dark:bg-green-900/50"
        iconColor="text-green-600 dark:text-green-400"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatItem
              icon={FaCheckCircle}
              value={analysis.overall.correct}
              label="Correct Answers"
              color="text-green-500"
              subtext={`${((analysis.overall.correct / analysis.overall.totalQuestions) * 100).toFixed(0)}% of total`}
            />
            <StatItem
              icon={FaTimesCircle}
              value={analysis.overall.incorrect}
              label="Incorrect Answers"
              color="text-red-500"
              subtext={`${((analysis.overall.incorrect / analysis.overall.totalQuestions) * 100).toFixed(0)}% of total`}
            />
            <StatItem
              icon={FaQuestionCircle}
              value={analysis.overall.unanswered}
              label="Unanswered"
              color="text-orange-500"
              subtext={`${((analysis.overall.unanswered / analysis.overall.totalQuestions) * 100).toFixed(0)}% of total`}
            />
          </div>
          <AccuracyBar
            accuracy={analysis.overall.accuracy}
            label="Overall Accuracy"
          />
        </div>
      </ResultCard>

      <ResultCard
        title="Test Details"
        icon={FaTrophy}
        iconBgColor="bg-blue-100 dark:bg-blue-900/50"
        iconColor="text-blue-600 dark:text-blue-400"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <FaClock className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {formatTime(attempt.time_taken)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Time Taken
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <FaCrosshairs className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {analysis.overall.attempted}/{analysis.overall.totalQuestions}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Questions Attempted
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <FaCalendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {formatDate(attempt.timestamp)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Test Completed
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <FaTrophy className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {attempt.score || 0}/{exam.total_marks}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Final Score
                </p>
              </div>
            </div>
          </div>
        </div>
      </ResultCard>
    </div>
  )
}

export default ResultQuickOverview
