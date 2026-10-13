import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#edf6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1d4ed8',
          700: '#1e3a8a',
          800: '#0f172a',
          900: '#020617',
        },
        gold: '#c9a75b',
        silver: '#dfe7ee',
      },
      boxShadow: {
        glow: '0 18px 40px rgba(15, 23, 42, 0.18)',
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at top, rgba(59,130,246,0.25), transparent 48%), linear-gradient(135deg, #020817 0%, #0f172a 50%, #1e3a8a 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
