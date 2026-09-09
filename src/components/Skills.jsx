import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import { exploring, skillGroups } from '../data/content';
import { ACCENTS, ICONS } from '../lib/icons';
import SectionHeading from './ui/SectionHeading';
import { RevealGroup, RevealItem } from './ui/Reveal';

function SkillCard({ group }) {
  const Icon = ICONS[group.icon];
  const accent = ACCENTS[group.accent] ?? ACCENTS.blue;

  return (
    <RevealItem className={group.wide ? 'lg:col-span-2' : ''}>
      <article
        className={`card group relative h-full overflow-hidden p-5 sm:p-6 ${accent.ring}`}
        aria-label={`${group.title} skills`}
      >
        <div
          className={`pointer-events-none absolute inset-x-0 -top-24 h-40 bg-gradient-to-b ${accent.from}
            to-transparent opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100`}
          aria-hidden="true"
        />

        <header className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
              {Icon ? <Icon size={18} className={accent.text} aria-hidden="true" /> : null}
            </span>
            <h3 className="font-display text-base font-bold tracking-tight text-white">
              {group.title}
            </h3>
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] text-slate-600">
            {String(group.items.length).padStart(2, '0')}
          </span>
        </header>

        <ul className="relative mt-5 flex flex-wrap gap-2">
          {group.items.map((item) => (
            <li key={item}>
              <motion.span
                whileHover={{ y: -2 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex cursor-default items-center rounded-lg border border-white/[0.07]
                  bg-white/[0.03] px-2.5 py-1.5 text-[12.5px] text-slate-300 transition-colors duration-300
                  hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
              >
                {item}
              </motion.span>
            </li>
          ))}
        </ul>
      </article>
    </RevealItem>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="shell">
        <SectionHeading
          id="skills-title"
          eyebrow="02 — Skills"
          title="Technical"
          highlight="Arsenal"
          lede="The languages, frameworks and concepts I work with across full-stack engineering and applied machine learning."
        />

        <RevealGroup
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
          gap={0.07}
        >
          {skillGroups.map((group) => (
            <SkillCard key={group.title} group={group} />
          ))}

          <RevealItem className="lg:col-span-2">
            <article className="card group relative h-full overflow-hidden p-5 sm:p-6">
              <div className="dot-overlay absolute inset-0 opacity-20" aria-hidden="true" />
              <header className="relative flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Compass size={18} className="text-accent-violet" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold tracking-tight text-white">
                    Currently going deeper
                  </h3>
                  <p className="mono-label mt-0.5 !tracking-[0.18em]">Active learning track</p>
                </div>
              </header>

              <ul className="relative mt-5 flex flex-wrap gap-2">
                {exploring.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 rounded-lg border border-accent-violet/20
                      bg-accent-violet/[0.06] px-2.5 py-1.5 text-[12.5px] text-slate-200"
                  >
                    <span
                      className="h-1.5 w-1.5 animate-blink rounded-full bg-accent-violet"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
