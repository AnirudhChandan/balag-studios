import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HiMenuAlt4, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // NEW: State to track which image to show on hover
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    {
      name: "Home",
      path: "/",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Gallery",
      path: "/gallery",
      image:
        "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Testimonials",
      path: "/testimonials",
      image:
        "https://images.unsplash.com/photo-1522673607200-1645062cd495?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "About",
      path: "/about",
      image:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const menuVars = {
    initial: { scaleY: 0 },
    animate: {
      scaleY: 1,
      transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] },
    },
    exit: {
      scaleY: 0,
      transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const containerVars = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  const linkVars = {
    initial: {
      y: "30vh",
      transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] },
    },
    open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } },
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-luxury-black/80 backdrop-blur-md border-b border-white/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-[60]">
        <Link
          to="/"
          className="text-2xl font-serif text-white tracking-widest relative mix-blend-difference"
        >
          BALAG <span className="text-luxury-gold">STUDIOS</span>
        </Link>

        <div className="hidden md:flex space-x-12 items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm uppercase tracking-widest hover:text-luxury-gold transition-all duration-300 group relative"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            to="/enquire"
            className="px-6 py-2 border border-luxury-gold text-luxury-gold text-xs uppercase tracking-[0.2em] hover:bg-luxury-gold hover:text-black transition-all duration-500"
          >
            Enquire
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-white relative focus:outline-none"
        >
          {isOpen ? <HiX /> : <HiMenuAlt4 />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-luxury-black origin-top z-50 flex flex-col justify-center items-center overflow-hidden"
          >
            {/* NEW: DYNAMIC BACKGROUND IMAGE PREVIEW */}
            <div className="absolute inset-0 w-full h-full z-0">
              <AnimatePresence>
                {hoveredIndex !== null && (
                  <motion.div
                    key={hoveredIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.3, scale: 1 }} // Low opacity to keep text readable
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full bg-cover bg-center grayscale"
                    style={{
                      backgroundImage: `url(${links[hoveredIndex].image})`,
                    }}
                  />
                )}
              </AnimatePresence>
              {/* Fallback dark overlay */}
              <div className="absolute inset-0 bg-black/40 z-[1]" />
            </div>

            {/* MENU LINKS */}
            <motion.div
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col items-center gap-6 z-10"
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
                      className="text-5xl md:text-7xl font-serif text-white hover:text-luxury-gold transition-colors duration-300 italic md:not-italic hover:italic"
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
                    className="text-xl uppercase tracking-widest text-luxury-gold border-b border-luxury-gold pb-1 hover:text-white hover:border-white transition-colors"
                  >
                    Start Project
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
