import { useState, useEffect, useMemo } from 'react';
import { getAllAttempts } from '@/data/attemptRepository';

export const usePerformanceChartData = (days = 30) => {
  const allAttempts = useMemo(() => {
    return getAllAttempts()
      .filter((a) => a.status === 'completed')
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }, []);

  const chartData = useMemo(() => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return allAttempts
      .filter((a) => new Date(a.timestamp) >= cutoffDate)
      .map((a, index) => ({
        date: new Date(a.timestamp).toLocaleDateString(),
        score: a.score || 0,
        time: Math.floor((a.time_taken || 0) / 60),
        attempt: index + 1,
      }));
  }, [allAttempts, days]);

  return { chartData };
};
