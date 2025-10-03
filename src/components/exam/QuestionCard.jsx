import { memo, useCallback } from 'react'
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'
import MathText from '@/components/common/MathText'

function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  sectionName,
  selected,
  onAnswer,
  markedForReview,
  onMarkForReview,
}) {
  const handleOptionSelect = useCallback(
    (optionId) => {
      if (onAnswer && question?.q_id) {
        onAnswer(question.q_id, optionId)
      }
    },
    [onAnswer, question?.q_id]
  )

  const handleMarkToggle = useCallback(() => {
    if (onMarkForReview && question?.q_id) {
      onMarkForReview(question.q_id)
    }
  }, [onMarkForReview, question?.q_id])

  if (!question) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">Loading question...</p>
      </div>
    )
  }

  return (
    <div 
      className="flex h-full flex-1 flex-col rounded-lg bg-white shadow-md dark:bg-gray-800"
      role="article"
      aria-labelledby="question-header"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-blue-50 p-4 dark:border-gray-700 dark:bg-gray-900">
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
          onClick={handleMarkToggle}
          title={markedForReview ? 'Marked for Review (Press M)' : 'Mark for Review (Press M)'}
          aria-label={markedForReview ? 'Remove review mark' : 'Mark for review'}
          aria-pressed={markedForReview}
          className="rounded-md p-2 text-gray-500 transition hover:bg-blue-100 hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:hover:bg-gray-700"
        >
          {markedForReview ? (
            <IoBookmark className="h-6 w-6 text-yellow-600 dark:text-yellow-500" aria-hidden="true" />
          ) : (
            <IoBookmarkOutline className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Question */}
      <div className="overflow-auto border-b border-gray-200 bg-blue-50 p-6 dark:border-gray-700 dark:bg-gray-900">
        <MathText 
          text={question.question_text}
          className="text-lg leading-relaxed text-gray-800 md:text-xl lg:text-2xl dark:text-gray-200"
        />
      </div>

      {/* Options */}
      <div 
        className="flex-1 space-y-4 overflow-auto bg-white p-6 dark:bg-gray-800"
        role="radiogroup"
        aria-labelledby="question-header"
      >
        {question.options.map((option, index) => {
          const isSelected = selected === option.opt_id
          const optionLabel = option.opt_id.toUpperCase()
          const keyboardShortcut = index < 4 ? ` (${index + 1})` : ''

          return (
            <label
              key={option.opt_id}
              className={`group block cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md dark:border-blue-400 dark:bg-blue-900/50'
                  : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:hover:border-blue-500 dark:hover:bg-gray-600'
              }`}
            >
              <input
                type="radio"
                name={`question-${question.q_id}`}
                value={option.opt_id}
                checked={isSelected}
                onChange={() => handleOptionSelect(option.opt_id)}
                aria-label={`Option ${optionLabel}: ${option.text}${keyboardShortcut}`}
                className="sr-only"
              />
              <div className="flex items-start gap-3">
                {/* Custom radio circle */}
                <div
                  className={`mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                      : 'border border-gray-400 group-hover:border-blue-400 dark:border-gray-600'
                  }`}
                  aria-hidden="true"
                >
                  {isSelected && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
                {/* Option text */}
                <div className="flex-1">
                  <MathText 
                    text={option.text}
                    className="text-base text-gray-800 sm:text-lg md:text-xl dark:text-gray-100"
                  />
                  {index < 4 && (
                    <span className="ml-1 text-xs text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-500">
                      {keyboardShortcut}
                    </span>
                  )}
                </div>
              </div>
            </label>
          )
        })}
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="border-t border-gray-200 bg-gray-50 px-6 py-2 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
        <span className="hidden sm:inline">💡 Tip: Use keys 1-4 to select, M to mark, ← → to navigate</span>
        <span className="sm:hidden">💡 Shortcuts available</span>
      </div>
    </div>
  )
}

export default memo(QuestionCard)
