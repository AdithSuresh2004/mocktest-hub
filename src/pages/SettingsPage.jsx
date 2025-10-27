import { useTheme } from '@/contexts/ThemeContext'
import { useSettings } from '@/hooks/settings/useSettings'
import { useDataManagement } from '@/hooks/settings/useDataManagement'
import { useConfirmModal } from '@/hooks/common/useConfirmModal'
import { FaCheck } from 'react-icons/fa'
import { useToast } from '@/hooks/common/useToast'
import ConfirmModal from '@/components/common/ConfirmModal'
import SuccessAlert from '@/components/settings/SuccessAlert'
import AppearanceSection from '@/components/settings/AppearanceSection'
import PreferencesSection from '@/components/settings/PreferencesSection'
import PersonalizationSection from '@/components/settings/PersonalizationSection'
import DataManagementSection from '@/components/settings/DataManagementSection'

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme()
  const { isOpen, config, openConfirm, closeConfirm } = useConfirmModal()
  const { addToast } = useToast()

  const {
    notifications,
    setNotifications,
    autoSave,
    setAutoSave,
    streakGoals,
    setStreakGoals,
    focusExams,
    setFocusExams,
    dashboardWidgets,
    setDashboardWidgets,
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
      message:
        'This will permanently delete all your attempts, favorites, and settings. This action cannot be undone.',
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
        <div className="space-y-8">
          <AppearanceSection theme={theme} onThemeChange={toggleTheme} />

          <PreferencesSection
            notifications={notifications}
            autoSave={autoSave}
            streakGoals={streakGoals}
            onNotificationsChange={setNotifications}
            onAutoSaveChange={setAutoSave}
            onStreakGoalsChange={setStreakGoals}
          />

          <PersonalizationSection
            focusExams={focusExams}
            dashboardWidgets={dashboardWidgets}
            onFocusExamsChange={setFocusExams}
            onDashboardWidgetsChange={setDashboardWidgets}
          />

          <DataManagementSection
            onExport={handleExportData}
            onImport={handleImportData}
            onClearData={handleClearWithConfirm}
          />
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
