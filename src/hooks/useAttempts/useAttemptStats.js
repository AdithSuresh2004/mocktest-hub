import { useMemo } from "react";

export function useAttemptStats(attempts) {
  const stats = useMemo(() => {
    if (attempts.length === 0) return null;
    const scores = attempts.map(a => a.score || 0);
    const times = attempts.map(a => a.time_taken || 0);
    return {
      total: attempts.length,
      avgScore: (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1),
      bestScore: Math.max(...scores),
      worstScore: Math.min(...scores),
      avgTime: Math.floor(times.reduce((a, b) => a + b, 0) / times.length),
      totalTime: times.reduce((a, b) => a + b, 0)
    };
  }, [attempts]);

  return stats;
}
