/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "luxury-black": "#0a0a0a",
        "luxury-gold": "#d4af37",
        "luxury-gray": "#2a2a2a",
        "soft-white": "#f5f5f5",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['"Montserrat"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
