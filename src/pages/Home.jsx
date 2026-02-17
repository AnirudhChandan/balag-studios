import Hero from "../components/Hero";
import HorizontalScrollGallery from "../components/HorizontalScrollGallery";
import GalleryGrid from "../components/GalleryGrid"; // Reverting to the stable grid
import About from "../components/About";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="relative z-10 bg-luxury-black">
        <HorizontalScrollGallery />
        <GalleryGrid /> {/* Restored Component */}
        <About />
      </div>
    </>
  );
};

export default Home;
