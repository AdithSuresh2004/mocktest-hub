import { useState, useEffect, useRef } from 'react'
import SettingsStorage from '@/utils/settings-storage'
import { useToast } from '@/hooks/common/useToast'

export function useSettings() {
  const { addToast } = useToast()
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [streakGoals, setStreakGoals] = useState({
    daily: 3,
    weekly: 15,
    monthly: 60,
  })

  const [isInitialized, setIsInitialized] = useState(false)
  const autoSaveTimeoutRef = useRef(null)

  useEffect(() => {
    if (!isInitialized || !autoSave) return

    clearTimeout(autoSaveTimeoutRef.current)
    autoSaveTimeoutRef.current = setTimeout(() => {
      const settingsToSave = {
        notifications,
        autoSave,
        streakGoals,
      }
      SettingsStorage.set(settingsToSave)
    }, 1000)
  }, [isInitialized, notifications, autoSave, streakGoals])

  useEffect(() => {
    const settings = SettingsStorage.get()
    setNotifications(settings.notifications !== false)
    setAutoSave(settings.autoSave !== false)
    if (settings.streakGoals) {
      setStreakGoals({
        daily: settings.streakGoals.daily || 3,
        weekly: settings.streakGoals.weekly || 15,
        monthly: settings.streakGoals.monthly || 60,
      })
    }

    setTimeout(() => setIsInitialized(true), 100)
  }, [])

  const saveSettings = (theme) => {
    SettingsStorage.set({
      theme,
      notifications,
      autoSave,
      streakGoals,
    })
    addToast({ message: 'Settings saved successfully!', type: 'success' })
  }

  return {
    notifications,
    setNotifications,
    autoSave,
    setAutoSave,
    streakGoals,
    setStreakGoals,
    saveSettings,
  }
}
