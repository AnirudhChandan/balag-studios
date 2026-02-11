import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

// Import Page Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GalleryGrid from "./components/GalleryGrid";
import About from "./components/About";
import Enquire from "./components/Enquire";
import Testimonials from "./components/Testimonials";
import Preloader from "./components/Preloader"; // IMPORT THE PRELOADER

// --- COMPONENT: Scroll To Top ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- COMPONENT: Film Grain Overlay ---
const GrainOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.05] mix-blend-overlay">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.80"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};

// --- COMPONENT: Magnetic Custom Cursor ---
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-luxury-gold rounded-full pointer-events-none z-[10000] hidden md:block mix-blend-difference"
      animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      <div className="w-1 h-1 bg-luxury-gold rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  );
};

// --- MAIN APP STRUCTURE ---
function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // --- PRELOADER TIMER ---
    // We force the preloader to stay for 2.5 seconds to ensure the animation completes
    // and the video behind it has time to buffer.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-luxury-black min-h-screen text-white font-sans selection:bg-luxury-gold selection:text-black">
      {/* THE PRELOADER */}
      {/* AnimatePresence allows the component to animate OUT before it is removed from DOM */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* Cinematic Utilities */}
      <ScrollToTop />
      <GrainOverlay />
      <CustomCursor />

      {/* Global Navigation */}
      <Navbar />

      {/* Page Routing */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/gallery" element={<GalleryGrid />} />
        <Route path="/about" element={<About />} />
        <Route path="/enquire" element={<Enquire />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Routes>
    </div>
  );
}

export default App;
