export const formatDate = (timestamp, format = 'long') => {
  if (!timestamp) return 'N/A'
  const date = new Date(timestamp)
  if (format === 'short') {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const getPerformanceColor = (score, total) => {
  const percentage = (score / total) * 100
  if (percentage >= 80) return 'text-green-600 dark:text-green-400'
  if (percentage >= 60) return 'text-blue-600 dark:text-blue-400'
  if (percentage >= 40) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}
export const getDifficultyColor = (strength) => {
  const colors = {
    Easy: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    Medium:
      'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    Hard: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  }
  return (
    colors[strength] ||
    'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
  )
}
export const formatTime = (seconds) => {
  if (seconds === undefined || seconds === null) {
    return '0m 0s'
  }
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}m ${secs}s`
}
