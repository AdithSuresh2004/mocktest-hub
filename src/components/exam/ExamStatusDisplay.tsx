import SkeletonLoader from "@/components/common/SkeletonLoader";
import StatusDisplay from "@/components/common/StatusDisplay";
import Button from "@/components/common/Button";
import type { ExamStatusDisplayProps } from "@/types/components-props";

const ExamStatusDisplay = ({
  loading,
  error,
  isSubmitted,
  exam,
  currentQ,
}: ExamStatusDisplayProps) => {
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 dark:bg-gray-900">
        <SkeletonLoader type="exam" count={1} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-4 p-4 text-center">
        <p className="text-lg text-red-600 sm:text-xl dark:text-red-400">
          {error}
        </p>
        <Button onClick={() => (window.location.href = "/")} variant="primary">
          Back to Home
        </Button>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <StatusDisplay
        type="loading"
        message="Submitting exam and preparing results..."
        fullScreen
      />
    );
  }

  if (!exam || !currentQ) {
    return (
      <StatusDisplay
        type="error"
        message="Exam data is incomplete or invalid."
        fullScreen
      />
    );
  }

  return null;
};

export default ExamStatusDisplay;
