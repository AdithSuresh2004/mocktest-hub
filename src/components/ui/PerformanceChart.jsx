import { useMemo } from 'react';
import { Line } from 'recharts';
import { storage } from '@/services/storageService';
export function PerformanceChart({ examType = 'all', days = 30 }) {
  const chartData = useMemo(() => {
    const attempts = storage.getAttempts()
      .filter(a => a.status === 'completed')
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return attempts
      .filter(a => new Date(a.timestamp) >= cutoffDate)
      .map(a => ({
        date: new Date(a.timestamp).toLocaleDateString(),
        score: a.score || 0,
        time: Math.floor((a.time_taken || 0) / 60)
      }));
  }, [days]);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Performance Trend (Last {days} days)
      </h3>
      {chartData.length > 0 ? (
        <div className="h-64">
          <Line
            data={chartData}
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
          No data available for this period
        </p>
      )}
    </div>
  );
}