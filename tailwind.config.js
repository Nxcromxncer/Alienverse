/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        og: {
          bg:     '#1a8c2e',
          dark:   '#0a1a0a',
          mid:    '#0f5c1a',
          panel:  '#16781f',
          border: '#0a3d0f',
          light:  '#d4f5d4',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
