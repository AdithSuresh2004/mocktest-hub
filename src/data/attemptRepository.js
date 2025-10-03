const ATTEMPTS_KEY = 'exam_attempts'

// Validation helper
function isValidAttempt(attempt) {
  return (
    attempt &&
    typeof attempt === 'object' &&
    attempt.attempt_id &&
    attempt.exam_id &&
    attempt.status &&
    ['in_progress', 'completed'].includes(attempt.status)
  )
}

function generateAttemptId(examId) {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 7)
  return `att_${examId}_${timestamp}_${random}`
}

export function getAllAttempts() {
  try {
    const attemptsJson = localStorage.getItem(ATTEMPTS_KEY)
    if (!attemptsJson) return []
    
    const attempts = JSON.parse(attemptsJson)
    if (!Array.isArray(attempts)) {
      console.warn('Invalid attempts data format, resetting...')
      return []
    }
    
    // Filter out invalid attempts
    const validAttempts = attempts.filter(isValidAttempt)
    
    // If some were invalid, save the cleaned list
    if (validAttempts.length !== attempts.length) {
      saveAllAttempts(validAttempts)
    }
    
    return validAttempts
  } catch (error) {
    console.error('Error reading attempts:', error)
    return []
  }
}

function saveAllAttempts(attempts) {
  try {
    if (!Array.isArray(attempts)) {
      console.error('Attempted to save non-array as attempts')
      return false
    }
    
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts))
    return true
  } catch (error) {
    console.error('Error saving attempts:', error)
    // Handle quota exceeded error
    if (error.name === 'QuotaExceededError') {
      console.warn('Storage quota exceeded. Cleaning old completed attempts...')
      // Keep only recent 50 completed attempts
      const cleanedAttempts = attempts
        .filter(a => a.status === 'in_progress' || 
                (a.status === 'completed' && Date.now() - new Date(a.timestamp).getTime() < 30 * 24 * 60 * 60 * 1000))
        .slice(-50)
      localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(cleanedAttempts))
    }
    return false
  }
}

export function createAttempt(examId, examName, durationMinutes) {
  if (!examId || !examName || !durationMinutes) {
    console.error('Invalid attempt parameters:', { examId, examName, durationMinutes })
    return null
  }

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
  
  const attempts = getAllAttempts()
  attempts.push(attempt)
  
  if (saveAllAttempts(attempts)) {
    return attempt
  }
  
  console.error('Failed to save new attempt')
  return null
}

export function getLatestInProgressAttempt(examId) {
  const attempts = getAllAttempts()
  const inProgressAttempts = attempts.filter(
    (att) => att.exam_id === examId && att.status === 'in_progress',
  )
  if (inProgressAttempts.length === 0) return null
  inProgressAttempts.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )
  return inProgressAttempts[0]
}

export function updateAttempt(attemptId, updates) {
  if (!attemptId || !updates || typeof updates !== 'object') {
    console.error('Invalid update parameters')
    return null
  }

  const attempts = getAllAttempts()
  const attemptIndex = attempts.findIndex((att) => att.attempt_id === attemptId)
  
  if (attemptIndex === -1) {
    console.warn(`Attempt ${attemptId} not found for update`)
    return null
  }
  
  // Merge updates carefully, preserving required fields
  attempts[attemptIndex] = { 
    ...attempts[attemptIndex], 
    ...updates,
    attempt_id: attempts[attemptIndex].attempt_id, // Never allow ID change
    exam_id: attempts[attemptIndex].exam_id, // Never allow exam ID change
  }
  
  if (!isValidAttempt(attempts[attemptIndex])) {
    console.error('Update would create invalid attempt, rejecting')
    return attempts[attemptIndex] // Return old version
  }
  
  saveAllAttempts(attempts)
  return attempts[attemptIndex]
}

export function findAttemptById(attemptId) {
  const attempts = getAllAttempts()
  return attempts.find((att) => att.attempt_id === attemptId) || null
}

export function findAllAttemptsByExamId(examId) {
  const attempts = getAllAttempts()
  return attempts.filter((att) => att.exam_id === examId)
}

export function removeAttempt(attemptId) {
  const attempts = getAllAttempts()
  const filtered = attempts.filter((att) => att.attempt_id !== attemptId)
  saveAllAttempts(filtered)
  return filtered.length < attempts.length
}
