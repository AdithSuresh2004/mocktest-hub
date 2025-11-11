import { useEffect } from "react";
import { useFocusTrap } from "@/hooks/common/useFocusTrap";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import Button from "@/components/common/Button";

interface SubmissionModalProps {
  answeredCount: number;
  totalQuestions: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const SubmissionModal = ({
  answeredCount,
  totalQuestions,
  onConfirm,
  onCancel,
}: SubmissionModalProps) => {
  const unansweredCount = totalQuestions - answeredCount;
  const containerRef = useFocusTrap<HTMLDivElement>(true);
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onCancel]);
  return (
    <div
      className="animate-in fade-in fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity duration-200"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="submit-modal-title"
    >
      <div
        ref={containerRef}
        className="animate-in zoom-in-95 w-full max-w-md rounded-lg bg-white p-6 shadow-2xl transition-all duration-200 dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center">
          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
            <HiOutlineExclamationTriangle
              className="h-6 w-6 text-yellow-600 dark:text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <h3
            id="submit-modal-title"
            className="text-lg font-semibold text-gray-900 dark:text-gray-100"
          >
            Submit Exam?
          </h3>
        </div>
        <div className="mb-6">
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Are you sure you want to submit your exam? This action cannot be
            undone.
          </p>
          <div
            className="rounded-lg bg-gray-50 p-4 transition-colors duration-200 dark:bg-gray-700"
            role="status"
            aria-live="polite"
          >
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div className="flex flex-col items-center">
                <span className="block text-2xl font-bold text-green-600 dark:text-green-400">
                  {answeredCount}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  Answered
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="block text-2xl font-bold text-red-600 dark:text-red-400">
                  {unansweredCount}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  Unanswered
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={onCancel}
            variant="secondary"
            className="flex-1"
            aria-label="Cancel submission and continue exam"
          >
            Continue Exam
          </Button>
          <Button
            onClick={onConfirm}
            variant="danger"
            className="flex-1"
            aria-label="Submit exam now"
          >
            Submit Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;
