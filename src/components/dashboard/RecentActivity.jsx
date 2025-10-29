import { useNavigate, Link } from 'react-router-dom'
import { FaClock, FaArrowRight } from 'react-icons/fa'
import { formatDate, formatTime } from '@/utils/formatters/formatters'
import Card from '@/components/common/Card'

const MAX_VISIBLE_ACTIVITIES = 5

export default function RecentActivity({ activities }) {
  const navigate = useNavigate()
  const visibleActivities = activities.slice(0, MAX_VISIBLE_ACTIVITIES)

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Recent Activity
        </h2>
        {activities.length > 0 && (
          <Link
            to="/attempts"
            className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            View All
          </Link>
        )}
      </div>
      {activities.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No recent completed tests.
        </p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {visibleActivities.map((activity) => (
            <li
              key={activity.id}
              className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {activity.exam_name}
                </p>
                <div className="mt-1 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>
                    Score:{' '}
                    {typeof activity.score === 'number'
                      ? `${activity.score.toFixed(1)}%`
                      : `${((activity.score.actual / activity.score.total) * 100).toFixed(1)}%`}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock /> {formatTime(activity.timeTaken)}
                  </span>
                  <span>{formatDate(activity.timestamp)}</span>
                </div>
              </div>
              <button
                onClick={() => navigate(`/result/${activity.id}`)}
                className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
              >
                View Result <FaArrowRight />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
