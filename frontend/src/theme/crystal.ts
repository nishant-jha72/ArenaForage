/**
 * Crystal theme — single source of color values for Arena Forage.
 * Wired into CSS variables (`index.css`) and Tailwind (`tailwind.config.ts`).
 */
export const crystal = {
  primary: '#1554F5',
  primaryHover: '#0F3FC7',
  glow: '#00D9FF',
  deep: '#0A1E4D',

  surface: '#FFFFFF',
  surfaceMuted: '#F4F7FC',
  glass: 'rgba(255, 255, 255, 0.72)',

  ink: {
    950: '#080C16',
    900: '#0B1220',
    800: '#121A2E',
    700: '#1A2540',
    600: '#26314F',
  },

  border: 'rgba(11, 18, 32, 0.1)',
  borderStrong: 'rgba(11, 18, 32, 0.15)',

  status: {
    live: '#F04444',
    upcoming: '#1554F5',
    registrationOpen: '#00D9FF',
  },
} as const

export type CrystalTheme = typeof crystal
