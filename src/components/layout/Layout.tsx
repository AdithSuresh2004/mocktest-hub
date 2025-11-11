import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { LayoutProps } from "@/types/components";
import RouteChangeLoader from "@/components/common/RouteChangeLoader";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => setMobileSidebarOpen(false), 0);
  }, [location]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileSidebarOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSidebarOpen]);

  const toggleSidebar = () => {
    setMobileSidebarOpen((v) => !v);
  };

  const closeSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <RouteChangeLoader />
      <Navbar toggleSidebar={toggleSidebar} />
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="animate-fadeIn absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200"
            onClick={closeSidebar}
            aria-hidden="true"
          />
          <div className="animate-slideInLeft relative h-full w-full max-w-xs transform bg-white shadow-2xl transition-transform duration-300 ease-out sm:max-w-sm dark:bg-gray-800">
            <Sidebar isMobile onClose={closeSidebar} />
          </div>
        </div>
      )}
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden border-r border-gray-200 bg-white md:flex md:w-64 md:flex-shrink-0 dark:border-gray-700 dark:bg-gray-800">
          <Sidebar isMobile={false} />
        </div>
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="animate-fadeIn">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
