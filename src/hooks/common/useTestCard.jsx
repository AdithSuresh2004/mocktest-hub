import { useState, useEffect, useMemo } from 'react'
import FavoritesStorage from '@/utils/favorites-storage'
import {
  getAttemptStatus,
  getAllTags,
  toggleFavoriteStatus,
  getFavoriteData,
} from '@/services/testService'

export const useTestCard = (test) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [attemptStatus, setAttemptStatus] = useState(null)

  useEffect(() => {
    setIsFavorite(FavoritesStorage.isFavorite(test.exam_id))
    setAttemptStatus(getAttemptStatus(test.exam_id))
  }, [test.exam_id])

  const allTags = useMemo(() => getAllTags(test), [test])

  const toggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const favoriteData = getFavoriteData(test)
    const newStatus = toggleFavoriteStatus(test.exam_id, favoriteData)
    setIsFavorite(newStatus)
  }

  return {
    isFavorite,
    attemptStatus,
    allTags,
    toggleFavorite,
  }
}
