import QuestionCard from "@/components/exam/QuestionCard";
import { cn } from "@/utils/cn";
import type { QuestionAreaProps } from "@/types/components-props";

const QUESTION_AREA_STYLES = {
  loading:
    "flex flex-1 items-center justify-center bg-gray-50 p-8 transition-colors duration-200 dark:bg-gray-900",
  loadingText: "text-gray-500 dark:text-gray-400",
  container: "animate-fadeIn",
} as const;

const QuestionArea = ({
  question,
  section,
  questionIndex,
  totalQuestions,
  selected,
  markedForReview,
  onAnswer,
  onMarkForReview,
  containerClass,
}: QuestionAreaProps) => {
  if (!question) {
    return (
      <div className={QUESTION_AREA_STYLES.loading}>
        <p className={QUESTION_AREA_STYLES.loadingText}>Loading question...</p>
      </div>
    );
  }

  const displayQuestionNumber = questionIndex + 1;
  const isMarked =
    typeof markedForReview === "boolean"
      ? markedForReview
      : markedForReview.has(question.q_id);

  return (
    <div className={cn(QUESTION_AREA_STYLES.container, containerClass)}>
      <div className="mx-auto">
        <QuestionCard
          key={question.q_id}
          question={question}
          questionNumber={displayQuestionNumber}
          totalQuestions={totalQuestions}
          sectionName={section}
          selected={selected}
          markedForReview={isMarked}
          onAnswer={onAnswer}
          onMarkForReview={() => onMarkForReview(question.q_id)}
        />
      </div>
    </div>
  );
};

export default QuestionArea;
