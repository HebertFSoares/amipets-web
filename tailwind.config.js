/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'text': {
          DEFAULT: '#000000',
          500: '#CCCCCC'
        },
        'background': {
          DEFAULT: '#FFFFFF',
          500: '#CCCCCC'
        },
        'primary': {
          DEFAULT: '#7DA632',
          50: '#0f1406',
          100: '#1e270c',
          200: '#3b4f17',
          300: '#597623',
          400: '#779d2f',
          500: '#94c43b',
          600: '#aad062',
          700: '#bfdc89',
          800: '#d4e8b0',
          900: '#eaf3d8',
          950: '#f4f9eb',
        },
        'secondary': {
          DEFAULT: '#FFFFFF'
        },
        'accent': {
          DEFAULT: '00FF00'
        }
      }
    },
  },
  plugins: [],
};
