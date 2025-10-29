import { useState } from 'react'
import { ResponsiveContainer } from 'recharts'
import ToggleButtons from '@/components/common/ToggleButtons'
import { usePerformanceChartData } from '@/hooks/common/usePerformanceChartData'
import ChartRenderer from './ChartRenderer'

const PerformanceChart = ({
  attempts,
  days = 30,
  initialChartType = 'area',
}) => {
  const [chartType, setChartType] = useState(initialChartType)
  const { chartData } = usePerformanceChartData(days)

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Performance Trend (Last {days} days)
        </h3>
        <ToggleButtons
          options={[
            { value: 'area', label: 'Area' },
            { value: 'line', label: 'Line' },
            { value: 'bar', label: 'Bar' },
          ]}
          value={chartType}
          onChange={setChartType}
        />
      </div>
      {chartData.length > 0 ? (
        <div
          className="h-64 w-full"
          style={{ minHeight: '256px', minWidth: '320px' }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ChartRenderer chartType={chartType} chartData={chartData} />
          </ResponsiveContainer>
        </div>
      ) : (
        <div
          className="flex h-64 w-full items-center justify-center"
          style={{ minHeight: '256px', minWidth: '320px' }}
        >
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No data available for this period
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Complete some tests to see your performance trends
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PerformanceChart
