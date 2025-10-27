import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'

const QuestionHeader = ({
  questionNumber,
  totalQuestions,
  sectionName,
  markedForReview,
  onMarkForReview,
}) => (
  <div className="relative flex items-center justify-between border-b border-blue-100 bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/40 px-4 py-3 transition-[background-color,border-color] duration-300 dark:border-blue-900/30 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 sm:px-6 sm:py-4">
    <div className="flex-1">
      <div className="mb-1">
        <h3
          id="question-header"
          className="text-base font-bold text-gray-900 transition-colors sm:text-lg dark:text-white md:text-xl"
        >
          Question {questionNumber} of {totalQuestions}
        </h3>
      </div>
      <span className="text-xs font-medium text-gray-600 transition-colors sm:text-sm dark:text-gray-300">
        {sectionName}
      </span>
    </div>
    <button
      onClick={onMarkForReview}
      title={
        markedForReview
          ? 'Marked for Review (Press M)'
          : 'Mark for Review (Press M)'
      }
      aria-label={markedForReview ? 'Remove review mark' : 'Mark for review'}
      aria-pressed={markedForReview}
      className={`rounded-xl p-2.5 transition-all duration-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none ${
        markedForReview
          ? 'bg-yellow-100 text-yellow-600 shadow-sm hover:bg-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-400 dark:hover:bg-yellow-900/60'
          : 'text-gray-500 hover:bg-white/60 hover:text-yellow-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-yellow-400'
      }`}
    >
      {markedForReview ? (
        <IoBookmark className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
      ) : (
        <IoBookmarkOutline
          className="h-5 w-5 sm:h-6 sm:w-6"
          aria-hidden="true"
        />
      )}
    </button>
  </div>
)

export default QuestionHeader
