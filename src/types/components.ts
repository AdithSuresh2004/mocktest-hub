import { ReactNode, ReactElement } from "react";

export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

export interface ThemeContextType {
  theme: "light" | "dark" | "system";
  toggleTheme: (newTheme: "light" | "dark" | "system") => void;
}

export interface LayoutProps {
  children: ReactNode;
}

export interface LoadingSpinnerProps {
  fullScreen?: boolean;
  message?: string;
  size?: "sm" | "md" | "lg";
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorFallbackProps {
  error: Error;
  errorInfo: React.ErrorInfo;
  errorId: string;
  fallbackUI?: ReactElement;
}

export type ToastContainerProps = Record<string, never>;
