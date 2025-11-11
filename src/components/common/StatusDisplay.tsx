import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Button from "@/components/common/Button";

interface StatusDisplayProps {
  type?: "loading" | "error" | "success" | "warning";
  size?: number;
  color?: string;
  className?: string;
  fullScreen?: boolean;
  message?: string;
  onRetry?: () => void;
  showBackHome?: boolean;
}

const StatusDisplay = ({
  type = "loading",
  size = 48,
  color = "text-blue-600",
  className = "",
  fullScreen = true,
  message = "",
  onRetry,
  showBackHome = false,
}: StatusDisplayProps) => {
  const navigate = useNavigate();
  const containerClass = fullScreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900"
    : `inline-flex items-center ${className}`;

  if (type === "error") {
    return (
      <div className={containerClass}>
        <p className="mb-4 text-xl text-red-600 dark:text-red-400">
          {message || "Something went wrong."}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {onRetry && (
            <Button onClick={onRetry} variant="danger">
              Retry
            </Button>
          )}
          {showBackHome && (
            <Button onClick={() => navigate("/")} variant="primary">
              Back to Home
            </Button>
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
        <span className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          {message}
        </span>
      )}
      {showBackHome && (
        <Button
          onClick={() => navigate("/")}
          variant="secondary"
          className="mt-6"
        >
          Back to Home
        </Button>
      )}
    </div>
  );
};

export default StatusDisplay;
