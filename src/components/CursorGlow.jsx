import { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useHasFinePointer } from '../hooks/useMediaQuery';

/**
 * Soft light that trails the cursor. Purely decorative, pointer-events none,
 * and skipped on touch devices or when reduced motion is requested.
 */
export default function CursorGlow() {
  const finePointer = useHasFinePointer();
  const reduce = useReducedMotion();
  const enabled = finePointer && !reduce;

  const rawX = useMotionValue(-500);
  const rawY = useMotionValue(-500);
  const x = useSpring(rawX, { stiffness: 90, damping: 22, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 90, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-0 h-[520px] w-[520px] rounded-full opacity-60 mix-blend-screen"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(79,124,255,0.13) 0%, rgba(154,107,255,0.07) 38%, transparent 68%)',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[60] h-2 w-2 rounded-full bg-accent-cyan/70 mix-blend-screen"
        style={{ x: rawX, y: rawY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
}
