import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ProgressiveImage = ({
  src,
  alt,
  imageClassName = "",
  containerClassName = "",
  parallax = false, // <--- NEW: The Parallax Switch
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  // 1. Track the scroll position of THIS specific image container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Trigger when it enters the screen, stop when it leaves
  });

  // 2. Map the scroll progress (0 to 1) to vertical movement (-15% to 15%)
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div
      ref={containerRef}
      className={`relative bg-luxury-gray overflow-hidden w-full h-full ${containerClassName}`}
    >
      {/* The Skeleton Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse z-0" />
      )}

      {/* The Actual Image */}
      <motion.img
        src={src}
        alt={alt}
        // --- UX UPGRADE: Apply Parallax Physics if true ---
        style={parallax ? { y, scale: 1.3 } : {}}
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={isLoaded ? { opacity: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover relative z-10 ${imageClassName}`}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

export default ProgressiveImage;
