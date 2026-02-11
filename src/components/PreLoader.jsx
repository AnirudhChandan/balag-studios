import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Preloader = () => {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  return (
    <motion.div
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none"
    >
      {/* LEFT CURTAIN */}
      <motion.div
        initial={{ x: 0 }}
        exit={{
          x: "-100%",
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
        }}
        className="absolute left-0 top-0 h-full w-1/2 bg-luxury-black z-20"
      />

      {/* RIGHT CURTAIN */}
      <motion.div
        initial={{ x: 0 }}
        exit={{
          x: "100%",
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
        }}
        className="absolute right-0 top-0 h-full w-1/2 bg-luxury-black z-20"
      />

      {/* CONTENT LAYER (Text & Line) */}
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        className="relative z-30 flex flex-col items-center overflow-hidden"
      >
        {/* LOGO TEXT */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="font-serif text-4xl md:text-6xl text-white tracking-widest mb-4"
        >
          BALAG <span className="text-luxury-gold">STUDIOS</span>
        </motion.h1>

        {/* GOLD LINE DRAWING ANIMATION */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "150px" }}
          transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
          className="h-[1px] bg-luxury-gold"
        />
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
