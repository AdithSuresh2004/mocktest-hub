import type { QuestionLegendProps } from "@/types/components-props";

const QuestionLegend = ({
  stats,
  isReviewMode = false,
}: QuestionLegendProps) => (
  <div className="mt-3 rounded-lg bg-white p-3 shadow-sm transition-colors duration-200 dark:bg-gray-700/50">
    <div className="flex flex-wrap justify-start gap-2 text-xs sm:text-[0.775rem]">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded bg-green-600"></div>
        <span className="font-medium text-gray-800 dark:text-gray-200">
          Answered ({stats.answered})
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`h-3 w-3 rounded ${isReviewMode ? "bg-red-600" : "bg-purple-600"}`}
        ></div>
        <span className="font-medium text-gray-800 dark:text-gray-200">
          {isReviewMode
            ? `Incorrect (${stats.incorrect})`
            : `Marked (${stats.marked})`}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded bg-gray-400 dark:bg-gray-600"></div>
        <span className="font-medium text-gray-800 dark:text-gray-200">
          Not Visited ({stats.notVisited})
        </span>
      </div>
    </div>
  </div>
);

export default QuestionLegend;
