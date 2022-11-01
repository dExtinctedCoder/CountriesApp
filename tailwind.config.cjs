/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {

  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ["Nunito", ...defaultTheme.fontFamily.sans],
      },
      aspectRatio: {
        '5/3': '5 / 3',
        '3/2': '3 / 2',
      },
      colors: {
        'textLight': 'hsl(200, 15%, 8%)',
        'inputLight': 'hsl(0, 0%, 52%)',
        'bgLight': 'hsl(0, 0%, 98%)',
        'bgDark': 'hsl(207, 26%, 17%)',
        'elemDark': 'hsl(209, 23%, 22%)',
        'textDark': 'hsl(0, 0%, 100%)',
      },
    },
  },
  plugins: [],
}