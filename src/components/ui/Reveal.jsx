import { motion } from 'framer-motion';
import { fadeUp, inView, stagger } from '../../lib/motion';

/** Scroll-reveal wrapper. `as` keeps the DOM semantic where it matters. */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
  variants = fadeUp,
  ...rest
}) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Parent that staggers any `Reveal`/`motion` children using the shared variants. */
export function RevealGroup({
  children,
  className = '',
  as = 'div',
  gap = 0.09,
  delayChildren = 0,
  ...rest
}) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      variants={stagger(gap, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Child of RevealGroup — inherits the parent's stagger timeline. */
export function RevealItem({ children, className = '', as = 'div', variants = fadeUp, ...rest }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag className={className} variants={variants} {...rest}>
      {children}
    </Tag>
  );
}
