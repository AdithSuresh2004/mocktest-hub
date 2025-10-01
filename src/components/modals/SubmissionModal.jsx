import { HiOutlineExclamationTriangle } from "react-icons/hi2";
export default function SubmissionModal({
  answeredCount,
  totalQuestions,
  onConfirm,
  onCancel,
}) {
  const unansweredCount = totalQuestions - answeredCount;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-3">
            <HiOutlineExclamationTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Submit Exam?
          </h3>
        </div>
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Are you sure you want to submit your exam? This action cannot be
            undone.
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
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
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-3 rounded-lg font-medium transition-colors"
          >
            Continue Exam
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            Submit Now
          </button>
        </div>
      </div>
    </div>
  );
}