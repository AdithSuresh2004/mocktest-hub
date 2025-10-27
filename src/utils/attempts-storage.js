import GenericStorage from './generic-storage'
import { STORAGE_KEYS } from '@/constants/testConfig'

class AttemptsStorage extends GenericStorage {
  constructor() {
    // Use attempt_id as the identifier
    super(STORAGE_KEYS.ATTEMPTS, [], 'attempt_id')
  }

  // Add specific functionality for attempts
  getById(attemptId) {
    return this.find(attemptId)
  }

  deleteById(attemptId) {
    return this.remove(attemptId)
  }

  deleteAll() {
    return this.setAll([])
  }
}

export default new AttemptsStorage()
