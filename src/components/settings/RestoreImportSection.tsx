import { FaUpload, FaHistory, FaExclamationTriangle } from "react-icons/fa";
import SettingsCard from "@/components/settings/SettingsCard";

interface RestoreImportSectionProps {
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RestoreImportSection = ({ onImport }: RestoreImportSectionProps) => (
  <SettingsCard
    title="Restore & Import"
    description="Restore your data from previous backups"
    icon={FaHistory}
    iconColor="text-amber-600 dark:text-amber-400"
    iconBgColor="bg-amber-100 dark:bg-amber-900/30"
  >
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
        <FaExclamationTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Important Note
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Importing will overwrite your current data. Make sure to create a
            backup first!
          </p>
        </div>
      </div>

      <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-3 font-medium text-white transition-colors hover:bg-purple-700">
        <FaUpload className="h-4 w-4" />
        Import Backup File
        <input
          type="file"
          accept=".json"
          onChange={onImport}
          className="hidden"
        />
      </label>
    </div>
  </SettingsCard>
);

export default RestoreImportSection;
