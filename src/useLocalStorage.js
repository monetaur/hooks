import { useCallback, useState } from 'react';

export default function useLocalStorage(key, { json = false } = {}) {
  const [value, setValue] = useState(() => {
    const rawValue = localStorage.getItem(key);
    return json ? JSON.parse(rawValue) : rawValue;
  });

  const updateValue = useCallback((newValue) => {
    setValue(newValue);

    if (newValue === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, json ? JSON.stringify(newValue) : newValue);
    }
  }, [key]);

  return [value, updateValue];
}
