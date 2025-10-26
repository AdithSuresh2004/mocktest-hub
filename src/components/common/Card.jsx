const Card = ({
  children,
  className = '',
  variant = 'default',
  padding = 'p-6',
  hover = false,
  onClick,
}) => {
  const variants = {
    default:
      'rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800',
    gradient:
      'rounded-xl border border-gray-200 bg-gradient-to-br shadow-sm dark:border-gray-700',
    transparent: 'rounded-xl border border-gray-200 dark:border-gray-700',
  }

  const hoverClass = hover
    ? 'transition-shadow hover:shadow-md cursor-pointer'
    : ''

  return (
    <div
      className={`${variants[variant]} ${padding} ${hoverClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card
