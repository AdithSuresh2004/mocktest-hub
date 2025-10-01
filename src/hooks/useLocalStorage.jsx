import { useState, useEffect } from 'react';
import { storage } from '@/services/storageService';
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = storage.get(key);
    return stored !== null ? stored : initialValue;
  });
  useEffect(() => {
    const unsubscribe = storage.subscribe(key, (newValue) => {
      setValue(newValue);
    });
    return unsubscribe;
  }, [key]);
  const setStoredValue = (newValue) => {
    const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
    setValue(valueToStore);
    storage.set(key, valueToStore);
  };
  return [value, setStoredValue];
}