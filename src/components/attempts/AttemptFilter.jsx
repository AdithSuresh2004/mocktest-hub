import {
  FaSortUp,
  FaSortDown,
  FaFilter,
  FaUndoAlt,
  FaTimes,
} from 'react-icons/fa'
import FilterSelect from '@/components/common/FilterSelect'

const AttemptFilter = ({
  filters,
  filterOptions,
  handleFilterChange,
  sortOrder,
  toggleSort,
  onResetFilters,
}) => {
  const entries = []
  if (filters.category !== 'all') {
    entries.push({ label: 'Category', value: filters.category })
  }
  if (filters.subject !== 'all') {
    entries.push({ label: 'Subject', value: filters.subject })
  }
  if (filters.topic !== 'all') {
    entries.push({ label: 'Topic', value: filters.topic })
  }
  const activeFilters = entries
  
  const sortLabel = sortOrder === 'asc' ? 'Low to High' : 'High to Low'
  
  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Filter Results
          </h3>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              onClick={toggleSort}
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <span>Score: {sortLabel}</span>
              {sortOrder === 'asc' ? <FaSortUp className="h-3 w-3" /> : <FaSortDown className="h-3 w-3" />}
            </button>
            {activeFilters.length > 0 && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <FaUndoAlt className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <FilterSelect
            label="Category"
            value={filters.category}
            options={filterOptions.categories}
            onChange={handleFilterChange}
            filterName="category"
          />
          <FilterSelect
            label="Subject"
            value={filters.subject}
            options={filterOptions.subjects}
            onChange={handleFilterChange}
            filterName="subject"
          />
          <FilterSelect
            label="Topic"
            value={filters.topic}
            options={filterOptions.topics}
            onChange={handleFilterChange}
            filterName="topic"
          />
        </div>
        
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((item) => (
              <span
                key={`${item.label}-${item.value}`}
                className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-200"
              >
                {item.label}: {item.value}
                <button
                  onClick={() => handleFilterChange(item.label.toLowerCase(), 'all')}
                  className="ml-1 hover:text-blue-900 dark:hover:text-blue-100"
                >
                  <FaTimes className="h-2 w-2" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AttemptFilter
