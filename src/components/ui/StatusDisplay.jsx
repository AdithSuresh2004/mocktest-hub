import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export default function StatusDisplay({
  type = "loading", 
  size = 48,
  color = "text-blue-600",
  className = "",
  fullScreen = true,
  message = "",
  onRetry,
  showBackHome = false,
}) {
  const navigate = useNavigate();
  const containerClass = fullScreen
    ? `flex flex-col items-center justify-center min-h-full text-center ${className}`
    : `inline-flex items-center ${className}`;
  const handleBackHome = () => {
    navigate("/");
  };
  if (type === "error") {
    return (
      <div className={containerClass}>
        <p className="text-red-600 dark:text-red-400 text-xl mb-4">
          {message || "Something went wrong."}
        </p>
        <div className="flex gap-2 flex-wrap justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Retry
            </button>
          )}
          {showBackHome && (
            <button
              onClick={handleBackHome}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Back to Home
            </button>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={containerClass} role="status" aria-label="Loading">
      <AiOutlineLoading3Quarters
        className={`animate-spin ${color}`}
        size={size}
      />
      {message && (
        <span className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
          {message}
        </span>
      )}
      {showBackHome && (
        <button
          onClick={handleBackHome}
          className="mt-6 px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Back to Home
        </button>
      )}
    </div>
  );
}
