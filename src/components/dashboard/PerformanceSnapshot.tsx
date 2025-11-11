import { FaTrophy, FaCheckDouble, FaClock, FaChartPie } from "react-icons/fa";
import Section from "@/components/common/Section";
import MetricCard from "@/components/dashboard/MetricCard";
import type { PerformanceSnapshotProps } from "@/types/components-props";

const PerformanceSnapshot = ({ stats }: PerformanceSnapshotProps) => {
  const completionRate = stats.totalAttempts > 0 ? "100" : "0";
  const avgTimeInMinutes =
    stats.totalAttempts > 0
      ? Math.round(stats.totalTimeSpent / stats.totalAttempts / 60)
      : 0;

  return (
    <Section
      title="Performance Snapshot"
      icon={FaChartPie}
      iconColor="text-green-600 dark:text-green-400"
      iconBgColor="bg-green-100 dark:bg-green-900/30"
      className="flex h-full flex-col"
    >
      <div className="grid flex-1 content-evenly gap-4">
        <MetricCard
          Icon={FaTrophy}
          label="Best Score"
          value={`${stats.bestScore}%`}
          color="green"
          variant="prominent"
        />
        <MetricCard
          Icon={FaCheckDouble}
          label="Completion Rate"
          value={`${completionRate}%`}
          color="blue"
          variant="prominent"
        />
        <MetricCard
          Icon={FaClock}
          label="Avg Time Per Test"
          value={`${avgTimeInMinutes} min`}
          color="purple"
          variant="prominent"
        />
      </div>
    </Section>
  );
};

export default PerformanceSnapshot;
