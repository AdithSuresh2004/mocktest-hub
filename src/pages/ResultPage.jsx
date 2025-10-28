import { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useResultAnalysis from '@/hooks/result/useResultAnalysis'
import ResultHeader from '@/components/result/ResultHeader'
import ResultScoreCards from '@/components/result/ResultScoreCards'
import ResultQuickOverview from '@/components/result/ResultQuickOverview'
import ResultSectionAnalysis from '@/components/result/ResultSectionAnalysis'
import ResultActions from '@/components/result/ResultActions'
import FullPageSkeleton from '@/components/common/skeletons/FullPageSkeleton'
import StatusDisplay from '@/components/common/StatusDisplay'
import { getPerformanceLevel } from '@/utils/calculations/scoreCalculations'

export default function ResultPage() {
  const { attemptId } = useParams()
  const { attempt, exam, analysis, loading, error } =
    useResultAnalysis(attemptId)
  const analysisRef = useRef(null)
  const [showAnalysis, setShowAnalysis] = useState(true)

  const handleScrollToAnalysis = () => {
    const newShowAnalysis = !showAnalysis
    setShowAnalysis(newShowAnalysis)
    if (newShowAnalysis) {
      setTimeout(() => {
        analysisRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  if (loading) {
    return <FullPageSkeleton />
  }

  if (error) {
    return <StatusDisplay type="error" message={error} fullScreen />
  }

  if (!attempt || !exam || !analysis) {
    return (
      <StatusDisplay
        type="error"
        message="Attempt data could not be loaded."
        fullScreen
      />
    )
  }

  const enrichedAnalysis = {
    ...analysis,
    overall: {
      ...analysis.overall,
      percentage: Math.round(analysis.overall.percentage),
      ...getPerformanceLevel(analysis.overall.percentage),
    },
    score: {
      ...analysis.score,
      ...getPerformanceLevel(
        (analysis.score.actual / analysis.score.total) * 100
      ),
    },
    accuracy: {
      ...analysis.accuracy,
      percentage: Math.round(analysis.accuracy.percentage),
      ...getPerformanceLevel(analysis.accuracy.percentage),
    },
    speed: {
      ...analysis.speed,
      text: 'Good',
      color: 'text-green-600 dark:text-green-400',
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <ResultHeader examName={exam.name} />
      <main className="pt-4 pb-8 sm:pb-12 lg:pb-16">
        <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-6xl lg:px-8">
          <div className="space-y-6 sm:space-y-8">
            <ResultScoreCards analysis={enrichedAnalysis} />
            <ResultQuickOverview attempt={attempt} exam={exam} analysis={analysis} />
            <ResultActions
              attemptId={attemptId}
              onShowAnalysis={handleScrollToAnalysis}
              showAnalysis={showAnalysis}
            />
            <div ref={analysisRef}>
              <ResultSectionAnalysis
                analysis={analysis}
                showAnalysis={showAnalysis}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
