import {
  FaClock,
  FaCalendarAlt,
  FaFileAlt,
  FaChartLine,
  FaEye,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {
  formatAttemptDate,
  formatDuration,
} from '@/utils/formatters/formatters'
import { PERFORMANCE_THRESHOLDS } from '@/constants/testConfig'

const AttemptItem = ({ attempt }) => {
  const score = attempt.score || 0
  const scoreLabel = score.toFixed(1)

  let scoreColor
  if (score >= PERFORMANCE_THRESHOLDS.EXCELLENT) {
    scoreColor = 'text-green-600 dark:text-green-400'
  } else if (score >= PERFORMANCE_THRESHOLDS.GOOD) {
    scoreColor = 'text-blue-600 dark:text-blue-400'
  } else if (score >= PERFORMANCE_THRESHOLDS.AVERAGE) {
    scoreColor = 'text-yellow-600 dark:text-yellow-400'
  } else {
    scoreColor = 'text-red-600 dark:text-red-400'
  }

  const dateLabel = formatAttemptDate(attempt.date)
  const timeLabel = formatDuration(attempt.timeTaken)

  return (
    <article className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          {attempt.category && (
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
              {attempt.category}
            </span>
          )}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
            {attempt.examName}
          </h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="h-3 w-3" />
            <span>{dateLabel}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="h-3 w-3" />
            <span>{timeLabel}</span>
          </div>
          {attempt.rawScore?.actual !== undefined &&
            attempt.rawScore?.total !== undefined && (
              <div className="flex items-center gap-1">
                <FaChartLine className="h-3 w-3" />
                <span>
                  {attempt.rawScore.actual}/{attempt.rawScore.total}
                </span>
              </div>
            )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className={`text-2xl font-bold ${scoreColor}`}>
            {scoreLabel}%
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/review/${attempt.id}`}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-600 dark:text-gray-200 dark:hover:border-blue-400 dark:hover:text-blue-300"
          >
            <FaEye className="h-3 w-3" />
            Review
          </Link>
          <Link
            to={`/result/${attempt.id}`}
            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <FaFileAlt className="h-3 w-3" />
            Result
          </Link>
        </div>
      </div>
    </article>
  )
}

export default AttemptItem
