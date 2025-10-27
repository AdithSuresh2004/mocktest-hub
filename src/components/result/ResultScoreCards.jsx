import { FaTrophy, FaPercentage, FaClock, FaChartLine } from 'react-icons/fa'
import { formatTime } from '@/utils/formatters/formatters'
import ResultCard from '@/components/result/ResultCard'
import StatTile from '@/components/common/StatTile'

const ResultScoreCards = ({
  actualScore,
  totalMarks,
  percentage,
  timeTaken,
  performance,
}) => {
  return (
    <ResultCard>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
        <StatTile
          icon={FaTrophy}
          label="Score"
          value={`${actualScore} / ${totalMarks}`}
          iconBgColor="bg-blue-100 dark:bg-blue-900/50"
          iconColor="text-blue-600 dark:text-blue-400"
          valueColor="text-gray-800 dark:text-gray-100"
        />
        <StatTile
          icon={FaPercentage}
          label="Percentage"
          value={`${percentage}%`}
          iconBgColor="bg-green-100 dark:bg-green-900/50"
          iconColor="text-green-600 dark:text-green-400"
          valueColor="text-gray-800 dark:text-gray-100"
        />
        <StatTile
          icon={FaClock}
          label="Time Taken"
          value={formatTime(timeTaken)}
          iconBgColor="bg-purple-100 dark:bg-purple-900/50"
          iconColor="text-purple-600 dark:text-purple-400"
          valueColor="text-gray-800 dark:text-gray-100"
        />
        <StatTile
          icon={FaChartLine}
          label="Performance"
          value={performance.text}
          iconBgColor="bg-yellow-100 dark:bg-yellow-900/50"
          iconColor="text-yellow-600 dark:text-yellow-400"
          valueColor={`${performance.color} dark:${performance.color.replace('text-', 'text-dark-')}`}
        />
      </div>
    </ResultCard>
  )
}

export default ResultScoreCards
