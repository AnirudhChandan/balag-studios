import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLeft, HiArrowRight, HiStar } from "react-icons/hi";
import { reviews } from "../data/reviews";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-luxury-black text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={reviews[currentIndex].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image with Heavy Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out scale-105"
            style={{ backgroundImage: `url(${reviews[currentIndex].image})` }}
          >
            <div className="absolute inset-0 bg-black/70" />{" "}
            {/* Dark overlay to make text readable */}
          </div>

          {/* Content Container */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-20 text-center max-w-5xl mx-auto">
            {/* Stars */}
            <div className="flex gap-2 mb-8 text-luxury-gold text-2xl">
              {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                <HiStar key={i} />
              ))}
            </div>

            {/* The Quote */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-serif text-3xl md:text-5xl leading-tight md:leading-snug mb-10 italic text-gray-100"
            >
              "{reviews[currentIndex].quote}"
            </motion.h2>

            {/* Couple Name */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h3 className="text-luxury-gold text-xl uppercase tracking-widest font-semibold">
                {reviews[currentIndex].couple}
              </h3>
              <p className="text-gray-400 text-sm mt-2 uppercase tracking-wide">
                {reviews[currentIndex].date}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 right-10 flex gap-4 z-20">
        <button
          onClick={prevReview}
          className="p-4 border border-white/20 rounded-full hover:bg-luxury-gold hover:text-black hover:border-luxury-gold transition-all duration-300"
        >
          <HiArrowLeft className="text-xl" />
        </button>
        <button
          onClick={nextReview}
          className="p-4 border border-white/20 rounded-full hover:bg-luxury-gold hover:text-black hover:border-luxury-gold transition-all duration-300"
        >
          <HiArrowRight className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
