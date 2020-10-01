import { useState, useLayoutEffect } from 'react';

function getRefDimensions(ref) {
  return ref.current ? ref.current.getBoundingClientRect() : {};
}

export default function useDimensions(ref) {
  const [dimensions, setDimensions] = useState(() => getRefDimensions(ref));

  useLayoutEffect(() => {
    const el = ref.current;

    if (el && typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => {
        setDimensions(el.getBoundingClientRect());
      });

      observer.observe(el);

      return () => {
        observer.unobserve(el);
      };
    }

    return undefined;
  }, [ref]);

  return dimensions;
}
