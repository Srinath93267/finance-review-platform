/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}