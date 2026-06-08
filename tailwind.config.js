/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        brand: {
          dark: '#1a2332',
          gold: '#d4a853',
          'gold-dark': '#b8942d',
        },
      },
      fontFamily: {
        sans: ['Noto Sans SC', 'sans-serif'],
        serif: ['Noto Serif SC', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
