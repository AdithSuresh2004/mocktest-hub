import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import StorageManager from '@/utils/storage'
import { STORAGE_KEYS } from '@/constants/testConfig'

const ThemeContext = createContext({ theme: 'light', setTheme: () => {} })

export function ThemeProvider({ children }) {
  const getPreferred = () => {
    const stored = StorageManager.getItem(STORAGE_KEYS.THEME)
    if (stored === 'light' || stored === 'dark') return stored
    const prefersDark = window.matchMedia?.(
      '(prefers-color-scheme: dark)'
    )?.matches
    return prefersDark ? 'dark' : 'light'
  }

  const [theme, setTheme] = useState(getPreferred)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    StorageManager.setItem(STORAGE_KEYS.THEME, theme)
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mq) return
    const handler = (e) => {
      const stored = StorageManager.getItem(STORAGE_KEYS.THEME)
      if (!stored) setTheme(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
