import {
  FaClock,
  FaCheckCircle,
  FaChartLine,
} from 'react-icons/fa'
import { formatDuration } from '@/utils/formatters/formatters'
import HighlightCard from '@/components/common/HighlightCard'

const AttemptStats = ({ stats }) => {
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

  if (!highlights.length) return null

  return (
    <section className="mb-10">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Performance Snapshot
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track how your preparation is progressing across completed tests.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {highlights.map((stat, index) => (
            <HighlightCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AttemptStats
