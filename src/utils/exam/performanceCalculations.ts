import { toNumber } from "@/utils/common";
import type { Attempt } from "@/types";

export const calculatePerformanceOverTime = (completedExams: Attempt[]) => {
  if (!completedExams?.length) return [];

  return [...completedExams]
    .filter((exam) => !isNaN(new Date(exam.date).getTime()))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((exam) => ({
      date: exam.date,
      score: Math.max(0, Math.min(100, toNumber(exam.score))),
    }));
};

export const getPerformanceLevel = (percentage: number | string) => {
  const numPercentage =
    typeof percentage === "string" ? parseFloat(percentage) : percentage;

  const LEVELS = [
    {
      threshold: 90,
      text: "Excellent",
      color: "text-green-600 dark:text-green-400",
    },
    {
      threshold: 75,
      text: "Very Good",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      threshold: 60,
      text: "Good",
      color: "text-yellow-600 dark:text-yellow-400",
    },
    {
      threshold: 40,
      text: "Average",
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      threshold: 0,
      text: "Needs Improvement",
      color: "text-red-600 dark:text-red-400",
    },
  ];

  return (
    LEVELS.find((l) => numPercentage >= l.threshold) ||
    LEVELS[LEVELS.length - 1]
  );
};
