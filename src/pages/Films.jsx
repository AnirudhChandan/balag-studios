import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlay } from "react-icons/hi2";
import SEO from "../components/SEO";
import { videoData } from "../data/videos";
import RevealText from "../components/RevealText";

const Films = () => {
  const [activeFilm, setActiveFilm] = useState(videoData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  // Reset the player to the thumbnail state whenever a new film is selected

  const handleFilmSelect = (film) => {
    setActiveFilm(film);
    setIsPlaying(false); // <--- ADD THIS HERE INSTEAD!

    // On mobile, scroll back to the player smoothly
    if (window.innerWidth < 1024 && playerRef.current) {
      window.scrollTo({
        top: playerRef.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-luxury-black min-h-screen text-white pt-32 pb-20">
      <SEO
        title="Cinematic Films"
        description="Experience the magic in motion. Watch our curated collection of luxury wedding films."
        url="/films"
      />

      <div className="max-w-[95%] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-8">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-luxury-gold uppercase tracking-[0.3em] text-xs mb-4 font-sans"
          >
            The Screening Room
          </motion.h3>
          <RevealText
            text="Motion & Emotion"
            className="font-serif text-5xl md:text-7xl text-white"
          />
        </div>

        {/* Split Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start relative">
          {/* LEFT SIDE: The Sticky Player */}
          {/* Added bg-luxury-black padding to ensure it covers text when scrolling on mobile */}
          <div
            ref={playerRef}
            className="w-full lg:w-3/5 lg:sticky top-32 z-30 bg-luxury-black pb-4"
          >
            <div className="relative w-full aspect-video bg-black border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilm.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  {!isPlaying ? (
                    // UX UPGRADE 1: THE CUSTOM POSTER
                    <div
                      className="absolute inset-0 cursor-pointer flex items-center justify-center group"
                      onClick={() => setIsPlaying(true)}
                    >
                      <img
                        src={activeFilm.thumbnail}
                        alt={activeFilm.couple}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                      {/* Luxury Play Button */}
                      <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 bg-luxury-gold/90 backdrop-blur-md rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform duration-500">
                        <HiPlay className="text-4xl md:text-5xl ml-2" />
                      </div>
                    </div>
                  ) : (
                    // THE IFRAME (Loads ONLY after click, meaning sound is allowed!)
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      // Notice: muted is removed, so sound plays instantly
                      src={`https://www.youtube.com/embed/${activeFilm.embedId}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                      title={activeFilm.couple}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Player Metadata */}
            <div className="mt-6 flex justify-between items-end">
              <div>
                <motion.h2
                  key={`title-${activeFilm.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-serif text-3xl md:text-4xl text-white mb-1"
                >
                  {activeFilm.couple}
                </motion.h2>
                <motion.p
                  key={`loc-${activeFilm.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-400 font-sans text-sm uppercase tracking-widest"
                >
                  {activeFilm.location}
                </motion.p>
              </div>
              <div className="text-luxury-gold text-xs uppercase tracking-widest font-mono hidden md:block">
                [ {activeFilm.category} ]
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: The Tracklist */}
          <div className="w-full lg:w-2/5 flex flex-col gap-2 z-10">
            <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
              <h4 className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Select a Film
              </h4>
              <span className="text-[10px] text-luxury-gold font-mono">
                {videoData.length} FILMS
              </span>
            </div>

            {videoData.map((film, index) => (
              <div
                key={film.id}
                onClick={() => handleFilmSelect(film)}
                className={`group cursor-pointer py-4 border-b border-white/5 transition-all duration-500 relative flex justify-between items-center ${
                  activeFilm.id === film.id
                    ? "opacity-100 bg-white/5"
                    : "opacity-60 hover:opacity-100 hover:bg-white/5"
                } px-4 -mx-4 rounded-lg`}
              >
                {/* Active Indicator Line */}
                <div
                  className={`absolute left-0 top-1/4 h-1/2 w-[3px] bg-luxury-gold transition-transform duration-500 rounded-r-md origin-top ${
                    activeFilm.id === film.id
                      ? "scale-y-100"
                      : "scale-y-0 group-hover:scale-y-50"
                  }`}
                />

                <div className="flex items-center gap-6">
                  {/* UX UPGRADE 2: Micro Thumbnail */}
                  <div className="w-20 md:w-28 aspect-video bg-luxury-gray rounded-sm overflow-hidden relative shadow-lg">
                    <img
                      src={film.thumbnail}
                      className={`w-full h-full object-cover transition-transform duration-700 ${activeFilm.id === film.id ? "scale-110" : "group-hover:scale-110 grayscale"}`}
                    />
                    {activeFilm.id === film.id && isPlaying && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-ping" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3
                      className={`font-serif text-xl md:text-2xl transition-colors duration-500 ${
                        activeFilm.id === film.id
                          ? "text-luxury-gold"
                          : "text-white"
                      }`}
                    >
                      {film.couple}
                    </h3>
                    <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1 font-sans">
                      {film.location}
                    </p>
                  </div>
                </div>

                <div className="text-gray-600 font-mono text-sm hidden sm:block">
                  0{index + 1}
                </div>
              </div>
            ))}

            <div className="mt-12 p-6 bg-luxury-gold/5 border border-luxury-gold/20 rounded-lg text-center">
              <p className="text-sm text-gray-300 font-sans italic">
                "Our films aren't just recorded; they are felt. Wear headphones
                for the best experience."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Films;
