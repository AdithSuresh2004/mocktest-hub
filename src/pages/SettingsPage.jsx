import { useSettingsPage } from '@/hooks/settings/useSettingsPage'
import ConfirmModal from '@/components/common/ConfirmModal'
import SuccessAlert from '@/components/settings/SuccessAlert'
import AppearanceSection from '@/components/settings/AppearanceSection'
import PreferencesSection from '@/components/settings/PreferencesSection'
import DataManagementSection from '@/components/settings/DataManagementSection'
import PageHeader from '@/components/common/PageHeader'
import Button from '@/components/common/Button'

const SettingsPage = () => {
  const {
    theme,
    toggleTheme,
    isOpen,
    config,
    closeConfirm,
    notifications,
    setNotifications,
    autoSave,
    setAutoSave,
    streakGoals,
    setStreakGoals,
    showSaveSuccess,
    handleSave,
    handleExportData,
    handleImportData,
    handleClearWithConfirm,
  } = useSettingsPage() || {}

  return (
    <div className="min-h-full animate-fadeIn bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
      {isOpen && (
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
      )}
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="Settings"
          description="Manage your app preferences"
        />
        <div className="mt-8 space-y-10">
          <SuccessAlert show={showSaveSuccess} />
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
            onExport={handleExportData}
            onImport={handleImportData}
            onClearData={handleClearWithConfirm}
          />
          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
