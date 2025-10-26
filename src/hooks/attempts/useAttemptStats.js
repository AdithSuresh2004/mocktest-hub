export function useAttemptStats(attempts) {
  if (!attempts || attempts.length === 0) {
    return {
      avgScore: 0,
      bestScore: 0,
      worstScore: 0,
      avgTime: 0,
      totalTime: 0,
      count: 0,
    }
  }
  
  const toNumber = (value) => {
    const numeric = Number(value)
    return Number.isFinite(numeric) ? numeric : 0
  }
  
  const scores = attempts.map((attempt) => toNumber(attempt.score))
  const times = attempts.map((attempt) => Math.max(0, toNumber(attempt.timeTaken)))
  const totalScore = scores.reduce((sum, score) => sum + score, 0)
  const totalTime = times.reduce((sum, time) => sum + time, 0)
  const count = attempts.length
  const avgScore = count > 0 ? totalScore / count : 0
  const avgTime = count > 0 ? totalTime / count : 0
  const bestScore = Math.max(...scores)
  const worstScore = Math.min(...scores)
  
  return {
    avgScore: parseFloat(avgScore.toFixed(2)),
    bestScore: parseFloat(bestScore.toFixed(2)),
    worstScore: parseFloat(worstScore.toFixed(2)),
    avgTime: Math.round(avgTime),
    totalTime: Math.round(totalTime),
    count,
  }
}
