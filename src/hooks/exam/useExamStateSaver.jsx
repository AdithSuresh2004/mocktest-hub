import { useEffect } from 'react';
import { updateAttempt } from '@/data/attemptRepository';

export const useExamStateSaver = (
  attempt,
  isSubmitted,
  currentSection,
  currentQuestion,
  timeRemaining,
  markedForReview,
  answers
) => {
  // Effect for periodic saving
  useEffect(() => {
    if (!attempt?.attempt_id || isSubmitted) return;

    const saveState = setTimeout(() => {
      updateAttempt(attempt.attempt_id, {
        _currentSection: currentSection,
        _currentQuestion: currentQuestion,
        _timeRemainingSeconds: timeRemaining,
      });
    }, 5000);

    return () => clearTimeout(saveState);
  }, [
    currentSection,
    currentQuestion,
    timeRemaining,
    attempt?.attempt_id,
    isSubmitted,
  ]);

  // Effect for saving on beforeunload
  useEffect(() => {
    if (!attempt?.attempt_id || isSubmitted) return;

    const handleBeforeUnload = () => {
      updateAttempt(attempt.attempt_id, {
        _currentSection: currentSection,
        _currentQuestion: currentQuestion,
        _timeRemainingSeconds: timeRemaining,
        _markedForReview: Array.from(markedForReview),
        responses: Object.entries(answers).map(([q_id, selected_opt_id]) => ({
          q_id,
          selected_opt_id,
        })),
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [
    attempt?.attempt_id,
    isSubmitted,
    currentSection,
    currentQuestion,
    timeRemaining,
    markedForReview,
    answers,
  ]);
};
