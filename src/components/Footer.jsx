import { Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/content';

const YEAR = 2026;

export default function Footer() {
  const scrollToProjects = (event) => {
    event.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="relative border-t border-white/[0.07] py-12" aria-label="Site footer">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <a href="#home" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/[0.04]">
                <span className="text-gradient font-display text-[13px] font-extrabold tracking-tight">
                  {profile.monogram}
                </span>
              </span>
              <span className="font-display text-base font-bold tracking-tight text-white">
                {profile.name}
              </span>
            </a>
            <p className="mt-3 font-mono text-[11.5px] uppercase tracking-[0.2em] text-slate-500">
              {profile.footerMotto}
            </p>
          </div>

          <nav aria-label="Footer links" className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={profile.linkedinHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[13.5px] text-slate-400 transition-colors hover:text-white"
            >
              <Linkedin size={15} aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href={profile.emailHref}
              className="inline-flex items-center gap-2 text-[13.5px] text-slate-400 transition-colors hover:text-white"
            >
              <Mail size={15} aria-hidden="true" />
              Email
            </a>
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="text-[13.5px] text-slate-400 transition-colors hover:text-white"
            >
              Projects
            </a>
          </nav>
        </div>

        <div className="divider mt-10" />

        <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-[12.5px] text-slate-500">
            © {YEAR} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600">
            Built with React · Tailwind · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
