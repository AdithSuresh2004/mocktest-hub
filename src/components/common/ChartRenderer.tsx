import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import ChartTooltip from "@/components/common/ChartTooltip";

interface ChartData {
  date: string;
  score: number;
}

interface ChartRendererProps {
  chartType: "line" | "bar" | "area";
  chartData: ChartData[];
}

const ChartRenderer: React.FC<ChartRendererProps> = ({
  chartType,
  chartData,
}) => {
  switch (chartType) {
    case "line":
      return (
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="date"
            className="text-xs text-gray-600 dark:text-gray-400"
          />
          <YAxis
            className="text-xs text-gray-600 dark:text-gray-400"
            domain={[0, 100]}
          />
          <ChartTooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={3}
            name="Score (%)"
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      );

    case "bar":
      return (
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="date"
            className="text-xs text-gray-600 dark:text-gray-400"
          />
          <YAxis
            className="text-xs text-gray-600 dark:text-gray-400"
            domain={[0, 100]}
          />
          <ChartTooltip />
          <Legend />
          <Bar
            dataKey="score"
            fill="#3b82f6"
            name="Score (%)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      );

    case "area":
    default:
      return (
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="date"
            className="text-xs text-gray-600 dark:text-gray-400"
          />
          <YAxis
            className="text-xs text-gray-600 dark:text-gray-400"
            domain={[0, 100]}
          />
          <ChartTooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
            name="Score (%)"
          />
        </AreaChart>
      );
  }
};

export default ChartRenderer;
