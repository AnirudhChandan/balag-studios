import { motion } from "framer-motion";
import RevealText from "./RevealText"; // Import the new component

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Layer */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-luxury-gold uppercase tracking-[0.3em] text-sm md:text-base mb-6"
        >
          Capturing Timeless Moments
        </motion.p>

        {/* REPLACED STANDARD H1 WITH REVEALTEXT */}
        <div className="mb-8 flex justify-center">
          <RevealText
            text="BalaG Studios"
            className="font-serif text-5xl md:text-7xl lg:text-9xl text-white drop-shadow-lg justify-center"
            delay={0.5}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }} // Increased delay to wait for text
        >
          <button className="px-8 py-3 md:px-10 md:py-4 border border-white text-white uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm">
            Explore Galleries
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/80">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
