import { useCallback } from "react";
import { examStore } from "@/stores/examStore";
import { attemptStore } from "@/stores/attemptStore";
import useExamLoader from "./useExamLoader";
import useExamUpdater from "./useExamUpdater";
import useExamLifecycle from "./useExamLifecycle";

const useExamPage = (examId: string | undefined) => {
  const examState = examStore();

  const { finalizeExam, saveAndExitExam, deleteAndExitExam, finalizeExamRef } =
    useExamLifecycle();

  const { loading, error } = useExamLoader(examId, finalizeExamRef);
  useExamUpdater();

  const startNewExam = useCallback(() => {
    const { exam } = examStore.getState();
    if (exam) {
      const newAttempt = {
        id: `${exam.exam_id}-${Date.now()}`,
        exam_id: exam.exam_id,
        status: "in_progress" as const,
        date: new Date().toISOString(),
        responses: [],
        _currentSection: 0,
        _currentQuestion: 0,
        _timeRemainingSeconds: exam.duration_minutes * 60,
        _markedForReview: [],
        _hasStarted: true,
      };
      attemptStore.getState().addAttempt(newAttempt);
      examStore.getState().loadExam(exam, newAttempt, () => {
        if (finalizeExamRef.current) {
          finalizeExamRef.current(true);
        }
      });
      examState.startTimer();
    }
  }, [examState, finalizeExamRef]);

  return {
    ...examState,
    loading: loading || examState.loading,
    error,
    navigation: {
      currentSection: examState.currentSection,
      currentQuestion: examState.currentQuestion,
      goToQuestion: examState.goToQuestion,
      nextQuestion: examState.nextQuestion,
      prevQuestion: examState.prevQuestion,
      goToSection: examState.goToSection,
    },
    timer: {
      seconds: examState.seconds,
    },
    handleAnswer: examState.saveAnswer,
    toggleMarkForReview: examState.toggleMarkForReview,
    startNewExam,
    finalizeExam,
    saveAndExitExam,
    deleteAndExitExam,
  };
};

export default useExamPage;
