import { useState, useEffect, useCallback } from "react";
import { timerService } from "@/services/timerService";

export const useTimer = (
  initialSeconds = 0,
  onTimeUp: (() => void) | null = null,
) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const startTimer = useCallback(() => {
    if (isActive || isTimeUp) return;

    setIsActive(true);
    timerService.startTimer(
      (newSeconds) => setSeconds(newSeconds),
      () => {
        timerService.stopTimer();
        setIsActive(false);
        setIsTimeUp(true);
        if (onTimeUp) {
          onTimeUp();
        }
      },
      seconds,
    );
  }, [isActive, isTimeUp, onTimeUp, seconds]);

  const stopTimer = useCallback(() => {
    timerService.stopTimer();
    setIsActive(false);
  }, []);

  const resetTimer = useCallback(
    (newSeconds = initialSeconds) => {
      timerService.stopTimer();
      setSeconds(newSeconds);
      setIsActive(false);
      setIsTimeUp(false);
    },
    [initialSeconds],
  );

  useEffect(() => {
    return () => {
      timerService.stopTimer();
    };
  }, []);

  return {
    seconds,
    isActive,
    isTimeUp,
    startTimer,
    stopTimer,
    resetTimer,
    setSeconds,
    setIsTimeUp,
  };
};
