import { motion, useReducedMotion } from 'framer-motion';
import { Award, Medal, Trophy } from 'lucide-react';
import { achievements } from '../data/content';
import { EASE } from '../lib/motion';
import SectionHeading from './ui/SectionHeading';
import { RevealGroup, RevealItem } from './ui/Reveal';

const TONES = {
  gold: {
    ring: 'border-amber-300/25 hover:border-amber-300/45',
    bg: 'from-amber-300/[0.10] via-amber-200/[0.03] to-transparent',
    text: 'text-amber-200',
    icon: 'text-amber-300',
    blob: 'bg-amber-300/15',
    Icon: Trophy,
  },
  silver: {
    ring: 'border-slate-300/20 hover:border-slate-200/40',
    bg: 'from-slate-200/[0.08] via-slate-200/[0.02] to-transparent',
    text: 'text-slate-200',
    icon: 'text-slate-300',
    blob: 'bg-slate-200/10',
    Icon: Medal,
  },
};

export default function Achievements() {
  const reduce = useReducedMotion();

  return (
    <section id="achievements" className="section" aria-labelledby="achievements-title">
      <div className="shell">
        <SectionHeading
          id="achievements-title"
          eyebrow="05 — Recognition"
          title="Recognition &"
          highlight="Achievements"
          lede="Where the work was put in front of judges and held up."
        />

        <RevealGroup className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-2" gap={0.12}>
          {achievements.map((item) => {
            const tone = TONES[item.tone] ?? TONES.gold;
            const Icon = tone.Icon;
            return (
              <RevealItem key={item.title}>
                <article
                  className={`group relative h-full overflow-hidden rounded-3xl border bg-gradient-to-br p-6 sm:p-8
                    ${tone.ring} ${tone.bg} transition-all duration-500 ease-smooth hover:-translate-y-1`}
                >
                  <div
                    className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl
                      opacity-40 transition-opacity duration-700 group-hover:opacity-90 ${tone.blob}`}
                    aria-hidden="true"
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <motion.span
                      className={`grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-ink-950/60 ${tone.icon}`}
                      animate={reduce ? undefined : { y: [0, -5, 0] }}
                      transition={reduce ? undefined : { duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Icon size={24} aria-hidden="true" />
                    </motion.span>
                    <span className="font-mono text-[11px] tracking-[0.16em] text-slate-500">
                      {item.date}
                    </span>
                  </div>

                  <p className={`relative mt-6 font-display text-2xl font-extrabold tracking-tight sm:text-3xl ${tone.text}`}>
                    {item.rank}
                  </p>
                  <p className="relative mt-1.5 font-display text-lg font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="relative mt-2.5 text-[14px] leading-relaxed text-slate-400">
                    {item.detail}
                  </p>

                  <motion.div
                    className="relative mt-7 h-px w-full origin-left bg-gradient-to-r from-white/25 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: EASE }}
                  />
                  <p className="relative mt-4 inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-slate-500">
                    <Award size={12} aria-hidden="true" />
                    {item.emoji} competition result
                  </p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
