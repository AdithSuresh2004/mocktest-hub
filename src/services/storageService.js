const STORAGE_KEYS = {
  ATTEMPTS: 'attempts',
  FAVORITES: 'favorites',
  SETTINGS: 'settings',
  CACHE: 'dataCache'
};
class StorageService {
  constructor() {
    this.cache = new Map();
    this.subscribers = new Map();
  }
  get(key) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    try {
      const data = localStorage.getItem(key);
      const parsed = data ? JSON.parse(data) : null;
      this.cache.set(key, parsed);
      return parsed;
    } catch (error) {
      console.error(`Storage read error for key ${key}:`, error);
      return null;
    }
  }
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      this.cache.set(key, value);
      this.notifySubscribers(key, value);
      return true;
    } catch (error) {
      console.error(`Storage write error for key ${key}:`, error);
      return false;
    }
  }
  subscribe(key, callback) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key).add(callback);
    return () => {
      const subs = this.subscribers.get(key);
      if (subs) subs.delete(callback);
    };
  }
  notifySubscribers(key, value) {
    const subs = this.subscribers.get(key);
    if (subs) {
      subs.forEach(callback => callback(value));
    }
  }
  clearCache(key) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }
  getAttempts() {
    return this.get(STORAGE_KEYS.ATTEMPTS) || [];
  }
  saveAttempt(attempt) {
    const attempts = this.getAttempts();
    const index = attempts.findIndex(a => a.attempt_id === attempt.attempt_id);
    if (index >= 0) {
      attempts[index] = attempt;
    } else {
      attempts.push(attempt);
    }
    return this.set(STORAGE_KEYS.ATTEMPTS, attempts);
  }
  deleteAttempt(attemptId) {
    const attempts = this.getAttempts();
    const filtered = attempts.filter(a => a.attempt_id !== attemptId);
    return this.set(STORAGE_KEYS.ATTEMPTS, filtered);
  }
  getFavorites() {
    return this.get(STORAGE_KEYS.FAVORITES) || [];
  }
  toggleFavorite(exam) {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(f => f.exam_id === exam.exam_id);
    if (index >= 0) {
      favorites.splice(index, 1);
    } else {
      favorites.push({ ...exam, addedAt: new Date().toISOString() });
    }
    return this.set(STORAGE_KEYS.FAVORITES, favorites);
  }
}
export const storage = new StorageService();
export { STORAGE_KEYS };