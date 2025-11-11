import { FaFire, FaCalendarDay, FaChartLine } from "react-icons/fa";
import { useMemo } from "react";
import { attemptStore } from "@/stores/attemptStore";
import { computeDashboardStats } from "@/utils/dashboardCalculations";
import Section from "@/components/common/Section";
import { STREAK_GOALS } from "@/constants/performance";

const ProgressTracking = () => {
  const { attempts } = attemptStore();
  const allAttempts = useMemo(() => Object.values(attempts), [attempts]);
  const { streakData, motivationMessage } = useMemo(
    () => computeDashboardStats(allAttempts),
    [allAttempts],
  );

  const weeklyGoal = Math.min(STREAK_GOALS.WEEKLY, STREAK_GOALS.DAILY * 7);
  const monthlyGoal = Math.min(STREAK_GOALS.MONTHLY, STREAK_GOALS.DAILY * 30);

  const todayProgress = Math.min(
    (streakData.today / STREAK_GOALS.DAILY) * 100,
    100,
  );
  const weeklyProgress = Math.min((streakData.week / weeklyGoal) * 100, 100);
  const monthlyProgress = Math.min((streakData.month / monthlyGoal) * 100, 100);

  return (
    <Section
      title="Your Progress"
      description="Personalized goals and streak tracking"
      icon={FaChartLine}
      iconColor="text-orange-600 dark:text-orange-400"
      iconBgColor="bg-orange-100 dark:bg-orange-900/30"
      className="h-full"
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center">
                <FaFire className="mr-2 h-5 w-5 text-orange-500" />
                <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {streakData.current}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Day Streak
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Longest: {streakData.longest} days
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <FaCalendarDay className="h-3 w-3" />
              Today's Goal
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {streakData.today}/{STREAK_GOALS.DAILY}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                todayProgress === 100 ? "bg-green-500" : "bg-blue-500"
              }`}
              style={{ width: `${todayProgress}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Weekly Progress
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {streakData.week}/{weeklyGoal}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                weeklyProgress === 100 ? "bg-green-500" : "bg-purple-500"
              }`}
              style={{ width: `${weeklyProgress}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Monthly Progress
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {streakData.month}/{monthlyGoal}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                monthlyProgress === 100 ? "bg-green-500" : "bg-pink-500"
              }`}
              style={{ width: `${monthlyProgress}%` }}
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-2 text-center dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <FaFire className="mr-1 inline h-3 w-3 text-orange-500" />
            {motivationMessage}
          </p>
        </div>
      </div>
    </Section>
  );
};

export default ProgressTracking;
