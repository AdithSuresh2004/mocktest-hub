const FilterSelect = ({ label, value, options, onChange }) => (
  <select
    className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
    value={value}
    onChange={(e) => onChange(label, e.target.value)}
  >
    {options.map((option) => (
      <option key={option.value || option} value={option.value || option}>
        {option.label || option}
      </option>
    ))}
  </select>
)

export default FilterSelect
