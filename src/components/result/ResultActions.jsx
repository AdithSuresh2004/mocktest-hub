import { useNavigate } from 'react-router-dom'

const ResultActions = ({ attemptId, onShowAnalysis, showAnalysis }) => {
  const navigate = useNavigate()

  return (
    <div className="rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-200 transition-all duration-200 hover:shadow-xl dark:bg-gray-800 dark:ring-gray-700">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
        <button
          onClick={() => navigate(`/review/${attemptId}`)}
          className="flex-1 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95 dark:bg-blue-700 dark:hover:bg-blue-600 sm:text-base"
        >
          📝 Review Answers
        </button>
        <button
          onClick={onShowAnalysis}
          className="flex-1 rounded-xl border-2 border-gray-200 bg-gray-50 px-6 py-4 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-100 hover:shadow-md active:scale-95 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 sm:text-base"
        >
          {showAnalysis ? '📊 Hide Analysis' : '📊 Show Analysis'}
        </button>
      </div>
    </div>
  )
}

export default ResultActions
