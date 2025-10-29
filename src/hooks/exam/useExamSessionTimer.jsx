import { useEffect, useRef } from 'react';
import { useTimer } from './useTimer';
import { initializeExamState, startTimer as startTimerHelper } from '@/utils/helpers/examHelpers';

export const useExamSessionTimer = (
  attempt,
  exam,
  hasStarted,
  setHasStarted,
  setAnswers,
  setMarkedForReview,
  setCurrentSection,
  setCurrentQuestion,
  onTimerEnd,
  updateAttempt,
  setAttempt
) => {
  const finalizeExamRef = useRef(null);

  const timer = useTimer(0, onTimerEnd);

  useEffect(() => {
    if (attempt && exam && !hasStarted) {
      const started = initializeExamState(
        attempt,
        exam,
        setAnswers,
        setMarkedForReview,
        setCurrentSection,
        setCurrentQuestion,
        timer
      );
      setHasStarted((prev) => (prev !== started ? started : prev));
    }
  }, [
    attempt,
    exam,
    hasStarted,
    setAnswers,
    setMarkedForReview,
    setCurrentSection,
    setCurrentQuestion,
    timer,
    setHasStarted,
  ]);

  useEffect(() => {
    if (
      hasStarted &&
      attempt?.status === 'in_progress' &&
      attempt?._hasStarted
    ) {
      timer.start();
    }
  }, [hasStarted, attempt?.status, attempt?._hasStarted]); // timer intentionally not in deps per guidelines

  const startExamSession = () => {
    startTimerHelper(
      hasStarted,
      attempt,
      timer,
      setHasStarted,
      updateAttempt,
      setAttempt
    );
  };

  return {
    timer,
    startExamSession,
  };
};
