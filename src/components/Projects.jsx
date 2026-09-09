import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, Sparkle, Trophy, Zap } from 'lucide-react';
import { projects } from '../data/content';
import { EASE, fadeUp, inView } from '../lib/motion';
import SectionHeading from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import TrafficVisual from './visuals/TrafficVisual';
import DroneVisual from './visuals/DroneVisual';

const VISUALS = { traffic: TrafficVisual, drone: DroneVisual };

function ProjectCard({ project, index }) {
  const Visual = VISUALS[project.visual];
  const reduce = useReducedMotion();
  const flip = index % 2 === 1;

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={`group relative overflow-hidden rounded-3xl border p-5 transition-colors duration-500 sm:p-7 lg:p-9 ${
        project.featured
          ? 'border-accent-violet/25 bg-gradient-to-br from-accent-violet/[0.07] via-white/[0.02] to-transparent'
          : 'border-white/[0.08] bg-white/[0.02]'
      } hover:border-white/20`}
      aria-labelledby={`project-${project.id}-title`}
    >
      <div
        className={`pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full blur-3xl transition-opacity duration-700 ${
          project.featured ? 'bg-accent-violet/15 opacity-70' : 'bg-accent-blue/10 opacity-0 group-hover:opacity-100'
        }`}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -bottom-10 right-2 select-none font-display text-[9rem]
          font-extrabold leading-none tracking-tighter text-white/[0.025] sm:text-[12rem]"
        aria-hidden="true"
      >
        {project.no}
      </span>

      <div
        className={`relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12 ${
          flip ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-[11px] tracking-[0.28em] text-slate-600">
              PROJECT {project.no}
            </span>
            <span className="h-3 w-px bg-white/12" aria-hidden="true" />
            <span className="font-mono text-[11px] tracking-[0.14em] text-slate-500">
              {project.year}
            </span>
            {project.featured ? (
              <span className="chip !border-accent-violet/30 !bg-accent-violet/10 !text-accent-violet">
                <Sparkle size={11} aria-hidden="true" />
                Featured
              </span>
            ) : null}
          </div>

          <h3
            id={`project-${project.id}-title`}
            className="mt-4 font-display text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-3xl"
          >
            {project.title}
          </h3>

          {project.award ? (
            <motion.p
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-300/30
                bg-amber-300/[0.08] px-3.5 py-1.5 text-[12.5px] font-semibold text-amber-200"
              animate={reduce ? undefined : { boxShadow: ['0 0 0 0 rgba(252,211,77,0)', '0 0 22px -6px rgba(252,211,77,0.45)', '0 0 0 0 rgba(252,211,77,0)'] }}
              transition={reduce ? undefined : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Trophy size={14} aria-hidden="true" />
              {project.award}
            </motion.p>
          ) : null}

          <p className="mt-5 text-[15px] leading-[1.8] text-slate-400">{project.description}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-lg border border-white/[0.09] bg-white/[0.04] px-2.5 py-1.5
                  font-mono text-[11.5px] text-slate-200"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <p className="mono-label">Key features</p>
            <ul className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
              {project.features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={inView}
                  transition={{ delay: 0.05 * i, duration: 0.45, ease: EASE }}
                  className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-slate-300"
                >
                  <Zap
                    size={13}
                    className="mt-[3px] shrink-0 text-accent-cyan/80"
                    aria-hidden="true"
                  />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="btn-disabled group/btn"
              disabled
              aria-disabled="true"
              title="Project link coming soon"
            >
              View Project
              <ArrowUpRight size={15} aria-hidden="true" />
              <span className="sr-only">(coming soon)</span>
            </button>
            <button
              type="button"
              className="btn-disabled"
              disabled
              aria-disabled="true"
              title="Repository coming soon"
            >
              <Github size={15} aria-hidden="true" />
              GitHub
              <span className="sr-only">(coming soon)</span>
            </button>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-600">
              coming soon
            </span>
          </div>
        </div>

        <motion.div
          whileHover={reduce ? undefined : { y: -6 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative"
        >
          <div className="glass-strong relative overflow-hidden rounded-2xl p-2 shadow-[0_40px_100px_-60px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between px-2.5 py-2">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
              </div>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-slate-600">
                live preview · concept
              </span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.07] bg-ink-950">
              {Visual ? <Visual /> : null}
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_55%,rgba(4,5,10,0.55)_100%)]"
                aria-hidden="true"
              />
            </div>
          </div>
          <div
            className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-accent-cyan/10 via-transparent to-accent-violet/10 blur-2xl"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="shell">
        <SectionHeading
          id="projects-title"
          eyebrow="04 — Projects"
          title="Things I've"
          highlight="Built"
          lede="Two end-to-end systems where computer vision does the sensing and engineering does the rest — from detection pipeline to deployment on real hardware."
        />

        <div className="mt-14 flex flex-col gap-8 lg:mt-16 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-slate-600">
            Repository links coming soon — full walkthroughs available on request
          </p>
        </Reveal>
      </div>
    </section>
  );
}
