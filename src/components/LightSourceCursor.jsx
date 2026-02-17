import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const LightSourceCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Use springs for a "heavy", organic light movement
  const springX = useSpring(0, { stiffness: 100, damping: 30 });
  const springY = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const mouseMove = (e) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, [springX, springY]);

  return (
    <>
      {/* 1. THE MAIN LIGHT SOURCE (The Flashlight) */}
      <motion.div
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-[9999] mix-blend-soft-light hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 70%)`,
        }}
      />

      {/* 2. THE TINY CORE POINT (The "Bulb") */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-luxury-gold rounded-full pointer-events-none z-[10000] hidden md:block"
        style={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
      />
    </>
  );
};

export default LightSourceCursor;
