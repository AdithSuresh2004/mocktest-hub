import { useState, useEffect } from 'react'
import { isFavorite as isFavoriteInStorage } from '@/utils/storage'
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
    setTimeout(() => {
      setIsFavorite(isFavoriteInStorage(test.exam_id))
      setAttemptStatus(getAttemptStatus(test.exam_id))
    }, 0)
  }, [test.exam_id])

  const allTags = getAllTags(test)

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
