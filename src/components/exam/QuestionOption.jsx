import FormattedContent from '@/components/common/FormattedContent'

const QuestionOption = ({
  option,
  optionId,
  isSelected,
  onSelect,
  questionId,
  index,
}) => {
  const optionLabel = optionId.toUpperCase()
  const keyboardShortcut = index < 4 ? ` (${index + 1})` : ''

  return (
    <label
      className={`group block cursor-pointer rounded-xl border-2 p-4 transition-[border-color,background-color,box-shadow] duration-300 ${
        isSelected
          ? 'border-blue-600 bg-blue-50 shadow-lg dark:border-blue-500 dark:bg-blue-950/50 dark:shadow-xl'
          : 'border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600 dark:hover:bg-gray-800'
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
          className={`mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isSelected
              ? 'border-blue-500 bg-blue-500 ring-4 ring-blue-100 shadow-sm dark:ring-blue-900/50'
              : 'border-2 border-gray-300 group-hover:border-blue-400 dark:border-gray-500'
          }`}
          aria-hidden="true"
        >
          {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-white" />}
        </div>
        <div className="flex-1">
          <FormattedContent
            text={option.text}
            className="text-sm text-gray-900 transition-colors sm:text-base dark:text-gray-50"
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
            <span className="ml-1 text-xs text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-400">
              {keyboardShortcut}
            </span>
          )}
        </div>
      </div>
    </label>
  )
}

export default QuestionOption
