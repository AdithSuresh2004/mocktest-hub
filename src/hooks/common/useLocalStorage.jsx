import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setStoredValue = (newValue) => {
    try {
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue
      setValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      window.dispatchEvent(new StorageEvent('storage', { key }))
    } catch {
      setValue(initialValue)
    }
  }

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          const item = window.localStorage.getItem(key)
          setValue(item ? JSON.parse(item) : initialValue)
        } catch {
          setValue(initialValue)
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, initialValue])

  return [value, setStoredValue]
}
