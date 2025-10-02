import { useState, useEffect } from "react";
import { getAllAttempts } from "@/data/attemptRepository";

export function useRecentActivity() {
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRecentActivity = () => {
    setLoading(true);
    try {
      const attempts = getAllAttempts();
      const recent = attempts
        .filter(a => a.status === 'completed')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5)
        .map(a => ({
          id: a.attempt_id,
          exam_id: a.exam_id,
          exam_name: a.exam_name,
          score: a.score || 0,
          timestamp: a.timestamp,
          timeTaken: a.time_taken || 0,
        }));
      setRecentActivity(recent);
    } catch (error) {
      console.error('Error loading recent activity:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecentActivity();
  }, []);

  return { recentActivity, loading };
}
