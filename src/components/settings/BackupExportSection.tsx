import {
  FaDownload,
  FaCloudDownloadAlt,
  FaDatabase,
  FaShieldAlt,
} from "react-icons/fa";
import Button from "@/components/common/Button";
import SettingsCard from "@/components/settings/SettingsCard";

interface BackupExportSectionProps {
  onExportAll: () => void;
  onExportSettings: () => void;
}

const BackupExportSection = ({
  onExportAll,
  onExportSettings,
}: BackupExportSectionProps) => (
  <SettingsCard
    title="Backup & Export"
    description="Create backups of your data to prevent loss and easily restore your progress"
    icon={FaCloudDownloadAlt}
    iconColor="text-cyan-600 dark:text-cyan-400"
    iconBgColor="bg-cyan-100 dark:bg-cyan-900/30"
  >
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <FaDatabase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Complete Backup
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Settings + all test attempts
            </p>
          </div>
        </div>
        <Button
          onClick={onExportAll}
          variant="primary"
          className="w-full"
          icon={FaDownload}
          size="sm"
        >
          Export Complete Backup
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
          <FaShieldAlt className="h-5 w-5 text-green-600 dark:text-green-400" />
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Settings Only
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Preferences & configuration
            </p>
          </div>
        </div>
        <Button
          onClick={onExportSettings}
          variant="success"
          className="w-full"
          icon={FaDownload}
          size="sm"
        >
          Export Settings
        </Button>
      </div>
    </div>
  </SettingsCard>
);

export default BackupExportSection;
