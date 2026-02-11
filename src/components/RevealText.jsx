import { motion } from "framer-motion";

const RevealText = ({ text, className = "", delay = 0 }) => {
  // Split the text into individual words
  const words = text.split(" ");

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i + delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: "110%", // Start slightly below the container
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }} // Flex wrap handles responsiveness
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }} // Triggers when 10% of element is in view
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.25em" }} // Add space between words
          key={index}
          className="inline-block relative overflow-hidden pb-1" // pb-1 fixes clipping on some fonts
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default RevealText;
