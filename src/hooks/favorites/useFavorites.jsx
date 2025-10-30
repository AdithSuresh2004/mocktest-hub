import { useState, useEffect, useCallback } from 'react'
import { getAllFavorites, removeFavorite as removeFavoriteFromStorage } from '@/utils/storage'

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  const loadFavorites = useCallback(() => {
    const savedFavorites = getAllFavorites()
    const sorted = savedFavorites.sort(
      (a, b) => new Date(b.addedAt || 0) - new Date(a.addedAt || 0)
    )
    setFavorites(sorted)
    setLoading(false)
  }, [])

  useEffect(() => {
    setTimeout(() => loadFavorites(), 0)
    const handleStorageChange = () => {
      loadFavorites()
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [loadFavorites])

  const removeFavorite = (examId) => {
    removeFavoriteFromStorage(examId)
    setFavorites((prev) => prev.filter((f) => f.exam_id !== examId))
  }

  return {
    favorites,
    loading,
    removeFavorite,
  }
}
