import { useNavigate } from "react-router-dom";
import { FaClock, FaArrowRight } from "react-icons/fa";
import { formatTime } from "@/utils/helpers/examHelpers";
import { formatDate } from "@/utils/formatters/formatters";

export default function RecentActivity({ activities }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Recent Activity</h2>
      {activities.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No recent completed tests.</p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {activities.map(activity => (
            <li key={activity.id} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <p className="font-semibold text-gray-800 dark:text-gray-200">{activity.exam_name}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span>
                    Score: {typeof activity.score === 'number' 
                      ? `${activity.score.toFixed(1)}%` 
                      : `${((activity.score.actual / activity.score.total) * 100).toFixed(1)}%`}
                  </span>
                  <span className="flex items-center gap-1"><FaClock /> {formatTime(activity.timeTaken)}</span>
                  <span>{formatDate(activity.timestamp)}</span>
                </div>
              </div>
              <button
                onClick={() => navigate(`/result/${activity.id}`)}
                className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                View Result <FaArrowRight />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
