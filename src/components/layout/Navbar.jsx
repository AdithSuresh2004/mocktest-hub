import { Link } from 'react-router-dom'
import { RxHamburgerMenu } from 'react-icons/rx'
import ThemeToggle from '@/components/common/ThemeToggle'
export default function Navbar({ toggleSidebar = () => {} }) {
  return (
    <header className="z-50 flex items-center justify-between bg-white p-4 shadow-md dark:bg-gray-800 dark:shadow-black/20">
      <button
        onClick={toggleSidebar}
        className="text-gray-700 hover:text-gray-900 focus:outline-none md:hidden dark:text-gray-200 dark:hover:text-white"
        aria-label="Open menu"
        aria-controls="mobile-sidebar"
      >
        <RxHamburgerMenu className="h-6 w-6" />
      </button>
      <div className="flex w-full justify-center lg:justify-start">
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 dark:text-gray-100"
        >
          MockTest Hub
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  )
}
