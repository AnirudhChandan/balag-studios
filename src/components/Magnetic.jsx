import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Magnetic = ({ children }) => {
  const ref = useRef(null);

  // useMotionValue avoids React state re-renders for maximum performance
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // The physics of the "snap back" spring
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = (e) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();

    // Calculate the distance from the center of the element
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // The multiplier (0.2) controls the "strength" of the magnet.
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const reset = () => {
    // Snap back to origin when mouse leaves
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="inline-flex" // Ensures the wrapper tightly hugs its child
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
