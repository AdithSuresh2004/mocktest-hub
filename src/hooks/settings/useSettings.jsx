import { useState, useEffect, useRef } from 'react'
import { SettingsStorage } from '@/utils/storage'

export function useSettings() {
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [streakGoals, setStreakGoals] = useState({
    daily: 3,
    weekly: 15,
    monthly: 60,
  })
  const [focusExams, setFocusExams] = useState({
    primaryFocus: '',
    quickAccess: [],
  })
  const [dashboardWidgets, setDashboardWidgets] = useState({
    performanceChart: true,
    scoreDistribution: true,
    recentActivity: true,
    progressTracking: true,
    performanceSnapshot: true,
  })

  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [firstSaveDone, setFirstSaveDone] = useState(false)
  const autoSaveTimeoutRef = useRef(null)

  useEffect(() => {
    if (!isInitialized) return

    clearTimeout(autoSaveTimeoutRef.current)
    autoSaveTimeoutRef.current = setTimeout(() => {
      const settingsToSave = {
        notifications,
        autoSave,
        streakGoals,
        focusExams,
        dashboardWidgets,
      }
      SettingsStorage.set(settingsToSave)

      if (firstSaveDone) {
        setShowSaveSuccess(true)
        setTimeout(() => setShowSaveSuccess(false), 2000)
      }
      setFirstSaveDone(true)
    }, 1000)
  }, [
    isInitialized,
    notifications,
    autoSave,
    streakGoals,
    focusExams,
    dashboardWidgets,
  ])

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
    if (settings.focusExams) {
      setFocusExams(settings.focusExams)
    }
    if (settings.dashboardWidgets) {
      setDashboardWidgets(settings.dashboardWidgets)
    }

    setTimeout(() => setIsInitialized(true), 100)
  }, [])

  const saveSettings = (theme) => {
    SettingsStorage.set({
      theme,
      notifications,
      autoSave,
      streakGoals,
      focusExams,
      dashboardWidgets,
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
