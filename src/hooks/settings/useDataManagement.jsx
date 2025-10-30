import { getAllAttempts, setAllAttempts, deleteAllAttempts, getAllFavorites, setAllFavorites, getSettings, setSettings, resetSettings } from '@/utils/storage'
import { useConfirmModal } from '@/hooks/common/useConfirmModal'

export function useDataManagement() {
  const { openConfirm, ...modalProps } = useConfirmModal()

  const handleExportData = () => {
    try {
      const data = {
        attempts: getAllAttempts(),
        favorites: getAllFavorites(),
        settings: getSettings(),
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
        if (data.attempts) setAllAttempts(data.attempts)
        if (data.favorites) setAllFavorites(data.favorites)
        if (data.settings) setSettings(data.settings)
        window.location.reload()
      } catch {
        console.error('Invalid file format')
      }
    }
    reader.readAsText(file)
  }

  const handleClearData = () => {
    try {
      deleteAllAttempts()
      setAllFavorites([])
      resetSettings()
      window.location.reload()
      return true
    } catch {
      return false
    }
  }

  const handleClearWithConfirm = () => {
    openConfirm({
      title: 'Clear All Data?',
      message:
        'Are you sure you want to delete all your data? This action is irreversible.',
      confirmText: 'Clear Data',
      cancelText: 'Cancel',
      type: 'danger',
      onConfirm: handleClearData,
    })
  }

  return {
    ...modalProps,
    handleExportData,
    handleImportData,
    handleClearWithConfirm,
  }
}
