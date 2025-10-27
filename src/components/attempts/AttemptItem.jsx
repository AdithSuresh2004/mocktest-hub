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
import Badge from '@/components/common/Badge'
import Button from '@/components/common/Button'

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
    <article className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex-1 min-w-0 mb-4 sm:mb-0">
        <div className="flex items-center gap-3 mb-2">
          {attempt.category && (
            <Badge variant="primary">{attempt.category}</Badge>
          )}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
            {attempt.examName}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
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

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
        <div className="text-left sm:text-right w-full sm:w-auto">
          <div className={`text-2xl font-bold ${scoreColor}`}>
            {scoreLabel}%
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            as={Link}
            to={`/review/${attempt.id}`}
            variant="secondary"
            icon={FaEye}
            size="sm"
          >
            Review
          </Button>
          <Button
            as={Link}
            to={`/result/${attempt.id}`}
            variant="primary"
            icon={FaFileAlt}
            size="sm"
          >
            Result
          </Button>
        </div>
      </div>
    </article>
  )
}

export default AttemptItem
