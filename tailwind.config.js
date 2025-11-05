// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        cabinet: ['"Cabinet Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
