import { useEffect } from "react";
import { reviewStore } from "@/stores/reviewStore";

export const useReviewData = (attemptId: string) => {
  const { attempt, exam, loading, error, loadReviewData } = reviewStore();

  useEffect(() => {
    loadReviewData(attemptId);
  }, [attemptId, loadReviewData]);

  return { attempt, exam, loading, error };
};
