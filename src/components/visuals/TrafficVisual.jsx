import { motion, useReducedMotion } from 'framer-motion';

const SIGNAL_CYCLE = { duration: 6, repeat: Infinity, ease: 'linear' };

/** One three-lamp signal head; lamps cycle with a shared phase offset. */
function Signal({ x, y, delay = 0, reduce }) {
  const lamps = [
    { cy: 0, color: '#F87171', times: [0, 0.34, 0.36, 1], values: [1, 1, 0.12, 0.12] },
    { cy: 9, color: '#FBBF24', times: [0, 0.34, 0.42, 0.46, 1], values: [0.12, 0.12, 1, 0.12, 0.12] },
    { cy: 18, color: '#34D399', times: [0, 0.44, 0.48, 0.92, 1], values: [0.12, 0.12, 1, 1, 0.12] },
  ];

  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-5" y="-6" width="14" height="34" rx="5" fill="#0B0E18" stroke="rgba(255,255,255,0.12)" />
      {lamps.map((lamp) => (
        <motion.circle
          key={lamp.color}
          cx="2"
          cy={lamp.cy + 1}
          r="3.2"
          fill={lamp.color}
          initial={{ opacity: reduce ? 0.5 : lamp.values[0] }}
          animate={reduce ? undefined : { opacity: lamp.values }}
          transition={reduce ? undefined : { ...SIGNAL_CYCLE, times: lamp.times, delay }}
        />
      ))}
    </g>
  );
}

/** Vehicle + YOLO-style bounding box travelling along one axis. */
function Vehicle({ path, color, label, delay, duration, reduce, restAt, vertical = false }) {
  const [from, to] = path;
  // With reduced motion each vehicle parks at a spread-out spot on its lane so
  // the detection boxes stay visible instead of sitting off-canvas.
  const rest = reduce ? (restAt ?? (from + to) / 2) : from;
  const animation = vertical ? { y: [from, to] } : { x: [from, to] };

  return (
    <motion.g
      animate={reduce ? undefined : animation}
      transition={reduce ? undefined : { duration, repeat: Infinity, ease: 'linear', delay }}
      style={vertical ? { y: rest } : { x: rest }}
    >
      <rect
        x={vertical ? -7 : -11}
        y={vertical ? -11 : -7}
        width={vertical ? 14 : 22}
        height={vertical ? 22 : 14}
        rx="3.5"
        fill={color}
        opacity="0.92"
      />
      <rect
        x={vertical ? -12 : -16}
        y={vertical ? -16 : -12}
        width={vertical ? 24 : 32}
        height={vertical ? 32 : 24}
        rx="2"
        fill="none"
        stroke="#22D3EE"
        strokeWidth="1.1"
        strokeDasharray="5 4"
        opacity="0.85"
      />
      <g transform={`translate(${vertical ? -12 : -16} ${vertical ? -22 : -18})`}>
        <rect width={label.length * 5.2 + 8} height="10" rx="2" fill="#22D3EE" opacity="0.9" />
        <text x="4" y="7.4" fontSize="7" fontFamily="monospace" fill="#04050A" letterSpacing="0.3">
          {label}
        </text>
      </g>
    </motion.g>
  );
}

/** Top-down smart intersection: detection boxes, signal cycling, preemption cue. */
export default function TrafficVisual() {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 480 300"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of a smart city intersection where an AI system draws detection boxes around vehicles and controls traffic signals"
    >
      <defs>
        <linearGradient id="tv-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#080B14" />
          <stop offset="100%" stopColor="#05060C" />
        </linearGradient>
        <pattern id="tv-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="480" height="300" fill="url(#tv-bg)" />
      <rect width="480" height="300" fill="url(#tv-grid)" />

      {/* City blocks */}
      {[
        [24, 24, 150, 96],
        [306, 24, 150, 96],
        [24, 186, 150, 92],
        [306, 186, 150, 92],
      ].map(([x, y, w, h]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width={w} height={h} rx="8" fill="#0C1020" stroke="rgba(255,255,255,0.06)" />
          <rect x={x + 14} y={y + 16} width={w - 28} height="5" rx="2.5" fill="rgba(255,255,255,0.05)" />
          <rect x={x + 14} y={y + 30} width={(w - 28) * 0.6} height="5" rx="2.5" fill="rgba(255,255,255,0.04)" />
        </g>
      ))}

      {/* Roads */}
      <rect x="0" y="120" width="480" height="66" fill="#10131F" />
      <rect x="186" y="0" width="66" height="300" fill="#10131F" />
      <line x1="0" y1="153" x2="480" y2="153" stroke="rgba(255,255,255,0.22)" strokeWidth="1.4" strokeDasharray="14 12" />
      <line x1="219" y1="0" x2="219" y2="300" stroke="rgba(255,255,255,0.22)" strokeWidth="1.4" strokeDasharray="14 12" />
      <rect x="186" y="120" width="66" height="66" fill="#131725" />

      {/* Detection zone */}
      <motion.rect
        x="150"
        y="90"
        width="138"
        height="126"
        rx="6"
        fill="none"
        stroke="#4F7CFF"
        strokeWidth="1"
        strokeDasharray="3 6"
        animate={reduce ? undefined : { opacity: [0.25, 0.7, 0.25] }}
        transition={reduce ? undefined : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <g transform="translate(0 138)">
        <Vehicle path={[-40, 520]} restAt={116} color="#7C93C7" label="car" delay={0} duration={7} reduce={reduce} />
      </g>
      <g transform="translate(0 168)">
        <Vehicle path={[520, -40]} restAt={336} color="#5A6B93" label="car" delay={1.8} duration={8} reduce={reduce} />
      </g>
      <g transform="translate(204 0)">
        <Vehicle path={[-40, 340]} restAt={64} color="#8B9AC4" label="bus" delay={0.9} duration={9} reduce={reduce} vertical />
      </g>
      <g transform="translate(236 0)">
        <Vehicle path={[340, -40]} restAt={232} color="#E4626F" label="emergency" delay={3.4} duration={6.5} reduce={reduce} vertical />
      </g>

      <Signal x="168" y="98" delay={0} reduce={reduce} />
      <Signal x="262" y="176" delay={3} reduce={reduce} />

      {/* HUD */}
      <g transform="translate(16 16)">
        <rect width="132" height="26" rx="6" fill="#060810" opacity="0.9" stroke="rgba(255,255,255,0.09)" />
        <circle cx="14" cy="13" r="3.2" fill="#34D399">
          {!reduce ? (
            <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite" />
          ) : null}
        </circle>
        <text x="26" y="17" fontSize="9" fontFamily="monospace" fill="#93A3C4" letterSpacing="1">
          DETECTION ACTIVE
        </text>
      </g>

      <motion.g
        transform="translate(332 16)"
        initial={{ opacity: reduce ? 0.9 : 0 }}
        animate={reduce ? undefined : { opacity: [0, 0, 1, 1, 0] }}
        transition={
          reduce
            ? undefined
            : { duration: 6.5, times: [0, 0.42, 0.5, 0.78, 0.86], repeat: Infinity, delay: 3.4 }
        }
      >
        <rect width="132" height="26" rx="6" fill="#2A0E14" stroke="#E4626F" strokeOpacity="0.5" />
        <circle cx="14" cy="13" r="3.2" fill="#E4626F" />
        <text x="26" y="17" fontSize="9" fontFamily="monospace" fill="#F5A3AC" letterSpacing="1">
          SIGNAL PREEMPT
        </text>
      </motion.g>

      <g transform="translate(16 258)">
        <text fontSize="9" fontFamily="monospace" fill="#5C6883" letterSpacing="1.2">
          YOLO · OPENCV · PYTHON
        </text>
      </g>
    </svg>
  );
}
