import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryImages } from "../data/photos";
import { HiX } from "react-icons/hi";
import RevealText from "./RevealText"; // Import

const GalleryGrid = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="bg-luxury-black py-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-luxury-gold uppercase tracking-widest text-sm mb-4"
          >
            Portfolio
          </motion.h2>

          {/* REPLACED H3 WITH REVEALTEXT */}
          <RevealText
            text="Captured Moments"
            className="font-serif text-4xl md:text-6xl text-white justify-center"
          />
        </div>

        {/* Masonry Grid (Existing Code) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedImage(image)}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-sm"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-luxury-gold text-xs uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {image.category}
                </p>
                <h4 className="text-white font-serif text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {image.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal (Existing Code) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
          >
            <button className="absolute top-6 right-6 text-white text-4xl hover:text-luxury-gold transition-colors z-50">
              <HiX />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl border border-white/10"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white font-serif text-2xl">
                  {selectedImage.title}
                </h3>
                <p className="text-luxury-gold text-sm uppercase tracking-widest">
                  {selectedImage.category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryGrid;
