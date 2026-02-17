import Hero from "../components/Hero";
import HorizontalScrollGallery from "../components/HorizontalScrollGallery";
import StickyScrollGallery from "../components/StickyScrollGallery";
import ContactSheet from "../components/ContactSheet";
import DirectorSlider from "../components/DirectorSlider";
import DeliverablesVault from "../components/DeliverablesVault"; // <--- NEW IMPORT
import About from "../components/About";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="relative z-10 bg-luxury-black">
        <HorizontalScrollGallery />
        <StickyScrollGallery />
        <ContactSheet />

        {/* The Confidence Booster */}
        <DirectorSlider />

        {/* NEW: The Value Builder */}
        <DeliverablesVault />

        <About />
      </div>
    </>
  );
};

export default Home;
