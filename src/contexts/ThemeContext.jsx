import { createContext, useContext, useEffect, useState } from 'react'
import StorageManager from '@/utils/storage'
import { STORAGE_KEYS } from '@/constants/testConfig'

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })

const getInitialTheme = () => {
  const stored = StorageManager.getItem(STORAGE_KEYS.THEME)
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'system'
}

const getSystemTheme = () => {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const initialTheme = getInitialTheme()
const root = document.documentElement
const actualTheme = initialTheme === 'system' ? getSystemTheme() : initialTheme
if (actualTheme === 'dark' && !root.classList.contains('dark')) {
  root.classList.add('dark')
} else if (actualTheme === 'light' && root.classList.contains('dark')) {
  root.classList.remove('dark')
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    const actualTheme = theme === 'system' ? getSystemTheme() : theme
    const isDark = actualTheme === 'dark'

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

    const handler = () => {
      if (theme === 'system') {
        const actualTheme = getSystemTheme()
        const isDark = actualTheme === 'dark'
        if (isDark) {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }
      }
    }

    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [theme])

  const toggleTheme = (newTheme) => {
    setTheme(newTheme)
  }

  const value = { theme, toggleTheme }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
