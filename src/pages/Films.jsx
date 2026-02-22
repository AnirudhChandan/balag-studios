import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlay } from "react-icons/hi2";
import SEO from "../components/SEO";
import { videoData } from "../data/videos";
import RevealText from "../components/RevealText";
import Magnetic from "../components/Magnetic";

const Films = () => {
  const [activeFilm, setActiveFilm] = useState(videoData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  const handleFilmSelect = (film) => {
    setActiveFilm(film);
    setIsPlaying(false);

    if (window.innerWidth < 1024 && playerRef.current) {
      window.scrollTo({
        top: playerRef.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-luxury-black min-h-screen text-white pt-32 pb-20 relative overflow-hidden">
      <SEO
        title="Cinematic Films"
        description="Experience the magic in motion. Watch our curated collection of luxury wedding films."
        url="/films"
      />

      <div className="max-w-[95%] mx-auto px-4 md:px-8 relative z-10">
        {/* Header - Dims when video plays (Theater Mode) */}
        <motion.div
          animate={{ opacity: isPlaying ? 0.2 : 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16 border-b border-white/10 pb-8 flex justify-between items-end"
        >
          <div>
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
        </motion.div>

        {/* Split Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start relative">
          {/* LEFT SIDE: The Sticky Player */}
          <div
            ref={playerRef}
            className="w-full lg:w-3/5 lg:sticky top-32 z-30 pb-4 relative"
          >
            {/* The Ambilight Glow */}
            <div className="absolute inset-0 -inset-y-10 -z-10 pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`glow-${activeFilm.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isPlaying ? 0.1 : 0.35 }} // Dims slightly when playing
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="w-full h-full bg-cover bg-center blur-[100px] scale-110"
                  style={{ backgroundImage: `url(${activeFilm.thumbnail})` }}
                />
              </AnimatePresence>
            </div>

            {/* The Video Container */}
            <motion.div
              layout
              className={`relative w-full aspect-video bg-black border shadow-2xl rounded-sm overflow-hidden group transition-colors duration-700 ${
                isPlaying
                  ? "border-luxury-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.15)]"
                  : "border-white/10"
              }`}
            >
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

                      <div className="relative z-10">
                        <Magnetic>
                          <div className="w-20 h-20 md:w-24 md:h-24 bg-luxury-gold/90 backdrop-blur-md rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform duration-500">
                            <HiPlay className="text-4xl md:text-5xl ml-2" />
                          </div>
                        </Magnetic>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      className="absolute top-0 left-0 w-full h-full bg-black"
                      src={`https://www.youtube.com/embed/${activeFilm.embedId}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                      title={activeFilm.couple}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Player Metadata */}
            <motion.div
              animate={{ opacity: isPlaying ? 0.2 : 1 }}
              transition={{ duration: 0.8 }}
              className="mt-6 flex justify-between items-end bg-luxury-black/40 backdrop-blur-sm p-4 rounded-b-sm border border-white/5 border-t-0 -mt-1 relative z-10"
            >
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

              <div className="text-luxury-gold text-xs uppercase tracking-widest font-mono hidden md:flex items-end h-4 gap-[2px]">
                {isPlaying ? (
                  <>
                    <div className="w-[2px] bg-luxury-gold animate-equalizer" />
                    <div className="w-[2px] bg-luxury-gold animate-equalizer delay-100" />
                    <div className="w-[2px] bg-luxury-gold animate-equalizer delay-300" />
                    <div className="w-[2px] bg-luxury-gold animate-equalizer delay-200" />
                  </>
                ) : (
                  <span>[ {activeFilm.category} ]</span>
                )}
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: The Accordion Tracklist - Dims when video plays */}
          <motion.div
            animate={{ opacity: isPlaying ? 0.15 : 1 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-2/5 flex flex-col gap-4 z-20"
          >
            <div className="flex justify-between items-end mb-2 border-b border-white/10 pb-2">
              <h4 className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Select a Film
              </h4>
              <span className="text-[10px] text-luxury-gold font-mono">
                {videoData.length} FILMS
              </span>
            </div>

            {videoData.map((film, index) => (
              <motion.div
                layout
                key={film.id}
                onClick={() => handleFilmSelect(film)}
                className={`group cursor-pointer p-4 border transition-all duration-500 relative rounded-xl overflow-hidden ${
                  activeFilm.id === film.id
                    ? "bg-white/5 border-white/10"
                    : "border-transparent hover:bg-white/5 opacity-60 hover:opacity-100"
                }`}
              >
                {/* Active Indicator Line */}
                <div
                  className={`absolute left-0 top-1/4 h-1/2 w-[3px] bg-luxury-gold transition-transform duration-500 rounded-r-md origin-top ${
                    activeFilm.id === film.id
                      ? "scale-y-100"
                      : "scale-y-0 group-hover:scale-y-50"
                  }`}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {/* Micro Thumbnail */}
                    <div className="w-16 md:w-24 aspect-video bg-luxury-gray rounded-sm overflow-hidden relative shadow-lg">
                      <img
                        src={film.thumbnail}
                        className={`w-full h-full object-cover transition-transform duration-700 ${activeFilm.id === film.id ? "scale-110" : "group-hover:scale-110 grayscale"}`}
                        alt={film.couple}
                      />
                    </div>

                    <div>
                      <h3
                        className={`font-serif text-lg md:text-xl transition-colors duration-500 ${
                          activeFilm.id === film.id
                            ? "text-luxury-gold"
                            : "text-white"
                        }`}
                      >
                        {film.couple}
                      </h3>
                      <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest mt-1 font-sans">
                        {film.location}
                      </p>
                    </div>
                  </div>

                  <div className="text-gray-600 font-mono text-xs hidden sm:block">
                    0{index + 1}
                  </div>
                </div>

                {/* --- THE ACCORDION EXPANSION --- */}
                <AnimatePresence>
                  {activeFilm.id === film.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="mt-4 pt-4 border-t border-white/5"
                    >
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-3">
                        <span>
                          Format:{" "}
                          <strong className="text-white ml-1">
                            {film.category}
                          </strong>
                        </span>
                        <span className="text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
                          4K HDR
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 italic leading-relaxed">
                        "An immersive visual narrative capturing the raw emotion
                        and timeless traditions of {film.couple}'s celebration
                        at {film.location}."
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Films;
