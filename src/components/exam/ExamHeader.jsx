import {
  FaCompress,
  FaExclamationTriangle,
  FaClock,
  FaExpandArrowsAlt,
  FaArrowLeft,
} from 'react-icons/fa'
import { useExamHeaderState } from '@/hooks/exam/useExamHeaderState'
import { formatTime } from '@/utils/formatters/formatters'
import ThemeToggle from '@/components/common/ThemeToggle'

export default function ExamHeader({
  exam,
  timeRemaining,
  onExit,
  isWarning,
  isCritical,
}) {
  const { isFullscreen, timeColorClass, toggleFullscreen } =
    useExamHeaderState(timeRemaining)

  let timerStyles
  if (isCritical) {
    timerStyles =
      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 animate-pulse ring-2 ring-red-500'
  } else if (isWarning) {
    timerStyles =
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 ring-1 ring-yellow-500'
  } else {
    timerStyles = timeColorClass
  }

  return (
    <header
      className="z-10 border-b border-gray-200 bg-white px-4 py-2 shadow-md transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800"
      role="banner"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold text-gray-900 sm:text-xl dark:text-gray-100">
            {exam.exam_name}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 rounded-md px-3 py-1 font-mono text-lg font-bold transition-all duration-300 ${timerStyles}`}
            role="timer"
            aria-live="polite"
            aria-atomic="true"
            title={
              isCritical
                ? 'Less than 1 minute remaining!'
                : isWarning
                  ? 'Less than 5 minutes remaining'
                  : 'Time remaining'
            }
          >
            {(isCritical || isWarning) && (
              <FaExclamationTriangle
                className={`h-4 w-4 ${isCritical ? 'animate-bounce' : ''}`}
                aria-hidden="true"
              />
            )}
            <FaClock className="h-4 w-4" aria-hidden="true" />
            <span>{formatTime(timeRemaining)}</span>
          </div>
          <button
            onClick={toggleFullscreen}
            className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label={
              isFullscreen ? 'Exit fullscreen mode' : 'Enter fullscreen mode'
            }
            title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
          >
            {isFullscreen ? (
              <FaCompress className="h-5 w-5" aria-hidden="true" />
            ) : (
              <FaExpandArrowsAlt className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
          <ThemeToggle />
          <button
            onClick={onExit}
            className="rounded-md p-2 text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none dark:text-gray-300 dark:hover:bg-red-900/20 dark:hover:text-red-400"
            aria-label="Exit exam"
            title="Exit Exam"
          >
            <FaArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
