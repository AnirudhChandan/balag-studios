import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HiMenuAlt4, HiX } from "react-icons/hi"; // Changed to MenuAlt4 for a cooler icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect Scroll to toggle "Glass" mode
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "About", path: "/about" },
  ];

  // Animation Variants for Mobile Menu
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

  const linkVars = {
    initial: {
      y: "30vh",
      transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] },
    },
    open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } },
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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-luxury-black/80 backdrop-blur-md border-b border-white/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-serif text-white tracking-widest z-50 relative mix-blend-difference"
        >
          BALAG <span className="text-luxury-gold">STUDIOS</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12 items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm uppercase tracking-widest hover:text-luxury-gold transition-all duration-300 relative group"
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

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-white z-50 relative focus:outline-none"
        >
          {isOpen ? <HiX /> : <HiMenuAlt4 />}
        </button>
      </div>

      {/* FULL SCREEN MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-luxury-black origin-top flex flex-col justify-center items-center z-40"
          >
            <motion.div
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col items-center gap-6"
            >
              {links.map((link) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.div variants={linkVars}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-5xl font-serif text-white hover:text-luxury-gold transition-colors"
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
                    className="text-xl uppercase tracking-widest text-luxury-gold border-b border-luxury-gold pb-1"
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
