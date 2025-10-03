import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

export default function BackButton({ to, label = 'Back', className = '' }) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (to) {
      navigate(to)
    } else {
      navigate(-1)
    }
  }

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 ${className}`}
    >
      <FaArrowLeft className="h-4 w-4" />
      {label}
    </button>
  )
}
