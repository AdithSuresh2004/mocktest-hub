import React from "react";
import { THEME_CLASSES } from "@/constants/ui-config";
import Button from "@/components/common/Button";

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  message,
  actionLabel,
  onAction,
  className = "",
}) => {
  return (
    <div
      className={`flex min-h-[400px] items-center justify-center p-8 ${className}`}
    >
      <div className="max-w-md text-center">
        {Icon && (
          <Icon className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600" />
        )}
        <h3
          className={`mt-6 text-xl font-semibold ${THEME_CLASSES.text.primary}`}
        >
          {title}
        </h3>
        <p className={`mt-3 text-base ${THEME_CLASSES.text.secondary}`}>
          {message}
        </p>
        {actionLabel && onAction && (
          <div className="mt-8">
            <Button onClick={onAction} variant="primary" size="lg">
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
