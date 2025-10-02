// QuestionCard.jsx
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  sectionName,
  selected,
  onAnswer,
  markedForReview,
  onMarkForReview,
}) {
  return (
    <div className="flex h-full flex-1 flex-col rounded-lg bg-white shadow-md dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 sm:text-xl md:text-2xl dark:text-gray-100">
            Q{questionNumber} of {totalQuestions}
          </h3>
          <span className="text-sm text-gray-500 sm:text-base dark:text-gray-400">
            {sectionName}
          </span>
        </div>
        <button
          onClick={onMarkForReview}
          title={markedForReview ? 'Marked for Review' : 'Mark for Review'}
          className="rounded-md p-2 text-gray-500 transition hover:text-yellow-500"
        >
          {markedForReview ? (
            <IoBookmark className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
          ) : (
            <IoBookmarkOutline className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Question */}
      <div className="overflow-auto border-b border-gray-200 p-6 dark:border-gray-700">
        <p className="text-lg leading-relaxed whitespace-pre-wrap text-gray-800 md:text-xl lg:text-2xl dark:text-gray-200">
          {question.question_text}
        </p>
      </div>

      {/* Options */}
      <div className="flex-1 space-y-4 overflow-auto p-6">
        {question.options.map((option) => (
          <label
            key={option.opt_id}
            className={`block cursor-pointer rounded-lg border p-4 transition-all ${
              selected === option.opt_id
                ? 'border-blue-500 bg-blue-50 shadow-sm dark:bg-blue-900/40'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800/50'
            }`}
          >
            <input
              type="radio"
              name={`question-${question.q_id}`}
              value={option.opt_id}
              checked={selected === option.opt_id}
              onChange={() => onAnswer(question.q_id, option.opt_id)}
              className="sr-only"
            />
            <div className="flex items-start gap-3">
              {/* Custom radio circle */}
              <div
                className={`mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                  selected === option.opt_id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border border-gray-400 dark:border-gray-600'
                }`}
              >
                {selected === option.opt_id && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>
              {/* Option text */}
              <span className="text-base text-gray-800 sm:text-lg md:text-xl dark:text-gray-100">
                {option.text}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
