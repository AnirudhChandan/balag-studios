import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DirectorSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  // The "Before" and "After" Data
  const beforeImg =
    "https://images.unsplash.com/photo-1522673607200-1645062cd495?auto=format&fit=crop&w=1600&q=80"; // Candid
  const afterImg =
    "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&w=1600&q=80"; // Directional

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.pageX || e.touches[0].pageX) - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(position);
  };

  return (
    <section className="bg-luxury-black py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-luxury-gold uppercase tracking-[0.3em] text-xs mb-4"
        >
          The BalaG Method
        </motion.h3>
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
          From Awkward to Iconic
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
          Most couples aren't professional models—and they shouldn't be. Drag
          the slider to see how we guide raw, nervous energy into cinematic art.
        </p>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-2xl overflow-hidden cursor-ew-resize border border-white/10 shadow-2xl group"
      >
        {/* BEFORE IMAGE (The Candid) */}
        <div
          className="absolute inset-0 bg-cover bg-center grayscale brightness-75 transition-all duration-700"
          style={{ backgroundImage: `url(${beforeImg})` }}
        >
          <div className="absolute bottom-10 left-10 z-10">
            <span className="text-white/50 text-[10px] uppercase tracking-widest block mb-2">
              Posed Status
            </span>
            <h4 className="text-white font-serif text-2xl md:text-4xl italic">
              "How it felt (Nervous & Giddy)"
            </h4>
          </div>
        </div>

        {/* AFTER IMAGE (The Iconic) - Controlled by clipPath */}
        <div
          className="absolute inset-0 bg-cover bg-center border-l-2 border-luxury-gold"
          style={{
            backgroundImage: `url(${afterImg})`,
            clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
          }}
        >
          {/* Label Reveal */}
          <div className="absolute bottom-10 right-10 z-10 text-right">
            <span className="text-luxury-gold text-[10px] uppercase tracking-widest block mb-2">
              The Direction
            </span>
            <h4 className="text-black bg-luxury-gold px-4 py-1 font-serif text-2xl md:text-4xl inline-block">
              "The Masterpiece"
            </h4>
          </div>
        </div>

        {/* CUSTOM HANDLE */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white/20 z-20"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <div className="flex gap-1">
              <div className="w-0.5 h-4 bg-black/30" />
              <div className="w-0.5 h-4 bg-black/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Quote */}
      <div className="mt-12 text-center italic text-gray-500 font-serif text-lg">
        "You bring the love. We bring the vision."
      </div>
    </section>
  );
};

export default DirectorSlider;
