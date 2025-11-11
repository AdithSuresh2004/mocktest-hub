import { PERFORMANCE_THRESHOLDS } from "@/constants/performance";
import { COLOR_PALETTE } from "@/constants/colors";

type PerformanceTier = {
  threshold: number;
  label: string;
  color: string;
  variant: "success" | "primary" | "warning" | "danger";
  category: string;
};

const PERFORMANCE_TIERS: PerformanceTier[] = [
  {
    threshold: PERFORMANCE_THRESHOLDS.EXCELLENT,
    label: "Excellent",
    color: COLOR_PALETTE.performance.excellent,
    variant: "success",
    category: "EXCELLENT",
  },
  {
    threshold: PERFORMANCE_THRESHOLDS.GOOD,
    label: "Good",
    color: COLOR_PALETTE.performance.good,
    variant: "primary",
    category: "GOOD",
  },
  {
    threshold: PERFORMANCE_THRESHOLDS.AVERAGE,
    label: "Average",
    color: COLOR_PALETTE.performance.average,
    variant: "warning",
    category: "AVERAGE",
  },
  {
    threshold: 0,
    label: "Needs Improvement",
    color: COLOR_PALETTE.performance.poor,
    variant: "danger",
    category: "POOR",
  },
];

const getPerformanceTier = (score: number): PerformanceTier =>
  PERFORMANCE_TIERS.find((tier) => score >= tier.threshold) ||
  PERFORMANCE_TIERS[PERFORMANCE_TIERS.length - 1];

export const getScoreColor = (score: number): string =>
  getPerformanceTier(score).color;

export const getPerformanceLabel = (percentage: number): string =>
  getPerformanceTier(percentage).label;

export const getPerformanceBadgeVariant = (
  percentage: number,
): "success" | "primary" | "warning" | "danger" =>
  getPerformanceTier(percentage).variant;

export const getPerformanceCategory = (score: number): string =>
  getPerformanceTier(score).category;

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

export const getAttemptStatusVariant = (
  status: string,
): "success" | "warning" | "default" => {
  if (status === "completed") return "success";
  if (status === "in_progress") return "warning";
  return "default";
};
