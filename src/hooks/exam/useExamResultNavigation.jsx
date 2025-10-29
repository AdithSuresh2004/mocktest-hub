import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useExamResultNavigation = (isSubmitted, attempt) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitted && attempt?.attempt_id) {
      setTimeout(() => navigate(`/result/${attempt.attempt_id}`), 500);
    }
  }, [isSubmitted, attempt?.attempt_id, navigate]);
};
