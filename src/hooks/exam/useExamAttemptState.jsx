import { useState } from 'react';
import { updateAttempt } from '@/data/attemptRepository';

export const useExamAttemptState = (attempt) => {
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());

  const saveAnswer = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));

    if (attempt) {
      const currentResponses = attempt.responses || [];
      const existingResponseIndex = currentResponses.findIndex(
        (r) => r.q_id === questionId
      );
      let newResponses;

      if (existingResponseIndex > -1) {
        newResponses = [...currentResponses];
        newResponses[existingResponseIndex] = {
          q_id: questionId,
          selected_opt_id: optionId,
        };
      } else {
        newResponses = [
          ...currentResponses,
          { q_id: questionId, selected_opt_id: optionId },
        ];
      }

      updateAttempt(attempt.attempt_id, { responses: newResponses });
    }
  };

  const toggleMarkForReview = (questionId) => {
    setMarkedForReview((prev) => {
      const newMarked = new Set(prev);
      if (newMarked.has(questionId)) {
        newMarked.delete(questionId);
      } else {
        newMarked.add(questionId);
      }

      if (attempt) {
        updateAttempt(attempt.attempt_id, {
          _markedForReview: Array.from(newMarked),
        });
      }

      return newMarked;
    });
  };

  return {
    answers,
    setAnswers,
    markedForReview,
    setMarkedForReview,
    saveAnswer,
    toggleMarkForReview,
  };
};
