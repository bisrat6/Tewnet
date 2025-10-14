import { useState, useEffect } from 'react';
import { getFromStorage, setToStorage } from '@/utils/localStorage';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getFromStorage(key, initialValue);
  });

  useEffect(() => {
    setToStorage(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
