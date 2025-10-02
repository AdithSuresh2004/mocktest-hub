import { useState } from "react";
import { useAttempts, useAttemptStats } from "@/hooks/useAttempts";
import AttemptFilter from "@/components/attempts/AttemptFilter";
import AttemptList from "@/components/attempts/AttemptList";
import AttemptStats from "@/components/attempts/AttemptStats";

export default function AttemptsPage() {
  const [showStats, setShowStats] = useState(false);
  const {
    attempts,
    loading,
    sortBy,
    sortOrder,
    filterScore,
    setFilterScore,
    toggleSort,
    originalAttempts,
  } = useAttempts();
  const stats = useAttemptStats(originalAttempts);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Test Results</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">View your completed exam results</p>
        </div>

        <AttemptStats
          stats={stats}
          showStats={showStats}
          toggleStats={() => setShowStats(prev => !prev)}
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
  );
}