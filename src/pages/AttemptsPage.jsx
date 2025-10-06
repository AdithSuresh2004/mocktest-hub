import { useState } from 'react'
import { useAttempts, useAttemptStats } from '@/hooks/attempts'
import AttemptStats from '@/components/attempts/AttemptStats'
import AttemptFilter from '@/components/attempts/AttemptFilter'
import AttemptList from '@/components/attempts/AttemptList'
import SkeletonLoader from '@/components/common/SkeletonLoader'
import PageHeader from '@/components/common/PageHeader'

export default function AttemptsPage() {
  const [showStats, setShowStats] = useState(false)
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
  const stats = useAttemptStats(originalAttempts)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 h-10 w-48 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SkeletonLoader type="stats" count={4} />
          </div>
          <SkeletonLoader type="list" count={3} />
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="Test Results"
          description="View your completed exam results"
        />
        <AttemptStats
          stats={stats}
          showDetails={showStats}
          onToggle={() => setShowStats((prev) => !prev)}
        />
        <AttemptFilter
          filters={filters}
          filterOptions={filterOptions}
          handleFilterChange={handleFilterChange}
          sortOrder={sortOrder}
          toggleSort={toggleSort}
          onResetFilters={resetFilters}
        />
        <AttemptList attempts={attempts} />
      </div>
    </div>
  )
}
