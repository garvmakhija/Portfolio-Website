import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Briefcase, Building2, CalendarDays, MapPin } from 'lucide-react';
import { experience } from '../data/content';
import SectionHeading from './ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal';

export default function Experience() {
  const railRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 78%', 'end 55%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="shell">
        <SectionHeading
          id="experience-title"
          eyebrow="03 — Experience"
          title="Experience"
          lede="Production engineering experience across backend modules, database performance and full-stack delivery."
        />

        <div ref={railRef} className="relative mt-14 lg:mt-16">
          {/* Timeline rail */}
          <div
            className="absolute left-[15px] top-2 bottom-2 w-px bg-white/[0.08] sm:left-[19px]"
            aria-hidden="true"
          >
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-accent-cyan via-accent-blue to-accent-violet"
              style={{ scaleY }}
            />
            <motion.span
              className="absolute -left-[3px] h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-glow-cyan"
              style={{ top: glowY }}
            />
          </div>

          <RevealGroup className="flex flex-col gap-10" gap={0.12}>
            {experience.map((job) => (
              <RevealItem key={job.company} className="relative pl-12 sm:pl-16">
                <span
                  className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border border-white/12
                    bg-ink-900 sm:h-10 sm:w-10"
                  aria-hidden="true"
                >
                  <Briefcase size={15} className="text-accent-cyan" />
                  <span className="absolute inset-0 animate-pulse-ring rounded-full border border-accent-cyan/30" />
                </span>

                <article className="card group relative overflow-hidden p-5 sm:p-7">
                  <div
                    className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-accent-blue/10
                      opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  <div className="relative flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                    <div>
                      <span className="chip !border-accent-cyan/25 !bg-accent-cyan/[0.07] !text-accent-cyan">
                        {job.type}
                      </span>
                      <h3 className="mt-3 font-display text-lg font-bold leading-snug tracking-tight text-white sm:text-xl">
                        {job.role}
                      </h3>
                      <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13.5px] text-slate-400">
                        <span className="inline-flex items-center gap-1.5 font-medium text-slate-300">
                          <Building2 size={14} className="text-slate-500" aria-hidden="true" />
                          {job.company}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} className="text-slate-600" aria-hidden="true" />
                          {job.location}
                        </span>
                      </p>
                    </div>

                    <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] tracking-[0.08em] text-slate-300">
                      <CalendarDays size={13} className="text-slate-500" aria-hidden="true" />
                      {job.period}
                    </p>
                  </div>

                  <div className="divider relative my-6" />

                  <ul className="relative grid gap-3.5 lg:grid-cols-2 lg:gap-x-8">
                    {job.points.map((point, index) => (
                      <Reveal
                        as="li"
                        key={point}
                        delay={index * 0.05}
                        className="flex gap-3 text-[14px] leading-relaxed text-slate-400"
                      >
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent-cyan to-accent-violet"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </Reveal>
                    ))}
                  </ul>

                  <div className="relative mt-6 flex flex-wrap items-center gap-2">
                    <span className="mono-label mr-1">Stack</span>
                    {job.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1
                          font-mono text-[11.5px] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
