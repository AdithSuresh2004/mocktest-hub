import { useDashboardStats } from '@/hooks/dashboard/useDashboardStats'
import { useRecentActivity } from '@/hooks/dashboard/useRecentActivity'
import { useAttempts } from '@/hooks/attempts'
import { calculateAttemptStats } from '@/utils/calculations/attemptStats'

export const useDashboardData = () => {
  const { stats, loading: statsLoading, validCompleted } = useDashboardStats()
  const { recentActivity, loading: activityLoading } = useRecentActivity()
  const { originalAttempts } = useAttempts()
  const attemptStats = calculateAttemptStats(originalAttempts)

  const loading = statsLoading || activityLoading

  return {
    stats,
    validCompleted,
    recentActivity,
    attemptStats,
    loading,
  }
}
