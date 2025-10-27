import { FaPlay, FaCalendar, FaClock, FaTrash } from 'react-icons/fa'
import { formatDate, formatTime } from '@/utils/formatters/formatters'
import Button from '@/components/common/Button'

export default function PendingTestList({ tests, onDelete, onResume }) {
  return (
    <div className="space-y-4">
      {tests.map((test) => (
        <div
          key={test.attempt_id}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {test.examName || test.exam_name || `Exam ${test.exam_id}`}
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <FaCalendar className="h-4 w-4" />
                  {formatDate(test.date || test.timestamp)}
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="h-4 w-4" />
                  {formatTime(test._timeRemainingSeconds)} remaining
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 sm:mt-0">
              <Button
                onClick={() => onResume(test.exam_id)}
                variant="primary"
                icon={FaPlay}
              >
                Resume
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(test.attempt_id)
                }}
                variant="danger"
                icon={FaTrash}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
