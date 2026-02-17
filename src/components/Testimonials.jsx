import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLeft, HiArrowRight, HiStar } from "react-icons/hi";
import { FaQuoteLeft } from "react-icons/fa"; // <--- FIXED IMPORT
import { reviews } from "../data/reviews";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextReview = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const current = reviews[currentIndex];

  // Animations
  const slideVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-luxury-black text-white py-24 px-4 flex items-center">
      {/* 1. AMBIENT BACKGROUND (The "Glow") */}
      {/* We use a blurred, zoomed version of the current image to set the mood */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={current.image}
            alt="ambient bg"
            className="w-full h-full object-cover blur-[100px] scale-125"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: THE PORTRAIT (Film Card Style) */}
        <div className="relative h-[60vh] lg:h-[80vh] w-full">
          <div className="absolute inset-0 border border-white/20 translate-x-4 translate-y-4 rounded-sm" />{" "}
          {/* Offset Border */}
          <div className="absolute inset-0 overflow-hidden rounded-sm bg-luxury-gray">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={current.id}
                src={current.image}
                alt={current.couple}
                custom={direction}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Film Grain Texture Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          </div>
        </div>

        {/* RIGHT: THE LOVE LETTER (Typography) */}
        <div className="relative pl-0 lg:pl-12">
          {/* Giant Quote Icon Watermark */}
          {/* FIXED: Using FaQuoteLeft instead of HiQuote */}
          <FaQuoteLeft className="absolute -top-20 -left-10 text-9xl text-white/5 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6 text-luxury-gold text-lg">
                {[...Array(current.rating)].map((_, i) => (
                  <HiStar key={i} />
                ))}
              </div>

              {/* Title */}
              <h3 className="text-luxury-gold uppercase tracking-[0.2em] text-sm mb-4 font-sans font-bold">
                {current.title}
              </h3>

              {/* The Quote */}
              <h2 className="font-serif text-3xl md:text-5xl leading-tight text-white mb-8">
                "{current.quote}"
              </h2>

              {/* Author & Location */}
              <div className="border-l-2 border-luxury-gold pl-6">
                <h4 className="text-2xl font-serif">{current.couple}</h4>
                <p className="text-gray-400 text-sm mt-1 font-sans uppercase tracking-wider">
                  {current.location}
                </p>
                <p className="text-gray-500 text-xs mt-1 font-mono">
                  {current.date}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex gap-4 mt-12">
            <button
              onClick={prevReview}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-luxury-gold hover:text-black hover:border-luxury-gold transition-all duration-300 group"
            >
              <HiArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={nextReview}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-luxury-gold hover:text-black hover:border-luxury-gold transition-all duration-300 group"
            >
              <HiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
