import ResultPerformanceSummary from './ResultPerformanceSummary'
import ResultTestDetails from './ResultTestDetails'

const ResultQuickOverview = ({ attempt, exam, analysis }) => {
  if (!analysis || !attempt || !exam) return null

  return (
    <div className="space-y-6">
      <ResultPerformanceSummary analysis={analysis} />
      <ResultTestDetails attempt={attempt} exam={exam} analysis={analysis} />
    </div>
  )
}

export default ResultQuickOverview
