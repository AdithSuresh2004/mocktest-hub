import { useAttempts } from '@/hooks/attempts'
import { calculateAttemptStats } from '@/utils/calculations/attemptStats'
import AttemptStats from '@/components/attempts/AttemptStats'
import AttemptFilter from '@/components/attempts/AttemptFilter'
import AttemptList from '@/components/attempts/AttemptList'
import AttemptsSkeleton from '@/components/common/skeletons/AttemptsSkeleton'
import PageHeader from '@/components/common/PageHeader'
import Pagination from '@/components/common/Pagination'
import { usePagination } from '@/hooks/common/usePagination'

const AttemptsPage = () => {
  const {
    attempts,
    loading,
    sortOrder,
    filters,
    filterOptions,
    handleFilterChange,
    toggleSort,
    originalAttempts,
    resetFilters,
  } = useAttempts()
  const stats = calculateAttemptStats(originalAttempts)
  const pagination = usePagination(attempts, 10)

  if (loading) {
    return <AttemptsSkeleton />
  }

  return (
    <div className="min-h-full animate-fadeIn bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="Test Results"
          description="View your completed exam results"
        />
        <div className="mt-8">
          <AttemptStats stats={stats} />
        </div>
        <div className="mt-8">
          <AttemptFilter
            filters={filters}
            filterOptions={filterOptions}
            handleFilterChange={handleFilterChange}
            sortOrder={sortOrder}
            toggleSort={toggleSort}
            onResetFilters={resetFilters}
          />
        </div>
        <div className="mt-8">
          <AttemptList attempts={pagination.paginatedItems} />
        </div>
        {pagination.totalPages > 1 && (
          <div className="mt-8">
            <Pagination {...pagination} pageSizeOptions={[10, 20, 30, 50]} />
          </div>
        )}
      </div>
    </div>
  )
}

export default AttemptsPage
