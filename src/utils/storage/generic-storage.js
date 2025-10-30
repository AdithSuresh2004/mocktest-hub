import * as StorageManager from './storage.js'

export const createStorage = (storageKey, defaultValue = [], idKey = 'id') => ({
  getAll: () => StorageManager.getItem(storageKey, defaultValue),
  setAll: items => StorageManager.setItem(storageKey, items),
  add: item => {
    const items = StorageManager.getItem(storageKey, defaultValue)
    items.push(item)
    StorageManager.setItem(storageKey, items)
  },
  remove: id => {
    const items = StorageManager.getItem(storageKey, defaultValue)
    const filtered = items.filter(item => item[idKey] !== id)
    StorageManager.setItem(storageKey, filtered)
  },
  find: id => {
    const items = StorageManager.getItem(storageKey, defaultValue)
    return items.find(item => item[idKey] === id) || null
  },
  update: (id, updates) => {
    const items = StorageManager.getItem(storageKey, defaultValue)
    const index = items.findIndex(item => item[idKey] === id)
    if (index !== -1) {
      items[index] = { ...items[index], ...updates }
      StorageManager.setItem(storageKey, items)
    }
  },
  clear: () => StorageManager.setItem(storageKey, defaultValue),
})
