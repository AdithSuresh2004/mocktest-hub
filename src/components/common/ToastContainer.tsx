import { useEffect } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import { useToast } from "@/stores/toastStore";
import { ToastContainerProps } from "@/types/components";
import { IconType } from "react-icons";

interface ToastProps {
  toast: {
    id: string;
    type: "success" | "error" | "warning" | "info";
    message: string;
    duration?: number;
  };
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const { icon: Icon, className: iconClass } = ((): {
    icon: IconType;
    className: string;
  } => {
    const iconMap: Record<string, { icon: IconType; className: string }> = {
      success: { icon: FaCheckCircle, className: "text-green-500" },
      error: { icon: FaExclamationCircle, className: "text-red-500" },
      warning: { icon: FaExclamationTriangle, className: "text-yellow-500" },
      info: { icon: FaInfoCircle, className: "text-blue-500" },
    };
    return iconMap[toast.type] || iconMap.info;
  })();

  const bgClass = ((): string => {
    const bgMap: Record<string, string> = {
      success:
        "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
      error: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
      warning:
        "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800",
      info: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
    };
    return bgMap[toast.type] || bgMap.info;
  })();

  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(onClose, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, onClose]);

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border-2 p-4 shadow-lg transition-all duration-300 ${bgClass}`}
      role="alert"
      aria-live="polite"
    >
      <Icon
        className={`h-5 w-5 flex-shrink-0 ${iconClass}`}
        aria-hidden="true"
      />
      <p className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">
        {toast.message}
      </p>
      <button
        onClick={onClose}
        className="flex-shrink-0 rounded-md text-gray-400 transition-colors hover:text-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none dark:hover:text-gray-300"
        aria-label="Close notification"
      >
        <FaTimes className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};

const ToastContainer: React.FC<ToastContainerProps> = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] flex flex-col items-end justify-end gap-2 p-4 sm:p-6"
      aria-live="assertive"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full max-w-sm">
          <Toast toast={toast} onClose={() => removeToast(toast.id)} />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
