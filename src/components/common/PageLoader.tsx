import React from "react";

type PageLoaderProps = {
  message?: string;
  fullScreen?: boolean;
  className?: string;
};

const PageLoader: React.FC<PageLoaderProps> = ({
  message = "Loading...",
  fullScreen = true,
  className = "",
}) => {
  const container = fullScreen
    ? "fixed inset-0 z-[60] flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950"
    : `flex items-center justify-center ${className}`;

  return (
    <div
      className={`${container} animate-fadeIn`}
      role="status"
      aria-label="Loading"
    >
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative h-24 w-24 sm:h-28 sm:w-28">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-cyan-400 to-indigo-500 opacity-20 blur-lg" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-indigo-500" />
          <div className="absolute inset-3 animate-[spin_2s_linear_infinite] rounded-full border-4 border-transparent border-b-cyan-500" />
          <div className="absolute inset-6 rounded-full bg-white/70 backdrop-blur-sm dark:bg-gray-800/70" />
        </div>
        {message && (
          <div className="mt-5 text-center">
            <p className="text-base font-medium text-gray-700 dark:text-gray-200">
              {message}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Please wait a moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageLoader;
