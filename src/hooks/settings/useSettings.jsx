import { useState, useEffect, useRef } from 'react'
import SettingsStorage from '@/utils/settings-storage'
import { useToast } from '@/hooks/common/useToast'

const useSettings = () => {
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
    setNotifications((prev) =>
      prev !== settings.notifications ? settings.notifications !== false : prev
    )
    setAutoSave((prev) =>
      prev !== settings.autoSave ? settings.autoSave !== false : prev
    )
    if (settings.streakGoals) {
      setStreakGoals((prev) => {
        const newGoals = {
          daily: settings.streakGoals.daily || 3,
          weekly: settings.streakGoals.weekly || 15,
          monthly: settings.streakGoals.monthly || 60,
        }
        if (
          prev.daily !== newGoals.daily ||
          prev.weekly !== newGoals.weekly ||
          prev.monthly !== newGoals.monthly
        ) {
          return newGoals
        }
        return prev
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

export { useSettings }
