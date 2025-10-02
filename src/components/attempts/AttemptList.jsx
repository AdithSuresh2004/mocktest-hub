import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FaCalendarAlt, FaClock, FaPercentage, FaFileAlt } from 'react-icons/fa'
import { formatTime } from '@/utils/helpers/examHelpers'

const getScore = (score) => {
  if (typeof score === 'number') {
    return score.toFixed(2)
  }
  if (score && typeof score === 'object' && score.total > 0) {
    return ((score.actual / score.total) * 100).toFixed(2)
  }
  return 'N/A'
}

const AttemptItem = ({ attempt }) => {
  const score = attempt.score || 0

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 ease-in-out hover:shadow-xl dark:bg-gray-800">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
              {attempt.examName}
            </h3>
            {attempt.error && (
              <p className="text-sm text-red-500">{attempt.error}</p>
            )}
          </div>
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              score >= 75
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : score >= 40
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}
          >
            {score.toFixed(2)}%
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" />
            <span>
              {attempt.date
                ? format(new Date(attempt.date), 'do MMM yyyy')
                : 'N/A'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-purple-500" />
            <span>{formatTime(attempt.timeTaken)}</span>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Link
            to={`/result/${attempt.id}`}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-700"
          >
            <FaFileAlt />
            View Result
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function AttemptList({ attempts }) {
  if (!attempts || attempts.length === 0) {
    return (
      <div className="rounded-lg bg-white py-12 text-center shadow dark:bg-gray-800">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          No Attempts Found
        </h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Looks like you haven't completed any tests that match the current
          filters.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {attempts.map((attempt) => (
        <AttemptItem key={attempt.id || attempt.attempt_id} attempt={attempt} />
      ))}
    </div>
  )
}
