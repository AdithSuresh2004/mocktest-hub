import { FaCheck } from 'react-icons/fa'
export default function SuccessAlert({
  show,
  message = 'Settings saved successfully!',
}) {
  if (!show) return null
  return (
    <div className="animate-in fade-in slide-in-from-top-2 mb-6 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 duration-300 dark:border-green-700 dark:bg-green-900/30">
      <FaCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
      <span className="text-green-700 dark:text-green-300">{message}</span>
    </div>
  )
}
