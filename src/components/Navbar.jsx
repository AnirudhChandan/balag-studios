import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Link } from "react-router-dom";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import Magnetic from "./Magnetic"; // <--- NEW IMPORT

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    if (latest > previous && latest > 150 && !isOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const links = [
    { name: "Home", path: "/", image: "/images/gallery1.jpeg" },
    { name: "The Method", path: "/method", image: "/images/gallery2.jpeg" },
    { name: "Map", path: "/map", image: "/images/gallery3.jpeg" },
    { name: "Planner", path: "/planner", image: "/images/gallery4.jpeg" },
    { name: "Gallery", path: "/gallery", image: "/images/gallery5.jpeg" },
    { name: "Films", path: "/films", image: "/images/story-1.jpeg" },
    {
      name: "Testimonials",
      path: "/testimonials",
      image: "/images/testimonial-1.jpeg",
    },
    { name: "About", path: "/about", image: "/images/testimonial-2.jpeg" },
  ];

  const menuVars = {
    initial: { scaleY: 0 },
    animate: {
      scaleY: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      scaleY: 0,
      transition: { delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const containerVars = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.07,
        staggerDirection: 1,
      },
    },
  };

  const linkVars = {
    initial: {
      y: "30vh",
      opacity: 0,
      transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] },
    },
    open: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] },
    },
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
        <motion.nav
          layout
          variants={{
            visible: { y: 0, opacity: 1 },
            hidden: { y: "-150%", opacity: 0 },
          }}
          initial="visible"
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between transition-colors duration-500 overflow-hidden ${
            scrolled
              ? "mt-4 w-[90%] lg:max-w-5xl bg-luxury-black/70 backdrop-blur-xl border border-white/10 rounded-full py-3 px-6 md:px-8 shadow-2xl"
              : "mt-0 w-full max-w-7xl bg-transparent py-6 px-6 rounded-none border-transparent"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            className={`font-serif text-white tracking-widest relative z-10 transition-all duration-500 ${
              scrolled ? "text-lg md:text-xl" : "text-2xl"
            }`}
          >
            BALAG <span className="text-luxury-gold">STUDIOS</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex space-x-8 items-center z-10">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[10px] uppercase tracking-[0.15em] text-white/80 hover:text-luxury-gold transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* --- UX UPGRADE: MAGNETIC ENQUIRE BUTTON --- */}
            <Magnetic>
              <Link
                to="/enquire"
                className={`border border-luxury-gold text-luxury-gold uppercase tracking-[0.2em] hover:bg-luxury-gold hover:text-black transition-all duration-500 ${
                  scrolled
                    ? "px-5 py-2 text-[9px] rounded-full"
                    : "px-6 py-2 text-xs rounded-sm"
                }`}
              >
                Enquire
              </Link>
            </Magnetic>
          </div>

          {/* --- UX UPGRADE: MAGNETIC HAMBURGER ICON --- */}
          <Magnetic>
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden text-2xl text-white relative z-10 focus:outline-none hover:text-luxury-gold transition-colors cursor-pointer p-2"
            >
              <HiMenuAlt4 />
            </button>
          </Magnetic>
        </motion.nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-luxury-black origin-top z-[60] flex flex-col justify-center items-center overflow-hidden"
          >
            {/* --- UX UPGRADE: MAGNETIC CLOSE ICON --- */}
            <div className="absolute top-8 right-8 z-20">
              <Magnetic>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-4xl text-white hover:text-luxury-gold transition-colors p-4"
                >
                  <HiX />
                </button>
              </Magnetic>
            </div>

            {/* Dynamic Background Image Preview */}
            <div className="absolute inset-0 w-full h-full z-0">
              <AnimatePresence mode="wait">
                {hoveredIndex !== null && (
                  <motion.div
                    key={hoveredIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.25, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full bg-cover bg-center grayscale"
                    style={{
                      backgroundImage: `url(${links[hoveredIndex].image})`,
                    }}
                  />
                )}
              </AnimatePresence>
              <div className="absolute inset-0 bg-black/60 z-[1]" />
            </div>

            {/* Mobile Nav Links */}
            <motion.div
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col items-center gap-4 md:gap-6 z-10 w-full px-4"
            >
              {links.map((link, index) => (
                <div
                  key={link.name}
                  className="overflow-hidden"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <motion.div variants={linkVars}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl md:text-7xl font-serif text-white hover:text-luxury-gold transition-colors duration-300 italic md:not-italic hover:italic"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </div>
              ))}

              <div className="overflow-hidden mt-8">
                <motion.div variants={linkVars}>
                  <Link
                    to="/enquire"
                    onClick={() => setIsOpen(false)}
                    className="text-lg md:text-xl uppercase tracking-[0.3em] text-luxury-gold border-b border-luxury-gold pb-2 hover:text-white hover:border-white transition-colors"
                  >
                    Start Your Project
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
