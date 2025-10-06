import { memo, useMemo } from 'react'
import { FaSortUp, FaSortDown, FaFilter, FaUndoAlt } from 'react-icons/fa'
import FilterSelect from '@/components/attempts/FilterSelect'

function AttemptFilter({
  filters,
  filterOptions,
  handleFilterChange,
  sortOrder,
  toggleSort,
  onResetFilters,
}) {
  const activeFilters = useMemo(() => {
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
    return entries
  }, [filters])
  const sortLabel = sortOrder === 'asc' ? 'Score: Low → High' : 'Score: High → Low'
  return (
    <section className="mb-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <FaFilter className="text-blue-500" /> Refine attempts
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Narrow down your results by exam category, subject, or topic and adjust the score ordering.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onResetFilters}
            disabled={activeFilters.length === 0}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
              activeFilters.length === 0
                ? 'cursor-not-allowed border-gray-200 text-gray-400 dark:border-gray-700 dark:text-gray-600'
                : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 dark:border-gray-600 dark:text-gray-200 dark:hover:border-blue-400 dark:hover:text-blue-300'
            }`}
          >
            <FaUndoAlt /> Reset filters
          </button>
          <button
            onClick={toggleSort}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {sortLabel}
            {sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />}
          </button>
        </div>
      </div>
      {activeFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {activeFilters.map((item) => (
            <span
              key={`${item.label}-${item.value}`}
              className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-200"
            >
              {item.label}: {item.value}
            </span>
          ))}
        </div>
      )}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
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
      </div>
    </section>
  )
}

export default memo(AttemptFilter)
