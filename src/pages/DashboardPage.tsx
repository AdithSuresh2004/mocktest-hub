import { useMemo } from "react";
import { attemptStore } from "@/stores/attemptStore";
import { computeDashboardStats } from "@/utils/dashboardCalculations";
import { examListStore } from "@/stores/examListStore";
import { enrichAttempts } from "@/utils/attemptsHelpers";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentActivity from "@/components/dashboard/RecentActivity";
import PerformanceSnapshot from "@/components/dashboard/PerformanceSnapshot";
import ProgressTracking from "@/components/dashboard/ProgressTracking";
import ScoreDistribution from "@/components/dashboard/ScoreDistribution";
import QuickActions from "@/components/dashboard/QuickActions";
import AttemptStats from "@/components/attempts/AttemptStats";
import PageContainer from "@/components/common/PageContainer";
import PerformanceChart from "@/components/dashboard/PerformanceChart";

const DashboardPage = () => {
  const { attempts } = attemptStore();
  const { exams, loadExams } = examListStore();
  // Load exams if not loaded
  useMemo(() => {
    if (!exams.length) loadExams();
  }, [exams.length, loadExams]);
  const allAttempts = useMemo(() => Object.values(attempts), [attempts]);
  const enrichedAttempts = useMemo(
    () => enrichAttempts(allAttempts, exams),
    [allAttempts, exams],
  );
  const { stats, recentActivity, attemptStats, performanceChartData } = useMemo(
    () => computeDashboardStats(enrichedAttempts),
    [enrichedAttempts],
  );

  return (
    <PageContainer className="animate-fadeIn">
      <div className="space-y-6 md:space-y-8">
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
            <ProgressTracking />
          </div>
          <div className="xl:w-1/3">
            <RecentActivity activities={recentActivity} />
          </div>
          <div className="xl:w-1/3">
            <PerformanceSnapshot stats={stats} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <ScoreDistribution completedExams={recentActivity} />
          <PerformanceChart data={performanceChartData} />
        </div>
      </div>
    </PageContainer>
  );
};

export default DashboardPage;
