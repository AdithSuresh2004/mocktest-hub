import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
export default function StatusDisplay({
  type = 'loading',
  size = 48,
  color = 'text-blue-600',
  className = '',
  fullScreen = true,
  message = '',
  onRetry,
  showBackHome = false,
}) {
  const navigate = useNavigate()
  const containerClass = fullScreen
    ? `flex flex-col items-center justify-center min-h-full text-center ${className}`
    : `inline-flex items-center ${className}`
  const handleBackHome = () => {
    navigate('/')
  }
  if (type === 'error') {
    return (
      <div className={containerClass}>
        <p className="mb-4 text-xl text-red-600 dark:text-red-400">
          {message || 'Something went wrong.'}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
            >
              Retry
            </button>
          )}
          {showBackHome && (
            <button
              onClick={handleBackHome}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
            >
              Back to Home
            </button>
          )}
        </div>
      </div>
    )
  }
  return (
    <div className={containerClass} role="status" aria-label="Loading">
      <AiOutlineLoading3Quarters
        className={`animate-spin ${color}`}
        size={size}
      />
      {message && (
        <span className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          {message}
        </span>
      )}
      {showBackHome && (
        <button
          onClick={handleBackHome}
          className="mt-6 rounded-lg bg-gray-600 px-5 py-2 text-white transition hover:bg-gray-700"
        >
          Back to Home
        </button>
      )}
    </div>
  )
}
