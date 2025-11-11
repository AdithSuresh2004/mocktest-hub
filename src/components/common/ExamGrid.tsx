import { FaClock, FaFileAlt, FaQuestionCircle, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Exam } from "@/types";
import { capitalizeText } from "@/utils/formatters";
import { getDifficultyBadgeColor } from "@/services/examService";

interface ExamGridProps {
  exams: Exam[];
}

const ExamGrid: React.FC<ExamGridProps> = ({ exams }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {exams.map((exam) => (
        <Link
          key={exam.exam_id}
          to={`/exams/${encodeURIComponent(exam.exam_id)}`}
          className="group relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-md hover:border-blue-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:shadow-black/20 dark:hover:border-blue-600"
        >
          <span
            className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold ${getDifficultyBadgeColor(exam.exam_strength || "medium")}`}
          >
            {capitalizeText(exam.exam_strength, "Medium")}
          </span>
          <div className="mb-4 flex items-center">
            <div className="rounded-xl bg-blue-50 p-3 group-hover:bg-blue-100 dark:bg-blue-900/40 dark:group-hover:bg-blue-900/60">
              <FaFileAlt className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <h3 className="mb-4 truncate text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-300">
            {exam.exam_name}
          </h3>
          <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <FaClock className="h-4 w-4 flex-shrink-0 text-blue-400" />
              <span>{exam.duration_minutes} mins</span>
            </div>
            <div className="flex items-center gap-2">
              <FaQuestionCircle className="h-4 w-4 flex-shrink-0 text-green-400" />
              <span>{exam.total_questions} Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="h-4 w-4 flex-shrink-0 text-yellow-400" />
              <span>{exam.total_marks} Marks</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ExamGrid;
