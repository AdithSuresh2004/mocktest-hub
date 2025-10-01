import { FaExpandArrowsAlt, FaArrowLeft, FaCompress } from "react-icons/fa";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useExamHeaderState } from "@/hooks/useExamHeaderState"; 
import { formatTime } from "@/utils/examHelpers";
export default function ExamHeader({ exam, timeRemaining, onExit }) {
  const { isFullscreen, timeColorClass, toggleFullscreen } = useExamHeaderState(timeRemaining);
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 py-2 sm:px-4 sm:py-3 z-10 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 truncate">
            {exam.exam_name} 
          </h1>
          <div className="flex flex-wrap gap-2 sm:gap-4 mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <span>{exam.duration_minutes} mins</span>
            <span>{exam.total_marks} Marks</span>
            <span className="capitalize">{exam.exam_strength}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className={`text-base sm:text-lg font-mono font-bold ${timeColorClass}`}>
            {formatTime(timeRemaining)} 
          </div>
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700
                 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300 transition-colors"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <FaCompress className="h-4 w-4" />
            ) : (
              <FaExpandArrowsAlt className="h-4 w-4" />
            )}
          </button>
          <ThemeToggle />
          <button
            onClick={onExit}
            className="p-1.5 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700
                 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300 transition-colors"
            aria-label="Exit exam"
          >
            <FaArrowLeft className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}