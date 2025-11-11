import { useState } from "react";
import { FaChartLine, FaChartBar, FaChartArea } from "react-icons/fa";
import Section from "@/components/common/Section";
import { formatDate } from "@/utils/formatters";
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  AreaChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface PerformanceData {
  name: string;
  score: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
}

const PerformanceChart = ({ data }: PerformanceChartProps) => {
  const [chartType, setChartType] = useState<"line" | "bar" | "area">("line");

  const chartData =
    data?.map((item) => ({
      date: item.name,
      score: item.score,
    })) || [];

  const tickFormatter = (value: string) => {
    return formatDate(value);
  };

  const chartTypeButtons = (
    <div className="flex gap-2">
      <button
        onClick={() => setChartType("line")}
        className={`rounded-lg p-2 transition-colors ${
          chartType === "line"
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        }`}
        title="Line Chart"
        aria-label="Switch to line chart"
      >
        <FaChartLine className="h-4 w-4" />
      </button>
      <button
        onClick={() => setChartType("bar")}
        className={`rounded-lg p-2 transition-colors ${
          chartType === "bar"
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        }`}
        title="Bar Chart"
        aria-label="Switch to bar chart"
      >
        <FaChartBar className="h-4 w-4" />
      </button>
      <button
        onClick={() => setChartType("area")}
        className={`rounded-lg p-2 transition-colors ${
          chartType === "area"
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        }`}
        title="Area Chart"
        aria-label="Switch to area chart"
      >
        <FaChartArea className="h-4 w-4" />
      </button>
    </div>
  );

  if (!data || data.length === 0) {
    return (
      <Section
        title="Performance Over Time"
        icon={FaChartLine}
        iconColor="text-indigo-600 dark:text-indigo-400"
        iconBgColor="bg-indigo-100 dark:bg-indigo-900/30"
        className="flex h-full flex-col"
      >
        <div className="flex h-72 items-center justify-center">
          <p className="text-center text-gray-600 dark:text-gray-400">
            Not enough data to display performance chart.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section
      title="Performance Over Time"
      icon={FaChartLine}
      actions={chartTypeButtons}
      iconColor="text-indigo-600 dark:text-indigo-400"
      iconBgColor="bg-indigo-100 dark:bg-indigo-900/30"
      className="flex h-full flex-col"
      padding="p-4 sm:p-6"
    >
      <div className="h-72 w-full flex-shrink-0">
        {chartType === "line" && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="date"
                className="text-[10px] text-gray-600 sm:text-xs dark:text-gray-400"
                tick={{ fontSize: 10 }}
                tickFormatter={tickFormatter}
              />
              <YAxis
                className="text-[10px] text-gray-600 sm:text-xs dark:text-gray-400"
                domain={[0, 100]}
                tick={{ fontSize: 10 }}
              />
              <Tooltip labelFormatter={(v) => tickFormatter(String(v))} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Score (%)"
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        {chartType === "bar" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="date"
                className="text-[10px] text-gray-600 sm:text-xs dark:text-gray-400"
                tick={{ fontSize: 10 }}
                tickFormatter={tickFormatter}
              />
              <YAxis
                className="text-[10px] text-gray-600 sm:text-xs dark:text-gray-400"
                domain={[0, 100]}
                tick={{ fontSize: 10 }}
              />
              <Tooltip labelFormatter={(v) => tickFormatter(String(v))} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar
                dataKey="score"
                fill="#3b82f6"
                name="Score (%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
        {chartType === "area" && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="date"
                className="text-[10px] text-gray-600 sm:text-xs dark:text-gray-400"
                tick={{ fontSize: 10 }}
                tickFormatter={tickFormatter}
              />
              <YAxis
                className="text-[10px] text-gray-600 sm:text-xs dark:text-gray-400"
                domain={[0, 100]}
                tick={{ fontSize: 10 }}
              />
              <Tooltip labelFormatter={(v) => tickFormatter(String(v))} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                name="Score (%)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Section>
  );
};

export default PerformanceChart;
