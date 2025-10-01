const ATTEMPTS_KEY = 'exam_attempts';
function generateAttemptId(examId) {
  const timestamp = Date.now().toString(36);
  return `att_${examId}_${timestamp}`;
}
function getAllAttempts() {
  const attemptsJson = localStorage.getItem(ATTEMPTS_KEY);
  return attemptsJson ? JSON.parse(attemptsJson) : [];
}
function saveAllAttempts(attempts) {
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
}
function createAttemptLocal(examId, durationMinutes) {
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
function getLatestAttemptLocal(examId) {
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
function updateAttemptLocal(attemptId, updates) {
  const attempts = getAllAttempts();
  const attemptIndex = attempts.findIndex(att => att.attempt_id === attemptId);
  if (attemptIndex === -1) return null;
  attempts[attemptIndex] = { ...attempts[attemptIndex], ...updates };
  saveAllAttempts(attempts);
  return attempts[attemptIndex];
}
function getAttemptById(attemptId) {
  const attempts = getAllAttempts();
  return attempts.find(att => att.attempt_id === attemptId) || null;
}
function getAllAttemptsForExam(examId) {
  const attempts = getAllAttempts();
  return attempts.filter(att => att.exam_id === examId);
}
function deleteAttempt(attemptId) {
  const attempts = getAllAttempts();
  const filtered = attempts.filter(att => att.attempt_id !== attemptId);
  saveAllAttempts(filtered);
  return filtered.length < attempts.length;
}
export { 
  createAttemptLocal, 
  getLatestAttemptLocal, 
  updateAttemptLocal,
  getAttemptById,
  getAllAttemptsForExam,
  deleteAttempt
};