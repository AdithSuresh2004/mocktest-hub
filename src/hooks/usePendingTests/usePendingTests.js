import { useState, useEffect, useCallback } from "react";
import { getAllAttempts, removeAttempt } from "@/data/attemptRepository";

export function usePendingTests() {
  const [pendingTests, setPendingTests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPendingTests = useCallback(() => {
    setLoading(true);
    try {
      const attempts = getAllAttempts();
      const pending = attempts
        .filter(a => a.status === 'in_progress')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setPendingTests(pending);
    } catch (error) {
      console.error('Error loading pending tests:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPendingTests();
  }, [loadPendingTests]);

  const deletePendingTest = useCallback((attemptId) => {
    if (confirm('Are you sure you want to delete this pending test?')) {
      try {
        removeAttempt(attemptId);
        loadPendingTests(); // Reload after deletion
      } catch (error) {
        console.error('Error deleting attempt:', error);
      }
    }
  }, [loadPendingTests]);

  return { pendingTests, loading, deletePendingTest };
}
