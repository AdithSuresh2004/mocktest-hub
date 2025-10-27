import { theme } from '@/utils/theme'

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon,
  as: Component = 'button',
  to,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: theme.button.primary,
    secondary: theme.button.secondary,
    danger: theme.button.danger,
    success:
      'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600',
    text: theme.button.text,
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg',
  }

  const variantClass = variants[variant] || variants.primary
  const sizeClass = sizes[size] || sizes.md

  if (Component === 'a' || Component !== 'button') {
    return (
      <Component
        to={to}
        onClick={onClick}
        className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
        {...props}
      >
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        {children}
      </Component>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {children}
    </button>
  )
}

export default Button
