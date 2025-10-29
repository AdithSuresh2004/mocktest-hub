const StorageManager = {
  getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },

  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },

  removeItem(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  },

  clear() {
    try {
      localStorage.clear()
      return true
    } catch {
      return false
    }
  },
}

export default StorageManager
