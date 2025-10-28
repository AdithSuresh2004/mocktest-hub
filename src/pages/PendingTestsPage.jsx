import { useNavigate } from 'react-router-dom'
import { usePendingTests } from '@/hooks/pendingTests/usePendingTests'
import PendingTestList from '@/components/pending/PendingTestList'
import NoPendingTests from '@/components/pending/NoPendingTests'
import PendingTestsSkeleton from '@/components/common/skeletons/PendingTestsSkeleton'
import PageHeader from '@/components/common/PageHeader'

export default function PendingTestsPage() {
  const navigate = useNavigate()
  const { pendingTests, loading, deletePendingTest } = usePendingTests()

  const handleResume = (examId) => {
    navigate(`/exam/${examId}`)
  }

  if (loading) {
    return <PendingTestsSkeleton />
  }

  return (
    <div className="min-h-full animate-fadeIn bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900 flex flex-col">
      <div className="mx-auto max-w-7xl w-full">
        <PageHeader
          title="Pending Tests"
          description="Resume your incomplete exams"
        />
      </div>
      <div className="mt-8 flex-1 w-full max-w-7xl mx-auto">
        {pendingTests.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <NoPendingTests />
          </div>
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
