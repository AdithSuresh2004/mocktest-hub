import { useNavigate } from "react-router-dom";
import { FaClock, FaPlay, FaTrash, FaCalendar } from "react-icons/fa";
import { formatTime } from "@/utils/helpers/examHelpers";
import { formatDate } from "@/utils/formatters/formatters";

export default function PendingTestList({ tests, onDelete, onResume }) {
  return (
    <div className="space-y-4">
      {tests.map((test) => (
        <div
          key={test.attempt_id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {test.exam_name || `Exam ${test.exam_id}`}
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <FaCalendar className="w-4 h-4" />
                  {formatDate(test.timestamp)}
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="w-4 h-4" />
                  {formatTime(test.time_remaining)} remaining
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button
                onClick={() => onResume(test.exam_id)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm"
              >
                <FaPlay />
                Resume
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(test.attempt_id);
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors text-sm"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
