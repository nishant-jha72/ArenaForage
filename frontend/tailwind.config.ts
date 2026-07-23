import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: 'rgb(var(--crystal-primary) / <alpha-value>)',
          'blue-hover': 'rgb(var(--crystal-primary-hover) / <alpha-value>)',
          navy: 'rgb(var(--crystal-deep) / <alpha-value>)',
          cyan: 'rgb(var(--crystal-glow) / <alpha-value>)',
        },

        crystal: {
          primary: 'rgb(var(--crystal-primary) / <alpha-value>)',
          'primary-hover':
            'rgb(var(--crystal-primary-hover) / <alpha-value>)',
          glow: 'rgb(var(--crystal-glow) / <alpha-value>)',
          deep: 'rgb(var(--crystal-deep) / <alpha-value>)',
          surface: 'rgb(var(--crystal-surface) / <alpha-value>)',
          'surface-muted':
            'rgb(var(--crystal-surface-muted) / <alpha-value>)',
          glass: 'rgb(var(--crystal-glass) / <alpha-value>)',
          border: 'rgb(var(--crystal-border) / <alpha-value>)',
          'border-strong':
            'rgb(var(--crystal-border-strong) / <alpha-value>)',
          live: 'rgb(var(--crystal-status-live) / <alpha-value>)',
          upcoming:
            'rgb(var(--crystal-status-upcoming) / <alpha-value>)',
          open: 'rgb(var(--crystal-status-open) / <alpha-value>)',
        },

        ink: {
          950: 'rgb(var(--crystal-ink-950) / <alpha-value>)',
          900: 'rgb(var(--crystal-ink-900) / <alpha-value>)',
          800: 'rgb(var(--crystal-ink-800) / <alpha-value>)',
          700: 'rgb(var(--crystal-ink-700) / <alpha-value>)',
          600: 'rgb(var(--crystal-ink-600) / <alpha-value>)',
        },
      },

      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },

      backgroundImage: {
        'grid-light':
          'linear-gradient(color-mix(in srgb, rgb(var(--crystal-primary)) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, rgb(var(--crystal-primary)) 6%, transparent) 1px, transparent 1px)',

        'grid-dark':
          'linear-gradient(color-mix(in srgb, rgb(var(--crystal-glow)) 5%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, rgb(var(--crystal-glow)) 5%, transparent) 1px, transparent 1px)',
      },

      backgroundSize: {
        grid: '32px 32px',
      },

      clipPath: {
        panel: 'polygon(0 0, 100% 0, 100% 88%, 96% 100%, 0 100%)',
      },

      animation: {
        'pulse-live': 'pulse-live 1.6s ease-in-out infinite',
        marquee: 'marquee 22s linear infinite',
      },

      keyframes: {
        'pulse-live': {
          '0%,100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.35',
          },
        },

        marquee: {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(-50%)',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config