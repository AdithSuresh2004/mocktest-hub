import { useDashboardStats } from '@/hooks/dashboard/useDashboardStats'
import { useRecentActivity } from '@/hooks/dashboard/useRecentActivity'
import { useAttempts } from '@/hooks/attempts'
import { calculateAttemptStats } from '@/utils/calculations/attemptStats';
import { calculatePerformanceOverTime } from '@/utils/calculations/resultAnalysis';


export const useDashboardData = () => {
  const { stats, loading: statsLoading, validCompleted } = useDashboardStats()
  const { recentActivity, loading: activityLoading } = useRecentActivity()
  const { originalAttempts } = useAttempts()
  console.log('validCompleted:', validCompleted);
  const attemptStats = calculateAttemptStats(originalAttempts)

  const loading = statsLoading || activityLoading

  const performanceChartData = calculatePerformanceOverTime(validCompleted);

  return {
    stats,
    validCompleted,
    recentActivity,
    attemptStats,
    performanceChartData,
    loading,
  };
}
