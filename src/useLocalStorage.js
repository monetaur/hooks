import { useCallback, useMemo, useState } from 'react';

export default function useLocalStorage(key, { json = false } = {}) {
  // Mock out localStorage global if executed on server
  const store = useMemo(() => localStorage || {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  }, []);

  const [value, setValue] = useState(() => {
    const rawValue = store.getItem(key);
    return json ? JSON.parse(rawValue) : rawValue;
  });

  const updateValue = useCallback((newValue) => {
    setValue(newValue);

    if (newValue === null) {
      store.removeItem(key);
    } else {
      store.setItem(key, json ? JSON.stringify(newValue) : newValue);
    }
  }, [key, json, store]);

  return [value, updateValue];
}
