import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useSettings } from "@/hooks/useSettings";
import { useDataManagement } from "@/hooks/useDataManagement";
import AppearanceSection from "@/components/settings/AppearanceSection";
import PreferencesSection from "@/components/settings/PreferencesSection";
import DataManagementSection from "@/components/settings/DataManagementSection";
import SuccessAlert from "@/components/settings/SuccessAlert";
export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const {
    notifications,
    setNotifications,
    autoSave,
    setAutoSave,
    showSaveSuccess,
    saveSettings
  } = useSettings();
  const {
    handleExportData,
    handleImportData,
    handleClearData
  } = useDataManagement();
  const handleSave = () => {
    saveSettings(theme);
  };
  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your app preferences</p>
        </div>
        <SuccessAlert show={showSaveSuccess} />
        <div className="space-y-6">
          <AppearanceSection
            theme={theme}
            onThemeChange={toggleTheme}
          />
          <PreferencesSection
            notifications={notifications}
            autoSave={autoSave}
            onNotificationsChange={setNotifications}
            onAutoSaveChange={setAutoSave}
          />
          <DataManagementSection
            onExport={handleExportData}
            onImport={handleImportData}
            onClearData={handleClearData}
          />
        </div>
        <button
          onClick={handleSave}
          className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg transition-all"
        >
          <FaCheck className="w-5 h-5" />
          Save Settings
        </button>
      </div>
    </div>
  );
}