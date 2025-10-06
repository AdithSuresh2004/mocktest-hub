import { memo, useCallback, useMemo } from 'react'
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'
import FormattedContent from '@/components/common/FormattedContent'

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
  const questionId = useMemo(() => question?.q_id, [question?.q_id])
  const handleOptionSelect = useCallback(
    (optionId) => {
      if (onAnswer && questionId) {
        onAnswer(questionId, optionId)
      }
    },
    [onAnswer, questionId]
  )
  const handleMarkToggle = useCallback(() => {
    if (onMarkForReview && questionId) {
      onMarkForReview(questionId)
    }
  }, [onMarkForReview, questionId])
  if (!question) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">Loading question...</p>
      </div>
    )
  }
  return (
    <div
      className="flex min-h-full flex-col rounded-lg bg-white shadow-md dark:bg-gray-800"
      role="article"
      aria-labelledby="question-header"
    >
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
      <div className="border-b border-gray-200 bg-blue-50 p-6 dark:border-gray-700 dark:bg-gray-900">
        <FormattedContent
          text={question.question_text}
          className="text-base leading-relaxed text-gray-800 md:text-lg dark:text-gray-200"
        />
        {(question.image || question.image_url || question.question_image) && (
          <div className="mt-4">
            <img
              src={
                question.image || question.image_url || question.question_image
              }
              alt="Question illustration"
              className="h-auto max-w-full rounded-lg border border-gray-300 dark:border-gray-600"
              draggable={false}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
        )}
      </div>
      <div
        className="space-y-4 bg-white p-6 dark:bg-gray-800"
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
                name={`question-${questionId}`}
                value={option.opt_id}
                checked={isSelected}
                onChange={() => handleOptionSelect(option.opt_id)}
                aria-label={`Option ${optionLabel}: ${option.text}${keyboardShortcut}`}
                className="sr-only"
              />
              <div className="flex items-start gap-3">
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
                <div className="flex-1">
                  <FormattedContent
                    text={option.text}
                    className="text-sm text-gray-800 sm:text-base dark:text-gray-100"
                  />
                  {(option.image || option.image_url) && (
                    <div className="mt-2">
                      <img
                        src={option.image || option.image_url}
                        alt={`Option ${optionLabel} illustration`}
                        className="h-auto max-w-full rounded border border-gray-300 dark:border-gray-600"
                        draggable={false}
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                  {index < 4 && (
                    <span className="ml-1 text-xs text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-300">
                      {keyboardShortcut}
                    </span>
                  )}
                </div>
              </div>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default memo(QuestionCard)
