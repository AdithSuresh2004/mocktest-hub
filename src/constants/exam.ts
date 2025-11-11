import { FaBullseye, FaBook, FaFileAlt } from "react-icons/fa";

export const TEST_TYPES = {
  FULL: "full_tests",
  SUBJECT: "subject_tests",
  TOPIC: "topic_tests",
} as const;

export const TEST_TYPE_CONFIG = {
  [TEST_TYPES.FULL]: {
    color: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    icon: FaFileAlt,
    label: "Mock Test",
  },
  [TEST_TYPES.SUBJECT]: {
    color:
      "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
    icon: FaBook,
    label: "Subject Test",
  },
  [TEST_TYPES.TOPIC]: {
    color:
      "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
    icon: FaBullseye,
    label: "Topic Test",
  },
} as const;

export const DEFAULT_TEST_CONFIG = {
  color: "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400",
  icon: FaFileAlt,
  label: "Test",
} as const;

export const DIFFICULTY_LEVELS = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
} as const;

export const DIFFICULTY_COLORS = {
  [DIFFICULTY_LEVELS.EASY]:
    "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  [DIFFICULTY_LEVELS.MEDIUM]:
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
  [DIFFICULTY_LEVELS.HARD]:
    "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
} as const;

export const DIFFICULTY_BADGE_COLORS = {
  [DIFFICULTY_LEVELS.EASY]:
    "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200",
  [DIFFICULTY_LEVELS.MEDIUM]:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200",
  [DIFFICULTY_LEVELS.HARD]:
    "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200",
} as const;

export const DEFAULT_DIFFICULTY_COLOR =
  "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";

export const QUESTION_STATUS = {
  ANSWERED: "answered",
  MARKED: "marked",
  NOT_VISITED: "not_visited",
  CURRENT: "current",
  CORRECT: "correct",
  INCORRECT: "incorrect",
  UNANSWERED: "unanswered",
  DEFAULT: "default",
} as const;

export const QUESTION_STATUS_CLASSES = {
  [QUESTION_STATUS.CURRENT]:
    "bg-blue-600 text-white shadow-lg border-2 border-blue-400",
  [QUESTION_STATUS.CORRECT]: "bg-green-600 hover:bg-green-700 text-white",
  [QUESTION_STATUS.INCORRECT]: "bg-red-600 hover:bg-red-700 text-white",
  [QUESTION_STATUS.MARKED]: "bg-purple-600 hover:bg-purple-700 text-white",
  [QUESTION_STATUS.ANSWERED]: "bg-green-600 hover:bg-green-700 text-white",
  [QUESTION_STATUS.NOT_VISITED]:
    "bg-gray-200 hover:bg-gray-300 text-gray-700 border-0 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200",
  [QUESTION_STATUS.UNANSWERED]:
    "bg-gray-200 hover:bg-gray-300 text-gray-700 border-0 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200",
  [QUESTION_STATUS.DEFAULT]:
    "bg-gray-200 hover:bg-gray-300 text-gray-700 border-0 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200",
} as const;

export const DEFAULT_MARKS = {
  POSITIVE: 4,
  NEGATIVE: 1,
} as const;

export const AUTO_SAVE_INTERVAL = 2000;
