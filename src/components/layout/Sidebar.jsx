import { useLocation, Link } from 'react-router-dom'
import {
  FaHome,
  FaFile,
  FaHourglassHalf,
  FaHistory,
  FaStar,
  FaCog,
} from 'react-icons/fa'

const navItems = [
  { to: '/', icon: FaHome, label: 'Dashboard' },
  { to: '/exams', icon: FaFile, label: 'Exams' },
  { to: '/pending', icon: FaHourglassHalf, label: 'Pending Tests' },
  { to: '/attempts', icon: FaHistory, label: 'Test Results' },
  { to: '/favorites', icon: FaStar, label: 'Saved Tests' },
  { to: '/settings', icon: FaCog, label: 'Settings' },
]

export default function Sidebar({ isMobile }) {
  const location = useLocation()

  return (
    <aside
      className={`flex flex-col bg-white dark:bg-gray-800 dark:shadow-black/20 ${
        isMobile
          ? 'fixed top-0 left-0 z-50 h-full w-full shadow-lg'
          : 'w-64 border-r border-gray-200 md:flex-shrink-0 dark:border-gray-700'
      }`}
    >
      <nav className="flex flex-1 flex-col space-y-2 p-2 md:p-4">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to
          return (
            <Link
              key={to}
              to={to}
              title={label}
              className={`flex items-center gap-2 rounded-lg px-2 py-2 transition-colors duration-200 md:gap-3 md:px-3 md:py-2 ${
                isActive
                  ? 'bg-blue-100 font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-200'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="inline">{label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
