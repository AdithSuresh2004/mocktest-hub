import { forwardRef } from 'react'

const FilterSelect = forwardRef(
  (
    { label, value, options, onChange, filterName, className = '', ...props },
    ref
  ) => {
    const handleChange = (e) => {
      const newValue = e.target.value
      if (filterName) {
        onChange(filterName, newValue)
      } else {
        onChange(newValue)
      }
    }

    return (
      <div className={`w-full sm:w-auto ${className}`}>
        {label && (
          <label
            htmlFor={filterName ? `${filterName}-filter` : 'filter-select'}
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={filterName ? `${filterName}-filter` : 'filter-select'}
          className={`w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 ${
            !label ? 'w-full sm:w-auto' : ''
          }`}
          value={value}
          onChange={handleChange}
          {...props}
        >
          {options.map((option) => {
            const optionValue = option.value ?? option
            const optionLabel = option.label ?? option

            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
)

FilterSelect.displayName = 'FilterSelect'

export default FilterSelect
