import React from "react";
import { Link } from "react-router-dom";
import { formatTime } from "@/utils/formatters";
import { extractScoreValue } from "@/services/performanceService";
import { FaTrophy, FaHome, FaClock, FaArrowLeft } from "react-icons/fa";
import Button from "@/components/common/Button";
import ThemeToggle from "@/components/common/ThemeToggle";
import { Attempt, Exam } from "@/types";

interface ReviewHeaderProps {
  attemptId: string | undefined;
  attempt: Attempt;
  exam: Exam;
}

const ReviewHeader: React.FC<ReviewHeaderProps> = ({
  attemptId,
  attempt,
  exam,
}) => {
  const scoreValue = extractScoreValue(attempt.score);
  const timeTaken = attempt.time_taken || 0;

  return (
    <header className="flex-shrink-0 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            as={Link}
            to="/"
            variant="secondary"
            size="md"
            icon={FaHome}
            aria-label="Go to home"
            className="px-3 py-2"
          >
            <span className="hidden sm:inline">Home</span>
          </Button>

          <Button
            as={Link}
            to={`/result/${attemptId}`}
            variant="secondary"
            size="md"
            icon={FaArrowLeft}
            aria-label="Back to results"
            className="px-3 py-2"
          >
            <span className="hidden sm:inline">Results</span>
          </Button>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-sm">
            <FaTrophy className="h-4 w-4 text-yellow-500" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {scoreValue}/{exam.total_marks}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <FaClock className="h-4 w-4" />
            <span className="hidden sm:inline">{formatTime(timeTaken)}</span>
            <span className="sm:hidden">
              {timeTaken < 60
                ? `${timeTaken}s`
                : `${Math.floor(timeTaken / 60)}m`}
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default ReviewHeader;
