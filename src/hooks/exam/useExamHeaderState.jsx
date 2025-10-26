import { useState, useEffect, useMemo } from 'react'

const getTimeColor = (timeRemaining) => {
  if (timeRemaining <= 300) return 'text-red-600 dark:text-red-400'
  if (timeRemaining <= 900) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-green-600 dark:text-green-400'
}

export function useExamHeaderState(timeRemaining) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen()
    }
  }
  const timeColorClass = useMemo(() => getTimeColor(timeRemaining), [timeRemaining])
  return {
    isFullscreen,
    timeColorClass,
    toggleFullscreen,
  }
}
