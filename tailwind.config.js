/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: { 
    extend: {
      fontFamily: {
        // usage: className="font-testSohne"
        testSohne: ['"Test Söhne"', 'sans-serif'],
        // usage: className="font-timesNow"
        timesNow: ['"Times Now"', 'serif'],
      }
    }
  },
  plugins: [],
}
