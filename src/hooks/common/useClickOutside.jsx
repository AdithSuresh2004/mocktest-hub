import { useEffect, useRef } from 'react'

/**
 * Hook to detect clicks outside an element
 * @param {Function} handler - Callback to execute when clicked outside
 * @returns {React.RefObject} Ref to attach to the element
export const useClickOutside = (handler) => {
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [handler])

  return ref
}
