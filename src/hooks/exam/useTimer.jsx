import { useState, useEffect, useRef } from 'react'

function useTimer(initialSeconds, onFinish) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [running, setRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)
  const onFinishRef = useRef(onFinish)

  useEffect(() => {
    onFinishRef.current = onFinish
  }, [onFinish])

  const isWarning = seconds <= 300 && seconds > 60
  const isCritical = seconds <= 60

  useEffect(() => {
    if (!running || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }
    if (seconds <= 0) {
      setRunning(false)
      if (onFinishRef.current) {
        onFinishRef.current()
      }
      return
    }
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setRunning(false)
          if (onFinishRef.current) {
            onFinishRef.current()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [running, isPaused, seconds])

  const start = () => {
    setRunning(true)
    setIsPaused(false)
  }

  const stop = () => {
    setRunning(false)
    setIsPaused(false)
  }

  const pause = () => {
    setIsPaused(true)
  }

  const resume = () => {
    setIsPaused(false)
  }

  const setTime = (newSeconds) => {
    setSeconds(Math.max(0, newSeconds))
  }

  const addTime = (additionalSeconds) => {
    setSeconds((prev) => Math.max(0, prev + additionalSeconds))
  }

  return {
    seconds,
    running,
    isPaused,
    isWarning,
    isCritical,
    start,
    stop,
    pause,
    resume,
    setTime,
    addTime,
  }
}

export { useTimer }
