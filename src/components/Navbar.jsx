import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { navLinks, profile } from '../data/content';
import { useScrollSpy } from '../hooks/useScrollSpy';

const SECTION_IDS = navLinks.map((link) => link.id);

/** Sticky glass navbar with scroll-spy indicator, progress rail and mobile drawer. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(SECTION_IDS);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.35 });
  const triggerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll, move focus into the drawer, and allow Escape to close it.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = setTimeout(() => closeRef.current?.focus(), 220);
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKey);
      // Only pull focus back when it is still inside the closing drawer.
      if (document.activeElement === closeRef.current) triggerRef.current?.focus();
    };
  }, [open]);

  const go = (event, id) => {
    event.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    // Let the drawer close before scrolling so the motion reads cleanly.
    setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), open ? 180 : 0);
  };

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80]
          focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth ${
          scrolled ? 'py-2.5' : 'py-4'
        }`}
      >
        <nav aria-label="Primary" className="shell">
          <div
            className={`relative flex items-center justify-between gap-4 rounded-full px-3 py-2.5 transition-all duration-500 ease-smooth sm:px-4 ${
              scrolled
                ? 'border border-white/10 bg-ink-900/80 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl'
                : 'border border-white/[0.06] bg-white/[0.02] backdrop-blur-md'
            }`}
          >
            <a
              href="#home"
              onClick={(event) => go(event, 'home')}
              className="group flex items-center gap-2.5 rounded-full pl-1 pr-2"
              aria-label={`${profile.name} — home`}
            >
              <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/12 bg-white/[0.04]">
                <span className="text-gradient animate-gradient-pan font-display text-[13px] font-extrabold tracking-tight">
                  {profile.monogram}
                </span>
                <span className="absolute inset-0 rounded-xl opacity-0 shadow-glow-cyan transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <span className="hidden font-display text-sm font-semibold tracking-tight text-slate-200 sm:block">
                Garv<span className="text-slate-500">.</span>
              </span>
            </a>

            <ul className="hidden items-center gap-0.5 lg:flex">
              {navLinks.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(event) => go(event, link.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative block rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.07]"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      <span className="relative">{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                onClick={(event) => go(event, 'contact')}
                className="group hidden items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2
                  text-[13px] font-semibold text-slate-100 transition-all duration-300 hover:border-accent-cyan/40
                  hover:bg-white/[0.08] hover:shadow-glow-cyan sm:inline-flex"
              >
                Let&apos;s Connect
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>

              <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={open}
                aria-controls="mobile-drawer"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-slate-200 lg:hidden"
              >
                <Menu size={18} />
              </button>
            </div>

            <motion.span
              aria-hidden="true"
              className="absolute -bottom-px left-6 right-6 h-px origin-left rounded-full bg-accent-gradient"
              style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
            />
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[70] lg:hidden"
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <motion.div
              className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.28 }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              id="mobile-drawer"
              aria-label="Mobile navigation"
              className="glass-strong absolute right-0 top-0 flex h-full w-[min(86vw,340px)] flex-col gap-8 p-6 pt-5"
              variants={{
                hidden: { x: '100%' },
                show: { x: 0 },
              }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between">
                <span className="mono-label">Navigation</span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-slate-200"
                >
                  <X size={18} />
                </button>
              </div>

              <ul className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + index * 0.045, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(event) => go(event, link.id)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg font-semibold transition-colors ${
                        active === link.id
                          ? 'bg-white/[0.07] text-white'
                          : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-100'
                      }`}
                    >
                      {link.label}
                      <span className="font-mono text-[10px] text-slate-600">
                        0{index + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3">
                <a href={profile.emailHref} className="btn-primary w-full">
                  Email Me
                </a>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost w-full"
                >
                  Download Resume
                </a>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
