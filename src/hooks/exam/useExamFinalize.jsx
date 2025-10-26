import { updateAttempt } from '@/data/attemptRepository'
import { calculateScore } from '@/utils/helpers/examHelpers'

export const useExamFinalize = (
  exam,
  attempt,
  answers,
  timer,
  setAttempt,
  setIsSubmitted
) => {
  const finalizeExam = () => {
    if (!attempt || !exam) return null

    timer.stop()

    const finalAnswers = Object.entries(answers).map(
      ([q_id, selected_opt_id]) => ({
        q_id,
        selected_opt_id,
      })
    )

    const { score, correct, incorrect, unattempted } = calculateScore(
      exam,
      answers
    )
    const timeTaken = exam.duration_minutes * 60 - timer.seconds

    const finalAttempt = {
      ...attempt,
      status: 'completed',
      responses: finalAnswers,
      score,
      correct_count: correct,
      incorrect_count: incorrect,
      unattempted_count: unattempted,
      time_taken: timeTaken,
      _timeRemainingSeconds: 0,
    }

    updateAttempt(attempt.attempt_id, finalAttempt)
    setAttempt(finalAttempt)
    setIsSubmitted(true)

    return finalAttempt
  }

  return { finalizeExam }
}
