import { getColorFromPalette } from "@/constants/colors";

export {
  getScoreColor,
  getPerformanceLabel,
  getPerformanceBadgeVariant,
  getPerformanceCategory,
  extractScoreValue,
  formatScoreDisplay,
  getAttemptStatusVariant,
} from "@/services/performanceService";

export const getQuestionStatusColor = (status: string): string =>
  getColorFromPalette("status", status);
export const getDifficultyColor = (difficulty?: string): string =>
  getColorFromPalette("difficulty", difficulty);
export const getCategoryColor = (category?: string): string =>
  getColorFromPalette("category", category);
