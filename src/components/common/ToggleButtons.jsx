const ToggleButtons = ({
  options,
  value,
  onChange,
  className = '',
  size = 'sm',
}) => {
  const sizes = {
    sm: 'rounded-md px-3 py-1.5 text-sm',
    md: 'rounded-md px-4 py-2 text-sm',
    lg: 'rounded-lg px-6 py-2.5 text-base',
  }

  const sizeClass = sizes[size] || sizes.sm

  return (
    <div
      className={`inline-flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 ${className}`}
    >
      {options.map((option) => {
        const optionValue = typeof option === 'string' ? option : option.value
        const optionLabel = typeof option === 'string' ? option : option.label
        const isActive = value === optionValue

        return (
          <button
            key={optionValue}
            onClick={() => onChange(optionValue)}
            className={`font-medium transition-all ${sizeClass} ${
              isActive
                ? 'bg-white text-blue-700 shadow-sm dark:bg-gray-600 dark:text-blue-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
            }`}
          >
            {optionLabel}
          </button>
        )
      })}
    </div>
  )
}

export default ToggleButtons
