import { useState, useEffect } from "react";
import { getAllAttempts } from "@/data/attemptRepository";

export function useDashboardStats() {
  const [stats, setStats] = useState({
    totalExams: 0,
    pendingTests: 0,
    completedTests: 0,
    averageScore: 0,
  });
  const [loading, setLoading] = useState(true);

  const loadStats = () => {
    setLoading(true);
    try {
      const attempts = getAllAttempts();
      const pending = attempts.filter(a => a.status === 'in_progress').length;
      const completed = attempts.filter(a => a.status === 'completed');
      const avgScore = completed.length > 0
        ? (completed.reduce((sum, a) => sum + (a.score || 0), 0) / completed.length).toFixed(1)
        : 0;
      
      setStats({
        totalExams: attempts.length,
        pendingTests: pending,
        completedTests: completed.length,
        averageScore: avgScore,
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return { stats, loading };
}
