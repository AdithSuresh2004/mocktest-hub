import { FaSortUp, FaSortDown } from 'react-icons/fa'

const FilterSelect = ({
  label,
  value,
  options,
  onChange,
  filterName,
}) => (
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
      onChange={(e) => onChange(filterName, e.target.value)}
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

export default function AttemptFilter({
  filters,
  filterOptions,
  handleFilterChange,
  sortOrder,
  toggleSort,
}) {
  return (
    <div className="mb-8 rounded-xl bg-white p-4 shadow-md dark:bg-gray-800">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        <FilterSelect
          label="Filter by Category"
          value={filters.category}
          options={filterOptions.categories}
          onChange={handleFilterChange}
          filterName="category"
        />
        <FilterSelect
          label="Filter by Subject"
          value={filters.subject}
          options={filterOptions.subjects}
          onChange={handleFilterChange}
          filterName="subject"
        />
        <FilterSelect
          label="Filter by Topic"
          value={filters.topic}
          options={filterOptions.topics}
          onChange={handleFilterChange}
          filterName="topic"
        />
        <div className="w-full sm:w-auto md:col-start-4 lg:col-start-5">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Sort by
          </label>
          <button
            onClick={() => toggleSort()}
            className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200 bg-blue-600 text-white`}
          >
            Score
            {sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />}
          </button>
        </div>
      </div>
    </div>
  )
}
