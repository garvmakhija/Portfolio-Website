import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const BOOT_LINES = ['loading modules', 'compiling shaders', 'initializing portfolio'];

/**
 * Brief branded loading screen. Locks scroll while visible and always
 * resolves on a timer so a slow font/asset can never trap the user.
 */
export default function Preloader({ onDone }) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const ticker = setInterval(() => {
      setProgress((prev) => (prev >= 96 ? 96 : prev + Math.random() * 18));
    }, 130);

    const finish = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setShow(false);
        onDone?.();
      }, 320);
    }, 1000);

    return () => {
      clearInterval(ticker);
      clearTimeout(finish);
    };
  }, [onDone]);

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] grid place-items-center bg-ink-950"
          exit={{ opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          <div className="grid-overlay pointer-events-none absolute inset-0 opacity-40 mask-fade-b" />
          <div className="relative flex w-[248px] flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <span className="text-gradient animate-gradient-pan font-display text-2xl font-extrabold tracking-tight">
                GM
              </span>
              <span className="absolute inset-0 animate-pulse-ring rounded-2xl border border-accent-blue/40" />
            </motion.div>

            <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/[0.07]">
              <motion.div
                className="h-full rounded-full bg-accent-gradient"
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600">
              {BOOT_LINES[Math.min(BOOT_LINES.length - 1, Math.floor(progress / 34))]}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
