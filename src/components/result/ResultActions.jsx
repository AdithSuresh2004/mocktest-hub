import { FaChartBar, FaHome } from 'react-icons/fa'

const ResultActions = ({ showAnalysis, onToggleAnalysis, onNavigateHome, onNavigateReview, attemptId }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-between rounded-2xl bg-white p-6 shadow-lg sm:flex-row sm:p-8 dark:bg-gray-800">
        <div className="mb-4 text-center sm:mb-0 sm:text-left">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Review Your Answers
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Check your responses and see detailed explanations.
          </p>
        </div>
        <button
          onClick={() => onNavigateReview(attemptId)}
          className="transform rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Review Answers
        </button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={onToggleAnalysis}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700"
        >
          <FaChartBar className="h-5 w-5" />
          {showAnalysis ? 'Hide Analysis' : 'View Detailed Analysis'}
        </button>
        <button
          onClick={onNavigateHome}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-200 px-6 py-4 font-semibold text-gray-800 shadow-md transition-all duration-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          <FaHome className="h-5 w-5" />
          Back to Home
        </button>
      </div>
    </>
  )
}

export default ResultActions
