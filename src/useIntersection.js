import { useState, useCallback, useEffect } from 'react';

export default function useIntersection(ref, options = {}) {
  const [hasIntersected, setHasIntersected] = useState(false);
  const { root, rootMargin, threshold } = options;

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
      const observer = new IntersectionObserver(handler, {
        root,
        rootMargin,
        threshold,
      });
      observer.observe(el);

      return () => {
        observer.unobserve(el);
      };
    }

    return undefined;
  }, [handler, ref, root, rootMargin, threshold]);

  return [hasIntersected, setHasIntersected];
}
