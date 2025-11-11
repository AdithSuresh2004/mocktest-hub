import { useEffect } from "react";
import { resultStore } from "../../stores/resultStore";

const useResultPage = (attemptId: string) => {
  const { attempt, loading, error, loadResult } = resultStore();

  useEffect(() => {
    loadResult(attemptId);
  }, [attemptId, loadResult]);

  return { attempt, loading, error };
};

export default useResultPage;
