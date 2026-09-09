import { motion } from 'framer-motion';
import { Cpu, GraduationCap, MapPin } from 'lucide-react';
import { education } from '../data/content';
import { EASE } from '../lib/motion';
import SectionHeading from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';

export default function Education() {
  return (
    <section id="education" className="section !pt-0" aria-labelledby="education-title">
      <div className="shell">
        <SectionHeading
          id="education-title"
          eyebrow="07 — Education"
          title="Education"
        />

        <Reveal className="relative mt-12 pl-12 sm:pl-16">
          <span
            className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border border-white/12 bg-ink-900 sm:h-10 sm:w-10"
            aria-hidden="true"
          >
            <GraduationCap size={16} className="text-accent-violet" />
          </span>
          <motion.span
            className="absolute left-[15px] top-11 w-px origin-top bg-gradient-to-b from-accent-violet/60 to-transparent sm:left-[19px] sm:top-12"
            initial={{ scaleY: 0, height: 0 }}
            whileInView={{ scaleY: 1, height: 'calc(100% - 3rem)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            aria-hidden="true"
          />

          <article className="card group relative overflow-hidden p-5 sm:p-7">
            <div
              className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-accent-violet/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              aria-hidden="true"
            />
            <div className="relative flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {education.institution}
                </h3>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-[13.5px] text-slate-400">
                  <MapPin size={13} className="text-slate-600" aria-hidden="true" />
                  {education.location}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] tracking-[0.08em] text-slate-300">
                {education.period}
              </span>
            </div>

            <div className="divider relative my-6" />

            <div className="relative flex flex-wrap items-center gap-x-8 gap-y-4">
              <div>
                <p className="mono-label">Degree</p>
                <p className="mt-2 text-[15px] font-medium text-slate-200">{education.degree}</p>
              </div>
              <div>
                <p className="mono-label">Specialization</p>
                <p className="mt-2 inline-flex items-center gap-2 text-[15px] font-medium text-slate-200">
                  <Cpu size={15} className="text-accent-cyan" aria-hidden="true" />
                  {education.specialization}
                </p>
              </div>
              <span className="chip !border-emerald-400/20 !bg-emerald-400/[0.07] !text-emerald-300/90">
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-emerald-400" aria-hidden="true" />
                {education.status}
              </span>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
