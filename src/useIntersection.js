import { useState, useCallback, useEffect } from 'react';

export default function useIntersection(ref) {
  const [hasIntersected, setHasIntersected] = useState(false);

  const handler = useCallback((changes) => {
    changes.forEach((change) => {
      if (change.isIntersecting) {
        setHasIntersected(true);
      }
    });
  }, []);

  useEffect(() => {
    const el = ref.current;

    if (el && typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(handler);
      observer.observe(el);

      return () => {
        observer.unobserve(el);
      };
    }

    return undefined;
  }, [handler, ref]);

  return [hasIntersected, setHasIntersected];
}
