import { findExamById } from '@/data/examRepository'

/**
 * Normalizes an attempt object to a consistent format.
 * This handles variations in property names (e.g., id vs. attempt_id)
 * and calculates the score percentage.
 *
 * @param {object} attempt - The original attempt object.
 * @returns {Promise<object|null>} A normalized attempt object or null if data is invalid.
 */
export async function normalizeAttempt(attempt) {
  if (!attempt) return null

  try {
    const exam = await findExamById(attempt.exam_id)
    if (!exam) return null

    const totalQuestions = exam.sections.reduce(
      (sum, section) => sum + section.questions.length,
      0,
    )

    const getScorePercentage = (score) => {
      if (score === null || score === undefined) return 0
      if (typeof score === 'number') return score
      if (typeof score === 'object') {
        // Handles { actual, total } structure
        if (
          typeof score.actual === 'number' &&
          typeof score.total === 'number' &&
          score.total > 0
        ) {
          return (score.actual / score.total) * 100
        }
        // Handles { total: correctAnswers } structure
        if (typeof score.total === 'number' && totalQuestions > 0) {
          // Assuming positive marking only for now.
          // This might need to be adjusted based on exam marking scheme.
          const maxScore = totalQuestions // Simplified: 1 question = 1 mark
          return (score.total / maxScore) * 100
        }
      }
      return 0
    }

    return {
      id: attempt.id || attempt.attempt_id,
      examId: attempt.exam_id,
      examName: exam.title || attempt.exam_name || `Exam ${attempt.exam_id}`,
      date: attempt.date || attempt.timestamp,
      status: attempt.status,
      timeTaken: attempt.time_taken,
      score: getScorePercentage(attempt.score),
      rawScore: attempt.score,
      responses: attempt.responses,
      // Keep internal properties if they exist
      _startedAt: attempt._startedAt,
      _durationMinutes: attempt._durationMinutes,
      _timeRemainingSeconds: attempt._timeRemainingSeconds,
    }
  } catch (error) {
    console.error(
      `Failed to normalize attempt for exam ${attempt.exam_id}:`,
      error,
    )
    // Return a partially normalized object so the UI can still display something
    return {
      id: attempt.id || attempt.attempt_id,
      examId: attempt.exam_id,
      examName: `Exam ${attempt.exam_id} (Data Missing)`,
      date: attempt.date || attempt.timestamp,
      status: attempt.status,
      timeTaken: attempt.time_taken,
      score: 0,
      rawScore: attempt.score,
      responses: attempt.responses,
      error: 'Exam data could not be loaded.',
    }
  }
}
