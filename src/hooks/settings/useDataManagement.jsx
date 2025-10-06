export function useDataManagement() {
  const handleExportData = () => {
    try {
      const data = {
        attempts: JSON.parse(localStorage.getItem('exam_attempts') || '[]'),
        favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
        settings: JSON.parse(localStorage.getItem('settings') || '{}'),
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
        if (data.attempts)
          localStorage.setItem('exam_attempts', JSON.stringify(data.attempts))
        if (data.favorites)
          localStorage.setItem('favorites', JSON.stringify(data.favorites))
        if (data.settings)
          localStorage.setItem('settings', JSON.stringify(data.settings))
        window.location.reload()
      } catch {
        console.error('Invalid file format')
      }
    }
    reader.readAsText(file)
  }
  const handleClearData = () => {
    try {
      localStorage.removeItem('exam_attempts')
      localStorage.removeItem('favorites')
      localStorage.removeItem('settings')
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
