import { useDashboardStats } from '@/hooks/dashboard/useDashboardStats'
import { useRecentActivity } from '@/hooks/dashboard/useRecentActivity'
import StatsGrid from '@/components/dashboard/StatsGrid'
import RecentActivity from '@/components/dashboard/RecentActivity'
import PerformanceSnapshot from '@/components/dashboard/PerformanceSnapshot'
import QuickActions from '@/components/dashboard/QuickActions'
import SkeletonLoader from '@/components/common/SkeletonLoader'
import { Link } from 'react-router-dom'

export default function DashboardPage() {
  const { stats, loading: statsLoading } = useDashboardStats()
  const { recentActivity, loading: activityLoading } = useRecentActivity()

  const loading = statsLoading || activityLoading

  return (
    <div className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome back! Here's your performance at a glance.
          </p>
        </div>

        {loading ? (
          <div className="space-y-8">
            <SkeletonLoader type="stats" count={1} />
            <SkeletonLoader type="list" count={1} />
          </div>
        ) : (
          <div className="space-y-8">
            <StatsGrid stats={stats} />
            <QuickActions />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <RecentActivity activities={recentActivity} />
              <PerformanceSnapshot stats={stats} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
