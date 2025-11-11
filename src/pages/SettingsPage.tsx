import { useState } from "react";
import { settingsStore } from "@/stores/settingsStore";
import { useTheme } from "@/stores/themeStore";
import { globalLoadingStore } from "@/stores/globalLoadingStore";
import { useToast } from "@/stores/toastStore";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useConfirmModal } from "@/hooks/common/useConfirmModal";
import AppearanceSection from "@/components/settings/AppearanceSection";
import PreferencesSection from "@/components/settings/PreferencesSection";
import DataManagementSection from "@/components/settings/DataManagementSection";
import PageContainer from "@/components/common/PageContainer";

const SettingsPage = () => {
  const [isClearing, setIsClearing] = useState(false);
  const [refreshStorage, setRefreshStorage] = useState(0);
  const {
    notifications,
    setNotifications,
    autoSave,
    setAutoSave,
    streakGoals,
    setStreakGoals,
    exportData,
    importData,
    clearData,
  } = settingsStore();

  const { theme, toggleTheme } = useTheme();
  const { isOpen, config, openConfirm, closeConfirm } = useConfirmModal();
  const { show, hide } = globalLoadingStore();
  const { addToast } = useToast();

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) importData(file);
  };

  const handleClearWithConfirm = () => {
    openConfirm({
      title: "Clear All Data?",
      message:
        "Are you sure you want to clear all your data? This action cannot be undone.",
      type: "danger",
      onConfirm: () => {
        setIsClearing(true);
        show("Clearing all data...");
        closeConfirm();

        setTimeout(() => {
          try {
            clearData();
            setTimeout(() => {
              hide();
              setIsClearing(false);
              setRefreshStorage((prev) => prev + 1);
              addToast({
                type: "success",
                message: "All data cleared successfully!",
                duration: 4000,
              });
            }, 800);
          } catch (error) {
            console.error("Error clearing data:", error);
            hide();
            setIsClearing(false);
            addToast({
              type: "error",
              message: "Failed to clear data. Please try again.",
              duration: 4000,
            });
          }
        }, 300);
      },
    });
  };

  return (
    <div className="animate-fadeIn">
      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          onClose={closeConfirm}
          onConfirm={config.onConfirm}
          title={config.title}
          message={config.message}
          type={config.type as "warning" | "danger" | "success"}
        />
      )}
      <PageContainer>
        <div className="space-y-10">
          <AppearanceSection theme={theme} onThemeChange={toggleTheme} />
          <PreferencesSection
            notifications={notifications}
            autoSave={autoSave}
            streakGoals={streakGoals}
            onNotificationsChange={setNotifications}
            onAutoSaveChange={setAutoSave}
            onStreakGoalsChange={setStreakGoals}
          />
          <DataManagementSection
            onExport={exportData}
            onImport={handleImportData}
            onClearData={handleClearWithConfirm}
            isClearing={isClearing}
            refreshTrigger={refreshStorage}
          />
        </div>
      </PageContainer>
    </div>
  );
};

export default SettingsPage;
