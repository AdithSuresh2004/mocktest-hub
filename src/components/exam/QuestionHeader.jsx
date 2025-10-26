import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'

const QuestionHeader = ({
  questionNumber,
  totalQuestions,
  sectionName,
  markedForReview,
  onMarkForReview
}) => (
  <div className="flex items-center justify-between border-b border-gray-200 bg-blue-50 p-4 transition-colors duration-200 dark:border-gray-700 dark:bg-gray-900">
    <div>
      <h3
        id="question-header"
        className="text-lg font-semibold text-gray-900 sm:text-xl md:text-2xl dark:text-gray-100"
      >
        Q{questionNumber} of {totalQuestions}
      </h3>
      <span className="text-sm text-gray-500 sm:text-base dark:text-gray-400">
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
      aria-label={
        markedForReview ? 'Remove review mark' : 'Mark for review'
      }
      aria-pressed={markedForReview}
      className="rounded-md p-2 text-gray-500 transition hover:bg-blue-100 hover:text-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none dark:hover:bg-gray-700"
    >
      {markedForReview ? (
        <IoBookmark
          className="h-6 w-6 text-yellow-600 dark:text-yellow-500"
          aria-hidden="true"
        />
      ) : (
        <IoBookmarkOutline className="h-6 w-6" aria-hidden="true" />
      )}
    </button>
  </div>
)

export default QuestionHeader
