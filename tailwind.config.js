/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        ysabeau: ['Ysabeau SC', 'sans-serif'],
        alegreya: ['Alegreya Sans', 'sans-serif'],
        greatVibes: ['Great Vibes', 'cursive']
      }
    },
  },
  plugins: [],
}

