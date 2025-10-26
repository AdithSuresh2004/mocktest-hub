import {
  FaClock,
  FaCalendarAlt,
  FaFileAlt,
  FaChartLine,
  FaLayerGroup,
  FaMedal,
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

  let scoreBadge
  if (score >= PERFORMANCE_THRESHOLDS.EXCELLENT) {
    scoreBadge = 'bg-green-500/10 text-green-700 dark:bg-green-900/40 dark:text-green-200'
  } else if (score >= PERFORMANCE_THRESHOLDS.GOOD) {
    scoreBadge = 'bg-blue-500/10 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200'
  } else if (score >= PERFORMANCE_THRESHOLDS.AVERAGE) {
    scoreBadge = 'bg-yellow-500/10 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-200'
  } else {
    scoreBadge = 'bg-red-500/10 text-red-700 dark:bg-red-900/40 dark:text-red-200'
  }

  const dateLabel = formatAttemptDate(attempt.date)
  const timeLabel = formatDuration(attempt.timeTaken)
  
  const examDuration = attempt._durationMinutes ? `${attempt._durationMinutes} min exam` : null

  const subjectBadges = []
  if (Array.isArray(attempt.subjects) && attempt.subjects.length > 0) {
    const trimmed = attempt.subjects.slice(0, 3)
    if (attempt.subjects.length > 3) {
      trimmed.push(`+${attempt.subjects.length - 3} more`)
    }
    subjectBadges.push(...trimmed)
  }

  return (
    <article className="flex h-full flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <header className="space-y-3">
        {attempt.category && (
          <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
            {attempt.category}
          </span>
        )}
        <h3 className="break-words text-xl font-semibold leading-snug text-gray-900 dark:text-gray-100">
          {attempt.examName}
        </h3>
        {attempt.error && (
          <p className="text-sm text-red-500">{attempt.error}</p>
        )}
      </header>
      <div className="grid gap-3 text-sm text-gray-600 sm:grid-cols-2 dark:text-gray-300">
        <div
          className={`flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 dark:border-gray-700 ${scoreBadge}`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/60 text-green-600 dark:bg-white/10 dark:text-green-200">
            <FaMedal />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
              Score
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {scoreLabel}
              <span className="ml-1 text-base font-semibold">%</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 dark:border-gray-700">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
            <FaCalendarAlt />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Date
            </p>
            <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {dateLabel}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 dark:border-gray-700">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
            <FaClock />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Time taken
            </p>
            <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {timeLabel}
            </p>
          </div>
        </div>
        {examDuration && (
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 dark:border-gray-700">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-500/10 text-slate-600 dark:bg-slate-900/30 dark:text-slate-300">
              <FaLayerGroup />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Exam length
              </p>
              <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {examDuration}
              </p>
            </div>
          </div>
        )}
        {attempt.rawScore?.actual !== undefined && attempt.rawScore?.total !== undefined && (
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 dark:border-gray-700">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
              <FaChartLine />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Correct answers
              </p>
              <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {attempt.rawScore.actual}/{attempt.rawScore.total}
              </p>
            </div>
          </div>
        )}
      </div>
      {subjectBadges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {subjectBadges.map((subject) => (
            <span
              key={subject}
              className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            >
              {subject}
            </span>
          ))}
        </div>
      )}
      <footer className="mt-auto flex flex-wrap items-center justify-end gap-3">
        <Link
          to={`/review/${attempt.id}`}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-600 dark:text-gray-200 dark:hover:border-blue-400 dark:hover:text-blue-300"
        >
          <FaChartLine /> Review answers
        </Link>
        <Link
          to={`/result/${attempt.id}`}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <FaFileAlt /> View result
        </Link>
      </footer>
    </article>
  )
}

export default AttemptItem
