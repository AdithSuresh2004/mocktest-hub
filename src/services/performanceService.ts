import { PERFORMANCE_THRESHOLDS } from "@/constants/performance";
import { COLOR_PALETTE } from "@/constants/colors";

type PerformanceTier = {
  threshold: number;
  color: string;
};

const PERFORMANCE_TIERS: PerformanceTier[] = [
  {
    threshold: PERFORMANCE_THRESHOLDS.EXCELLENT,
    color: COLOR_PALETTE.performance.excellent,
  },
  {
    threshold: PERFORMANCE_THRESHOLDS.GOOD,
    color: COLOR_PALETTE.performance.good,
  },
  {
    threshold: PERFORMANCE_THRESHOLDS.AVERAGE,
    color: COLOR_PALETTE.performance.average,
  },
  {
    threshold: 0,
    color: COLOR_PALETTE.performance.poor,
  },
];

const getPerformanceTier = (score: number): PerformanceTier =>
  PERFORMANCE_TIERS.find((tier) => score >= tier.threshold) ||
  PERFORMANCE_TIERS[PERFORMANCE_TIERS.length - 1];

export const getScoreColor = (score: number): string =>
  getPerformanceTier(score).color;

export const extractScoreValue = (
  score: number | { actual: number; total: number } | undefined,
  totalMarks?: number,
): number => {
  if (
    typeof score === "object" &&
    score !== null &&
    typeof score.actual === "number" &&
    typeof score.total === "number" &&
    score.total > 0
  ) {
    return (score.actual / score.total) * 100;
  }
  if (
    typeof score === "number" &&
    typeof totalMarks === "number" &&
    totalMarks > 0
  ) {
    return (score / totalMarks) * 100;
  }
  if (typeof score === "number") {
    return score;
  }
  return 0;
};

export const formatScoreDisplay = (
  score: number | { actual: number; total: number } | undefined,
  totalMarks?: number,
): string => extractScoreValue(score, totalMarks).toFixed(1);
