import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const LightSourceCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Use springs for a "heavy", organic light movement
  const springX = useSpring(cursorX, { stiffness: 100, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const mouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, [cursorX, cursorY]);

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
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
};

export default LightSourceCursor;
