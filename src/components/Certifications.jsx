import { BadgeCheck } from 'lucide-react';
import { certifications } from '../data/content';
import { ICONS } from '../lib/icons';
import SectionHeading from './ui/SectionHeading';
import { RevealGroup, RevealItem } from './ui/Reveal';

export default function Certifications() {
  return (
    <section id="certifications" className="section !pt-0" aria-labelledby="certifications-title">
      <div className="shell">
        <SectionHeading
          id="certifications-title"
          eyebrow="06 — Learning"
          title="Certifications"
          lede="Coursework and programs completed alongside my degree."
        />

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.07}>
          {certifications.map((cert) => {
            const Icon = ICONS[cert.icon] ?? BadgeCheck;
            return (
              <RevealItem key={cert.title}>
                <article className="card group flex h-full flex-col p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-500 group-hover:border-accent-cyan/30">
                    <Icon size={18} className="text-accent-cyan" aria-hidden="true" />
                  </span>

                  <p className="mono-label mt-5 !tracking-[0.16em]">{cert.issuer}</p>
                  <h3 className="mt-2 font-display text-[15px] font-semibold leading-snug text-white">
                    {cert.title}
                  </h3>

                  <span className="mt-auto flex items-center gap-1.5 pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-600">
                    <BadgeCheck size={12} className="text-emerald-400/70" aria-hidden="true" />
                    Completed
                  </span>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
