import { useState, useEffect, useCallback } from 'react'
import FavoritesStorage from '@/utils/favorites-storage'

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  const loadFavorites = useCallback(() => {
    const savedFavorites = FavoritesStorage.getAll()
    const sorted = savedFavorites.sort(
      (a, b) => new Date(b.addedAt || 0) - new Date(a.addedAt || 0)
    )
    setFavorites(sorted)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadFavorites()
    const handleStorageChange = () => {
      loadFavorites()
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [loadFavorites])

  const removeFavorite = (examId) => {
    FavoritesStorage.remove(examId)
    setFavorites((prev) => prev.filter((f) => f.exam_id !== examId))
  }

  return {
    favorites,
    loading,
    removeFavorite,
  }
}
