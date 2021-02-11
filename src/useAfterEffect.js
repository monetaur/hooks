import { useEffect, useRef } from 'react';

export default function useAfterEffect(fn, dependencies = []) {
  const count = useRef(0);

  return useEffect(() => {
    if (count.current) {
      fn();
    }
    count.current += 1;
  }, dependencies);
}
