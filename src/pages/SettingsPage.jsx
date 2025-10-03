import { FaCheck } from 'react-icons/fa'
import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useSettings } from '@/hooks/settings/useSettings'
import { useDataManagement } from '@/hooks/settings/useDataManagement'
import { useConfirmModal } from '@/hooks/common/useConfirmModal'
import { useToast } from '@/hooks/common/useToast'
import AppearanceSection from '@/components/settings/AppearanceSection'
import PreferencesSection from '@/components/settings/PreferencesSection'
import DataManagementSection from '@/components/settings/DataManagementSection'
import ExamSourcesSection from '@/components/settings/ExamSourcesSection'
import SuccessAlert from '@/components/settings/SuccessAlert'
import ConfirmModal from '@/components/common/ConfirmModal'

export default function SettingsPage() {
  const [currentTheme, setCurrentTheme] = useState('light')
  const { theme, toggleTheme } = useTheme()
  const { isOpen, config, openConfirm, closeConfirm } = useConfirmModal()
  const { addToast } = useToast()
  
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
    addToast({
      type: 'success',
      message: 'Settings saved successfully!',
    })
  }
  
  const handleClearWithConfirm = () => {
    openConfirm({
      title: 'Clear All Data?',
      message: 'This will permanently delete all your attempts, favorites, and settings. This action cannot be undone.',
      confirmText: 'Clear All Data',
      cancelText: 'Cancel',
      type: 'danger',
      onConfirm: () => {
        handleClearData()
        addToast({
          type: 'success',
          message: 'All data cleared successfully',
        })
      },
    })
  }

  return (
    <div className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
      <ConfirmModal
        isOpen={isOpen}
        onClose={closeConfirm}
        onConfirm={config.onConfirm}
        title={config.title}
        message={config.message}
        confirmText={config.confirmText}
        cancelText={config.cancelText}
        type={config.type}
      />
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
          
          <ExamSourcesSection />
          
          <PreferencesSection
            notifications={notifications}
            autoSave={autoSave}
            onNotificationsChange={setNotifications}
            onAutoSaveChange={setAutoSave}
          />
          <DataManagementSection
            onExport={handleExportData}
            onImport={handleImportData}
            onClearData={handleClearWithConfirm}
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
