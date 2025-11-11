import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusDisplay from "@/components/common/StatusDisplay";

export default function ErrorPage() {
  const navigate = useNavigate();
  const [isRetrying, setIsRetrying] = useState(false);
  const retry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      navigate(0);
    }, 500);
  };
  return (
    <StatusDisplay
      type={isRetrying ? "loading" : "error"}
      message={
        isRetrying
          ? "Retrying..."
          : "404 - Page Not Found. The page you're looking for doesn't exist."
      }
      fullScreen={true}
      onRetry={!isRetrying ? retry : undefined}
      showBackHome={!isRetrying}
      size={48}
    />
  );
}
