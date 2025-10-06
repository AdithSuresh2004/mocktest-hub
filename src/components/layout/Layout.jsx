import { useEffect, useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function Layout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [location])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileSidebarOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Navbar toggleSidebar={() => setMobileSidebarOpen((v) => !v)} />
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/40 transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative h-full w-full max-w-xs translate-x-0 transform bg-white shadow-lg transition-transform duration-300 sm:max-w-sm dark:bg-gray-800">
            <Sidebar isMobile />
          </div>
        </div>
      )}
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden border-r border-gray-200 bg-white md:flex md:w-64 md:flex-shrink-0 dark:border-gray-700 dark:bg-gray-800">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto bg-transparent">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
