import { useEffect, useRef } from 'react'; // Import useRef
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
  const currentSectionRef = useRef(currentSection);
  const currentQuestionRef = useRef(currentQuestion);
  const timeRemainingRef = useRef(timeRemaining);
  const markedForReviewRef = useRef(markedForReview);
  const answersRef = useRef(answers);

  useEffect(() => {
    currentSectionRef.current = currentSection;
    currentQuestionRef.current = currentQuestion;
    timeRemainingRef.current = timeRemaining;
    markedForReviewRef.current = markedForReview;
    answersRef.current = answers;
  }, [currentSection, currentQuestion, timeRemaining, markedForReview, answers]);

  // Effect for periodic saving
  useEffect(() => {
    if (!attempt?.attempt_id || isSubmitted) return;

    const saveState = setTimeout(() => {
      updateAttempt(attempt.attempt_id, {
        _currentSection: currentSectionRef.current,
        _currentQuestion: currentQuestionRef.current,
        _timeRemainingSeconds: timeRemainingRef.current,
      });
    }, 5000);

    return () => clearTimeout(saveState);
  }, [
    attempt?.attempt_id,
    isSubmitted,
  ]);

  // Effect for saving on beforeunload
  useEffect(() => {
    if (!attempt?.attempt_id || isSubmitted) return;

    const handleBeforeUnload = () => {
      updateAttempt(attempt.attempt_id, {
        _currentSection: currentSectionRef.current,
        _currentQuestion: currentQuestionRef.current,
        _timeRemainingSeconds: timeRemainingRef.current,
        _markedForReview: Array.from(markedForReviewRef.current),
        responses: Object.entries(answersRef.current).map(([q_id, selected_opt_id]) => ({
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
  ]);
};
