declare module "@/components/common/ErrorFallback" {
  import { ReactElement } from "react";
  const ErrorFallback: React.FC<{
    error: Error;
    errorInfo: React.ErrorInfo;
    errorId: string;
    handleReset?: () => void;
    fallbackUI?: ReactElement;
  }>;
  export default ErrorFallback;
}

declare module "@/components/common/ThemeToggle" {
  const ThemeToggle: React.FC;
  export default ThemeToggle;
}
