import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface MaybeAttemptWithId {
  attempt_id?: string;
}

export const useExamResultNavigation = (
  isSubmitted: boolean,
  attempt?: MaybeAttemptWithId,
) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitted && attempt?.attempt_id) {
      setTimeout(() => navigate(`/result/${attempt.attempt_id}`), 500);
    }
  }, [isSubmitted, attempt?.attempt_id, navigate]);
};
