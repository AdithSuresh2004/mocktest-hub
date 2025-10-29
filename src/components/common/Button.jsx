import { forwardRef } from 'react'
import { theme } from '@/constants/theme'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const Button = forwardRef(
  (
    {
      children,
      onClick,
      variant = 'primary',
      size = 'md',
      type = 'button',
      disabled = false,
      loading = false,
      className = '',
      icon: Icon,
      as: Component = 'button',
      to,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary: theme.button.primary,
      secondary: theme.button.secondary,
      danger: theme.button.danger,
      success:
        'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white',
      text: theme.button.text,
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-sm rounded-lg',
      lg: 'px-6 py-3 text-base rounded-lg',
    }

    const variantClass = variants[variant] || variants.primary
    const sizeClass = sizes[size] || sizes.md
    const isDisabled = disabled || loading

    if (Component === 'a' || Component !== 'button') {
      return (
        <Component
          ref={ref}
          to={to}
          onClick={onClick}
          className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
          aria-disabled={isDisabled}
          {...props}
        >
          {loading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <>
              {Icon && <Icon className="mr-2 h-4 w-4" />}
              {children}
            </>
          )}
        </Component>
      )
    }

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <>
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {children}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
