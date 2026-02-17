import Hero from "../components/Hero";
import HorizontalScrollGallery from "../components/HorizontalScrollGallery";
import StickyScrollGallery from "../components/StickyScrollGallery";
import ContactSheet from "../components/ContactSheet";
import DirectorSlider from "../components/DirectorSlider"; // <--- NEW IMPORT
import About from "../components/About";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="relative z-10 bg-luxury-black">
        <HorizontalScrollGallery />
        <StickyScrollGallery />
        <ContactSheet />

        {/* NEW FEATURE: THE CONFIDENCE BOOSTER */}
        <DirectorSlider />

        <About />
      </div>
    </>
  );
};

export default Home;
