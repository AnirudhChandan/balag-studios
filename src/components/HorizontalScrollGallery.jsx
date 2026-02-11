import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Stable, High-Res Wedding Images
const horizontalImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    title: "The Grand Entrance",
    category: "Weddings",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=2070&auto=format&fit=crop",
    title: "Intimate Vows",
    category: "Engagements",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1520854221256-174626102607?q=80&w=2070&auto=format&fit=crop",
    title: "Riverside Ceremony",
    category: "Weddings",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2070&auto=format&fit=crop",
    title: "Golden Hour Portraits",
    category: "Portraits",
  },
];

const HorizontalScrollGallery = () => {
  const containerRef = useRef(null);
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // This maps the vertical scroll (0 to 1) to a horizontal movement (-percentage)
  // We use -75% because we have 4 images (each 25% of the total width ideally)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-luxury-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 px-12">
          {horizontalImages.map((item, index) => (
            <div
              key={item.id}
              className="group relative h-[65vh] w-[70vw] md:w-[50vw] flex-shrink-0 overflow-hidden rounded-sm bg-luxury-gray/20"
            >
              {/* Image with a subtle scale effect on hover */}
              <motion.img
                src={item.url}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />

              {/* Cinematic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-luxury-gold uppercase tracking-[0.3em] text-xs mb-3"
                >
                  {item.category}
                </motion.p>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-serif text-3xl md:text-5xl text-white leading-tight"
                >
                  {item.title}
                </motion.h3>
              </div>

              {/* Ghost Number in Background */}
              <span className="absolute -top-10 -right-10 text-[20rem] font-serif text-white/5 select-none pointer-events-none">
                0{index + 1}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollGallery;
