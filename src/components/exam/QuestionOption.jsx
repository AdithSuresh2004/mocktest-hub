import FormattedContent from '@/components/common/FormattedContent'

const QuestionOption = ({
  option,
  optionId,
  isSelected,
  onSelect,
  questionId,
  index,
}) => {
  const optionLabel = String.fromCharCode(65 + index)
  const keyboardShortcut = index < 4 ? ` (${index + 1})` : ''

  return (
    <label
      className={`group block cursor-pointer rounded-lg border p-4 transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 bg-blue-100 shadow-md dark:border-blue-400 dark:bg-blue-900/50'
          : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
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
      <div className="flex items-start gap-4">
        <div
          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 font-bold transition-all duration-200 ${
            isSelected
              ? 'border-blue-500 bg-blue-500 text-white'
              : 'border-gray-400 text-gray-500 group-hover:border-blue-500 group-hover:text-blue-500 dark:border-gray-600 dark:text-gray-400'
          }`}
          aria-hidden="true"
        >
          {optionLabel}
        </div>
        <div className="flex-1">
          <FormattedContent
            text={option.text}
            className="text-base text-gray-800 dark:text-gray-200"
          />
          {(option.image || option.image_url) && (
            <div className="mt-3">
              <img
                src={option.image || option.image_url}
                alt={`Option ${optionLabel} illustration`}
                className="h-auto max-w-full rounded-md border border-gray-300 dark:border-gray-600"
                draggable={false}
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
          )}
          {index < 4 && (
            <span className="absolute top-2 right-2 text-xs text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-500">
              {keyboardShortcut}
            </span>
          )}
        </div>
      </div>
    </label>
  )
}

export default QuestionOption
