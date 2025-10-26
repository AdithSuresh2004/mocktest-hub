import { createContext, useContext, useEffect, useState } from 'react'
import StorageManager from '@/utils/storage'
import { STORAGE_KEYS } from '@/constants/testConfig'

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })

const getInitialTheme = () => {
  const stored = StorageManager.getItem(STORAGE_KEYS.THEME)
  if (stored === 'light' || stored === 'dark') return stored

  if (document.documentElement.classList.contains('dark')) return 'dark'

  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark'

  return 'light'
}

const initialTheme = getInitialTheme()
const root = document.documentElement
if (initialTheme === 'dark' && !root.classList.contains('dark')) {
  root.classList.add('dark')
} else if (initialTheme === 'light' && root.classList.contains('dark')) {
  root.classList.remove('dark')
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    const isDark = theme === 'dark'

    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    StorageManager.setItem(STORAGE_KEYS.THEME, theme)
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mq) return

    const handler = (e) => {
      const stored = StorageManager.getItem(STORAGE_KEYS.THEME)
      if (!stored) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [])

  const toggleTheme = () => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  const value = { theme, toggleTheme }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
