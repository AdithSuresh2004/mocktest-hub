import { useState, useEffect, useMemo } from "react";
import { getAllAttempts } from "@/data/attemptRepository";

export function useAttempts() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterScore, setFilterScore] = useState('all');

  useEffect(() => {
    loadAttempts();
  }, []);

  const loadAttempts = () => {
    const completed = getAllAttempts()
      .filter(a => a.status === 'completed');
    setAttempts(completed);
    setLoading(false);
  };

  const sortedAndFiltered = useMemo(() => {
    let filtered = [...attempts];
    if (filterScore !== 'all') {
      filtered = filtered.filter(a => {
        const percentage = (a.score / 100) * 100;
        if (filterScore === 'high') return percentage >= 80;
        if (filterScore === 'medium') return percentage >= 60 && percentage < 80;
        if (filterScore === 'low') return percentage < 60;
        return true;
      });
    }
    filtered.sort((a, b) => {
      let compareValue = 0;
      switch(sortBy) {
        case 'date':
          compareValue = new Date(b.timestamp) - new Date(a.timestamp);
          break;
        case 'score':
          compareValue = (b.score || 0) - (a.score || 0);
          break;
        case 'time':
          compareValue = (a.time_taken || 0) - (b.time_taken || 0);
          break;
        default:
          compareValue = 0;
      }
      return sortOrder === 'asc' ? -compareValue : compareValue;
    });
    return filtered;
  }, [attempts, sortBy, sortOrder, filterScore]);

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return {
    attempts: sortedAndFiltered,
    loading,
    sortBy,
    sortOrder,
    filterScore,
    setFilterScore,
    toggleSort,
    originalAttempts: attempts,
  };
}
