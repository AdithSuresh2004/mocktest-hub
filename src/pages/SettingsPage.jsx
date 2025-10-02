import { FaCheck } from 'react-icons/fa'
import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useSettings } from '@/hooks/settings/useSettings'
import { useDataManagement } from '@/hooks/settings/useDataManagement'
import AppearanceSection from '@/components/settings/AppearanceSection'
import PreferencesSection from '@/components/settings/PreferencesSection'
import DataManagementSection from '@/components/settings/DataManagementSection'
import SuccessAlert from '@/components/settings/SuccessAlert'
export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const {
    notifications,
    setNotifications,
    autoSave,
    setAutoSave,
    showSaveSuccess,
    saveSettings,
  } = useSettings()
  const { handleExportData, handleImportData, handleClearData } =
    useDataManagement()
  const handleSave = () => {
    saveSettings(theme)
  }
  return (
    <div className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Settings
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your app preferences
          </p>
        </div>
        <SuccessAlert show={showSaveSuccess} />
        <div className="space-y-6">
          <AppearanceSection theme={theme} onThemeChange={toggleTheme} />
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
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-800"
        >
          <FaCheck className="h-5 w-5" />
          Save Settings
        </button>
      </div>
    </div>
  )
}
