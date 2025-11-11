import { QUESTION_STATUS_CLASSES } from "@/constants/exam";
import type { Question } from "@/types";

interface QuestionStatusInput {
  question: Question;
  qIndex: number;
  answers: Record<string, string>;
  markedForReview: Set<string>;
  currentQuestionIndex: number;
  isReviewMode: boolean;
}

export const getQuestionStatusClasses = (
  statusOrInput: string | QuestionStatusInput,
): string => {
  if (typeof statusOrInput === "string") {
    const classes =
      QUESTION_STATUS_CLASSES[
        statusOrInput as keyof typeof QUESTION_STATUS_CLASSES
      ];
    return classes || QUESTION_STATUS_CLASSES.unanswered;
  }

  const {
    question,
    qIndex,
    answers,
    markedForReview,
    currentQuestionIndex,
    isReviewMode,
  } = statusOrInput;

  const qId: string = question.q_id;
  const isAnswered = answers[qId];
  const isMarked = markedForReview.has(qId);
  const isCurrentQuestion = qIndex === currentQuestionIndex;

  if (isCurrentQuestion) return QUESTION_STATUS_CLASSES.current;

  if (isReviewMode && isAnswered) {
    const isCorrect = answers[qId] === question.correct_opt_id;
    return isCorrect
      ? QUESTION_STATUS_CLASSES.correct
      : QUESTION_STATUS_CLASSES.incorrect;
  }

  if (isMarked) return QUESTION_STATUS_CLASSES.marked;
  if (isAnswered) return QUESTION_STATUS_CLASSES.answered;
  return QUESTION_STATUS_CLASSES.unanswered;
};
