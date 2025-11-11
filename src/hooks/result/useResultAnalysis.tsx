import { useEffect } from "react";
import { resultStore } from "@/stores/resultStore";
import { getTotalMarks } from "@/utils/exam/examCalculations";
import { getScore } from "@/utils/exam/attemptCalculations";
import { getPerformanceLevel } from "@/utils/exam/performanceCalculations";

const useResultAnalysis = (attemptId: string) => {
  const { attempt, exam, loading, error, analysis, loadResult } = resultStore();

  useEffect(() => {
    loadResult(attemptId);
  }, [attemptId, loadResult]);

  const totalMarks = exam ? getTotalMarks(exam) : 0;
  const actualScore = attempt ? getScore(attempt) : 0;

  return {
    loading,
    error,
    attempt,
    exam,
    analysis,
    totalMarks,
    actualScore,
  };
};

export { getPerformanceLevel };
export default useResultAnalysis;
