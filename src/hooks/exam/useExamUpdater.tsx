import { useEffect } from "react";
import { examStore } from "@/stores/examStore";
import { attemptStore } from "@/stores/attemptStore";
import { getResponsesFromAnswers } from "@/services/examService";

const useExamUpdater = () => {
  const { updateAttempt } = attemptStore();

  useEffect(() => {
    const unsubscribe = examStore.subscribe((state, prevState) => {
      if (!state.hasStarted || !state.attempt) return;

      const hasChanged =
        state.seconds !== prevState.seconds ||
        state.currentSection !== prevState.currentSection ||
        state.currentQuestion !== prevState.currentQuestion ||
        state.markedForReview !== prevState.markedForReview ||
        state.answers !== prevState.answers;

      if (hasChanged) {
        const {
          attempt,
          seconds,
          currentSection,
          currentQuestion,
          markedForReview,
          answers,
        } = state;

        if (attempt && seconds > 0) {
          const updates = {
            _currentSection: currentSection,
            _currentQuestion: currentQuestion,
            _timeRemainingSeconds: seconds,
            _markedForReview: Array.from(markedForReview),
            responses: getResponsesFromAnswers(answers),
          };
          updateAttempt(attempt.id, { ...attempt, ...updates });
        }
      }
    });

    return () => unsubscribe();
  }, [updateAttempt]);
};

export default useExamUpdater;
