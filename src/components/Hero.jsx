import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import { profile } from '../data/content';
import { EASE, fadeUp, stagger } from '../lib/motion';
import MagneticButton from './ui/MagneticButton';
import HeroVisual from './HeroVisual';

const KEYWORDS = ['AI', 'Full-Stack', 'Computer Vision'];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((prev) => (prev + 1) % KEYWORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pb-20 lg:pb-24 lg:pt-32"
    >
      <div className="shell">
        <motion.div
          variants={stagger(0.11, 0.15)}
          initial="hidden"
          animate="show"
          className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10"
        >
          <div className="relative">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06]
                px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-300"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-6 font-display text-[2.5rem] font-extrabold leading-[1.06] tracking-[-0.03em]
                text-slate-50 sm:text-[3.25rem] lg:text-[2.9rem] xl:text-[3.5rem]"
            >
              <span className="block">Hi, I&apos;m Garv Makhija.</span>
              <span className="mt-1.5 block">
                I Build{' '}
                <span className="text-gradient animate-gradient-pan lg:block">
                  Intelligent Systems<span className="text-slate-50">.</span>
                </span>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[12px] uppercase tracking-[0.18em] text-slate-500"
              aria-label={`Focus areas: ${KEYWORDS.join(', ')}`}
            >
              <span className="text-accent-cyan/80">{'>'}</span>
              <span>focused on</span>
              <span className="relative inline-grid h-5 min-w-[152px] overflow-hidden align-middle">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={KEYWORDS[index]}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.42, ease: EASE }}
                    className="text-gradient font-semibold tracking-[0.12em]"
                  >
                    {KEYWORDS[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-[1.0625rem]"
            >
              {profile.heroSubheading}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticButton
                type="button"
                onClick={() => scrollTo('projects')}
                className="btn-primary group"
              >
                View My Projects
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </MagneticButton>

              <MagneticButton
                type="button"
                onClick={() => scrollTo('contact')}
                className="btn-ghost group"
              >
                <Sparkles size={15} className="text-accent-cyan" aria-hidden="true" />
                Let&apos;s Connect
              </MagneticButton>

              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 px-1 py-2 text-sm font-medium text-slate-400
                  underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Download Resume
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-slate-500"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-600" aria-hidden="true" />
                {profile.location}
              </span>
              <span className="hidden h-3 w-px bg-white/10 sm:block" aria-hidden="true" />
              <span>B.Tech CSE — AI for IoT</span>
              <span className="hidden h-3 w-px bg-white/10 sm:block" aria-hidden="true" />
              <span>Sharda University</span>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            className="relative"
          >
            <HeroVisual />
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        aria-label="Scroll to about section"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-600 transition-colors group-hover:text-slate-400">
          scroll
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-accent-cyan to-transparent"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.button>
    </section>
  );
}
