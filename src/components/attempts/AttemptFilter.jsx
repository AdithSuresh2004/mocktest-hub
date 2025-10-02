import { FaSort, FaSortUp, FaSortDown, FaFilter } from 'react-icons/fa'

export default function AttemptFilter({
  filterScore,
  setFilterScore,
  sortBy,
  sortOrder,
  toggleSort,
}) {
  const sortIcon =
    sortBy === 'score' ? (
      sortOrder === 'asc' ? (
        <FaSortUp />
      ) : (
        <FaSortDown />
      )
    ) : (
      <FaSort />
    )

  return (
    <div className="mb-8 flex flex-col items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-md sm:flex-row dark:bg-gray-800">
      <div className="flex w-full items-center gap-4 sm:w-auto">
        <label
          htmlFor="score-filter"
          className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          <FaFilter className="text-gray-500" />
          Filter by Score:
        </label>
        <input
          id="score-filter"
          type="range"
          min="0"
          max="100"
          value={filterScore}
          onChange={(e) => setFilterScore(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 sm:w-48 dark:bg-gray-700"
        />
        <span className="w-12 text-center font-semibold text-gray-900 dark:text-gray-100">
          {filterScore}%
        </span>
      </div>

      <div className="flex w-full gap-2 sm:w-auto">
        <button
          onClick={() => toggleSort('date')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 sm:flex-initial ${
            sortBy === 'date'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Sort by Date
          {sortBy === 'date' &&
            (sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />)}
        </button>
        <button
          onClick={() => toggleSort('score')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 sm:flex-initial ${
            sortBy === 'score'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Sort by Score
          {sortIcon}
        </button>
      </div>
    </div>
  )
}
