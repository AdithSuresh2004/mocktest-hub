import { useState, useEffect, useCallback } from "react";
function useTimer(initialSeconds, onFinish) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    if (seconds <= 0) {
      setRunning(false);
      if (onFinish) onFinish();
      return;
    }
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds, running, onFinish]);
  const start = useCallback(() => setRunning(true), []);
  const stop = useCallback(() => setRunning(false), []);
  const setTime = useCallback((newSeconds) => setSeconds(newSeconds), []);
  return { seconds, start, stop, setTime };
}
export { useTimer };