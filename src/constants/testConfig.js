import { FaBullseye, FaAward, FaBook, FaFileAlt } from 'react-icons/fa'

export const TEST_TYPES = {
  FULL: 'full_tests',
  SUBJECT: 'subject_tests',
  TOPIC: 'topic_tests',
}

export const TEST_TYPE_CONFIG = {
  [TEST_TYPES.FULL]: {
    color: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    icon: FaFileAlt,
    label: 'Mock Test',
  },
  [TEST_TYPES.SUBJECT]: {
    color:
      'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    icon: FaBook,
    label: 'Subject Test',
  },
  [TEST_TYPES.TOPIC]: {
    color:
      'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
    icon: FaBullseye,
    label: 'Topic Test',
  },
}

export const DEFAULT_TEST_CONFIG = {
  color: 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400',
  icon: FaFileAlt,
  label: 'Test',
}

export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
}

export const DIFFICULTY_COLORS = {
  [DIFFICULTY_LEVELS.EASY]:
    'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  [DIFFICULTY_LEVELS.MEDIUM]:
    'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
  [DIFFICULTY_LEVELS.HARD]:
    'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400',
}

export const DIFFICULTY_BADGE_COLORS = {
  [DIFFICULTY_LEVELS.EASY]:
    'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200',
  [DIFFICULTY_LEVELS.MEDIUM]:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200',
  [DIFFICULTY_LEVELS.HARD]:
    'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200',
}

export const DEFAULT_DIFFICULTY_COLOR =
  'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'

export const QUESTION_STATUS = {
  ANSWERED: 'answered',
  MARKED: 'marked',
  NOT_VISITED: 'not_visited',
  CURRENT: 'current',
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
}

export const QUESTION_STATUS_CLASSES = {
  [QUESTION_STATUS.CURRENT]:
    'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300',
  [QUESTION_STATUS.CORRECT]: 'bg-green-600 hover:bg-green-700 text-white',
  [QUESTION_STATUS.INCORRECT]: 'bg-red-600 hover:bg-red-700 text-white',
  [QUESTION_STATUS.MARKED]: 'bg-purple-600 hover:bg-purple-700 text-white',
  [QUESTION_STATUS.ANSWERED]: 'bg-green-600 hover:bg-green-700 text-white',
  [QUESTION_STATUS.NOT_VISITED]:
    'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200',
}

export const PERFORMANCE_THRESHOLDS = {
  EXCELLENT: 80,
  GOOD: 60,
  AVERAGE: 40,
}

export const PERFORMANCE_COLORS = {
  EXCELLENT: 'text-green-600 dark:text-green-400',
  GOOD: 'text-blue-600 dark:text-blue-400',
  AVERAGE: 'text-yellow-600 dark:text-yellow-400',
  POOR: 'text-red-600 dark:text-red-400',
}

export const CARD_CLASSES = {
  BASE: 'rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800',
  INTERACTIVE:
    'rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800',
  SECTION:
    'rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800',
}

export const STORAGE_KEYS = {
  FAVORITES: 'favorites',
  ATTEMPTS: 'exam_attempts',
  SETTINGS: 'settings',
  THEME: 'theme',
  SOURCES: 'exam_sources',
  MANIFEST: 'local_exams_manifest',
}

export const DEFAULT_MARKS = {
  POSITIVE: 4,
  NEGATIVE: 1,
}

export const CACHE_DURATION = {
  MANIFEST: 5 * 60 * 1000,
  EXAM: 10 * 60 * 1000,
}
