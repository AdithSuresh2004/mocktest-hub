import { createStorage } from './generic-storage.js'
import { STORAGE_KEYS } from '@/constants/testConfig'

const attemptsStorage = createStorage(
  STORAGE_KEYS.ATTEMPTS,
  [],
  'attempt_id'
)

export const getAllAttempts = () => attemptsStorage.getAll()

export const getAttemptById = attemptId => attemptsStorage.find(attemptId)

export const addAttempt = attempt => attemptsStorage.add(attempt)

export const updateAttempt = (attemptId, updates) =>
  attemptsStorage.update(attemptId, updates)

export const deleteAttemptById = attemptId => attemptsStorage.remove(attemptId)

export const deleteAllAttempts = () => attemptsStorage.clear();
export const setAllAttempts = (attempts) => attemptsStorage.setAll(attempts);
