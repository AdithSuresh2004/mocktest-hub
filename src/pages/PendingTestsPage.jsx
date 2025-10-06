import { useNavigate } from 'react-router-dom'
import { usePendingTests } from '@/hooks/pendingTests/usePendingTests'
import PendingTestList from '@/components/pending/PendingTestList'
import NoPendingTests from '@/components/pending/NoPendingTests'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import PageHeader from '@/components/common/PageHeader'

export default function PendingTestsPage() {
  const navigate = useNavigate()
  const { pendingTests, loading, deletePendingTest } = usePendingTests()

  const handleResume = (examId) => {
    navigate(`/exam/${examId}`)
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }
  
  return (
    <div className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="Pending Tests"
          description="Resume your incomplete exams"
        />
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
