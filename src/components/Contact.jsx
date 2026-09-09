import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Copy, Linkedin, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { profile } from '../data/content';
import { EASE, fadeUp, inView } from '../lib/motion';
import MagneticButton from './ui/MagneticButton';

export default function Contact() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="section relative overflow-hidden" aria-labelledby="contact-title">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <motion.div
          className="absolute left-1/2 top-1/4 h-[560px] w-[560px] -translate-x-1/2 rounded-full blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, rgba(79,124,255,0.22), rgba(154,107,255,0.14) 45%, transparent 72%)',
          }}
          animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.75, 1, 0.75] }}
          transition={reduce ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="grid-overlay absolute inset-0 opacity-40" />
      </div>

      <div className="shell">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="glass-strong relative overflow-hidden rounded-[28px] px-6 py-14 text-center sm:px-10 sm:py-16 lg:px-16 lg:py-20"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent"
            aria-hidden="true"
          />

          <p className="mono-label">08 — Contact</p>

          <h2
            id="contact-title"
            className="mx-auto mt-5 max-w-3xl font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl"
          >
            Let&apos;s Build Something{' '}
            <span className="text-gradient animate-gradient-pan">Intelligent.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-slate-400 sm:text-base">
            Have an idea, opportunity, or interesting problem to solve? Let&apos;s connect.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mx-auto lg:max-w-2xl">
            <MagneticButton
              as="a"
              href={profile.emailHref}
              className="group relative flex flex-col items-start gap-1 overflow-hidden rounded-2xl border
                border-white/10 bg-white/[0.03] p-5 text-left transition-colors duration-500
                hover:border-accent-cyan/40 hover:bg-white/[0.06]"
              strength={0.12}
            >
              <span className="flex items-center gap-2 font-display text-[15px] font-semibold text-white">
                <Mail size={16} className="text-accent-cyan" aria-hidden="true" />
                Email Me
                <ArrowUpRight
                  size={14}
                  className="text-slate-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
              <span className="break-all font-mono text-[12px] text-slate-400">{profile.email}</span>
            </MagneticButton>

            <MagneticButton
              as="a"
              href={profile.linkedinHref}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col items-start gap-1 overflow-hidden rounded-2xl border
                border-white/10 bg-white/[0.03] p-5 text-left transition-colors duration-500
                hover:border-accent-blue/40 hover:bg-white/[0.06]"
              strength={0.12}
            >
              <span className="flex items-center gap-2 font-display text-[15px] font-semibold text-white">
                <Linkedin size={16} className="text-accent-blue" aria-hidden="true" />
                LinkedIn
                <ArrowUpRight
                  size={14}
                  className="text-slate-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
              <span className="break-all font-mono text-[12px] text-slate-400">
                {profile.linkedinLabel}
              </span>
            </MagneticButton>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a
              href={profile.phoneHref}
              className="inline-flex items-center gap-2 text-[14px] text-slate-300 transition-colors hover:text-white"
            >
              <Phone size={15} className="text-slate-500" aria-hidden="true" />
              <span className="font-mono">{profile.phone}</span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03]
                px-3.5 py-1.5 text-[12.5px] text-slate-400 transition-colors hover:border-white/25 hover:text-white"
            >
              <Copy size={13} aria-hidden="true" />
              <motion.span key={copied ? 'copied' : 'copy'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, ease: EASE }}>
                {copied ? 'Email copied' : 'Copy email'}
              </motion.span>
            </button>

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-slate-400 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Download Resume
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>

          <p aria-live="polite" className="sr-only">
            {copied ? 'Email address copied to clipboard' : ''}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
