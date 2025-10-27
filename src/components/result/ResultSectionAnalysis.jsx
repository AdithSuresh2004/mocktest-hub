import { FaBookOpen } from 'react-icons/fa'
import ResultCard from '@/components/result/ResultCard'

const SectionRow = ({ section }) => {
  const accuracyColor =
    section.accuracy >= 75
      ? 'bg-green-500'
      : section.accuracy >= 50
      ? 'bg-yellow-500'
      : 'bg-red-500'

  const accuracyTextColor =
    section.accuracy >= 75
      ? 'text-green-600 dark:text-green-400'
      : section.accuracy >= 50
      ? 'text-yellow-600 dark:text-yellow-400'
      : 'text-red-600 dark:text-red-400'

  return (
    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50 sm:p-4">
      <div className="mb-3">
        <div className="mb-1.5 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800 sm:text-base dark:text-gray-100">
            {section.sectionName}
          </h3>
          <span className={`text-xs font-bold sm:text-sm ${accuracyTextColor}`}>
            {section.accuracy}%
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
          <div
            className={`h-2 rounded-full ${accuracyColor}`}
            style={{ width: `${section.accuracy}%` }}
          ></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-2 text-center sm:grid-cols-4 sm:gap-0">
        <div>
          <p className="text-[0.65rem] text-gray-500 sm:text-xs dark:text-gray-400">Correct</p>
          <p className="text-sm font-semibold text-green-600 sm:text-base dark:text-green-400">
            {section.correct}
          </p>
        </div>
        <div>
          <p className="text-[0.65rem] text-gray-500 sm:text-xs dark:text-gray-400">Incorrect</p>
          <p className="text-sm font-semibold text-red-600 sm:text-base dark:text-red-400">
            {section.incorrect}
          </p>
        </div>
        <div>
          <p className="text-[0.65rem] text-gray-500 sm:text-xs dark:text-gray-400">Unanswered</p>
          <p className="text-sm font-semibold text-gray-600 sm:text-base dark:text-gray-300">
            {section.unanswered}
          </p>
        </div>
        <div>
          <p className="text-[0.65rem] text-gray-500 sm:text-xs dark:text-gray-400">Total</p>
          <p className="text-sm font-semibold text-gray-800 sm:text-base dark:text-gray-100">
            {section.totalQuestions}
          </p>
        </div>
      </div>
    </div>
  )
}

const ResultSectionAnalysis = ({ analysis, showAnalysis }) => {
  if (!showAnalysis || !analysis) return null

  return (
    <ResultCard
      title="Section-wise Analysis"
      icon={FaBookOpen}
      iconBgColor="bg-blue-100 dark:bg-blue-900/50"
      iconColor="text-blue-600 dark:text-blue-400"
    >
      <div className="space-y-4">
        {analysis.sectionAnalysis.map(section => (
          <SectionRow key={section.sectionName} section={section} />
        ))}
      </div>
    </ResultCard>
  )
}

export default ResultSectionAnalysis
