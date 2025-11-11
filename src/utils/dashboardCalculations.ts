import { Attempt, DashboardStats, StreakData, AttemptStats } from "@/types";
import { DASHBOARD_LIMITS } from "@/constants/performance";
import { calculateAttemptStats } from "@/utils/exam/attemptCalculations";
import { calculatePerformanceOverTime } from "@/utils/exam/performanceCalculations";
import {
  calculateStreakData,
  getStreakMotivation,
} from "@/utils/exam/streakCalculations";

export const computeDashboardStats = (
  allAttempts: Attempt[],
): {
  stats: DashboardStats;
  recentActivity: Attempt[];
  attemptStats: AttemptStats;
  performanceChartData: { name: string; score: number }[];
  streakData: StreakData;
  motivationMessage: string;
} => {
  const pending = allAttempts.filter((a) => a.status === "in_progress").length;
  const completed = allAttempts.filter((a) => a.status === "completed");
  const attemptStats = calculateAttemptStats(completed);

  const stats: DashboardStats = {
    totalAttempts: allAttempts.length,
    pendingTests: pending,
    completedTests: completed.length,
    averageScore: attemptStats.avgScore || 0,
    bestScore:
      attemptStats.bestScore === -Infinity ? 0 : attemptStats.bestScore,
    totalTimeSpent: completed.reduce((sum, a) => sum + (a.time_taken || 0), 0),
  };

  const recentActivity = completed
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, DASHBOARD_LIMITS.RECENT_ACTIVITY_COUNT);

  const performanceData = calculatePerformanceOverTime(completed);
  const performanceChartData = performanceData.map((item) => ({
    name: item.date,
    score: item.score,
  }));

  const streakData = calculateStreakData(completed);
  const motivationMessage = getStreakMotivation(streakData.current);

  return {
    stats,
    recentActivity,
    attemptStats,
    performanceChartData,
    streakData,
    motivationMessage,
  };
};
