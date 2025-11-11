import {
  FaClipboardList,
  FaHourglassHalf,
  FaCheckCircle,
  FaTrophy,
} from "react-icons/fa";
import MetricCard from "@/components/dashboard/MetricCard";
import type { StatsGridProps } from "@/types/components-props";

const StatsGrid = ({ stats }: StatsGridProps) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <MetricCard
      Icon={FaClipboardList}
      label="Total Attempts"
      value={stats.totalAttempts}
      color="blue"
      variant="prominent"
    />
    <MetricCard
      Icon={FaCheckCircle}
      label="Average Score"
      value={`${stats.averageScore}%`}
      color="green"
      variant="prominent"
    />
    <MetricCard
      Icon={FaTrophy}
      label="Best Score"
      value={`${stats.bestScore}%`}
      color="yellow"
      variant="prominent"
    />
    <MetricCard
      Icon={FaHourglassHalf}
      label="Total Time"
      value={`${Math.round(stats.totalTimeSpent / 3600)}h`}
      color="purple"
      variant="prominent"
    />
  </div>
);

export default StatsGrid;
