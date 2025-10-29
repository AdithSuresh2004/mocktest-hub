import { useState, useEffect } from 'react';
import { findAttemptById } from '@/data/attemptRepository';
import { findExamById } from '@/data/examRepository';

export const useReviewData = (attemptId) => {
  const [attempt, setAttempt] = useState(null);
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const attemptData = findAttemptById(attemptId);
        if (!attemptData) {
          setError('Attempt not found.');
          setLoading(false);
          return;
        }
        setAttempt(attemptData);

        const examData = await findExamById(attemptData.exam_id);
        if (!examData) {
          setError('Exam not found for this attempt.');
          setLoading(false);
          return;
        }
        setExam(examData);
      } catch (e) {
        setError('Failed to load review data.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [attemptId]);

  return { attempt, exam, loading, error, setAttempt, setExam };
};
