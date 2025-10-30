import { createStorage } from './generic-storage.js'
import { STORAGE_KEYS } from '@/constants/testConfig'

const favoritesStorage = createStorage(STORAGE_KEYS.FAVORITES, [], 'exam_id')

export const isFavorite = examId => {
  const favorites = favoritesStorage.getAll()
  return favorites.some(f => f.exam_id === examId)
}

export const addFavorite = favorite => {
  const favorites = favoritesStorage.getAll()
  const exists = favorites.some(f => f.exam_id === favorite.exam_id)

  if (!exists) {
    favorites.push({ ...favorite, addedAt: new Date().toISOString() })
    favoritesStorage.setAll(favorites)
  }
}

export const removeFavorite = examId => {
  const favorites = favoritesStorage.getAll()
  const filtered = favorites.filter(f => f.exam_id !== examId)
  favoritesStorage.setAll(filtered)
}

export const toggleFavorite = (examId, favoriteData) => {
  if (isFavorite(examId)) {
    removeFavorite(examId)
    return false
  } else {
    addFavorite(favoriteData)
    return true
  }
}

export const getAllFavorites = () => favoritesStorage.getAll();
export const setAllFavorites = (favorites) => favoritesStorage.setAll(favorites);
