import { useEffect, useState, useCallback } from "react";
import { FaTrash } from "react-icons/fa";
import SettingsCard from "@/components/settings/SettingsCard";

interface DataManagementActionsProps {
  onClearData: () => void;
  isClearing?: boolean;
  refreshTrigger?: number;
}

const DataManagementActions = ({
  onClearData,
  isClearing = false,
  refreshTrigger = 0,
}: DataManagementActionsProps) => {
  const [storageUsed, setStorageUsed] = useState(0);

  const updateStorage = useCallback(() => {
    setStorageUsed(JSON.stringify(localStorage).length / 1024);
  }, []);

  useEffect(() => {
    updateStorage();

    window.addEventListener("storage", updateStorage);
    return () => window.removeEventListener("storage", updateStorage);
  }, [updateStorage]);

  useEffect(() => {
    if (refreshTrigger > 0) {
      updateStorage();
    }
  }, [refreshTrigger, updateStorage]);

  const handleClearData = useCallback(() => {
    onClearData();
  }, [onClearData]);

  return (
    <SettingsCard
      title="Data Management"
      description="Manage your data and reset your progress if needed"
      icon={FaTrash}
      iconColor="text-red-600 dark:text-red-400"
      iconBgColor="bg-red-100 dark:bg-red-900/30"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700/50">
            <div className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">
              Storage Used
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {storageUsed.toFixed(1)} KB
            </div>
          </div>

          <button
            onClick={handleClearData}
            disabled={isClearing}
            className="flex w-full items-center justify-start gap-3 rounded-lg border-2 border-red-200 bg-red-50 px-4 py-3 font-medium text-red-700 transition-colors hover:border-red-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400 dark:hover:border-red-700 dark:hover:bg-red-900/40 dark:disabled:opacity-50"
          >
            <FaTrash className="h-4 w-4" />
            <div className="text-left">
              <div className="text-sm font-medium">
                {isClearing ? "Clearing..." : "Clear All Data"}
              </div>
              <div className="text-xs font-normal opacity-75">
                {isClearing ? "Please wait..." : "Delete everything & reset"}
              </div>
            </div>
          </button>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-600">
          <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            What gets deleted?
          </h4>
          <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
            <li>• All completed test attempts and scores</li>
            <li>• Performance history and analytics</li>
            <li>• Personal settings and preferences</li>
            <li>• Streak data and achievements</li>
            <li>• Custom exams</li>
          </ul>
        </div>
      </div>
    </SettingsCard>
  );
};

export default DataManagementActions;
