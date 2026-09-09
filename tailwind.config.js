/** @type {import('tailwindcss').Config} */

// Full 0–100 opacity scale so any `/N` modifier (e.g. border-white/12) is valid.
const opacity = Object.fromEntries(
  Array.from({ length: 101 }, (_, i) => [i, String(i / 100)])
);

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      opacity,
      colors: {
        ink: {
          950: '#04050A',
          900: '#070810',
          850: '#0A0C15',
          800: '#0E1120',
          700: '#151929',
          600: '#1E2438',
        },
        accent: {
          cyan: '#22D3EE',
          blue: '#4F7CFF',
          violet: '#9A6BFF',
          pink: '#E879F9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        '10xl': ['9rem', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
      },
      maxWidth: {
        shell: '1200px',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -20px rgba(79,124,255,0.35)',
        'glow-cyan': '0 0 40px -10px rgba(34,211,238,0.45)',
        'glow-violet': '0 0 40px -10px rgba(154,107,255,0.45)',
        card: '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 30px 80px -40px rgba(0,0,0,0.9)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, transparent, #04050A 75%), radial-gradient(circle at 50% 0%, rgba(79,124,255,0.12), transparent 60%)',
        'accent-gradient': 'linear-gradient(100deg, #22D3EE 0%, #4F7CFF 45%, #9A6BFF 100%)',
        'accent-soft': 'linear-gradient(135deg, rgba(34,211,238,0.14), rgba(154,107,255,0.14))',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,-18px,0) scale(1.04)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(6%,-8%,0) scale(1.12)' },
          '66%': { transform: 'translate3d(-7%,5%,0) scale(0.95)' },
          '100%': { transform: 'translate3d(0,0,0) scale(1)' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.65' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        dash: {
          to: { strokeDashoffset: '-24' },
        },
        scan: {
          '0%, 100%': { transform: 'translateY(0%)', opacity: '0.15' },
          '50%': { transform: 'translateY(100%)', opacity: '0.6' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        blink: {
          '0%, 45%': { opacity: '1' },
          '50%, 95%': { opacity: '0.15' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s cubic-bezier(0.45,0,0.55,1) infinite',
        'float-slow': 'float-slow 9s cubic-bezier(0.45,0,0.55,1) infinite',
        drift: 'drift 26s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
        'pulse-ring': 'pulse-ring 2.6s cubic-bezier(0.24,0.6,0.35,1) infinite',
        dash: 'dash 1.1s linear infinite',
        scan: 'scan 4.5s ease-in-out infinite',
        shimmer: 'shimmer 2.4s ease-in-out infinite',
        blink: 'blink 2.2s steps(1,end) infinite',
      },
    },
  },
  plugins: [],
};
