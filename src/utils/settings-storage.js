import GenericStorage from './generic-storage'
import { STORAGE_KEYS } from '@/constants/testConfig'

class SettingsStorage extends GenericStorage {
  constructor() {
    super(STORAGE_KEYS.SETTINGS, {})
  }

  // Add specific functionality for settings
  get() {
    return this.getAll()
  }

  set(settings) {
    return this.setAll(settings)
  }

  update(key, value) {
    const settings = this.get()

    settings[key] = value
    return this.set(settings)
  }

  reset() {
    return this.set({})
  }
}

export default new SettingsStorage()
