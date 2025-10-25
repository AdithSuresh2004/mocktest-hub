import {
  AttemptsStorage,
  FavoritesStorage,
  SettingsStorage,
} from '@/utils/storage'
import { STORAGE_KEYS } from '@/constants/testConfig'

export function useDataManagement() {
  const handleExportData = () => {
    try {
      const data = {
        attempts: AttemptsStorage.getAll(),
        favorites: FavoritesStorage.getAll(),
        settings: SettingsStorage.get(),
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `mocktest-hub-backup-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
      return true
    } catch {
      console.error('Failed to export data')
      return false
    }
  }

  const handleImportData = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result)
        if (data.attempts) AttemptsStorage.setAll(data.attempts)
        if (data.favorites) FavoritesStorage.setAll(data.favorites)
        if (data.settings) SettingsStorage.set(data.settings)
        window.location.reload()
      } catch {
        console.error('Invalid file format')
      }
    }
    reader.readAsText(file)
  }

  const handleClearData = () => {
    try {
      AttemptsStorage.deleteAll()
      FavoritesStorage.setAll([])
      SettingsStorage.reset()
      window.location.reload()
      return true
    } catch {
      return false
    }
  }

  return {
    handleExportData,
    handleImportData,
    handleClearData,
  }
}
