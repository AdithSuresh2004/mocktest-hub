import { useState, useEffect, useRef, useCallback } from 'react'
import { SettingsStorage } from '@/utils/storage'

export function useSettings() {
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [streakGoals, setStreakGoals] = useState({
    daily: 3,
    weekly: 15,
    monthly: 60
  })
  const [focusExams, setFocusExams] = useState({
    primaryFocus: '',
    quickAccess: []
  })
  const [dashboardWidgets, setDashboardWidgets] = useState({
    performanceChart: true,
    scoreDistribution: true,
    recentActivity: true,
    progressTracking: true,
    performanceSnapshot: true
  })

  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const autoSaveTimeoutRef = useRef(null)

  const autoSaveSettings = useCallback(() => {
    if (!isInitialized) return

    clearTimeout(autoSaveTimeoutRef.current)
    autoSaveTimeoutRef.current = setTimeout(() => {
      const settingsToSave = {
        theme: 'light', // Default theme, will be overridden by settings page
        notifications,
        autoSave,
        streakGoals,
        focusExams,
        dashboardWidgets
      }
      SettingsStorage.set(settingsToSave)

      setShowSaveSuccess(true)
      setTimeout(() => setShowSaveSuccess(false), 2000)
    }, 1000) // Auto-save after 1 second of inactivity
  }, [isInitialized, notifications, autoSave, streakGoals, focusExams, dashboardWidgets])

  useEffect(() => {
    if (isInitialized) {
      autoSaveSettings()
    }
  }, [notifications, autoSave, streakGoals, focusExams, dashboardWidgets, autoSaveSettings, isInitialized])

  useEffect(() => {
    const settings = SettingsStorage.get()
    setNotifications(settings.notifications !== false)
    setAutoSave(settings.autoSave !== false)
    if (settings.streakGoals) {
      setStreakGoals({
        daily: settings.streakGoals.daily || 3,
        weekly: settings.streakGoals.weekly || 15,
        monthly: settings.streakGoals.monthly || 60
      })
    }
    if (settings.focusExams) {
      setFocusExams(settings.focusExams)
    }
    if (settings.dashboardWidgets) {
      setDashboardWidgets(settings.dashboardWidgets)
    }

    // Mark as initialized after loading settings
    setTimeout(() => setIsInitialized(true), 100)
  }, [])

  const saveSettings = (theme) => {
    SettingsStorage.set({
      theme,
      notifications,
      autoSave,
      streakGoals,
      focusExams,
      dashboardWidgets
    })
    setShowSaveSuccess(true)
    setTimeout(() => setShowSaveSuccess(false), 3000)
  }

  return {
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
  }
}
