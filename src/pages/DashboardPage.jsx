import { useDashboardStats } from "@/hooks/useDashboard/useDashboardStats";
import { useRecentActivity } from "@/hooks/useDashboard/useRecentActivity";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function DashboardPage() {
  const { stats, loading: statsLoading } = useDashboardStats();
  const { recentActivity, loading: activityLoading } = useRecentActivity();

  const loading = statsLoading || activityLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Track your exam progress and performance</p>
        </div>
        <StatsGrid stats={stats} />
        <RecentActivity activities={recentActivity} />
      </div>
    </div>
  );
}