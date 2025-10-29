import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ReviewNavigationControls = ({ onPrev, onNext, isFirst, isLast }) => {
  return (
    <div className="flex-shrink-0 border-t border-gray-200 p-6 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <FaArrowLeft />
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={isLast}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ReviewNavigationControls;
