import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

// --- IMPORT PAGE COMPONENTS ---
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GalleryGrid from "./components/GalleryGrid";
import About from "./components/About";
import Enquire from "./components/Enquire";
import Testimonials from "./components/Testimonials";
import Locations from "./pages/Locations"; // Location Scout Feature
import WeddingStory from "./pages/WeddingStory"; // Location Scout Feature
import GoldenHourPage from "./pages/GoldenHourPage"; // <--- THIS WAS MISSING
import Preloader from "./components/PreLoader";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import GrainOverlay from "./components/GrainOverlay";

// Scroll To Top Component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

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
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      <ScrollToTop />
      <GrainOverlay />
      <CustomCursor />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryGrid />} />
        <Route path="/about" element={<About />} />
        <Route path="/enquire" element={<Enquire />} />
        <Route path="/testimonials" element={<Testimonials />} />
        {/* Advanced Features Routes */}
        <Route path="/map" element={<Locations />} />
        <Route path="/weddings/:id" element={<WeddingStory />} />
        <Route path="/planner" element={<GoldenHourPage />} />{" "}
        {/* The Golden Hour Route */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
