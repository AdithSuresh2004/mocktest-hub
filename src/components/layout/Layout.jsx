import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export default function Layout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMobileSidebarOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar toggleSidebar={() => setMobileSidebarOpen((v) => !v)} />
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40 transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-full max-w-xs sm:max-w-sm h-full bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 translate-x-0">
            <Sidebar isMobile />
          </div>
        </div>
      )}
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:flex md:flex-shrink-0 md:w-64 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto bg-transparent">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
