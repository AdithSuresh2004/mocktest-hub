import { useState, useEffect } from 'react'
import TestCard from '@/components/common/TestCard'
import SkeletonLoader from '@/components/common/SkeletonLoader'
import Pagination from '@/components/common/Pagination'
import ErrorDisplay from '@/components/common/ErrorDisplay'
import EmptyState from '@/components/common/EmptyState'
import ExamTabs from '@/components/examSelection/ExamTabs'
import ExamFilters from '@/components/examSelection/ExamFilters'
import ExamStats from '@/components/examSelection/ExamStats'
import { useExamSelection } from '@/hooks/examSelection/useExamSelection'
import { usePagination } from '@/hooks/common/usePagination'
import { FaSearch } from 'react-icons/fa'

const ExamSelectionPage = () => {
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
  }, [
    filteredTests.length,
    activeTab,
    searchTerm,
    selectedExam,
    selectedTopic,
    selectedSubject,
    selectedStrength,
    selectedAttemptStatus,
    pagination,
  ])

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
    return <ErrorDisplay message={error} onAction={loadManifest} />
  }
  
  if (!allTests.length) {
    return (
      <EmptyState
        title="No Exams Available"
        message="We're working hard to add more exams. Please check back later!"
        actionLabel="Refresh"
        onAction={loadManifest}
      />
    )
  }
  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ExamTabs 
          tabCounts={tabCounts}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <ExamFilters
          showMobileFilters={showMobileFilters}
          hasActiveFilters={hasActiveFilters}
          searchTerm={searchTerm}
          selectedExam={selectedExam}
          selectedTopic={selectedTopic}
          selectedSubject={selectedSubject}
          selectedStrength={selectedStrength}
          selectedAttemptStatus={selectedAttemptStatus}
          examNames={examNames}
          topics={topics}
          subjects={subjects}
          STRENGTHS={STRENGTHS}
          ATTEMPT_STATUSES={ATTEMPT_STATUSES}
          onToggleMobileFilters={toggleMobileFilters}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
        
        <div className="mb-6 flex items-center justify-between">
          <ExamStats filteredTests={filteredTests} allTests={allTests} />
        </div>
        {filteredTests.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white py-16 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <EmptyState
              icon={FaSearch}
              title="No tests match your criteria"
              message="Try adjusting your search terms or filters to find the perfect practice test for you."
              actionLabel="Clear All Filters"
              onAction={handleClearFilters}
              className="py-8"
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
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

export default ExamSelectionPage
