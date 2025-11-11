import React from "react";

interface ReviewQuestionHeaderProps {
  sectionName: string;
  questionIndex: number;
  totalQuestions: number;
}

const ReviewQuestionHeader: React.FC<ReviewQuestionHeaderProps> = ({
  sectionName,
  questionIndex,
  totalQuestions,
}) => {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="inline-flex items-center">
        <span
          className="inline-block max-w-[60vw] truncate rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 sm:max-w-xs dark:bg-blue-900/30 dark:text-blue-300"
          title={sectionName}
        >
          {sectionName}
        </span>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <span
          className="hidden sm:inline"
          title={`Question ${questionIndex + 1} of ${totalQuestions}`}
        >
          Question {questionIndex + 1} of {totalQuestions}
        </span>
        <span
          className="inline font-semibold sm:hidden"
          title={`Question ${questionIndex + 1} of ${totalQuestions}`}
        >
          {questionIndex + 1}
        </span>
      </div>
    </div>
  );
};

export default ReviewQuestionHeader;
