interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  message?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  fullScreen = false,
  message = "Loading...",
  className = "",
}) => {
  const sizes = {
    sm: "h-8 w-8 border-2",
    md: "h-12 w-12 border-3",
    lg: "h-16 w-16 border-4",
  };

  const containerClass = fullScreen
    ? "fixed inset-0 flex flex-col items-center justify-center gap-4 bg-gray-100 dark:bg-gray-900 animate-fadeIn z-50"
    : `flex items-center justify-center gap-4 animate-fadeIn ${className}`;

  return (
    <div className={containerClass}>
      <div
        className={`${sizes[size]} animate-spin rounded-full border-gray-300 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400`}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className="text-base font-medium text-gray-700 dark:text-gray-300">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
