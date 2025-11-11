import QuestionHeader from "@/components/exam/QuestionHeader";
import QuestionContent from "@/components/exam/QuestionContent";
import QuestionOption from "@/components/exam/QuestionOption";
import type { Question } from "@/types";
import QuestionCardSkeleton from "./skeletons/QuestionCardSkeleton";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  sectionName: string;
  selected: string | null;
  onAnswer: (questionId: string, optionId: string) => void;
  markedForReview: boolean;
  onMarkForReview: (questionId: string) => void;
}

const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  sectionName,
  selected,
  onAnswer,
  markedForReview,
  onMarkForReview,
}: QuestionCardProps) => {
  const questionId = question?.q_id;

  const handleOptionSelect = (optionId: string) => {
    if (onAnswer && questionId) {
      onAnswer(questionId, optionId);
    }
  };

  const handleMarkToggle = () => {
    if (onMarkForReview && questionId) {
      onMarkForReview(questionId);
    }
  };

  if (!question) {
    return <QuestionCardSkeleton />;
  }

  return (
    <article
      className="flex min-h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 dark:bg-gray-800"
      role="article"
      aria-labelledby="question-header"
    >
      <QuestionHeader
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
        sectionName={sectionName}
        markedForReview={markedForReview}
        onMarkForReview={handleMarkToggle}
      />

      <QuestionContent text={question.text} image={question.image} />

      <div
        className="flex-1 space-y-4 bg-gray-50 p-6 transition-colors duration-300 dark:bg-gray-900"
        role="radiogroup"
        aria-labelledby="question-header"
      >
        {question.options.map((option, index) => (
          <QuestionOption
            key={option.opt_id}
            option={option}
            optionId={option.opt_id}
            isSelected={selected === option.opt_id}
            onSelect={handleOptionSelect}
            questionId={questionId}
            index={index}
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>
    </article>
  );
};

export default QuestionCard;
