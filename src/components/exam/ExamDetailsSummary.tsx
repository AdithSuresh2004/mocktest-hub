import {
  FaClock,
  FaListAlt,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import type { ExamDetailsSummaryProps } from "@/types/components-props";

const ExamDetailsSummary = ({ exam }: ExamDetailsSummaryProps) => {
  const totalQuestions =
    exam.sections?.reduce((sum, s) => sum + s.questions.length, 0) || 0;

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-2">
      <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <div className="mb-2 flex items-center gap-2">
          <FaClock className="text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Duration
          </h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          {exam.duration_minutes} minutes
        </p>
      </div>
      <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
        <div className="mb-2 flex items-center gap-2">
          <FaListAlt className="text-purple-600 dark:text-purple-400" />
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Total Questions
          </h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          {totalQuestions} questions
        </p>
      </div>
      <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
        <div className="mb-2 flex items-center gap-2">
          <FaCheckCircle className="text-green-600 dark:text-green-400" />
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Total Marks
          </h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          {exam.total_marks} marks
        </p>
      </div>
      <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
        <div className="mb-2 flex items-center gap-2">
          <FaExclamationTriangle className="text-orange-600 dark:text-orange-400" />
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Sections
          </h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          {exam.sections?.length || 0} sections
        </p>
      </div>
    </div>
  );
};

export default ExamDetailsSummary;
