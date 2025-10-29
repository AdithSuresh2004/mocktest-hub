import React from 'react';

const ResultAccuracyBar = ({ accuracy, label }) => (
  <div>
    <div className="mb-2 flex items-center justify-between">
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 sm:text-base">
        {label}
      </span>
      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 sm:text-base tabular-nums">
        {parseFloat(accuracy).toFixed(1)}%
      </span>
    </div>
    <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-1000 ease-out"
        style={{ width: `${parseFloat(accuracy)}%` }}
      />
    </div>
  </div>
);

export default ResultAccuracyBar;
