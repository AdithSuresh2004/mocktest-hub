const FilterSelect = ({ label, value, options, onChange, filterName }) => {
  return (
    <div className="w-full sm:w-auto">
      <label
        htmlFor={`${filterName}-filter`}
        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <select
        id={`${filterName}-filter`}
        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
        value={value}
        onChange={(event) => onChange(filterName, event.target.value)}
      >
        {options.map((option) => (
          <option
            key={option.value || option}
            value={option.value || option}
            className="text-ellipsis"
          >
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterSelect
