import { useNavigate, Link } from "react-router-dom";
import { FaClock, FaArrowRight, FaCheckCircle, FaStar } from "react-icons/fa";
import Button from "@/components/common/Button";
import { formatTime } from "@/utils/formatters";
import { DASHBOARD_LIMITS } from "@/constants/performance";
import Section from "@/components/common/Section";
import type { Attempt } from "@/types";

interface RecentActivityProps {
  activities: Attempt[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const navigate = useNavigate();
  const visibleActivities = activities.slice(
    0,
    DASHBOARD_LIMITS.MAX_VISIBLE_ACTIVITIES,
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-blue-600 dark:text-blue-400";
    if (score >= 40) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-100 dark:bg-green-900/30";
    if (score >= 60) return "bg-blue-100 dark:bg-blue-900/30";
    if (score >= 40) return "bg-yellow-100 dark:bg-yellow-900/30";
    return "bg-red-100 dark:bg-red-900/30";
  };

  const getScorePercentage = (activity: Attempt): number => {
    if (typeof activity.score === "number") {
      return activity.score;
    }
    if (activity.score && activity.score.total > 0) {
      return (activity.score.actual / activity.score.total) * 100;
    }
    return 0;
  };

  return (
    <Section
      title="Recent Activity"
      icon={FaClock}
      iconColor="text-teal-600 dark:text-teal-400"
      iconBgColor="bg-teal-100 dark:bg-teal-900/30"
      actions={
        activities.length > 0 ? (
          <Link
            to="/attempts"
            className="inline-flex h-10 items-center text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
          >
            View All
          </Link>
        ) : null
      }
    >
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <FaClock className="mb-3 h-12 w-12 text-gray-300 dark:text-gray-600" />
          <p className="text-gray-600 dark:text-gray-400">
            No recent completed tests.
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
            Start practicing to see your activity here!
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {visibleActivities.map((activity) => {
            const scorePercentage = getScorePercentage(activity);
            return (
              <li
                key={activity.id}
                className="group flex flex-col gap-3 py-4 transition-all hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between sm:gap-4 dark:hover:bg-gray-800/50"
              >
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${getScoreBgColor(scorePercentage)}`}
                  >
                    <FaCheckCircle
                      className={`h-6 w-6 ${getScoreColor(scorePercentage)}`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate font-semibold text-gray-800 dark:text-gray-200"
                      title={activity.exam_id}
                    >
                      {activity.exam_id}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm">
                      <span
                        className={`flex items-center gap-1 font-semibold ${getScoreColor(scorePercentage)}`}
                      >
                        <FaStar className="h-3 w-3" />
                        {scorePercentage.toFixed(1)}%
                      </span>
                      <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <FaClock className="h-3 w-3" />
                        {formatTime(activity.time_taken)}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => navigate(`/result/${activity.id}`)}
                  variant="text"
                  icon={FaArrowRight}
                  size="sm"
                  className="flex-shrink-0 justify-start font-semibold transition-transform group-hover:translate-x-1 sm:justify-center"
                >
                  View Result
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </Section>
  );
};

export default RecentActivity;
