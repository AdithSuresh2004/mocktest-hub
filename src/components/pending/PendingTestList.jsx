import { FaClock, FaPlay, FaTrash, FaCalendar } from 'react-icons/fa'
import { formatTime } from '@/utils/helpers/examHelpers'
import { formatDate } from '@/utils/formatters/formatters'

export default function PendingTestList({ tests, onDelete, onResume }) {
  return (
    <div className="space-y-4">
      {tests.map((test) => (
        <div
          key={test.id || test.attempt_id}
          className="p-6 transition-shadow border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {test.examName || test.exam_name || `Exam ${test.exam_id}`}
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <FaCalendar className="w-4 h-4" />
                  {formatDate(test.date || test.timestamp)}
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="w-4 h-4" />
                  {formatTime(test._timeRemainingSeconds)} remaining
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button
                onClick={() => onResume(test.exam_id)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <FaPlay />
                Resume
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(test.id || test.attempt_id)
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
