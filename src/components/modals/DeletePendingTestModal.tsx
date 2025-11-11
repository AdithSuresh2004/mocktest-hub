import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import Button from "@/components/common/Button";

interface DeletePendingTestModalProps {
  testName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeletePendingTestModal: React.FC<DeletePendingTestModalProps> = ({
  testName,
  onConfirm,
  onCancel,
}) => {
  return (
    <div
      className="animate-in fade-in fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm transition-opacity duration-200"
      onClick={onCancel}
    >
      <div
        className="animate-in zoom-in-95 w-full max-w-md rounded-lg bg-white p-6 shadow-2xl transition-all duration-200 dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center">
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <HiOutlineExclamationTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Delete Pending Test?
          </h3>
        </div>
        <div className="mb-6">
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            Are you sure you want to delete this pending test?
          </p>
          {testName && (
            <p className="font-medium text-gray-900 dark:text-gray-100">
              "{testName}"
            </p>
          )}
          <p className="mt-3 text-sm text-red-600 dark:text-red-400">
            All your progress will be permanently lost. This action cannot be
            undone.
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={onCancel} variant="secondary" className="flex-1">
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="danger" className="flex-1">
            Delete Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeletePendingTestModal;
