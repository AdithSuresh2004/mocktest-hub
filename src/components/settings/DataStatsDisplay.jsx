import React from 'react';

const DataStatsDisplay = () => {
  return (
    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
        Storage Used
      </div>
      <div className="text-xs text-gray-600 dark:text-gray-400">
        {(JSON.stringify(localStorage).length / 1024).toFixed(1)} KB
      </div>
    </div>
  );
};

export default DataStatsDisplay;
