import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import StatusDisplay from '@/components/common/StatusDisplay'
import ResultHeader from '@/components/result/ResultHeader'
import ResultScoreCards from '@/components/result/ResultScoreCards'
import ResultQuickOverview from '@/components/result/ResultQuickOverview'
import ResultSectionAnalysis from '@/components/result/ResultSectionAnalysis'
import ResultActions from '@/components/result/ResultActions'
import useResultAnalysis, {
  getPerformanceLevel,
} from '@/hooks/result/useResultAnalysis'

const ResultPage = () => {
  const { attemptId } = useParams()
  const navigate = useNavigate()
  const [showAnalysis, setShowAnalysis] = useState(false)
  const { loading, error, attempt, exam, analysis, totalMarks, actualScore } =
    useResultAnalysis(attemptId)

  if (loading) {
    return <LoadingSpinner fullScreen message="Finalizing your results..." />
  }

  if (error) {
    return (
      <StatusDisplay
        type="error"
        message={error}
        onRetry={() => window.location.reload()}
      />
    )
  }

  const percentage =
    totalMarks > 0 ? ((actualScore / totalMarks) * 100).toFixed(1) : 0
  const performance = getPerformanceLevel(percentage)

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div
        className="mx-auto max-w-5xl space-y-8"
      >
        <ResultHeader examName={exam.exam_name} />

        <ResultScoreCards
          actualScore={actualScore}
          totalMarks={totalMarks}
          percentage={percentage}
          timeTaken={attempt.time_taken || 0}
          performance={performance}
        />

        <ResultQuickOverview analysis={analysis} />

        <ResultActions
          showAnalysis={showAnalysis}
          onToggleAnalysis={() => setShowAnalysis(prev => !prev)}
          onNavigateHome={() => navigate('/')}
          onNavigateReview={() => navigate(`/review/${attemptId}`)}
        />

        <ResultSectionAnalysis
          analysis={analysis}
          showAnalysis={showAnalysis}
        />
      </div>
    </div>
  )
}

export default ResultPage
