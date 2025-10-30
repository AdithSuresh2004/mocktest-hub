import { useState, useEffect, useRef, useCallback } from 'react'

function useTimer(initialSeconds, onFinish) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [running, setRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)
  const onFinishRef = useRef(onFinish)

  useEffect(() => {
    onFinishRef.current = onFinish
  }, [onFinish])

  useEffect(() => {
    if (!running || isPaused) {
      clearInterval(intervalRef.current)
      return
    }

    if (seconds <= 0) {
      setRunning(false)
      onFinishRef.current?.()
      return
    }

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [running, isPaused, seconds])

  const start = useCallback(() => {
    setRunning(true)
    setIsPaused(false)
  }, [])

  const stop = useCallback(() => {
    setRunning(false)
    setIsPaused(false)
  }, [])

  const pause = useCallback(() => {
    setIsPaused(true)
  }, [])

  const resume = useCallback(() => {
    setIsPaused(false)
  }, [])

  const setTime = useCallback((newSeconds) => {
    setSeconds(Math.max(0, newSeconds))
  }, [])

  const addTime = useCallback((additionalSeconds) => {
    setSeconds((prev) => Math.max(0, prev + additionalSeconds))
  }, [])

  return {
    seconds,
    running,
    isPaused,
    isWarning: seconds <= 300 && seconds > 60,
    isCritical: seconds <= 60,
    start,
    stop,
    pause,
    resume,
    setTime,
    addTime,
  }
}

export { useTimer }
