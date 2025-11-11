import {
  getDateKey,
  getStartOfDay,
  getStartOfWeek,
  getStartOfMonth,
} from "@/utils/common";
import type { Attempt, StreakData } from "@/types";

export function calculateStreakData(attempts: Attempt[]): StreakData {
  const completedAttempts = attempts
    .filter((attempt) => attempt.status === "completed")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const uniqueDates = [
    ...new Set(completedAttempts.map((a) => getDateKey(a.date))),
  ].sort();

  if (uniqueDates.length === 0) {
    return { current: 0, longest: 0, today: 0, week: 0, month: 0 };
  }

  let longestStreak = 0;
  let currentStreak = 0;

  for (let i = 0; i < uniqueDates.length; i++) {
    currentStreak++;
    if (i + 1 < uniqueDates.length) {
      const currentDay = new Date(uniqueDates[i]);
      const nextDay = new Date(uniqueDates[i + 1]);
      const daysDiff =
        (nextDay.getTime() - currentDay.getTime()) / (24 * 60 * 60 * 1000);

      if (daysDiff > 1) {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 0;
      }
    }
  }
  longestStreak = Math.max(longestStreak, currentStreak);

  const todayKey = getDateKey(new Date());
  const yesterdayKey = getDateKey(new Date(Date.now() - 24 * 60 * 60 * 1000));
  const isTodayInStreak = uniqueDates.includes(todayKey);
  const finalCurrentStreak =
    isTodayInStreak || uniqueDates.includes(yesterdayKey) ? currentStreak : 0;

  const today = getStartOfDay();
  const todayAttempts = completedAttempts.filter(
    (attempt) => new Date(attempt.date).getTime() >= today.getTime(),
  ).length;

  const weekStart = getStartOfWeek(today);
  const weekAttempts = completedAttempts.filter(
    (attempt) => new Date(attempt.date).getTime() >= weekStart.getTime(),
  ).length;

  const monthStart = getStartOfMonth(today);
  const monthAttempts = completedAttempts.filter(
    (attempt) => new Date(attempt.date).getTime() >= monthStart.getTime(),
  ).length;

  return {
    current: finalCurrentStreak,
    longest: longestStreak,
    today: todayAttempts,
    week: weekAttempts,
    month: monthAttempts,
  };
}

export function getStreakMotivation(currentStreak: number): string {
  const MOTIVATIONS = [
    { days: 30, message: "Legendary Scholar! You're unstoppable!" },
    { days: 14, message: "Month Warrior! You're on fire!" },
    { days: 7, message: "Week Champion! Keep the momentum!" },
    { days: 3, message: "Daily Hero! Maintain your focus!" },
    { days: 1, message: "Getting Started! Let's build a habit!" },
    { days: 0, message: "Ready to Begin! Start your streak today!" },
  ];

  return (
    MOTIVATIONS.find((m) => currentStreak >= m.days)?.message ||
    MOTIVATIONS[MOTIVATIONS.length - 1].message
  );
}

export function getAchievementBadges(
  streakData: StreakData,
  stats: { completedTests: number; averageScore: number },
) {
  const badgeConfig = [
    {
      condition: stats.completedTests >= 50,
      badge: {
        icon: "FaGem",
        name: "Master Student",
        description: "Completed 50 tests",
      },
    },
    {
      condition: stats.completedTests >= 25,
      badge: {
        icon: "FaGraduationCap",
        name: "Dedicated Learner",
        description: "Completed 25 tests",
      },
    },
    {
      condition: stats.completedTests >= 5,
      badge: {
        icon: "FaFlag",
        name: "First Steps",
        description: "Completed 5 tests",
      },
    },
    {
      condition: streakData.longest >= 30,
      badge: {
        icon: "FaCrown",
        name: "Consistency King",
        description: "30+ day streak",
      },
    },
    {
      condition: streakData.longest >= 7,
      badge: {
        icon: "FaFire",
        name: "Week Warrior",
        description: "7+ day streak",
      },
    },
    {
      condition: stats.averageScore >= 80,
      badge: {
        icon: "FaBullseye",
        name: "High Achiever",
        description: "Avg score 80%+",
      },
    },
  ];

  return badgeConfig.filter((item) => item.condition).map((item) => item.badge);
}
