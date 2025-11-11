import BackupExportSection from "@/components/settings/BackupExportSection";
import RestoreImportSection from "@/components/settings/RestoreImportSection";
import DataManagementActions from "@/components/settings/DataManagementActions";

interface DataManagementSectionProps {
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearData: () => void;
  isClearing?: boolean;
  refreshTrigger?: number;
}

const DataManagementSection = ({
  onExport,
  onImport,
  onClearData,
  isClearing = false,
  refreshTrigger = 0,
}: DataManagementSectionProps) => {
  const handleExportSettings = () => {
    const settingsOnly = { ...window.localStorage };
    const dataStr = JSON.stringify(settingsOnly, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `mocktest-settings-${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.href = dataUri;
    linkElement.download = exportFileDefaultName;
    linkElement.click();
    linkElement.remove();
  };

  return (
    <div className="space-y-8">
      <BackupExportSection
        onExportAll={onExport}
        onExportSettings={handleExportSettings}
      />
      <RestoreImportSection onImport={onImport} />
      <DataManagementActions
        onClearData={onClearData}
        isClearing={isClearing}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
};

export default DataManagementSection;
