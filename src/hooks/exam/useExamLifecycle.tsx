import { useCallback, useEffect, useRef } from "react";
import { examStore } from "@/stores/examStore";
import { attemptStore } from "@/stores/attemptStore";
import { globalLoadingStore } from "@/stores/globalLoadingStore";
import { calculateAnalysis } from "@/utils/exam/attemptCalculations";
import { getResponsesFromAnswers } from "@/services/examService";

const useExamLifecycle = () => {
  const { stopTimer, setSubmitted, resetExamState } = examStore();
  const { updateAttempt, removeAttempt } = attemptStore();
  const finalizeExamRef = useRef<((isTimeout?: boolean) => void) | null>(null);

  const finalizeExam = useCallback(
    (_isTimeout = false) => {
      const { show, hide } = globalLoadingStore.getState();
      show("Submitting exam...");

      setTimeout(() => {
        void (async () => {
          try {
            const { exam, attempt, answers, seconds } = examStore.getState();
            if (!exam || !attempt) {
              hide();
              return;
            }

            stopTimer();

            const attemptData = {
              ...attempt,
              responses: getResponsesFromAnswers(answers),
            };

            const analysis = calculateAnalysis(exam, attemptData);

            const finalAttempt = {
              ...attempt,
              status: "completed" as const,
              score: analysis.score,
              time_taken: exam.duration_minutes * 60 - seconds,
              responses: getResponsesFromAnswers(answers),
              _hasStarted: true,
            };

            updateAttempt(finalAttempt.id, finalAttempt);
            setSubmitted();

            await new Promise((resolve) => setTimeout(resolve, 300));
            hide();
            resetExamState();
          } catch (error) {
            console.error("Error finalizing exam:", error);
            hide();
          }
        })();
      }, 100);
    },
    [stopTimer, updateAttempt, setSubmitted, resetExamState],
  );

  useEffect(() => {
    finalizeExamRef.current = finalizeExam;
  }, [finalizeExam]);

  const isTimeUp = examStore.getState().isTimeUp;
  const isSubmitted = examStore.getState().isSubmitted;

  useEffect(() => {
    const snapshot = examStore.getState();
    if (snapshot.isTimeUp && !snapshot.isSubmitted) {
      finalizeExam(true);
    }
  }, [isTimeUp, isSubmitted, finalizeExam]);

  const saveAndExitExam = useCallback(() => {
    const {
      isSubmitted,
      attempt,
      exam,
      seconds,
      currentSection,
      currentQuestion,
      markedForReview,
      answers,
      hasStarted,
    } = examStore.getState();

    if (isSubmitted || !attempt?.id || !exam) return;

    stopTimer();
    const updates = {
      _currentSection: currentSection,
      _currentQuestion: currentQuestion,
      _timeRemainingSeconds: seconds,
      _markedForReview: Array.from(markedForReview),
      responses: getResponsesFromAnswers(answers),
      _hasStarted: hasStarted,
    };
    updateAttempt(attempt.id, { ...attempt, ...updates });
    resetExamState();
  }, [stopTimer, updateAttempt, resetExamState]);

  const deleteAndExitExam = useCallback(() => {
    const { attempt } = examStore.getState();
    stopTimer();
    if (attempt) {
      removeAttempt(attempt.id);
    }
    resetExamState();
  }, [stopTimer, removeAttempt, resetExamState]);

  return {
    finalizeExam,
    saveAndExitExam,
    deleteAndExitExam,
    finalizeExamRef,
  };
};

export default useExamLifecycle;
