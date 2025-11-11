import { FaClock, FaCheckCircle, FaChartLine } from "react-icons/fa";
import { formatDuration } from "@/utils/formatters";
import { calculateAttemptStats } from "@/utils/exam/attemptCalculations";
import HighlightCard from "@/components/common/HighlightCard";
import Card from "@/components/common/Card";

interface AttemptStatsProps {
  stats: ReturnType<typeof calculateAttemptStats>;
}

const AttemptStats: React.FC<AttemptStatsProps> = ({ stats }) => {
  const formatScore = (value: number) =>
    Number.isFinite(value) ? `${Number(value).toFixed(1)}%` : "0.0%";

  const highlights = !stats
    ? []
    : [
        {
          icon: <FaCheckCircle />,
          label: "Completed Tests",
          value: stats.count ?? 0,
          caption: "Total exams you have finished",
          accent:
            "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300",
        },
        {
          icon: <FaChartLine />,
          label: "Average Score",
          value: formatScore(stats.avgScore),
          caption: "Consistent performance across attempts",
          accent:
            "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300",
        },
        {
          icon: <FaClock />,
          label: "Typical Time Spent",
          value: formatDuration(stats.avgTime ?? 0),
          caption: "Average completion time per exam",
          accent:
            "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300",
        },
      ];

  if (!highlights.length) return null;

  return (
    <section className="mb-10 h-full">
      <Card
        variant="default"
        padding="md"
        className="flex h-full flex-col rounded-3xl"
      >
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Attempt Statistics
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track how your preparation is progressing across completed tests.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
          {highlights.map((stat, index) => (
            <HighlightCard key={index} {...stat} />
          ))}
        </div>
      </Card>
    </section>
  );
};

export default AttemptStats;
