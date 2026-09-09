import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view so the navbar can highlight it.
 * Uses a rootMargin band near the top of the viewport instead of scroll math,
 * which keeps it cheap and accurate for variable-height sections.
 */
export function useScrollSpy(ids, offset = 96) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el) => el instanceof HTMLElement);

    if (!sections.length) return;

    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let best = null;
        let bestRatio = 0;
        ids.forEach((id) => {
          const ratio = visible.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });

        if (best) setActive(best);
      },
      {
        rootMargin: `-${offset}px 0px -45% 0px`,
        threshold: [0, 0.15, 0.35, 0.6, 0.85],
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}
