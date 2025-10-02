import { useNavigate } from 'react-router-dom'
import { usePendingTests } from '@/hooks/pendingTests/usePendingTests'
import PendingTestList from '@/components/pending/PendingTestList'
import NoPendingTests from '@/components/pending/NoPendingTests'

export default function PendingTestsPage() {
  const navigate = useNavigate()
  const { pendingTests, loading, deletePendingTest } = usePendingTests()

  const handleResume = (examId) => {
    navigate(`/exam/${examId}`)
  }

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
            Pending Tests
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Resume your incomplete exams
          </p>
        </div>
        {pendingTests.length === 0 ? (
          <NoPendingTests />
        ) : (
          <PendingTestList
            tests={pendingTests}
            onDelete={deletePendingTest}
            onResume={handleResume}
          />
        )}
      </div>
    </div>
  )
}
