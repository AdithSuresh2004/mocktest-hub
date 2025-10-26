import {
  FaThumbsDown,
  FaHourglassHalf,
  FaClock,
  FaChartBar,
  FaTrophy,
  FaCheckCircle,
  FaChartLine,
} from 'react-icons/fa'
import { formatDuration } from '@/utils/formatters/formatters'

const HighlightCard = ({ icon, label, value, caption, accent }) => (
  <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
    <div className="flex items-center gap-3">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${accent}`}
        aria-hidden="true"
      >
        {icon}
      </span>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {label}
        </p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {value}
        </p>
      </div>
    </div>
    {caption && (
      <p className="text-sm text-gray-500 dark:text-gray-400">{caption}</p>
    )}
  </div>
)

const StatCard = ({ icon, label, value, color, unit }) => (
  <div
    className={`flex items-center gap-6 rounded-2xl border-l-4 bg-white p-6 shadow-lg dark:bg-gray-800 ${color}`}
  >
    <div className="text-3xl">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </p>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {value}
        {unit && <span className="ml-1 text-lg font-medium">{unit}</span>}
      </p>
    </div>
  </div>
)

function AttemptStats({ stats, showDetails = false, onToggle }) {
  const formatScore = (value) =>
    Number.isFinite(value) ? `${Number(value).toFixed(1)}%` : '0.0%'

  const highlights = !stats ? [] : [
    {
      icon: <FaCheckCircle />,
      label: 'Completed Tests',
      value: stats.count ?? 0,
      caption: 'Total exams you have finished',
      accent: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300',
    },
    {
      icon: <FaChartLine />,
      label: 'Average Score',
      value: formatScore(stats.avgScore),
      caption: 'Consistent performance across attempts',
      accent: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300',
    },
    {
      icon: <FaClock />,
      label: 'Typical Time Spent',
      value: formatDuration(stats.avgTime ?? 0),
      caption: 'Average completion time per exam',
      accent: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300',
    },
  ]

  const detailCards = !stats ? [] : [
    {
      icon: <FaTrophy className="text-green-500" />,
      label: 'Best Score',
      value: formatScore(stats.bestScore),
      color: 'border-green-500',
    },
    {
      icon: <FaThumbsDown className="text-red-500" />,
      label: 'Lowest Score',
      value: formatScore(stats.worstScore),
      color: 'border-red-500',
    },
    {
      icon: <FaHourglassHalf className="text-yellow-500" />,
      label: 'Total Time Invested',
      value: formatDuration(stats.totalTime ?? 0),
      color: 'border-yellow-500',
    },
  ]

  if (!highlights.length) return null

  return (
    <section className="mb-10 space-y-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Performance Snapshot
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Track how your preparation is progressing across completed tests.
            </p>
          </div>
          {onToggle && (
            <button
              onClick={onToggle}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-300"
            >
              {showDetails ? 'Hide detailed stats' : 'Show detailed stats'}
            </button>
          )}
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {highlights.map((stat, index) => (
            <HighlightCard key={index} {...stat} />
          ))}
        </div>
      </div>
      {showDetails && detailCards.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {detailCards.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      )}
    </section>
  )
}

export default AttemptStats
