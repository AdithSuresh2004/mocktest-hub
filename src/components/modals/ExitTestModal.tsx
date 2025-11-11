import {
  HiOutlineExclamationTriangle,
  HiInformationCircle,
} from "react-icons/hi2";
import Button from "@/components/common/Button";

interface ExitTestModalProps {
  hasAnswers: boolean;
  onSaveAndExit: () => void;
  onExitWithoutSaving: () => void;
  onCancel: () => void;
}

const ExitTestModal = ({
  hasAnswers,
  onSaveAndExit,
  onExitWithoutSaving,
  onCancel,
}: ExitTestModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="animate-in fade-in fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity duration-200"
      onMouseDown={handleBackdropClick}
    >
      <div
        className="animate-in zoom-in-95 w-full max-w-md rounded-lg bg-white p-6 shadow-2xl transition-all duration-200 dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center">
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
            <HiOutlineExclamationTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Exit Exam?
          </h3>
        </div>
        <div className="mb-6">
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            {hasAnswers
              ? "You have answered some questions. What would you like to do with your progress?"
              : "Are you sure you want to exit the exam?"}
          </p>
          {hasAnswers && (
            <div className="rounded border-l-4 border-blue-400 bg-blue-50 p-4 transition-colors duration-200 dark:bg-blue-900/30">
              <div className="flex">
                <div className="flex-shrink-0">
                  <HiInformationCircle className="h-5 w-5 text-blue-400 dark:text-blue-300" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Your progress will be saved and you can resume later from
                    where you left off.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          {hasAnswers && (
            <Button
              onClick={onSaveAndExit}
              variant="primary"
              className="w-full"
            >
              Save Progress & Exit
            </Button>
          )}
          <Button
            onClick={onExitWithoutSaving}
            variant="danger"
            className="w-full"
          >
            {hasAnswers ? "Exit Without Saving" : "Exit Exam"}
          </Button>
          <Button onClick={onCancel} variant="secondary" className="w-full">
            Continue Exam
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExitTestModal;
