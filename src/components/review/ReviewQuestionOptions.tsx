import React from "react";
import FormattedContent from "@/components/common/FormattedContent";
import { FaCheck, FaStar, FaTimes } from "react-icons/fa";
import { Question, Option } from "@/types";

interface ReviewQuestionOptionsProps {
  question: Question;
  userAnswer: string | null;
}

const ReviewQuestionOptions: React.FC<ReviewQuestionOptionsProps> = ({
  question,
  userAnswer,
}) => {
  const getOptionClasses = (option: Option) => {
    const isCorrect = option.opt_id === question.correct_opt_id;
    const isSelected = option.opt_id === userAnswer;
    const baseClasses =
      "flex items-center p-4 rounded-lg border-2 transition-all duration-200";
    if (isSelected && isCorrect) {
      return `${baseClasses} bg-green-50 dark:bg-green-900/20 border-green-500 shadow-md`;
    }
    if (isSelected && !isCorrect) {
      return `${baseClasses} bg-red-50 dark:bg-red-900/20 border-red-500`;
    }
    if (isCorrect) {
      return `${baseClasses} bg-green-50 dark:bg-green-900/20 border-green-500`;
    }
    return `${baseClasses} bg-gray-50 dark:bg-gray-700/20 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600`;
  };

  const getOptionIcon = (option: Option) => {
    const isCorrect = option.opt_id === question.correct_opt_id;
    const isSelected = option.opt_id === userAnswer;
    if (isSelected && isCorrect)
      return <FaCheck className="ml-3 flex-shrink-0 text-green-600" />;
    if (isSelected && !isCorrect)
      return <FaTimes className="ml-3 flex-shrink-0 text-red-600" />;
    if (isCorrect)
      return <FaStar className="ml-3 flex-shrink-0 text-green-600" />;
    return null;
  };

  return (
    <div className="mb-6 space-y-4">
      {question.options.map((option) => (
        <div key={option.opt_id} className={getOptionClasses(option)}>
          <div className="flex-1">
            <div className="flex items-start">
              <span className="mr-3 font-bold text-gray-700 dark:text-gray-300">
                {option.opt_id.toUpperCase()}.
              </span>
              <div className="flex-1">
                <FormattedContent
                  text={option.text}
                  className="text-gray-900 dark:text-gray-100"
                />
                {option.image && (
                  <div className="mt-2">
                    <img
                      src={option.image}
                      alt={`Option ${option.opt_id.toUpperCase()} illustration`}
                      className="h-auto max-w-full rounded border border-gray-300 dark:border-gray-600"
                      draggable={false}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {getOptionIcon(option)}
        </div>
      ))}
    </div>
  );
};

export default ReviewQuestionOptions;
