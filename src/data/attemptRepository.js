import AttemptsStorage from '@/utils/attempts-storage'

const isValidAttempt = (attempt) => {
  return (
    attempt &&
    typeof attempt === 'object' &&
    attempt.attempt_id &&
    attempt.exam_id &&
    attempt.status &&
    ['in_progress', 'completed'].includes(attempt.status)
  )
}

const generateAttemptId = (examId) => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 7)
  return `att_${examId}_${timestamp}_${random}`
}

const getAllAttempts = () => {
  const attempts = AttemptsStorage.getAll()
  if (!Array.isArray(attempts)) return []
  const validAttempts = attempts.filter(isValidAttempt)
  if (validAttempts.length !== attempts.length) {
    AttemptsStorage.setAll(validAttempts)
  }
  return validAttempts
}

const createAttempt = (examId, examName, durationMinutes) => {
  if (!examId || !examName || !durationMinutes) return null
  const attempt = {
    attempt_id: generateAttemptId(examId),
    exam_id: examId,
    exam_name: examName || 'Untitled Exam',
    username: 'guest',
    timestamp: new Date().toISOString(),
    status: 'in_progress',
    responses: [],
    score: null,
    time_taken: 0,
    _startedAt: Date.now(),
    _durationMinutes: Math.max(1, durationMinutes),
    _timeRemainingSeconds: Math.max(60, durationMinutes * 60),
    _currentSection: 0,
    _currentQuestion: 0,
    _markedForReview: [],
    _hasStarted: false,
  }
  return AttemptsStorage.add(attempt) ? attempt : null
}

const getLatestInProgressAttempt = (examId) => {
  const attempts = getAllAttempts()
  const inProgressAttempts = attempts.filter(
    (att) => att.exam_id === examId && att.status === 'in_progress'
  )
  if (inProgressAttempts.length === 0) return null
  inProgressAttempts.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
  return inProgressAttempts[0]
}

const updateAttempt = (attemptId, updates) => {
  if (!attemptId || !updates || typeof updates !== 'object') return null
  const attempts = getAllAttempts()
  const attemptIndex = attempts.findIndex((att) => att.attempt_id === attemptId)
  if (attemptIndex === -1) return null
  attempts[attemptIndex] = {
    ...attempts[attemptIndex],
    ...updates,
    attempt_id: attempts[attemptIndex].attempt_id,
    exam_id: attempts[attemptIndex].exam_id,
  }
  if (!isValidAttempt(attempts[attemptIndex])) {
    return attempts[attemptIndex]
  }
  AttemptsStorage.setAll(attempts)
  return attempts[attemptIndex]
}

const findAttemptById = (attemptId) => {
  return AttemptsStorage.getById(attemptId)
}

const findAllAttemptsByExamId = (examId) => {
  const attempts = getAllAttempts()
  return attempts.filter((att) => att.exam_id === examId)
}

const removeAttempt = (attemptId) => {
  return AttemptsStorage.deleteById(attemptId)
}

export { 
  getAllAttempts, 
  createAttempt, 
  getLatestInProgressAttempt, 
  updateAttempt, 
  findAttemptById, 
  findAllAttemptsByExamId, 
  removeAttempt 
}


