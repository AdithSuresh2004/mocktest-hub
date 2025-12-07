import { ReactNode } from "react";

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

export type ToastContainerProps = Record<string, never>;
