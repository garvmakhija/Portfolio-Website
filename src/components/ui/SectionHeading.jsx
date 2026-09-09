import { motion } from 'framer-motion';
import { fadeUp, inView } from '../../lib/motion';

/**
 * Consistent section header: mono eyebrow + display title + optional lede.
 * The animated rule ties every section together visually.
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  lede,
  align = 'left',
  id,
}) {
  const centered = align === 'center';

  return (
    <div className={`relative ${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
      {eyebrow ? (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mono-label flex items-center gap-3"
        >
          {!centered && <span className="h-px w-8 bg-gradient-to-r from-accent-cyan to-transparent" />}
          {eyebrow}
        </motion.p>
      ) : null}

      <motion.h2
        id={id}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        transition={{ delay: 0.06 }}
        className="mt-4 text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl"
      >
        {title}{' '}
        {highlight ? <span className="text-gradient animate-gradient-pan">{highlight}</span> : null}
      </motion.h2>

      {lede ? (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          transition={{ delay: 0.12 }}
          className={`mt-5 text-base leading-relaxed text-slate-400 sm:text-lg ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {lede}
        </motion.p>
      ) : null}

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={inView}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className={`mt-7 h-px w-28 origin-left bg-gradient-to-r from-accent-cyan via-accent-blue to-transparent ${
          centered ? 'mx-auto origin-center' : ''
        }`}
      />
    </div>
  );
}
