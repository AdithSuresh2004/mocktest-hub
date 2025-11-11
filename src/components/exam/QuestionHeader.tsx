import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import type { QuestionHeaderProps } from "@/types/components-props";

const QuestionHeader = ({
  questionNumber,
  totalQuestions,
  sectionName,
  markedForReview,
  onMarkForReview,
}: QuestionHeaderProps) => (
  <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:px-6 dark:border-gray-700 dark:bg-gray-800">
    <div>
      <h2
        id="question-header"
        className="text-lg font-semibold text-gray-900 dark:text-gray-100"
      >
        Question {questionNumber}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {sectionName} - {totalQuestions} questions
      </p>
    </div>
    <button
      onClick={onMarkForReview}
      title={markedForReview ? "Unmark for Review" : "Mark for Review"}
      aria-label={markedForReview ? "Unmark for review" : "Mark for review"}
      aria-pressed={markedForReview}
      className={`rounded-full p-3 transition-colors duration-200 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-800 ${
        markedForReview
          ? "bg-yellow-400 text-white hover:bg-yellow-500"
          : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
      }`}
    >
      {markedForReview ? (
        <IoBookmark className="h-5 w-5" />
      ) : (
        <IoBookmarkOutline className="h-5 w-5" />
      )}
    </button>
  </div>
);

export default QuestionHeader;
