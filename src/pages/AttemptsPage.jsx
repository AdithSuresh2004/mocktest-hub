import { useState } from 'react'
import { useAttempts, useAttemptStats } from '@/hooks/attempts'
import AttemptFilter from '@/components/attempts/AttemptFilter'
import AttemptList from '@/components/attempts/AttemptList'
import AttemptStats from '@/components/attempts/AttemptStats'
import SkeletonLoader from '@/components/common/SkeletonLoader'

export default function AttemptsPage() {
  const [showStats, setShowStats] = useState(false)
  const {
    attempts,
    loading,
    sortBy,
    sortOrder,
    filters,
    filterOptions,
    handleFilterChange,
    toggleSort,
    originalAttempts,
  } = useAttempts()
  const stats = useAttemptStats(originalAttempts)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 h-10 w-48 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SkeletonLoader type="stats" count={1} />
          </div>
          <SkeletonLoader type="list" count={1} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Test Results
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            View your completed exam results
          </p>
        </div>

        <AttemptStats
          stats={stats}
          showStats={showStats}
          toggleStats={() => setShowStats((prev) => !prev)}
        />

        <AttemptFilter
          filters={filters}
          filterOptions={filterOptions}
          handleFilterChange={handleFilterChange}
          sortBy={sortBy}
          sortOrder={sortOrder}
          toggleSort={toggleSort}
        />

        <AttemptList attempts={attempts} />
      </div>
    </div>
  )
}
