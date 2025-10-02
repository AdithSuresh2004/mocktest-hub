const ATTEMPTS_KEY = 'exam_attempts';

function generateAttemptId(examId) {
  const timestamp = Date.now().toString(36);
  return `att_${examId}_${timestamp}`;
}

// Renamed to avoid conflict with other potential `getAll` functions
export function getAllAttempts() {
  const attemptsJson = localStorage.getItem(ATTEMPTS_KEY);
  return attemptsJson ? JSON.parse(attemptsJson) : [];
}

function saveAllAttempts(attempts) {
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
}

export function createAttempt(examId, durationMinutes) {
  const attempt = {
    attempt_id: generateAttemptId(examId),
    exam_id: examId,
    username: "guest",
    timestamp: new Date().toISOString(),
    status: "in_progress",
    responses: [],
    score: null,
    time_taken: 0,
    _startedAt: Date.now(),
    _durationMinutes: durationMinutes,
    _timeRemainingSeconds: durationMinutes * 60,
    _currentSection: 0,
    _currentQuestion: 0,
    _markedForReview: []
  };
  const attempts = getAllAttempts();
  attempts.push(attempt);
  saveAllAttempts(attempts);
  return attempt;
}

export function getLatestInProgressAttempt(examId) {
  const attempts = getAllAttempts();
  const inProgressAttempts = attempts.filter(
    att => att.exam_id === examId && att.status === 'in_progress'
  );
  if (inProgressAttempts.length === 0) return null;
  inProgressAttempts.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  return inProgressAttempts[0];
}

export function updateAttempt(attemptId, updates) {
  const attempts = getAllAttempts();
  const attemptIndex = attempts.findIndex(att => att.attempt_id === attemptId);
  if (attemptIndex === -1) return null;
  attempts[attemptIndex] = { ...attempts[attemptIndex], ...updates };
  saveAllAttempts(attempts);
  return attempts[attemptIndex];
}

export function findAttemptById(attemptId) {
  const attempts = getAllAttempts();
  return attempts.find(att => att.attempt_id === attemptId) || null;
}

export function findAllAttemptsByExamId(examId) {
  const attempts = getAllAttempts();
  return attempts.filter(att => att.exam_id === examId);
}

export function removeAttempt(attemptId) {
  const attempts = getAllAttempts();
  const filtered = attempts.filter(att => att.attempt_id !== attemptId);
  saveAllAttempts(filtered);
  return filtered.length < attempts.length;
}

