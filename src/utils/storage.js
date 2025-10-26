import { STORAGE_KEYS } from '@/constants/testConfig'

class StorageManager {
  static getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  }

  static setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  }

  static removeItem(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  }

  static clear() {
    try {
      localStorage.clear()
      return true
    } catch {
      return false
    }
  }
}

export class FavoritesStorage {
  static getAll() {
    return StorageManager.getItem(STORAGE_KEYS.FAVORITES, [])
  }

  static setAll(favorites) {
    return StorageManager.setItem(STORAGE_KEYS.FAVORITES, favorites)
  }

  static add(favorite) {
    const favorites = this.getAll()
    const exists = favorites.some((f) => f.exam_id === favorite.exam_id)
    if (!exists) {
      favorites.push({ ...favorite, addedAt: new Date().toISOString() })
      return this.setAll(favorites)
    }
    return false
  }

  static remove(examId) {
    const favorites = this.getAll()
    const filtered = favorites.filter((f) => f.exam_id !== examId)
    return this.setAll(filtered)
  }

  static isFavorite(examId) {
    const favorites = this.getAll()
    return favorites.some((f) => f.exam_id === examId)
  }

  static toggle(examId, favoriteData) {
    if (this.isFavorite(examId)) {
      this.remove(examId)
      return false
    } else {
      this.add(favoriteData)
      return true
    }
  }
}

export class AttemptsStorage {
  static getAll() {
    return StorageManager.getItem(STORAGE_KEYS.ATTEMPTS, [])
  }

  static setAll(attempts) {
    return StorageManager.setItem(STORAGE_KEYS.ATTEMPTS, attempts)
  }

  static add(attempt) {
    const attempts = this.getAll()
    attempts.push(attempt)
    return this.setAll(attempts)
  }

  static getById(attemptId) {
    const attempts = this.getAll()
    return attempts.find((a) => a.attempt_id === attemptId) || null
  }

  static deleteById(attemptId) {
    const attempts = this.getAll()
    const filtered = attempts.filter((a) => a.attempt_id !== attemptId)
    return this.setAll(filtered)
  }

  static deleteAll() {
    return this.setAll([])
  }
}

export class SettingsStorage {
  static get() {
    return StorageManager.getItem(STORAGE_KEYS.SETTINGS, {})
  }

  static set(settings) {
    return StorageManager.setItem(STORAGE_KEYS.SETTINGS, settings)
  }

  static update(key, value) {
    const settings = this.get()
    settings[key] = value
    return this.set(settings)
  }

  static reset() {
    return this.set({})
  }
}

export default StorageManager
