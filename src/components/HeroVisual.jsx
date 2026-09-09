import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { Cpu } from 'lucide-react';
import { heroBadges, profile } from '../data/content';

const LAYERS = [
  { x: 26, nodes: [26, 66, 106, 146] },
  { x: 100, nodes: [16, 56, 96, 136, 176] },
  { x: 174, nodes: [46, 86, 126] },
  { x: 244, nodes: [86] },
];

/** Decorative feed-forward network with animated signal paths. */
function NeuralGraph() {
  const reduce = useReducedMotion();
  const edges = [];
  for (let l = 0; l < LAYERS.length - 1; l += 1) {
    LAYERS[l].nodes.forEach((y1, i) => {
      LAYERS[l + 1].nodes.forEach((y2, j) => {
        edges.push({ x1: LAYERS[l].x, y1, x2: LAYERS[l + 1].x, y2, key: `${l}-${i}-${j}` });
      });
    });
  }

  return (
    <svg
      viewBox="0 0 270 200"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of a neural network with connected layers of nodes"
    >
      <defs>
        <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#9A6BFF" stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id="node-grad">
          <stop offset="0%" stopColor="#EAF2FF" />
          <stop offset="100%" stopColor="#4F7CFF" />
        </radialGradient>
      </defs>

      {edges.map((edge, index) => (
        <line
          key={edge.key}
          x1={edge.x1}
          y1={edge.y1}
          x2={edge.x2}
          y2={edge.y2}
          stroke="url(#edge-grad)"
          strokeWidth="0.7"
          strokeOpacity="0.16"
          strokeDasharray="4 8"
          className="animate-dash"
          style={{ animationDelay: `${(index % 11) * 0.14}s` }}
        />
      ))}

      {LAYERS.map((layer, li) =>
        layer.nodes.map((y, ni) => (
          <g key={`${li}-${ni}`}>
            <circle cx={layer.x} cy={y} r="8" fill="#4F7CFF" opacity="0.08" />
            <motion.circle
              cx={layer.x}
              cy={y}
              r="3.1"
              fill="url(#node-grad)"
              initial={{ opacity: 0.55 }}
              animate={reduce ? { opacity: 0.75 } : { opacity: [0.45, 1, 0.45] }}
              transition={
                reduce
                  ? { duration: 0.2 }
                  : {
                      duration: 2.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: (li * 0.35 + ni * 0.18) % 2.6,
                    }
              }
            />
          </g>
        ))
      )}
    </svg>
  );
}

/** Glass identity card with 3D pointer tilt, neural graph and floating tech badges. */
export default function HeroVisual() {
  const wrapRef = useRef(null);
  const reduce = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 20, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 140, damping: 20, mass: 0.4 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [8, -8]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-7, 7]);

  const onMove = (event) => {
    if (reduce || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative mx-auto w-full max-w-[420px] lg:max-w-[460px]"
      style={{ perspective: 1200 }}
    >
      <div
        className="absolute -inset-10 -z-10 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 60% 40%, rgba(79,124,255,0.22), rgba(154,107,255,0.12) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="glass-strong relative rounded-3xl p-5 shadow-[0_50px_110px_-60px_rgba(0,0,0,1)] sm:p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-rose-400/60" />
            <span className="h-2 w-2 rounded-full bg-amber-300/60" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
            gm · system
          </span>
        </div>

        <div className="relative mt-4 h-[168px] overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-950/60 sm:h-[186px]">
          <div className="grid-overlay absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="absolute inset-0 p-3">
            <NeuralGraph />
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-accent-cyan/20 to-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="mt-5" style={{ transform: 'translateZ(40px)' }}>
          <p className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
            {profile.name}
          </p>
          <p className="text-gradient animate-gradient-pan mt-1 font-display text-sm font-semibold sm:text-base">
            AI/ML + Full Stack
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
            Building <span className="text-accent-cyan/70">•</span> Optimizing{' '}
            <span className="text-accent-violet/70">•</span> Deploying
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
          <span className="chip !border-emerald-400/20 !bg-emerald-400/[0.07] !text-emerald-300/90">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-emerald-400" />
            Open to roles
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            <Cpu size={12} className="text-accent-blue" aria-hidden="true" />
            edge · cloud
          </span>
        </div>
      </motion.div>

      {heroBadges.map((badge) => (
        <motion.span
          key={badge.label}
          className="glass absolute hidden select-none rounded-xl px-3 py-1.5 font-mono text-[11px]
            font-medium text-slate-200 shadow-lg sm:block"
          style={{ top: badge.top, left: badge.left }}
          animate={reduce ? undefined : { y: [0, -9, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: badge.delay }}
          whileHover={{ scale: 1.08, borderColor: 'rgba(34,211,238,0.45)' }}
          aria-hidden="true"
        >
          {badge.label}
        </motion.span>
      ))}
    </div>
  );
}
