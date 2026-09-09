import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const SURVIVORS = [
  { x: 96, y: 196, delay: 0.6 },
  { x: 238, y: 228, delay: 1.8 },
  { x: 352, y: 186, delay: 3.1 },
];

/** Telemetry readout with scrambling digits — decorative, not real coordinates. */
function Telemetry({ reduce }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setTick((prev) => prev + 1), 620);
    return () => clearInterval(id);
  }, [reduce]);

  const scramble = (seed) => {
    const digits = '0123456789';
    return Array.from({ length: 3 }, (_, i) => digits[(seed + i * 3 + tick * 2) % 10]).join('');
  };

  return (
    <g transform="translate(16 250)">
      <rect width="200" height="34" rx="7" fill="#060810" opacity="0.92" stroke="rgba(255,255,255,0.09)" />
      <text x="12" y="15" fontSize="8" fontFamily="monospace" fill="#5C6883" letterSpacing="1.4">
        GEOTAG · TRANSMITTING
      </text>
      <text x="12" y="27" fontSize="9" fontFamily="monospace" fill="#22D3EE" letterSpacing="0.8">
        LAT ••.{scramble(1)}  LON ••.{scramble(5)}
      </text>
      <circle cx="186" cy="17" r="3.4" fill="#34D399">
        {!reduce ? (
          <animate attributeName="opacity" values="1;0.15;1" dur="1.2s" repeatCount="indefinite" />
        ) : null}
      </circle>
    </g>
  );
}

/** Drone sweeping a disaster zone: scan cone, survivor detections, GPS uplink. */
export default function DroneVisual() {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 480 300"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of a drone scanning a disaster area, with AI detection boxes marking survivors and GPS coordinates being transmitted"
    >
      <defs>
        <linearGradient id="dv-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#070A14" />
          <stop offset="100%" stopColor="#0B0D14" />
        </linearGradient>
        <linearGradient id="dv-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
        </linearGradient>
        <pattern id="dv-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="480" height="300" fill="url(#dv-bg)" />
      <rect width="480" height="300" fill="url(#dv-grid)" />

      {/* Terrain + rubble */}
      <path d="M0 214 Q 80 196 148 210 T 300 202 T 480 216 L480 300 L0 300Z" fill="#0E1220" />
      <path d="M0 236 Q 120 222 232 234 T 480 240 L480 300 L0 300Z" fill="#121728" opacity="0.9" />
      {[
        [58, 224, 26, 9],
        [128, 240, 34, 8],
        [196, 220, 20, 7],
        [268, 246, 30, 9],
        [330, 226, 24, 8],
        [402, 242, 28, 9],
      ].map(([x, y, w, h]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={w}
          height={h}
          rx="2"
          fill="#1B2134"
          transform={`rotate(${(x % 7) - 3} ${x + w / 2} ${y + h / 2})`}
        />
      ))}

      {/* Drone + scan cone sweeping the area */}
      <motion.g
        animate={reduce ? undefined : { x: [-96, 96, -96] }}
        transition={reduce ? undefined : { duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M240 74 L156 214 L324 214 Z" fill="url(#dv-cone)" />
        <motion.line
          x1="156"
          y1="214"
          x2="324"
          y2="214"
          stroke="#22D3EE"
          strokeWidth="1.4"
          strokeOpacity="0.55"
          animate={reduce ? undefined : { strokeOpacity: [0.2, 0.7, 0.2] }}
          transition={reduce ? undefined : { duration: 2.2, repeat: Infinity }}
        />
        <motion.g
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={reduce ? undefined : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="222" y="60" width="36" height="12" rx="5" fill="#1C2438" stroke="rgba(255,255,255,0.16)" />
          <circle cx="240" cy="66" r="2.6" fill="#22D3EE" />
          <line x1="206" y1="58" x2="274" y2="58" stroke="rgba(255,255,255,0.22)" strokeWidth="1.6" />
          {[206, 274].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="58" r="2.4" fill="#4F7CFF" />
              <motion.ellipse
                cx={cx}
                cy="55"
                rx="15"
                ry="2.6"
                fill="none"
                stroke="rgba(148,178,255,0.5)"
                animate={reduce ? undefined : { rx: [15, 17, 15], opacity: [0.7, 0.25, 0.7] }}
                transition={reduce ? undefined : { duration: 0.4, repeat: Infinity }}
              />
            </g>
          ))}
        </motion.g>
      </motion.g>

      {/* Survivor detections */}
      {SURVIVORS.map((s) => (
        <motion.g
          key={`${s.x}-${s.y}`}
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
          animate={reduce ? { opacity: 1 } : { opacity: [0, 1, 1, 0], scale: [0.85, 1, 1, 0.9] }}
          transition={
            reduce
              ? undefined
              : { duration: 12, times: [0, 0.08, 0.42, 0.5], repeat: Infinity, delay: s.delay }
          }
          style={{ transformOrigin: `${s.x + 14}px ${s.y + 14}px` }}
        >
          <rect
            x={s.x}
            y={s.y}
            width="30"
            height="30"
            rx="3"
            fill="rgba(52,211,153,0.10)"
            stroke="#34D399"
            strokeWidth="1.3"
          />
          {[
            [s.x, s.y, 1, 1],
            [s.x + 30, s.y, -1, 1],
            [s.x, s.y + 30, 1, -1],
            [s.x + 30, s.y + 30, -1, -1],
          ].map(([cx, cy, dx, dy]) => (
            <path
              key={`${cx}-${cy}`}
              d={`M${cx} ${cy + dy * 8} L${cx} ${cy} L${cx + dx * 8} ${cy}`}
              stroke="#34D399"
              strokeWidth="2"
              fill="none"
            />
          ))}
          <g transform={`translate(${s.x} ${s.y - 13})`}>
            <rect width="58" height="11" rx="2" fill="#34D399" />
            <text x="4" y="8.2" fontSize="7" fontFamily="monospace" fill="#04120C" letterSpacing="0.4">
              survivor
            </text>
          </g>
          <circle cx={s.x + 15} cy={s.y + 15} r="2.4" fill="#34D399" />
        </motion.g>
      ))}

      {/* Uplink */}
      <g transform="translate(384 22)">
        <motion.g
          animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
          transition={reduce ? undefined : { duration: 2, repeat: Infinity }}
        >
          {[7, 12, 17].map((r, i) => (
            <path
              key={r}
              d={`M0 ${r} A ${r} ${r} 0 0 1 ${r} 0`}
              fill="none"
              stroke="#4F7CFF"
              strokeWidth="1.6"
              opacity={1 - i * 0.22}
              transform="rotate(-45)"
            />
          ))}
        </motion.g>
        <text x="26" y="4" fontSize="8" fontFamily="monospace" fill="#5C6883" letterSpacing="1.2">
          EDGE · JETSON
        </text>
      </g>

      <Telemetry reduce={reduce} />
    </svg>
  );
}
