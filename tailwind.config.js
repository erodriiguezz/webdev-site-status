/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // safelist: ["bg-red-100", "text-red-600"],
  theme: {
    extend: {
      colors: {
        // brand: "#3557FF",
        // medscape: "#064aa7",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
