/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      spacing: {
        30: '7.5rem', // Valor para pt-30
        20: '5rem',   // Valor para pb-20
      },
    },
  },
  plugins: [],
};
