/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'custom-blue': '#24246e',
        'custom-dark': '#06051f',
      },
      backgroundImage: {
        'custom-gradient': 'radial-gradient(circle, #24246e, #06051f)',
      },
    },
  },
  plugins: [
    
  ],
}