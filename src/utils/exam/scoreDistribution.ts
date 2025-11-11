import { toNumber } from "@/utils/common";
import type { Attempt } from "@/types";

export const calculateScoreDistribution = (completedExams: Attempt[]) => {
  const scoreRanges = [
    { name: "90-100%", threshold: 90, color: "#10b981" },
    { name: "75-89%", threshold: 75, color: "#3b82f6" },
    { name: "50-74%", threshold: 50, color: "#f59e0b" },
    { name: "0-49%", threshold: 0, color: "#ef4444" },
  ];

  const distribution = completedExams.reduce(
    (acc, exam) => {
      const raw = toNumber(exam.score);
      const score = Math.max(0, Math.min(100, raw));
      const range = scoreRanges.find((r) => score >= r.threshold);
      if (range) {
        acc[range.name] = (acc[range.name] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  return scoreRanges
    .map((range) => ({
      name: range.name,
      value: distribution[range.name] || 0,
      color: range.color,
    }))
    .filter((item) => item.value > 0);
};
