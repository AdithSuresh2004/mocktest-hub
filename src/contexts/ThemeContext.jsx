import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import StorageManager from '@/utils/storage'
import { getInitialTheme, getSystemTheme } from '@/utils/helpers'
import { STORAGE_KEYS } from '@/constants/testConfig'

const ThemeContext = createContext({
  theme: 'system',
  actualTheme: 'light',
  toggleTheme: () => {},
})

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme)

  const actualTheme = useMemo(() => {
    return theme === 'system' ? getSystemTheme() : theme
  }, [theme])

  useEffect(() => {
    const root = document.documentElement
    if (actualTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    StorageManager.setItem(STORAGE_KEYS.THEME, theme)
  }, [theme, actualTheme])

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mq) return

    const handler = () => {
      if (theme === 'system') {
        setTheme('system')
      }
    }

    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  const toggleTheme = (newTheme) => {
    setTheme(newTheme)
  }

  const value = { theme, actualTheme, toggleTheme }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}

export { ThemeProvider }
