import {
  FaClock,
  FaCalendarAlt,
  FaFileAlt,
  FaChartLine,
  FaEye,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "@/components/common/Card";
import { formatDate, formatDuration } from "@/utils/formatters";
import {
  extractScoreValue,
  formatScoreDisplay,
  getScoreColor,
} from "@/services/performanceService";
import { EnrichedAttempt } from "@/utils/attemptsHelpers";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";

interface AttemptItemProps {
  attempt: EnrichedAttempt;
}

const AttemptItem: React.FC<AttemptItemProps> = ({ attempt }) => {
  // Use exam total_marks if available for normalization
  const totalMarks = attempt.exam?.total_marks;
  const scoreValue = extractScoreValue(attempt.score, totalMarks);
  const scoreLabel = formatScoreDisplay(attempt.score, totalMarks);
  const scoreColor = getScoreColor(scoreValue);
  const dateLabel = formatDate(attempt.date);
  const timeLabel = formatDuration(attempt.time_taken);

  return (
    <Card
      variant="default"
      padding="sm"
      hover
      className="flex flex-col items-start justify-between rounded-xl sm:flex-row sm:items-center"
    >
      <div className="mb-4 min-w-0 flex-1 sm:mb-0">
        <div className="mb-2 flex items-center gap-3">
          {attempt.category && (
            <Badge variant="primary">{attempt.category}</Badge>
          )}
          <h3 className="truncate text-lg font-semibold text-gray-900 dark:text-gray-100">
            {attempt.examName}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="h-3 w-3" />
            <span>{dateLabel}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="h-3 w-3" />
            <span>{timeLabel}</span>
          </div>
          {typeof attempt.score === "object" &&
            attempt.score?.actual !== undefined &&
            attempt.score?.total !== undefined && (
              <div className="flex items-center gap-1">
                <FaChartLine className="h-3 w-3" />
                <span>
                  {attempt.score.actual}/{attempt.score.total}
                </span>
              </div>
            )}
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-3 sm:w-auto sm:flex-row sm:items-center">
        <div className="w-full text-left sm:w-auto sm:text-right">
          <div className={`text-2xl font-bold ${scoreColor}`}>
            {scoreLabel}%
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button
            as={Link}
            to={`/review/${attempt.id}`}
            variant="secondary"
            icon={FaEye}
            size="sm"
          >
            Review
          </Button>
          <Button
            as={Link}
            to={`/result/${attempt.id}`}
            variant="primary"
            icon={FaFileAlt}
            size="sm"
          >
            Result
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AttemptItem;
