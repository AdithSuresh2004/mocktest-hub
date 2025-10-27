import { useNavigate } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Button from '@/components/common/Button'

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
            <Button onClick={onRetry} variant="danger">
              Retry
            </Button>
          )}
          {showBackHome && (
            <Button onClick={handleBackHome} variant="primary">
              Back to Home
            </Button>
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
        <Button
          onClick={handleBackHome}
          variant="secondary"
          className="mt-6"
        >
          Back to Home
        </Button>
      )}
    </div>
  )
}
