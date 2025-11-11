import { useState, useEffect } from "react";
import {
  FaCompress,
  FaExclamationTriangle,
  FaClock,
  FaExpandArrowsAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { formatTime } from "@/utils/formatters";
import {
  EXAM_TIMER_STYLES,
  EXAM_BUTTON_STYLES,
  EXAM_TIME_THRESHOLDS,
} from "@/constants/examUI";
import ThemeToggle from "@/components/common/ThemeToggle";
import type { Exam } from "@/types";

interface ExamHeaderProps {
  exam: Exam;
  timeRemaining: number;
  onExit: () => void;
  isWarning: boolean;
  isCritical: boolean;
}

const ExamHeader = ({
  exam,
  timeRemaining,
  onExit,
  isWarning,
  isCritical,
}: ExamHeaderProps) => {
  const [isFullscreen, setIsFullscreen] = useState(
    !!document.fullscreenElement,
  );

  useEffect(() => {
    const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      void document.exitFullscreen();
    }
  };

  const timerStyles = isCritical
    ? EXAM_TIMER_STYLES.critical
    : isWarning
      ? EXAM_TIMER_STYLES.warning
      : EXAM_TIMER_STYLES.normal;

  const headerClasses =
    "z-10 border-b border-blue-200 bg-white px-3 py-2.5 shadow-sm transition-[background-color,border-color] duration-300 sm:px-4 dark:border-gray-800 dark:bg-gray-900";

  return (
    <header className={headerClasses} role="banner">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold text-gray-900 sm:text-xl dark:text-gray-100">
            {exam.exam_name}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 rounded-md px-3 py-1 font-mono text-lg font-bold transition-all duration-300 ${timerStyles}`}
            role="timer"
            aria-live="polite"
            aria-atomic="true"
            title={
              isCritical
                ? `Less than ${EXAM_TIME_THRESHOLDS.critical} seconds remaining!`
                : isWarning
                  ? `Less than ${EXAM_TIME_THRESHOLDS.warning} seconds remaining`
                  : "Time remaining"
            }
          >
            {(isCritical || isWarning) && (
              <FaExclamationTriangle
                className={`h-4 w-4 ${isCritical ? "animate-bounce" : ""}`}
                aria-hidden="true"
              />
            )}
            <FaClock className="h-4 w-4" aria-hidden="true" />
            <span>{formatTime(timeRemaining)}</span>
          </div>
          <button
            onClick={toggleFullscreen}
            className={EXAM_BUTTON_STYLES.header}
            aria-label={
              isFullscreen ? "Exit fullscreen mode" : "Enter fullscreen mode"
            }
            title={isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"}
          >
            {isFullscreen ? (
              <FaCompress className="h-5 w-5" aria-hidden="true" />
            ) : (
              <FaExpandArrowsAlt className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
          <ThemeToggle />
          <button
            onClick={onExit}
            className={EXAM_BUTTON_STYLES.exit}
            aria-label="Exit exam"
            title="Exit Exam"
          >
            <FaArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ExamHeader;
