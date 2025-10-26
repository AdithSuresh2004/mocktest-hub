const LoadingSpinner = ({ size = 'md', fullScreen = false, message = 'Loading...' }) => {
  const sizes = {
    sm: 'h-8 w-8 border-2',
    md: 'h-12 w-12 border-3',
    lg: 'h-16 w-16 border-4',
  };

  const containerClass = fullScreen
    ? 'flex min-h-full flex-col items-center justify-center gap-4 animate-fadeIn'
    : 'flex items-center justify-center gap-4 animate-fadeIn';

  return (
    <div className={containerClass}>
      <div
        className={`${sizes[size]} animate-spin rounded-full border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400`}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
