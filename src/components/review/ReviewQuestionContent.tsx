import FormattedContent from "@/components/common/FormattedContent";
import { Question } from "@/types";

interface ReviewQuestionContentProps {
  question: Question;
}

const ReviewQuestionContent = ({ question }: ReviewQuestionContentProps) => {
  return (
    <div className="mb-6">
      <FormattedContent
        text={question.text}
        className="text-xl leading-tight font-bold text-gray-900 dark:text-gray-100"
      />
      {question.image && (
        <div className="mt-4">
          <img
            src={question.image}
            alt="Question illustration"
            className="h-auto max-w-full rounded-lg border border-gray-300 dark:border-gray-600"
            loading="lazy"
            draggable={false}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewQuestionContent;
