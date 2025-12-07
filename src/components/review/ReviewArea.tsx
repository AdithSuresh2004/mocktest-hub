import ReviewQuestionHeader from "@/components/review/ReviewQuestionHeader";
import ReviewQuestionContent from "@/components/review/ReviewQuestionContent";
import ReviewQuestionOptions from "@/components/review/ReviewQuestionOptions";
import ReviewAnswerSummary from "@/components/review/ReviewAnswerSummary";
import ReviewExplanation from "@/components/review/ReviewExplanation";
import ReviewNavigationControls from "@/components/review/ReviewNavigationControls";
import type { Question } from "@/types";

interface ReviewAreaProps {
  question: Question;
  sectionName: string;
  questionIndex: number;
  totalQuestions: number;
  userAnswer: string;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const ReviewArea: React.FC<ReviewAreaProps> = ({
  question,
  sectionName,
  questionIndex,
  totalQuestions,
  userAnswer,
  onNext,
  onPrev,
  isFirst,
  isLast,
}) => {
  if (!question) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <p className="text-gray-500 dark:text-gray-400">
          Select a question to review.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <ReviewQuestionHeader
          sectionName={sectionName}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
        />
        <ReviewQuestionContent question={question} />
        <ReviewQuestionOptions question={question} userAnswer={userAnswer} />
        <div className="space-y-4">
          <ReviewAnswerSummary question={question} userAnswer={userAnswer} />
          {question.explanation && (
            <ReviewExplanation explanation={question.explanation} />
          )}
        </div>
      </div>
      <ReviewNavigationControls
        onPrev={onPrev}
        onNext={onNext}
        isFirst={isFirst}
        isLast={isLast}
      />
    </div>
  );
};

export default ReviewArea;
