import { Link } from "react-router-dom";
import { FaSync, FaHome, FaBug, FaRedo } from "react-icons/fa";
import Button from "@/components/common/Button";

const DEFAULT_ERROR_MESSAGE = "An unexpected error occurred";

interface ErrorFallbackProps {
  error?: Error | null;
  errorInfo?: React.ErrorInfo | { componentStack?: string | null } | null;
  errorId?: string | null;
  handleReset?: () => void;
  fallbackUI?: React.ReactNode;
}

const ErrorFallback = ({
  error,
  errorInfo,
  errorId,
  handleReset,
  fallbackUI,
}: ErrorFallbackProps) => {
  if (fallbackUI === "inline") {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-red-300 bg-red-50 p-8 dark:border-red-700 dark:bg-red-900/20">
        <h2 className="mb-2 text-2xl font-bold text-red-600 dark:text-red-400">
          Error Loading Content
        </h2>
        <p className="mb-4 text-center text-gray-700 dark:text-gray-300">
          {error?.message || DEFAULT_ERROR_MESSAGE}
        </p>
        {errorId && (
          <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
            Error ID: {errorId}
          </p>
        )}
        <div className="flex gap-3">
          <Button
            onClick={handleReset}
            variant="primary"
            aria-label="Try again to reload content"
          >
            Try Again
          </Button>
          <Button
            as={Link}
            to="/"
            variant="secondary"
            aria-label="Navigate to home page"
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      role="alert"
    >
      <div className="max-w-2xl text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-24 w-24 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="mb-4 text-4xl font-bold text-red-500">
          Something went wrong
        </h1>

        <p className="mb-2 text-lg text-gray-600 dark:text-gray-400">
          {error?.message || DEFAULT_ERROR_MESSAGE}
        </p>

        <p className="mb-8 text-gray-500 dark:text-gray-500">
          Don't worry, your data is safe. Try one of the options below:
        </p>

        {errorId && (
          <p className="mb-4 text-sm text-gray-400 dark:text-gray-500">
            Error ID:{" "}
            <code className="rounded bg-gray-200 px-2 py-1 dark:bg-gray-800">
              {errorId}
            </code>
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => window.location.reload()}
            variant="primary"
            size="lg"
            aria-label="Reload the entire page"
            className="flex items-center gap-2"
          >
            <FaSync className="h-4 w-4" />
            Refresh Page
          </Button>

          <Button
            onClick={handleReset}
            variant="success"
            size="lg"
            aria-label="Try to recover from the error"
            className="flex items-center gap-2"
          >
            <FaRedo className="h-4 w-4" />
            Try Again
          </Button>

          <Button
            as={Link}
            to="/"
            variant="secondary"
            size="lg"
            aria-label="Go to home page"
            className="flex items-center gap-2"
          >
            <FaHome className="h-4 w-4" />
            Go Home
          </Button>

          <Button
            as="a"
            href={`https://github.com/adith-ya/mocktest-hub/issues/new?title=Bug%20Report&body=Error%20ID:%20${errorId}%0A%0A**Error%20Message:**%0A${error?.message}%0A%0A**Component%20Stack:**%0A${errorInfo?.componentStack}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="danger"
            size="lg"
            aria-label="Report a bug on GitHub"
            className="flex items-center gap-2"
          >
            <FaBug className="h-4 w-4" />
            Report Bug
          </Button>
        </div>

        {errorInfo && (
          <details className="mt-8 w-full rounded-lg bg-gray-200 p-4 text-left dark:bg-gray-800">
            <summary className="flex cursor-pointer items-center gap-2 font-semibold text-red-600 dark:text-red-400">
              <FaBug className="h-4 w-4" />
              Error Details (Development Only)
            </summary>
            <pre className="mt-2 overflow-auto text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-300">
              {error && error.toString()}
              {`\n\n`}
              {errorInfo && errorInfo.componentStack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

export default ErrorFallback;
