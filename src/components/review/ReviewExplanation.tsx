import React from "react";
import FormattedContent from "@/components/common/FormattedContent";

interface ReviewExplanationProps {
  explanation: string;
}

const ReviewExplanation: React.FC<ReviewExplanationProps> = ({
  explanation,
}) => {
  if (!explanation) return null;

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
      <h3 className="mb-2 text-base font-bold text-blue-900 dark:text-blue-100">
        Explanation
      </h3>
      <FormattedContent
        text={explanation}
        className="text-sm text-blue-800 dark:text-blue-200"
      />
    </div>
  );
};

export default ReviewExplanation;
