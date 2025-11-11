import React from "react";
import { THEME_CLASSES } from "@/constants/ui-config";
import Button from "@/components/common/Button";

interface ErrorDisplayProps {
  message: string;
  onAction?: () => void;
  fullScreen?: boolean;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message,
  onAction,
  fullScreen,
}) => {
  const containerClasses = fullScreen
    ? "flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900"
    : "";

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold text-red-600 dark:text-red-400">
          An Error Occurred
        </h1>
        <p className={`text-sm ${THEME_CLASSES.text.secondary}`}>{message}</p>
        {onAction && (
          <div className="mt-6">
            <Button onClick={onAction} variant="primary">
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;
