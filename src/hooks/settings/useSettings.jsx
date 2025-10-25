import { useState, useEffect } from 'react'
import { SettingsStorage } from '@/utils/storage'

export function useSettings() {
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)

  useEffect(() => {
    const settings = SettingsStorage.get()
    setNotifications(settings.notifications !== false)
    setAutoSave(settings.autoSave !== false)
  }, [])

  const saveSettings = (theme) => {
    SettingsStorage.set({ theme, notifications, autoSave })
    setShowSaveSuccess(true)
    setTimeout(() => setShowSaveSuccess(false), 3000)
  }

  return {
    notifications,
    setNotifications,
    autoSave,
    setAutoSave,
    showSaveSuccess,
    saveSettings,
  }
}
