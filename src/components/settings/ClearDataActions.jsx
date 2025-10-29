import React from 'react';
import { FaTrash } from 'react-icons/fa';
import Button from '@/components/common/Button';

const ClearDataActions = ({ onClearData }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* DataStatsDisplay will go here */}
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
            Storage Used
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {(JSON.stringify(localStorage).length / 1024).toFixed(1)} KB
          </div>
        </div>

        <button
          onClick={onClearData}
          className="flex w-full items-center justify-start gap-3 rounded-lg border-2 border-red-200 bg-red-50 px-4 py-3 font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
        >
          <FaTrash className="h-4 w-4" />
          <div className="text-left">
            <div className="text-sm font-medium">Clear All Data</div>
            <div className="text-xs opacity-75">Delete everything</div>
          </div>
        </button>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          What gets deleted?
        </h4>
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <li>• All completed test attempts and scores</li>
          <li>• Performance history and analytics</li>
          <li>• Personal settings and preferences</li>
          <li>• Streak data and achievements</li>
        </ul>
      </div>
    </div>
  );
};
