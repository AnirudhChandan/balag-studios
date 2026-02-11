import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* --- BACKGROUND VIDEO LAYER --- */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          {/* CRITICAL: This path '/hero.mp4' looks inside your 'public' folder.
            Make sure you have a video file named 'hero.mp4' inside 'balag-studios/public/'.
          */}
          <source src="/hero.mp4" type="video/mp4" />
          {/* Fallback text if video fails */}
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay: Makes the text readable against the video */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-luxury-gold uppercase tracking-[0.3em] text-sm md:text-base mb-4"
        >
          Capturing Timeless Moments
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-serif text-5xl md:text-7xl lg:text-9xl text-white mb-8 drop-shadow-lg"
        >
          BalaG Studios
        </motion.h1>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <button className="px-8 py-3 md:px-10 md:py-4 border border-white text-white uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm">
            Explore Galleries
          </button>
        </motion.div>
      </div>

      {/* --- SCROLL INDICATOR LAYER --- */}
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
