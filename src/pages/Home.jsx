import Hero from "../components/Hero";
import HorizontalScrollGallery from "../components/HorizontalScrollGallery";
import StickyScrollGallery from "../components/StickyScrollGallery";
import ContactSheet from "../components/ContactSheet";
import DirectorSlider from "../components/DirectorSlider";
import DeliverablesVault from "../components/DeliverablesVault"; // <--- NEW IMPORT
import About from "../components/About";
import SEO from "../components/SEO";

const Home = () => {
  return (
    <>
      <SEO
        title="Home"
        description="BalaG Studios is a luxury wedding photography team based in Rishikesh, specializing in cinematic storytelling and candid moments."
      />
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
