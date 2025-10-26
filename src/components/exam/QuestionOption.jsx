import FormattedContent from '@/components/common/FormattedContent'

const QuestionOption = ({
  option,
  optionId,
  isSelected,
  onSelect,
  questionId,
  index
}) => {
  const optionLabel = optionId.toUpperCase()
  const keyboardShortcut = index < 4 ? ` (${index + 1})` : ''

  return (
    <label
      className={`group block cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md dark:border-blue-400 dark:bg-blue-900/50'
          : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:hover:border-blue-500 dark:hover:bg-gray-600'
      }`}
    >
      <input
        type="radio"
        name={`question-${questionId}`}
        value={optionId}
        checked={isSelected}
        onChange={() => onSelect(optionId)}
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
}

export default QuestionOption
