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
import Locations from "./pages/Locations";
import WeddingStory from "./pages/WeddingStory";
import GoldenHourPage from "./pages/GoldenHourPage";
import Preloader from "./components/PreLoader";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import GrainOverlay from "./components/GrainOverlay";
import DirectorSlider from "./components/DirectorSlider";
import SonicAtmosphere from "./components/SonicAtmosphere";
import Films from "./pages/Films";
import PageTransition from "./components/Transition"; // <--- NEW IMPORT

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

  // <--- NEW: We need to track the current route location to trigger animations
  const location = useLocation();

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
      {/* Preloader Animation */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      <ScrollToTop />
      <GrainOverlay />
      <CustomCursor />
      <SonicAtmosphere />
      <Navbar />

      {/* --- NEW: PAGE TRANSITION WRAPPER --- */}
      {/* mode="wait" ensures the old page fully exits before the new one enters */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/gallery"
            element={
              <PageTransition>
                <GalleryGrid />
              </PageTransition>
            }
          />
          <Route
            path="/films"
            element={
              <PageTransition>
                <Films />
              </PageTransition>
            }
          />
          <Route
            path="/about"
            element={
              <PageTransition>
                <About />
              </PageTransition>
            }
          />
          <Route
            path="/enquire"
            element={
              <PageTransition>
                <Enquire />
              </PageTransition>
            }
          />
          <Route
            path="/testimonials"
            element={
              <PageTransition>
                <Testimonials />
              </PageTransition>
            }
          />
          <Route
            path="/map"
            element={
              <PageTransition>
                <Locations />
              </PageTransition>
            }
          />
          <Route
            path="/weddings/:id"
            element={
              <PageTransition>
                <WeddingStory />
              </PageTransition>
            }
          />
          <Route
            path="/planner"
            element={
              <PageTransition>
                <GoldenHourPage />
              </PageTransition>
            }
          />
          <Route
            path="/method"
            element={
              <PageTransition>
                <div className="pt-20">
                  <DirectorSlider />
                </div>
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;
