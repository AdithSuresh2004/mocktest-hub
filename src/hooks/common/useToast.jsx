import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback(
    (toast) => {
      const id = `toast-${Date.now()}-${Math.random()}`
      const newToast = {
        id,
        message: '',
        type: 'info',
        duration: 3000,
        ...toast,
      }
      setToasts((prev) => [...prev, newToast])
      if (newToast.duration) {
        setTimeout(() => {
          removeToast(id)
        }, newToast.duration)
      }
      return id
    },
    [removeToast]
  )

  const clearAll = useCallback(() => {
    setToasts([])
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAll }}>
      {children}
    </ToastContext.Provider>
  )
}
// eslint-disable-next-line react-refresh/only-export-components

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
// eslint-disable-next-line react-refresh/only-export-components

export default useToast
