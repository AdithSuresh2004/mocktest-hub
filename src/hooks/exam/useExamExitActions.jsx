import { useCallback } from 'react';
import { updateAttempt, removeAttempt } from '@/data/attemptRepository';

export const useExamExitActions = (
  isSubmitted,
  attempt,
  exam,
  timer,
  navigation,
  markedForReview,
  answers
) => {
  const saveAndExitExam = useCallback(() => {
    if (isSubmitted || !attempt?.attempt_id || !exam) return;
    timer.stop();
    const updates = {
      _currentSection: navigation.currentSection,
      _currentQuestion: navigation.currentQuestion,
      _timeRemainingSeconds: timer.seconds,
      _markedForReview: Array.from(markedForReview),
      responses: Object.entries(answers).map(([q_id, selected_opt_id]) => ({
        q_id,
        selected_opt_id,
      })),
    };
    updateAttempt(attempt.attempt_id, updates);
  }, [isSubmitted, attempt, exam, timer, navigation, markedForReview, answers]);

  const deleteAndExitExam = useCallback(() => {
    if (attempt) {
      removeAttempt(attempt.attempt_id);
    }
    timer.stop();
  }, [attempt, timer]);

  return { saveAndExitExam, deleteAndExitExam };
};
