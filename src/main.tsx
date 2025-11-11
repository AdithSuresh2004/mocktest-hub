import "@/index.css";
import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { themeStore } from "@/stores/themeStore";
import ToastContainer from "@/components/common/ToastContainer";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import router from "@/router";
import GlobalLoadingOverlay from "@/components/common/GlobalLoadingOverlay";
import PageLoader from "@/components/common/PageLoader";

const applyTheme = (theme: "light" | "dark" | "system") => {
  const root = window.document.documentElement;
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.classList.remove(isDark ? "light" : "dark");
  root.classList.add(isDark ? "dark" : "light");
};

const { theme } = themeStore.getState();
applyTheme(theme);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ToastContainer />
      <GlobalLoadingOverlay />
      <Suspense fallback={<PageLoader fullScreen message="Loading app..." />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
);
