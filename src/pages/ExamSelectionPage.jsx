import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FaExclamationCircle,
  FaFileAlt,
  FaRedo,
  FaFilter,
  FaTimes,
  FaSearch,
  FaHome,
  FaBook,
  FaBullseye,
} from 'react-icons/fa'
import TestCard from '@/components/common/TestCard'
import SkeletonLoader from '@/components/common/SkeletonLoader'
import Pagination from '@/components/common/Pagination'
import { useExamSelection } from '@/hooks/examSelection/useExamSelection'
import { usePagination } from '@/hooks/common/usePagination'

const TEST_TYPE_ICONS = {
  all: FaHome,
  full_tests: FaFileAlt,
  subject_tests: FaBook,
  topic_tests: FaBullseye,
}

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

export default function ExamSelectionPage() {
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const {
    loading,
    error,
    allTests,
    activeTab,
    searchTerm,
    selectedExam,
    selectedTopic,
    selectedSubject,
    selectedStrength,
    selectedAttemptStatus,
    ATTEMPT_STATUSES,
    tabCounts,
    examNames,
    topics,
    subjects,
    STRENGTHS,
    filteredTests,
    hasActiveFilters,
    loadManifest,
    setActiveTab,
    setSearchTerm,
    handleFilterChange,
    clearAllFilters,
  } = useExamSelection()

  const pagination = usePagination(filteredTests, 12)

  useEffect(() => {
    pagination.resetPagination()
  }, [filteredTests.length, activeTab, searchTerm, selectedExam, selectedTopic, selectedSubject, selectedStrength, selectedAttemptStatus])

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters)
  }

  const handleClearFilters = () => {
    clearAllFilters()
    setShowMobileFilters(false)
  }

  if (loading) {
    return (
      <div className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 h-10 w-48 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="mb-6 h-12 w-full animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700"></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <SkeletonLoader type="card" count={8} />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-full items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-md px-4 text-center">
          <FaExclamationCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Oops! Something went wrong
          </h3>
          <p className="mb-6 text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={loadManifest}
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            <FaRedo className="mr-2 h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    )
  }
  if (!allTests.length) {
    return (
      <div className="flex min-h-full items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-md px-4 text-center">
          <FaFileAlt className="mx-auto mb-4 h-16 w-16 text-gray-400" />
          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            No Exams Available
          </h3>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            We're working hard to add more exams. Please check back later!
          </p>
          <button
            onClick={loadManifest}
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            <FaRedo className="mr-2 h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between md:justify-start">
              {tabCounts.map((type) => {
                const Icon = TEST_TYPE_ICONS[type.id]
                const isActive = activeTab === type.id
                return (
                  <button
                    key={type.id}
                    onClick={() => setActiveTab(type.id)}
                    className={`flex flex-1 items-center justify-center gap-2 border-b-2 px-4 py-4 text-center text-sm font-medium transition-all duration-200 md:flex-initial md:flex-grow ${
                      isActive
                        ? 'border-blue-600 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span
                      className={`overflow-hidden text-ellipsis whitespace-nowrap ${
                        isActive ? 'inline' : 'hidden md:inline'
                      }`}
                    >
                      {type.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
        <div className="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b border-gray-200 p-4 lg:hidden dark:border-gray-700">
            <button
              onClick={toggleMobileFilters}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="flex items-center font-medium text-gray-900 dark:text-gray-100">
                <FaFilter className="mr-2 h-5 w-5" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    Active
                  </span>
                )}
              </span>
              <FaTimes
                className={`h-5 w-5 transition-transform duration-200 ${
                  !showMobileFilters ? 'rotate-45' : ''
                }`}
              />
            </button>
          </div>
          <div
            className={`${showMobileFilters ? 'block' : 'hidden'} p-4 lg:block`}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-7">
              <div className="relative sm:col-span-2 lg:col-span-2">
                <FaSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="Search exams..."
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pr-4 pl-10 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <FilterSelect
                label="Exam"
                value={selectedExam}
                options={examNames}
                onChange={handleFilterChange}
              />
              <FilterSelect
                label="Subject"
                value={selectedSubject}
                options={subjects}
                onChange={handleFilterChange}
              />
              <FilterSelect
                label="Topic"
                value={selectedTopic}
                options={topics}
                onChange={handleFilterChange}
              />
              <FilterSelect
                label="Strength"
                value={selectedStrength}
                options={STRENGTHS}
                onChange={handleFilterChange}
              />
              <FilterSelect
                label="Attempt Status"
                value={selectedAttemptStatus}
                options={ATTEMPT_STATUSES}
                onChange={handleFilterChange}
              />
            </div>
            {hasActiveFilters && (
              <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center px-4 py-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  <FaTimes className="mr-2 h-4 w-4" />
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {filteredTests.length === 0 ? (
              'No tests found'
            ) : (
              <>
                Showing{' '}
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {filteredTests.length}
                </span>
                {filteredTests.length !== allTests.length && (
                  <>
                    {' '}
                    of <span className="font-semibold">{allTests.length}</span>
                  </>
                )}{' '}
                tests
              </>
            )}
          </p>
        </div>
        {filteredTests.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white py-16 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <FaSearch className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
              No tests match your criteria
            </h3>
            <p className="mx-auto mb-6 max-w-md text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or filters to find the perfect
              practice test for you.
            </p>
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              <FaRedo className="mr-2 h-4 w-4" />
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {pagination.paginatedItems.map((test) => (
                <TestCard
                  key={
                    test.uid || test.exam_id || `${test.type}-${test.exam_name}`
                  }
                  test={test}
                  selectedTopic={
                    selectedTopic !== 'All Topics' ? selectedTopic : undefined
                  }
                  selectedSubject={
                    selectedSubject !== 'All Subjects'
                      ? selectedSubject
                      : undefined
                  }
                />
              ))}
            </div>
            {pagination.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  totalItems={pagination.totalItems}
                  pageSize={pagination.pageSize}
                  startIndex={pagination.startIndex}
                  endIndex={pagination.endIndex}
                  onPageChange={pagination.goToPage}
                  onPageSizeChange={pagination.changePageSize}
                  hasNextPage={pagination.hasNextPage}
                  hasPrevPage={pagination.hasPrevPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
