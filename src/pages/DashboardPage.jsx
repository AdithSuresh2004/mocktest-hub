import { useDashboardStats } from '@/hooks/dashboard/useDashboardStats'
import { useRecentActivity } from '@/hooks/dashboard/useRecentActivity'
import { useAttempts, useAttemptStats } from '@/hooks/attempts'
import StatsGrid from '@/components/dashboard/StatsGrid'
import RecentActivity from '@/components/dashboard/RecentActivity'
import PerformanceSnapshot from '@/components/dashboard/PerformanceSnapshot'
import ProgressTracking from '@/components/dashboard/ProgressTracking'
import ScoreDistribution from '@/components/dashboard/ScoreDistribution'
import QuickActions from '@/components/dashboard/QuickActions'
import AttemptStats from '@/components/attempts/AttemptStats'
import PerformanceChart from '@/components/common/PerformanceChart'
import SkeletonLoader from '@/components/common/SkeletonLoader'
import PageHeader from '@/components/common/PageHeader'

const DashboardPage = () => {
  const { stats, loading: statsLoading } = useDashboardStats()
  const { recentActivity, loading: activityLoading } = useRecentActivity()
  const { originalAttempts } = useAttempts()
  const attemptStats = useAttemptStats(originalAttempts)
  const loading = statsLoading || activityLoading

  if (loading) {
    return (
      <div className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="mb-2 h-8 w-48 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-4 w-64 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
          </div>
          <div className="space-y-8">
            <SkeletonLoader type="stats" count={4} />
            <SkeletonLoader type="list" count={3} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="Dashboard"
          description="Welcome back! Here's your performance at a glance."
        />
        <div className="space-y-10">
          <StatsGrid stats={stats} />
          <QuickActions />
          <PerformanceChart />
          <AttemptStats stats={attemptStats} />
          <ProgressTracking stats={stats} />
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-2">
            <RecentActivity activities={recentActivity} />
            <PerformanceSnapshot stats={stats} />
          </div>
          <ScoreDistribution stats={stats} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
