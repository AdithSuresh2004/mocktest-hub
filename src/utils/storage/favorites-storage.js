import GenericStorage from './generic-storage.js'
import { STORAGE_KEYS } from '@/constants/testConfig'

class FavoritesStorage extends GenericStorage {
  constructor() {
    super(STORAGE_KEYS.FAVORITES, [])
  }

  // Add specific functionality for favorites
  add(favorite) {
    const favorites = this.getAll()
    const exists = favorites.some((f) => f.exam_id === favorite.exam_id)

    if (!exists) {
      favorites.push({ ...favorite, addedAt: new Date().toISOString() })
      return this.setAll(favorites)
    }
    return false
  }

  remove(examId) {
    const favorites = this.getAll()
    const filtered = favorites.filter((f) => f.exam_id !== examId)

    return this.setAll(filtered)
  }

  isFavorite(examId) {
    const favorites = this.getAll()

    return favorites.some((f) => f.exam_id === examId)
  }

  toggle(examId, favoriteData) {
    if (this.isFavorite(examId)) {
      this.remove(examId)
      return false
    } else {
      this.add(favoriteData)
      return true
    }
  }
}

export default new FavoritesStorage()
