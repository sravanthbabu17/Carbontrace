import type { Config } from 'tailwindcss';

/**
 * Design tokens for EcoTrack AI — "Organic Biophilic" style, Sustainability/ESG palette.
 * Keep these in sync with the CSS custom properties in src/app/globals.css.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5e8c61',
          light: '#97b59d',
          dark: '#3f6241',
        },
        secondary: '#97b59d',
        accent: '#b9debc',
        surface: '#faf9f6',
        ink: '#3b322c',
        warning: '#ea580c',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
