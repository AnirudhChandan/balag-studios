import Hero from "../components/Hero";
import HorizontalScrollGallery from "../components/HorizontalScrollGallery";
import StickyScrollGallery from "../components/StickyScrollGallery"; // <--- NEW IMPORT
import About from "../components/About";

const Home = () => {
  return (
    <>
      <Hero />

      {/* We use a relative wrapper with z-index to ensure the 
        sticky cards stack correctly on top of the Hero 
        and don't get hidden behind any fixed elements.
      */}
      <div className="relative z-10 bg-luxury-black">
        {/* The "Reel" / Horizontal Strip */}
        <HorizontalScrollGallery />

        {/* THE NEW FEATURE: The Sticky Deck */}
        <StickyScrollGallery />

        <About />
      </div>
    </>
  );
};

export default Home;
