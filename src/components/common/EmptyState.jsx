import { memo } from 'react'

/**
 * Reusable EmptyState component
 * Consolidates duplicate empty state patterns across pages
 */
const EmptyState = memo(
  ({
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction,
    actionIcon: ActionIcon,
  }) => {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {Icon && <Icon className="mx-auto mb-4 h-16 w-16 text-gray-400" />}
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        {description && (
          <p className="mb-6 text-gray-600 dark:text-gray-400">{description}</p>
        )}
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            {ActionIcon && <ActionIcon />}
            {actionLabel}
          </button>
        )}
      </div>
    )
  }
)

EmptyState.displayName = 'EmptyState'

export default EmptyState
