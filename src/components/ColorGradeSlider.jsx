import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const ColorGradeSlider = ({ beforeImage, afterImage }) => {
  const [sliderPos, setSliderPos] = useState(50); // Position in percentage
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;

    // Support both Mouse and Touch events
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.pageX || e.touches[0].pageX) - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));

    setSliderPos(position);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500px] md:h-[700px] overflow-hidden cursor-ew-resize select-none border-y border-white/10"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* 1. THE "BEFORE" IMAGE (Bottom Layer) */}
      <div
        className="absolute inset-0 bg-cover bg-center grayscale brightness-50"
        style={{ backgroundImage: `url(${beforeImage})` }}
      >
        <div className="absolute top-10 left-10 px-4 py-2 bg-black/50 backdrop-blur-md text-xs tracking-widest uppercase text-white border border-white/10">
          Raw Camera File
        </div>
      </div>

      {/* 2. THE "AFTER" IMAGE (Top Layer with Clipping) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${afterImage})`,
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`, // This is the magic line
        }}
      >
        <div className="absolute top-10 right-10 px-4 py-2 bg-luxury-gold text-black text-xs tracking-widest uppercase font-bold">
          BalaG Signature Grade
        </div>
      </div>

      {/* 3. THE CUSTOM SLIDER HANDLE */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-luxury-gold z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center shadow-2xl">
          <div className="flex gap-1">
            <div className="w-[1px] h-4 bg-black/50" />
            <div className="w-[1px] h-4 bg-black/50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorGradeSlider;
