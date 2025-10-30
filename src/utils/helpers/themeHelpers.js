/**
 * Theme helper functions
 * Extracted to a separate file to avoid React Refresh warnings in ThemeContext
 */

import { getItem } from '@/utils/storage/storage.js'
import { STORAGE_KEYS } from '@/constants/testConfig'

export const getInitialTheme = () => {
  const stored = getItem(STORAGE_KEYS.THEME)
  return stored === 'light' || stored === 'dark' || stored === 'system'
    ? stored
    : 'system'
}

export const getSystemTheme = () => {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}


export default {
  getInitialTheme,
  getSystemTheme,
}
