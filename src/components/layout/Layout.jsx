import { useEffect, useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'

const Layout = () => {
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

  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileSidebarOpen])

  const toggleSidebar = () => {
    setMobileSidebarOpen((v) => !v)
  }

  const closeSidebar = () => {
    setMobileSidebarOpen(false)
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar toggleSidebar={toggleSidebar} />
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 animate-fadeIn"
            onClick={closeSidebar}
            aria-hidden="true"
          />
          <div className="relative h-full w-full max-w-xs transform bg-white shadow-2xl transition-transform duration-300 ease-out sm:max-w-sm dark:bg-gray-800 animate-slideInLeft">
            <Sidebar isMobile onClose={closeSidebar} />
          </div>
        </div>
      )}
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden border-r border-gray-200 bg-white md:flex md:w-64 md:flex-shrink-0 dark:border-gray-700 dark:bg-gray-800">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="animate-fadeIn">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
