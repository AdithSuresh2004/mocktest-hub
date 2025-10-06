import { useEffect } from 'react'
import { useFocusTrap } from '@/hooks/common/useFocusTrap'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'

export default function SubmissionModal({
  answeredCount,
  totalQuestions,
  onConfirm,
  onCancel,
}) {
  const unansweredCount = totalQuestions - answeredCount
  const containerRef = useFocusTrap(true)
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onCancel()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onCancel])
  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="submit-modal-title"
    >
      <div
        ref={containerRef}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center">
          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
            <HiOutlineExclamationTriangle
              className="h-6 w-6 text-yellow-600 dark:text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <h3
            id="submit-modal-title"
            className="text-lg font-semibold text-gray-900 dark:text-gray-100"
          >
            Submit Exam?
          </h3>
        </div>
        <div className="mb-6">
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Are you sure you want to submit your exam? This action cannot be
            undone.
          </p>
          <div
            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            role="status"
            aria-live="polite"
          >
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div className="flex flex-col items-center">
                <span className="block text-2xl font-bold text-green-600 dark:text-green-400">
                  {answeredCount}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  Answered
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="block text-2xl font-bold text-red-600 dark:text-red-400">
                  {unansweredCount}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  Unanswered
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg bg-gray-200 px-4 py-3 font-medium text-gray-800 transition-colors hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            aria-label="Cancel submission and continue exam"
          >
            Continue Exam
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
            aria-label="Submit exam now"
            autoFocus
          >
            Submit Now
          </button>
        </div>
      </div>
    </div>
  )
}
