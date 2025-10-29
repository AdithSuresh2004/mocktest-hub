import { useDashboardData } from '@/hooks/dashboard/useDashboardData'
import { useSettings } from '@/hooks/settings/useSettings'
import StatsGrid from '@/components/dashboard/StatsGrid'
import RecentActivity from '@/components/dashboard/RecentActivity'
import PerformanceSnapshot from '@/components/dashboard/PerformanceSnapshot'
import ProgressTracking from '@/components/dashboard/ProgressTracking'
import ScoreDistribution from '@/components/dashboard/ScoreDistribution'
import QuickActions from '@/components/dashboard/QuickActions'
import AttemptStats from '@/components/attempts/AttemptStats'
import PageHeader from '@/components/common/PageHeader'
import FullPageSkeleton from '@/components/common/skeletons/FullPageSkeleton'

const DashboardPage = () => {
  const { stats, validCompleted, recentActivity, attemptStats, loading } =
    useDashboardData()
  const { streakGoals } = useSettings()

  if (loading) {
    return <FullPageSkeleton />
  }

  return (
    <div className="min-h-full animate-fadeIn bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="Dashboard"
          description="Welcome back! Here's your performance at a glance."
        />
        <div className="mt-8 space-y-6 md:space-y-8">
          <StatsGrid stats={stats} />

          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            <div className="lg:w-2/3">
              <AttemptStats stats={attemptStats} />
            </div>
            <div className="lg:w-1/3">
              <QuickActions />
            </div>
          </div>

          <div className="flex flex-col gap-6 xl:flex-row xl:gap-8">
            <div className="xl:w-1/3">
              <ProgressTracking stats={stats} streakGoals={streakGoals} />
            </div>
            <div className="xl:w-1/3">
              <RecentActivity activities={recentActivity} />
            </div>
            <div className="xl:w-1/3">
              <PerformanceSnapshot stats={stats} />
            </div>
          </div>

          <div>
            <ScoreDistribution completedExams={validCompleted} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
