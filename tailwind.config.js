/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 1. Custom Colors
      colors: {
        "luxury-black": "#0a0a0a",
        "luxury-gold": "#d4af37",
        "luxury-gray": "#2a2a2a",
        "soft-white": "#f5f5f5",
      },

      // 2. Custom Typography
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['"Montserrat"', "sans-serif"],
      },

      // 3. Custom Animations (For the Infinite Footer)
      animation: {
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
      },

      // 4. Keyframes (Defining how the marquee moves)
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
