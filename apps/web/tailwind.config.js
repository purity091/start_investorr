
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./easy_mode/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-(slate|zinc|stone|cyan|emerald|blue|indigo|orange)-(50|100|200|300|400|500|600|900)/,
      variants: ['hover', 'group-hover'],
    },
    {
      pattern: /bg-(slate|zinc|stone|cyan|emerald|blue|indigo|orange)-(400|500|900)\/(10|20|30)/,
      variants: ['hover', 'group-hover'],
    },
    {
      pattern: /text-(slate|zinc|stone|cyan|emerald|blue|indigo|orange)-(100|300|400|500|600|700)/,
      variants: ['hover', 'group-hover'],
    },
    {
      pattern: /border-(slate|zinc|stone|cyan|emerald|blue|indigo|orange)-(100|200|300|400|500)/,
      variants: ['hover', 'group-hover'],
    },
    {
      pattern: /shadow-(slate|zinc|stone|cyan|emerald|blue|indigo|orange)-(900)\/(30)/,
    }
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans Arabic', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        ai: {
          light: '#f5f3ff',
          dark: '#7c3aed',
        },
        success: '#10b981',
        danger: '#ef4444',
      }
    },
  },
  plugins: [],
}
