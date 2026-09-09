import { Check } from 'lucide-react';
import { aboutFocus, aboutParagraphs, highlights, stats } from '../data/content';
import { ICONS } from '../lib/icons';
import SectionHeading from './ui/SectionHeading';
import Counter from './ui/Counter';
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal';

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="shell">
        <SectionHeading
          id="about-title"
          eyebrow="01 — About"
          title="More Than Just"
          highlight="Code."
          lede="A builder-focused Computer Science student who likes carrying an idea all the way from concept to a running system."
        />

        <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            {aboutParagraphs.map((text, index) => (
              <Reveal
                key={index}
                as="p"
                delay={index * 0.08}
                className="mb-5 text-[15px] leading-[1.85] text-slate-400 sm:text-base"
              >
                {text}
              </Reveal>
            ))}

            <RevealGroup className="mt-8 flex flex-wrap gap-2.5" gap={0.06}>
              {aboutFocus.map((item) => (
                <RevealItem
                  key={item}
                  as="span"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03]
                    px-3.5 py-2 text-[13px] text-slate-300 transition-all duration-300 hover:border-accent-cyan/35
                    hover:bg-white/[0.06] hover:text-white"
                >
                  <Check
                    size={13}
                    className="text-accent-cyan/70 transition-colors group-hover:text-accent-cyan"
                    aria-hidden="true"
                  />
                  {item}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <RevealGroup className="flex flex-col gap-4" gap={0.1}>
            {highlights.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <RevealItem key={item.no}>
                  <article className="card group relative overflow-hidden p-5 sm:p-6">
                    <div
                      className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-blue/10
                        opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    <div className="flex items-start gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-500 group-hover:border-accent-cyan/30">
                        {Icon ? (
                          <Icon size={19} className="text-accent-cyan" aria-hidden="true" />
                        ) : null}
                      </span>
                      <div className="min-w-0">
                        <p className="flex items-baseline gap-2.5">
                          <span className="font-mono text-[11px] tracking-[0.2em] text-slate-600">
                            {item.no}
                          </span>
                          <span className="font-display text-lg font-bold tracking-tight text-white">
                            {item.title}
                          </span>
                        </p>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-slate-400">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        <RevealGroup
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08]
            bg-white/[0.04] sm:mt-16 lg:grid-cols-4"
          gap={0.08}
        >
          {stats.map((stat) => (
            <RevealItem
              key={stat.label}
              className="group bg-ink-950/70 p-5 text-center transition-colors duration-500 hover:bg-ink-900/80 sm:p-6"
            >
              <p className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-[13px] font-medium text-slate-300">{stat.label}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-600">
                {stat.hint}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
