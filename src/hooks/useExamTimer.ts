import { useCallback } from "react";
import { useTimer } from "@/hooks/useTimer";

interface UseExamTimerReturn {
  seconds: number;
  formattedTime: string;
  isActive: boolean;
  isTimeUp: boolean;
  isWarning: boolean;
  isCritical: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: (newSeconds?: number) => void;
  setSeconds: (newSeconds: number) => void;
  setIsTimeUp: (isTimeUp: boolean) => void;
}

export const useExamTimer = (
  initialSeconds: number = 0,
  onTimeUp: (() => void) | null = null,
): UseExamTimerReturn => {
  const {
    seconds,
    isActive,
    isTimeUp,
    startTimer,
    stopTimer,
    resetTimer,
    setSeconds,
    setIsTimeUp,
  } = useTimer(initialSeconds, onTimeUp);

  const formattedTime = useCallback(() => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, [seconds]);

  const isWarning = seconds <= 300 && seconds > 60;

  const isCritical = seconds <= 60;

  return {
    seconds,
    formattedTime: formattedTime(),
    isActive,
    isTimeUp,
    isWarning,
    isCritical,
    startTimer,
    stopTimer,
    resetTimer,
    setSeconds,
    setIsTimeUp,
  };
};
