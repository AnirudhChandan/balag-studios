import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SonicAtmosphere = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef(null);

  // Toggle Play/Pause with Fade Effect
  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Fade out logic
      let vol = 0.5;
      const fadeOut = setInterval(() => {
        if (vol > 0.05) {
          vol -= 0.05;
          audio.volume = vol;
        } else {
          audio.pause();
          setIsPlaying(false);
          clearInterval(fadeOut);
        }
      }, 50);
    } else {
      // Start playing and Fade in
      audio.volume = 0;
      audio.play();
      setIsPlaying(true);
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 0.5) {
          vol += 0.05;
          audio.volume = vol;
        } else {
          clearInterval(fadeIn);
        }
      }, 50);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 flex items-center gap-4">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/audio/ambience.mp3" type="audio/mp3" />
      </audio>

      {/* The Interaction Button */}
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={toggleAudio}
        className="relative group flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-luxury-gold hover:border-luxury-gold transition-all duration-500 shadow-2xl"
      >
        {/* Equalizer Graphic */}
        <div className="flex items-end gap-[3px] h-4">
          <div
            className={`w-[2px] bg-white group-hover:bg-black transition-colors ${
              isPlaying ? "animate-equalizer" : "h-1"
            }`}
          />
          <div
            className={`w-[2px] bg-white group-hover:bg-black transition-colors ${
              isPlaying ? "animate-equalizer delay-100" : "h-3"
            }`}
          />
          <div
            className={`w-[2px] bg-white group-hover:bg-black transition-colors ${
              isPlaying ? "animate-equalizer delay-300" : "h-2"
            }`}
          />
          <div
            className={`w-[2px] bg-white group-hover:bg-black transition-colors ${
              isPlaying ? "animate-equalizer delay-200" : "h-4"
            }`}
          />
        </div>
      </motion.button>

      {/* Label Tooltip */}
      <AnimatePresence>
        {(isHovered || isPlaying) && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="text-xs uppercase tracking-widest text-white/50 font-sans pointer-events-none"
          >
            {isPlaying ? "Rishikesh Ambience" : "Play Atmosphere"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SonicAtmosphere;
