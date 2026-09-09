import { useEffect, useState } from 'react';

/** SSR-safe media query hook used to keep heavy effects off small screens. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True on pointer-precise devices (mouse/trackpad) — skips cursor FX on touch. */
export function useHasFinePointer() {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}
