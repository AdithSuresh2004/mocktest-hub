import React from "react";
import StatusDisplay from "@/components/common/StatusDisplay";
import PageLoader from "@/components/common/PageLoader";

type PageStatusProps = {
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  loadingMessage?: string;
  children?: React.ReactNode;
};

const PageStatus: React.FC<PageStatusProps> = ({
  loading = false,
  error = null,
  onRetry,
  loadingMessage = "Loading...",
  children,
}) => {
  if (loading) {
    return <PageLoader message={loadingMessage} fullScreen />;
  }
  if (error) {
    return (
      <StatusDisplay
        type="error"
        message={error}
        onRetry={onRetry}
        fullScreen
      />
    );
  }
  return <>{children}</>;
};

export default PageStatus;
