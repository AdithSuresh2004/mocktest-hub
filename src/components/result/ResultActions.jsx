import { FaChartPie, FaRedo, FaHome } from 'react-icons/fa'
import ResultCard from '@/components/result/ResultCard'

const ActionButton = ({
  icon: Icon,
  label,
  onClick,
  primary = false,
  className = '',
}) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center justify-center rounded-lg px-4 py-3 font-semibold transition-all duration-200 ${
      primary
        ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
    } ${className}`}
  >
    <Icon className="mr-2 h-5 w-5" />
    {label}
  </button>
)

const ResultActions = ({
  showAnalysis,
  onToggleAnalysis,
  onNavigateHome,
  onNavigateReview,
}) => {
  return (
    <ResultCard
      title="Next Steps"
      icon={FaChartPie}
      iconBgColor="bg-purple-100 dark:bg-purple-900/50"
      iconColor="text-purple-600 dark:text-purple-400"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ActionButton
          icon={FaRedo}
          label="Review Answers"
          onClick={onNavigateReview}
          primary
        />
        <ActionButton
          icon={FaChartPie}
          label={showAnalysis ? 'Hide Analysis' : 'Show Analysis'}
          onClick={onToggleAnalysis}
        />
        <ActionButton icon={FaHome} label="Go to Home" onClick={onNavigateHome} />
      </div>
    </ResultCard>
  )
}

export default ResultActions
