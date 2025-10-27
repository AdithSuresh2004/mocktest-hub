export const theme = {
  bg: {
    primary: 'bg-gray-50 dark:bg-gray-900',
    secondary: 'bg-white dark:bg-gray-800',
    elevated: 'bg-white dark:bg-gray-700',
    muted: 'bg-gray-100 dark:bg-gray-900',
  },

  text: {
    primary: 'text-gray-900 dark:text-gray-100',
    secondary: 'text-gray-600 dark:text-gray-400',
    tertiary: 'text-gray-500 dark:text-gray-500',
    muted: 'text-gray-400 dark:text-gray-600',
    inverse: 'text-white dark:text-gray-900',
  },

  border: {
    default: 'border-gray-200 dark:border-gray-700',
    light: 'border-gray-100 dark:border-gray-800',
    accent: 'border-blue-500 dark:border-blue-400',
    danger: 'border-red-500 dark:border-red-400',
    success: 'border-green-500 dark:border-green-400',
  },

  interactive: {
    hover: 'hover:bg-gray-50 dark:hover:bg-gray-700',
    active: 'active:bg-gray-100 dark:active:bg-gray-600',
    focus: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none',
    disabled: 'opacity-50 cursor-not-allowed',
  },

  button: {
    primary: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200',
    danger: 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white',
    success: 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white',
    text: 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100',
  },

  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  },

  card: 'rounded-lg border shadow-sm transition-colors duration-200',
}
export const combineClasses = (...classes) => {
  return classes.filter(Boolean).join(' ')
}
export const containers = {
  page: 'min-h-screen bg-gray-50 dark:bg-gray-900',
  card: `${theme.card} ${theme.bg.secondary} ${theme.border.default}`,
  content: 'mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8',
  flexCenter: 'flex items-center justify-center',
  grid: 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}

export const animations = {
  fadeIn: 'animate-fadeIn',
  shimmer: 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/60 dark:before:via-white/10 before:to-transparent',
  pulse: 'animate-pulse',
}

export const spacing = {
  section: 'mb-6',
  cardPadding: 'p-4 sm:p-6',
  pagePadding: 'p-4 sm:p-6 lg:p-8',
}
