import { FaCheck } from "react-icons/fa";
export default function SuccessAlert({ show, message = "Settings saved successfully!" }) {
  if (!show) return null;
  return (
    <div className="mb-6 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <FaCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
      <span className="text-green-700 dark:text-green-300">{message}</span>
    </div>
  );
}