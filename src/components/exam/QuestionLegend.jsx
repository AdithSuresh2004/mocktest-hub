export default function QuestionLegend({ stats }) {
  return (
    <div className="mt-2 flex justify-between text-sm p-1">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-green-600 rounded"></div>
        <span className="text-gray-800 dark:text-gray-200">
          Answered ({stats.answered})
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-purple-600 rounded"></div>
        <span className="text-gray-800 dark:text-gray-200">
          Marked ({stats.marked})
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <span className="text-gray-800 dark:text-gray-200">
          Not Visited ({stats.notVisited})
        </span>
      </div>
    </div>
  );
}