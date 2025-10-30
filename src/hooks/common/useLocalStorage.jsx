import { useState, useEffect, useCallback } from 'react'

export function useLocalStorage(key, initialValue) {
  const readValue = useCallback(() => {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  }, [key, initialValue])

  const [value, setValue] = useState(readValue)

  const setStoredValue = useCallback(
    (newValue) => {
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue
      setValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      window.dispatchEvent(new StorageEvent('storage', { key }))
    },
    [key, value]
  )

  useEffect(() => {
    setValue(readValue())
  }, [key, readValue])

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        setValue(readValue())
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, readValue])

  return [value, setStoredValue]
}
