import { useEffect } from 'react';

export default function useResize(ref, callback) {
  return useEffect(() => {
    const el = ref.current;

    if (el && typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver((changes) => {
        callback(changes[0].contentRect);
      });

      observer.observe(el);

      return () => {
        observer.unobserve(el);
      };
    }

    return undefined;
  }, [callback, ref]);
}
