import {
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaPercentage,
} from 'react-icons/fa'

const StatBox = ({ icon: Icon, value, label, bgColor, textColor, iconColor }) => (
  <div className={`rounded-xl border ${bgColor} p-4 text-center`}>
    <Icon className={`mx-auto mb-2 h-8 w-8 ${iconColor}`} />
    <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
    <p className="text-xs text-gray-600 dark:text-gray-400">{label}</p>
  </div>
)

const ResultQuickOverview = ({ analysis }) => {
  if (!analysis) return null

  return (
    <div className="mb-6 mt-6 rounded-2xl bg-white p-6 shadow-lg sm:p-8 dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
        Quick Overview
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatBox
          icon={FaCheckCircle}
          value={analysis.overall.correct}
          label="Correct"
          bgColor="border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20"
          textColor="text-green-700 dark:text-green-400"
          iconColor="text-green-500"
        />
        <StatBox
          icon={FaTimesCircle}
          value={analysis.overall.incorrect}
          label="Incorrect"
          bgColor="border-red-200 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
          textColor="text-red-700 dark:text-red-400"
          iconColor="text-red-500"
        />
        <StatBox
          icon={FaQuestionCircle}
          value={analysis.overall.unanswered}
          label="Unanswered"
          bgColor="border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700/50"
          textColor="text-gray-700 dark:text-gray-300"
          iconColor="text-gray-500 dark:text-gray-400"
        />
        <StatBox
          icon={FaPercentage}
          value={`${analysis.overall.accuracy}%`}
          label="Accuracy"
          bgColor="border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20"
          textColor="text-blue-700 dark:text-blue-400"
          iconColor="text-blue-500"
        />
      </div>
    </div>
  )
}

export default ResultQuickOverview
