/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['var(--font-pixel)', 'monospace'],
      },
      colors: {
        /* 8-bit retro palette */
        'retro-bg': '#0d0221',
        'retro-panel': '#1a0a2e',
        'retro-border': '#3d2463',
        'retro-border-bright': '#6b4c9a',
        'retro-text': '#e0d4f0',
        'retro-muted': '#8b7aa0',
        'retro-green': '#00ff88',
        'retro-cyan': '#00ffff',
        'retro-magenta': '#ff00ff',
        'retro-yellow': '#ffff00',
        'retro-orange': '#ff8800',
        'retro-red': '#ff3366',
      },
      boxShadow: {
        'pixel': '4px 4px 0 0 var(--tw-shadow-color)',
        'pixel-sm': '2px 2px 0 0 var(--tw-shadow-color)',
      },
      screens: {
        '3xl': '2048px',
      },
    },
  },
  plugins: [],
};
