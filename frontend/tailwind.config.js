/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [require('flowbite/plugin')],
  theme: {
    extend: {},
  },

}