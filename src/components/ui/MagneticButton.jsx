import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * Magnetic CTA: the element leans toward the cursor, then springs back.
 * Renders as <a> or <button> so semantics and keyboard support stay intact.
 * Disabled entirely for users who prefer reduced motion.
 */
export default function MagneticButton({
  children,
  as = 'button',
  className = '',
  strength = 0.28,
  ...rest
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 240, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 240, damping: 18, mass: 0.4 });

  const handleMove = (event) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    rawX.set(relX * strength);
    rawY.set(relY * strength);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const Tag = as === 'a' ? motion.a : motion.button;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
