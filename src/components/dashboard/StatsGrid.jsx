import { FaFile, FaHourglassHalf, FaHistory, FaTrophy } from "react-icons/fa";

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 bg-${color}-100 dark:bg-${color}-900/30 rounded-lg`}>
        {icon}
      </div>
    </div>
    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
    <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
  </div>
);

export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={<FaFile className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
        label="Total Attempts"
        value={stats.totalExams}
        color="blue"
      />
      <StatCard
        icon={<FaHourglassHalf className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />}
        label="Pending Tests"
        value={stats.pendingTests}
        color="yellow"
      />
      <StatCard
        icon={<FaHistory className="w-6 h-6 text-green-600 dark:text-green-400" />}
        label="Completed Tests"
        value={stats.completedTests}
        color="green"
      />
      <StatCard
        icon={<FaTrophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
        label="Average Score"
        value={`${stats.averageScore}%`}
        color="purple"
      />
    </div>
  );
}
