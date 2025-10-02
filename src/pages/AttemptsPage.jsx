import { useState } from 'react'
import { useAttempts, useAttemptStats } from '@/hooks/attempts'
import AttemptFilter from '@/components/attempts/AttemptFilter'
import AttemptList from '@/components/attempts/AttemptList'
import AttemptStats from '@/components/attempts/AttemptStats'

export default function AttemptsPage() {
  const [showStats, setShowStats] = useState(false)
  const {
    attempts,
    loading,
    sortBy,
    sortOrder,
    filterScore,
    setFilterScore,
    toggleSort,
    originalAttempts,
  } = useAttempts()
  const stats = useAttemptStats(originalAttempts)

  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
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
          filterScore={filterScore}
          setFilterScore={setFilterScore}
          sortBy={sortBy}
          sortOrder={sortOrder}
          toggleSort={toggleSort}
          originalAttempts={originalAttempts}
        />

        <AttemptList attempts={attempts} />
      </div>
    </div>
  )
}
