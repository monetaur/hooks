import { useEffect, useState, useCallback } from 'react';

export default function useAfterEffect(fn, dependencies) {
  const [isInitialRender, setIsInitialRender] = useState(true);

  const effect = useCallback(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      fn();
    }
  }, [fn, isInitialRender]);

  return useEffect(effect, dependencies);
}
