import { useLocation, Link } from "react-router-dom";
import {
  FaHome,
  FaFile,
  FaHourglassHalf,
  FaHistory,
  FaStar,
  FaCog,
  FaEdit,
  FaStickyNote,
} from "react-icons/fa";
import { cn } from "@/utils/cn";

const navItems = [
  { to: "/", icon: FaHome, label: "Dashboard" },
  { to: "/exams", icon: FaFile, label: "Exams" },
  { to: "/pending", icon: FaHourglassHalf, label: "In Progress" },
  { to: "/attempts", icon: FaHistory, label: "Results" },
  { to: "/favorites", icon: FaStar, label: "Favorites" },
  { to: "/builder", icon: FaEdit, label: "Builder" },
  { to: "/notes", icon: FaStickyNote, label: "Notes" },
  { to: "/settings", icon: FaCog, label: "Settings" },
];

interface SidebarProps {
  isMobile: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isMobile, onClose }: SidebarProps) => {
  const location = useLocation();

  const baseLinkClasses =
    "flex items-center gap-2 rounded-lg px-2 py-2 transition-colors duration-200 md:gap-3 md:px-3 md:py-2";
  const activeLinkClasses =
    "bg-blue-100 font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-200";
  const inactiveLinkClasses =
    "text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white";

  return (
    <aside className="flex h-full w-full flex-col">
      <nav className="flex flex-1 flex-col space-y-2 p-2 md:p-4">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={isMobile ? onClose : undefined}
              title={label}
              className={cn(
                baseLinkClasses,
                isActive ? activeLinkClasses : inactiveLinkClasses,
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="inline">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
