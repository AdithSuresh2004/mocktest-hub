export function useDataManagement() {
  const handleExportData = () => {
    try {
      const data = {
        attempts: JSON.parse(localStorage.getItem('attempts') || '[]'),
        favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
        settings: JSON.parse(localStorage.getItem('settings') || '{}')
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `exam-app-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data');
    }
  };
  const handleImportData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result);
        if (data.attempts) localStorage.setItem('attempts', JSON.stringify(data.attempts));
        if (data.favorites) localStorage.setItem('favorites', JSON.stringify(data.favorites));
        if (data.settings) localStorage.setItem('settings', JSON.stringify(data.settings));
        alert('Data imported successfully! Please refresh the page.');
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Failed to import data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };
  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      if (confirm('This will delete all your attempts, favorites, and settings. Continue?')) {
        localStorage.clear();
        alert('All data has been cleared. The page will now reload.');
        window.location.reload();
      }
    }
  };
  return {
    handleExportData,
    handleImportData,
    handleClearData
  };
}