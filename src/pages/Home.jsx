import Hero from "../components/Hero";
import HorizontalScrollGallery from "../components/HorizontalScrollGallery";
import About from "../components/About"; // Re-using About for more content on Home for better scroll
import GalleryGrid from "../components/GalleryGrid"; // Re-using GalleryGrid

const Home = () => {
  return (
    <>
      <Hero />
      <HorizontalScrollGallery />
      {/* You can add more sections here if you want to make the home page longer */}
      {/* For instance, a snippet of About or GalleryGrid */}
      <div className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-center font-serif text-5xl text-white mb-10">
          Our Latest Work
        </h2>
      </div>
      <GalleryGrid /> {/* Display a small part of the full gallery */}
      <About /> {/* Display the full About page */}
    </>
  );
};

export default Home;
