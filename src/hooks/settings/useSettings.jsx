import { useState, useEffect } from 'react'

export function useSettings() {
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  useEffect(() => {
    loadSettings()
  }, [])
  const loadSettings = () => {
    try {
      const settings = JSON.parse(localStorage.getItem('settings') || '{}')
      setNotifications(settings.notifications !== false)
      setAutoSave(settings.autoSave !== false)
    } catch {
      // Ignore localStorage parsing errors
    }
  }
  const saveSettings = (theme) => {
    try {
      const settings = {
        theme,
        notifications,
        autoSave,
      }
      localStorage.setItem('settings', JSON.stringify(settings))
      setShowSaveSuccess(true)
      setTimeout(() => setShowSaveSuccess(false), 3000)
    } catch {
      // Ignore localStorage save errors
    }
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
