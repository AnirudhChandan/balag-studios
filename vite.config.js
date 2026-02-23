import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Code splitting for faster initial load
    rollupOptions: {
      output: {
        manualChunks: {
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
          "animation-vendor": ["gsap", "@gsap/react", "framer-motion"],
          router: ["react-router-dom"],
        },
      },
    },
    // Minify and optimize
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
      },
    },
    // Higher chunk size warning threshold
    chunkSizeWarningLimit: 1000,
  },
  // Deduplicate dependencies
  dedupe: ["react", "react-dom"],
});
