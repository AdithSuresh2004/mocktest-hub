import ResultCard from "@/components/result/ResultCard";
import { formatTime, formatDate } from "@/utils/formatters";
import { FaTrophy, FaClock, FaCalendar, FaCrosshairs } from "react-icons/fa";
import { Attempt, Exam, Analysis } from "@/types";

interface ResultTestDetailsProps {
  attempt: Attempt;
  exam: Exam;
  analysis: Analysis;
}

const ResultTestDetails: React.FC<ResultTestDetailsProps> = ({
  attempt,
  exam,
  analysis,
}) => {
  return (
    <ResultCard
      title="Test Details"
      icon={FaTrophy}
      iconBgColor="bg-blue-100 dark:bg-blue-900/50"
      iconColor="text-blue-600 dark:text-blue-400"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
              <FaClock className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {formatTime(attempt.time_taken)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Time Taken
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <FaCrosshairs className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {analysis.overall.attempted}/{analysis.overall.totalQuestions}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Questions Attempted
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
              <FaCalendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {formatDate(attempt.date)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Test Completed
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
              <FaTrophy className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {typeof attempt.score === "number"
                  ? attempt.score
                  : attempt.score?.actual || 0}
                /{exam.total_marks}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Final Score
              </p>
            </div>
          </div>
        </div>
      </div>
    </ResultCard>
  );
};

export default ResultTestDetails;
