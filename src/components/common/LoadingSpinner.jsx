import { memo } from 'react'

/**
 * Reusable LoadingSpinner component
 * Consolidates duplicate loading spinner patterns
 */
const LoadingSpinner = memo(
  ({ size = 'md', fullScreen = false, message = 'Loading...' }) => {
    const sizes = {
      sm: 'h-8 w-8',
      md: 'h-12 w-12',
      lg: 'h-16 w-16',
    }

    const containerClass = fullScreen
      ? 'flex min-h-full flex-col items-center justify-center gap-4'
      : 'flex items-center justify-center gap-4'

    return (
      <div className={containerClass}>
        <div
          className={`${sizes[size]} animate-spin rounded-full border-b-2 border-blue-600`}
        />
        {message && (
          <p className="text-gray-600 dark:text-gray-400">{message}</p>
        )}
      </div>
    )
  }
)

LoadingSpinner.displayName = 'LoadingSpinner'

export default LoadingSpinner
