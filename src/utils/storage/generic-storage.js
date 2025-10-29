import StorageManager from './storage.js'

/**
 * Generic storage class that provides common CRUD operations
 * for local storage management
 */
class GenericStorage {
  /**
   * Create a generic storage manager
   * @param {string} storageKey - The key used in localStorage
   * @param {any} defaultValue - Default value if key doesn't exist
   * @param {string} idKey - The property name used as the identifier (default: 'id')
   */
  constructor(storageKey, defaultValue = [], idKey = 'id') {
    this.storageKey = storageKey
    this.defaultValue = defaultValue
    this.idKey = idKey
  }

  getAll() {
    return StorageManager.getItem(this.storageKey, this.defaultValue)
  }

  setAll(items) {
    return StorageManager.setItem(this.storageKey, items)
  }

  add(item) {
    const items = this.getAll()

    items.push(item)
    return this.setAll(items)
  }

  remove(id) {
    const items = this.getAll()
    const filtered = items.filter((item) => item[this.idKey] !== id)

    return this.setAll(filtered)
  }

  find(id) {
    const items = this.getAll()

    return items.find((item) => item[this.idKey] === id) || null
  }

  update(id, updates) {
    const items = this.getAll()
    const index = items.findIndex((item) => item[this.idKey] === id)

    if (index !== -1) {
      items[index] = { ...items[index], ...updates }
      return this.setAll(items)
    }

    return false
  }

  clear() {
    return StorageManager.setItem(this.storageKey, this.defaultValue)
  }
}

export default GenericStorage
