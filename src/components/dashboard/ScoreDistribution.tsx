import { FaChartPie } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Section from "@/components/common/Section";
import Card from "@/components/common/Card";
import { calculateScoreDistribution } from "@/utils/exam/scoreDistribution";
import type { Attempt } from "@/types";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: { color: string };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <Card variant="default" padding="sm" className="shadow-lg">
        <p className="font-medium text-gray-900 dark:text-gray-100">
          {payload[0].name}
        </p>
        <p className="text-sm" style={{ color: payload[0].payload.color }}>
          Tests: {payload[0].value}
        </p>
      </Card>
    );
  }
  return null;
};

interface ScoreDistributionProps {
  completedExams: Attempt[];
}

const ScoreDistribution = ({ completedExams }: ScoreDistributionProps) => {
  if (!completedExams || completedExams.length === 0) {
    return (
      <Section
        title="Score Distribution"
        icon={FaChartPie}
        className="flex h-full flex-col"
        padding="p-4 sm:p-6"
      >
        <div className="flex h-72 w-full items-center justify-center">
          <p className="text-center text-sm text-gray-600 sm:text-base dark:text-gray-400">
            No completed exams to analyze
          </p>
        </div>
      </Section>
    );
  }

  const distribution = calculateScoreDistribution(completedExams);

  return (
    <Section
      title="Score Distribution"
      description="Breakdown of your performance across score ranges"
      icon={FaChartPie}
      className="flex h-full flex-col"
      padding="p-4 sm:p-6"
    >
      {distribution.length > 0 ? (
        <div className="flex flex-col items-center">
          <div className="h-72 w-full max-w-md flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  outerRadius="70%"
                  dataKey="value"
                >
                  {distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid w-full grid-cols-2 gap-3">
            {distribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="h-4 w-4 flex-shrink-0 rounded-full shadow-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.name}: <span className="font-bold">{item.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-72 w-full flex-shrink-0 items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
              No data available for distribution analysis
            </p>
          </div>
        </div>
      )}
    </Section>
  );
};

export default ScoreDistribution;
