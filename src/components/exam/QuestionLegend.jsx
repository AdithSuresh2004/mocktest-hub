export default function QuestionLegend({ stats }) {
  return (
    <div className="mt-2 flex justify-between p-1 text-sm">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded bg-green-600"></div>
        <span className="text-gray-800 dark:text-gray-200">
          Answered ({stats.answered})
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded bg-purple-600"></div>
        <span className="text-gray-800 dark:text-gray-200">
          Marked ({stats.marked})
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded bg-gray-300 dark:bg-gray-600"></div>
        <span className="text-gray-800 dark:text-gray-200">
          Not Visited ({stats.notVisited})
        </span>
      </div>
    </div>
  )
}
