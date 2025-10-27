import { FaFileAlt, FaSearch, FaRedo } from 'react-icons/fa'
import { theme } from '@/utils/theme'

const EmptyState = ({ 
  icon: Icon = FaFileAlt,
  title = 'No data available',
  message,
  actionLabel,
  onAction,
  className = '' 
}) => {
  return (
    <div className={`flex min-h-full items-center justify-center bg-gray-50 ${className} dark:bg-gray-900`}>
      <div className="mx-auto max-w-md px-4 text-center">
        <Icon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
        <h3 className={`mb-2 text-xl font-semibold ${theme.text.primary}`}>
          {title}
        </h3>
        <p className={`mb-6 ${theme.text.secondary}`}>
          {message || 'There\'s nothing to display here yet.'}
        </p>
        {onAction && actionLabel && (
          <button
            onClick={onAction}
            className={`inline-flex items-center rounded-lg px-6 py-3 font-medium text-white transition-colors ${theme.button.primary} ${theme.interactive.focus}`}
          >
            <FaRedo className="mr-2 h-4 w-4" />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  )
}

export default EmptyState
