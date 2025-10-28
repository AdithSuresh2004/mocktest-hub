import { useTheme } from '@/contexts/ThemeContext'
import { useSettings } from '@/hooks/settings/useSettings'
import { useDataManagement } from '@/hooks/settings/useDataManagement'

export function useSettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const {
    notifications,
    setNotifications,
    autoSave,
    setAutoSave,
    streakGoals,
    setStreakGoals,
    saveSettings,
  } = useSettings()

  const {
    isOpen,
    config,
    closeConfirm,
    handleExportData,
    handleImportData,
    handleClearWithConfirm,
  } = useDataManagement()

  const handleSave = () => {
    saveSettings(theme)
  }

  return {
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
    handleSave,
    handleExportData,
    handleImportData,
    handleClearWithConfirm,
  }
}
