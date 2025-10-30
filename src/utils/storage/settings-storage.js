import { createStorage } from './generic-storage.js'
import { STORAGE_KEYS } from '@/constants/testConfig'

const settingsStorage = createStorage(STORAGE_KEYS.SETTINGS, {})

export const getSettings = () => settingsStorage.getAll()

export const setSettings = settings => settingsStorage.setAll(settings)

export const updateSetting = (key, value) => {
  const settings = getSettings()
  settings[key] = value
  setSettings(settings)
}

export const resetSettings = () => settingsStorage.clear()
