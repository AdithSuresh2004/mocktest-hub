import React from 'react'
import { FaChartLine, FaBullseye, FaTrophy } from 'react-icons/fa'

const PerformanceSnapshot = ({ stats }) => {
  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
        Performance Snapshot
      </h2>
      <div className="grid flex-grow grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-700/50">
          <FaTrophy className="mb-2 h-8 w-8 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Average Score
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.averageScore.toFixed(1)}%
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-700/50">
          <FaChartLine className="mb-2 h-8 w-8 text-green-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Best Score
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.highScore.toFixed(1)}%
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-700/50">
          <FaBullseye className="mb-2 h-8 w-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Average Accuracy
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.averageAccuracy.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerformanceSnapshot
