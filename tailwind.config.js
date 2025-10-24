/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a1a1a',
        'dark-panel': '#2a2a2a',
        'dark-border': '#3a3a3a',
        'accent-green': '#00ff88',
        'accent-blue': '#00bfff',
      },
    },
  },
  plugins: [],
}
