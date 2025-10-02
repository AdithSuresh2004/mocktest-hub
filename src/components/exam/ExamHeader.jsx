import { FaExpandArrowsAlt, FaArrowLeft, FaCompress } from 'react-icons/fa'
import ThemeToggle from '@/components/common/ThemeToggle'
import { useExamHeaderState } from '@/hooks/exam/useExamHeaderState'
import { formatTime } from '@/utils/helpers/examHelpers'
export default function ExamHeader({ exam, timeRemaining, onExit }) {
  const { isFullscreen, timeColorClass, toggleFullscreen } =
    useExamHeaderState(timeRemaining)
  return (
    <header className="z-10 border-b border-gray-200 bg-white px-4 py-2 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold text-gray-900 sm:text-xl dark:text-gray-100">
            {exam.exam_name}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`rounded-md px-2 py-1 font-mono text-lg font-bold ${timeColorClass}`}
          >
            {formatTime(timeRemaining)}
          </div>
          <button
            onClick={toggleFullscreen}
            className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <FaCompress className="h-5 w-5" />
            ) : (
              <FaExpandArrowsAlt className="h-5 w-5" />
            )}
          </button>
          <ThemeToggle />
          <button
            onClick={onExit}
            className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label="Exit exam"
          >
            <FaArrowLeft className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
