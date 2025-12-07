import React from "react";
import FormattedContent from "@/components/common/FormattedContent";
import { FaUser, FaStar } from "react-icons/fa";
import type { Option } from "@/types";

interface ReviewAnswerSummaryProps {
  question: {
    correct_opt_id: string;
    options: Option[];
  };
  userAnswer: string;
}

const ReviewAnswerSummary: React.FC<ReviewAnswerSummaryProps> = ({
  question,
  userAnswer,
}) => {
  const correctOptionId = question.correct_opt_id;

  return (
    <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-700/50">
      <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-gray-100">
        Answer Summary
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center">
          <FaUser className="mr-2 text-blue-500" />
          <span className="font-medium text-gray-900 dark:text-gray-100">
            Your Answer:
          </span>
          <span className="ml-2 text-gray-700 dark:text-gray-300">
            {userAnswer ? (
              <>
                {userAnswer.toUpperCase()}.{" "}
                <FormattedContent
                  text={
                    question.options.find((o) => o.opt_id === userAnswer)
                      ?.text ?? ""
                  }
                  className="inline text-gray-700 dark:text-gray-300"
                />
              </>
            ) : (
              "Not Answered"
            )}
          </span>
        </div>
        <div className="flex items-center">
          <FaStar className="mr-2 text-green-500" />
          <span className="font-medium text-gray-900 dark:text-gray-100">
            Correct Answer:
          </span>
          <span className="ml-2 text-gray-700 dark:text-gray-300">
            {correctOptionId ? (
              <>
                {correctOptionId.toUpperCase()}.{" "}
                <FormattedContent
                  text={
                    question.options.find((o) => o.opt_id === correctOptionId)
                      ?.text ?? ""
                  }
                  className="inline text-gray-700 dark:text-gray-300"
                />
              </>
            ) : (
              "N/A"
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewAnswerSummary;
