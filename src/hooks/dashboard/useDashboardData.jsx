import { useDashboardStats } from '@/hooks/dashboard/useDashboardStats'
import { useRecentActivity } from '@/hooks/dashboard/useRecentActivity'
import { useAttempts, useAttemptStats } from '@/hooks/attempts'

export const useDashboardData = () => {
  const { stats, loading: statsLoading, validCompleted } = useDashboardStats()
  const { recentActivity, loading: activityLoading } = useRecentActivity()
  const { originalAttempts } = useAttempts()
  const attemptStats = useAttemptStats(originalAttempts)

  const loading = statsLoading || activityLoading

  return {
    stats,
    validCompleted,
    recentActivity,
    attemptStats,
    loading,
  }
}
