/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{ts,tsx,js,jsx}"
    ],
    darkMode: "class",
    theme: {
      extend: {
        // Ejemplo: colores o fuentes personalizadas
        colors: {
          brand: {
            50:  "#fff1f3",
            100: "#ffe4e8",
            200: "#fecdd3",
            300: "#fda4af",
            400: "#fb7185",
            500: "#f43f5e", // principal
            600: "#e11d48",
            700: "#be123c",
            800: "#9f1239",
            900: "#881337"
          }
        }
      },
    },
    plugins: [],
  }
  