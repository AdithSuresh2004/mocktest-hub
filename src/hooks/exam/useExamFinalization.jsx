import { useCallback } from 'react';
import { updateAttempt } from '@/data/attemptRepository';
import { calculateAnalysis } from '@/utils/calculations/resultAnalysis';

export const useExamFinalization = (
  exam,
  attempt,
  answers,
  timer,
  setAttempt,
  setIsSubmitted
) => {
  const finalizeExam = useCallback((isTimeUp = false) => {
    if (!exam || !attempt) return;

    timer.stop();

    const analysis = calculateAnalysis(exam, {
      responses: Object.entries(answers).map(([q_id, selected_opt_id]) => ({
        q_id,
        selected_opt_id,
      })),
    });

    const finalAttempt = {
      ...attempt,
      status: 'completed',
      time_taken: exam.duration_minutes * 60 - timer.seconds,
      score: analysis.score.actual,
      rawScore: {
        actual: analysis.overall.correct,
        total: analysis.overall.totalQuestions,
      },
      responses: Object.entries(answers).map(([q_id, selected_opt_id]) => ({
        q_id,
        selected_opt_id,
      })),
      analysis,
    };

    updateAttempt(attempt.attempt_id, finalAttempt);
    setAttempt(finalAttempt);
    setIsSubmitted(true);
  }, [exam, attempt, answers, timer, setAttempt, setIsSubmitted]);

  return { finalizeExam };
};
