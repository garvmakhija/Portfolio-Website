import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

/**
 * Lightweight particle field with proximity links — a quiet nod to a neural
 * graph. Canvas is sized to CSS pixels x DPR (capped at 2), pauses when the
 * tab is hidden, and is skipped for reduced motion / small screens.
 */
function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let frame = 0;
    let running = true;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(58, Math.round((width * height) / 26000));
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.3 + 0.5,
      }));
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(148, 178, 255, 0.42)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 132) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(79, 124, 255, ${0.13 * (1 - dist / 132)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      frame = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) frame = requestAnimationFrame(draw);
      else cancelAnimationFrame(frame);
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full opacity-70" aria-hidden="true" />;
}

/** Fixed decorative backdrop: grid, drifting gradient blobs, particle graph. */
export default function BackgroundFX() {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const showParticles = isDesktop && !reduce;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-ink-950" />
      <div className="grid-overlay absolute inset-0 opacity-[0.55]" />
      <div className="dot-overlay absolute inset-0 opacity-40" />

      <div
        className="absolute -left-32 -top-40 h-[540px] w-[540px] animate-drift rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(79,124,255,0.20), transparent 68%)' }}
      />
      <div
        className="absolute -right-40 top-[22%] h-[600px] w-[600px] animate-drift rounded-full blur-[130px]"
        style={{
          animationDelay: '-9s',
          background: 'radial-gradient(circle, rgba(154,107,255,0.18), transparent 68%)',
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[28%] h-[520px] w-[520px] animate-drift rounded-full blur-[130px]"
        style={{
          animationDelay: '-17s',
          background: 'radial-gradient(circle, rgba(34,211,238,0.14), transparent 70%)',
        }}
      />

      {showParticles ? (
        <div className="absolute inset-0 mask-fade-b">
          <ParticleField />
        </div>
      ) : null}

      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_35%,rgba(4,5,10,0.75)_100%)]" />
    </div>
  );
}
