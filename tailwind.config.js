/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      translate: {
        m10: '-10%',
        m30: '-30%',
        m50: '-50%',
        m100: '-100%',
        p10: '10%',
        p30: '30%',
        p50: '50%',
        p100: '100%',
      },
      zIndex: {
        5: '5',
      },
    },
  },
  plugins: [],
};
