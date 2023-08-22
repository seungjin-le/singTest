/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      translate: {
        m50: '-50%',
        m100: '-100%',
        p50: '50%',
        p100: '100%',
      },
    },
  },
  plugins: [],
};
