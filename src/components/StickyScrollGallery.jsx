import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { galleryImages } from "../data/photos";
import RevealText from "./RevealText";

// --- SUB-COMPONENT: The Single Card ---
const Card = ({
  i,
  title,
  category,
  url,
  meta,
  progress,
  range,
  targetScale,
}) => {
  const containerRef = useRef(null);

  // LOGIC:
  // As the scroll progresses through this card's range:
  // 1. Scale decreases (it gets pushed "back" into the stack)
  // 2. Filter brightness decreases (shadow effect from card on top)
  const scale = useTransform(progress, range, [1, targetScale]);

  // Optional: A nice fade-out or blur could be added here,
  // but let's keep it sharp for the "physical" feel.

  return (
    <div
      ref={containerRef}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`, // Slight offset so you see the stack building
        }}
        className="relative w-[90vw] md:w-[70vw] h-[60vh] md:h-[70vh] rounded-xl overflow-hidden shadow-2xl origin-top bg-luxury-gray"
      >
        {/* IMAGE LAYER */}
        <div className="w-full h-full relative">
          <motion.div
            className="w-full h-full"
            // Inner image scale effect for "window" parallax
            style={{ scale: 1.1 }}
          >
            <img src={url} alt={title} className="w-full h-full object-cover" />
          </motion.div>

          {/* EDITORIAL OVERLAY */}
          <div className="absolute inset-0 bg-black/20 group hover:bg-black/40 transition-colors duration-500 flex flex-col justify-between p-8 md:p-12">
            {/* Top: Meta Data */}
            <div className="flex justify-between items-start">
              <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs uppercase tracking-widest px-4 py-2 rounded-full">
                {category}
              </span>
              <span className="text-luxury-gold font-mono text-xs hidden md:block">
                0{i + 1} / 0{galleryImages.length}
              </span>
            </div>

            {/* Bottom: Title & Tech Specs */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="overflow-hidden mb-2">
                  <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
                    {title}
                  </h2>
                </div>

                {meta && (
                  <div className="flex gap-4 mt-4 text-white/70 text-xs uppercase tracking-widest border-t border-white/20 pt-4">
                    <span>{meta.lens}</span>
                    <span className="w-1 h-1 bg-luxury-gold rounded-full self-center" />
                    <span>{meta.location}</span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN COMPONENT: The Deck ---
const StickyScrollGallery = () => {
  const containerRef = useRef(null);

  // Track scroll progress of the ENTIRE container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-luxury-black mt-20 pb-20"
    >
      {/* HEADER SECTION (BEFORE THE STACK) */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-luxury-gold uppercase tracking-[0.3em] text-sm mb-4"
        >
          Selected Works
        </motion.p>
        <RevealText
          text="The Editorial Edit"
          className="font-serif text-5xl md:text-7xl text-white justify-center"
        />
      </div>

      {/* THE STACK LOOP */}
      <div className="flex flex-col">
        {galleryImages.map((project, i) => {
          // Calculate the "target scale" for each card.
          // The top card (i=0) shrinks the most as new ones pile on.
          // The last card (i=last) doesn't shrink.
          const targetScale = 1 - (galleryImages.length - i) * 0.05;

          return (
            <Card
              key={project.id}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[i * 0.1, 1]} // Trigger range for the scaling effect
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
};

export default StickyScrollGallery;
