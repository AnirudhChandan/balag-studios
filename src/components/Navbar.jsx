import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-luxury-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-serif text-white tracking-widest">
          BALAG <span className="text-luxury-gold">STUDIOS</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm uppercase tracking-widest hover:text-luxury-gold transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/enquire"
            className="px-6 py-2 border border-luxury-gold text-luxury-gold text-sm uppercase tracking-widest hover:bg-luxury-gold hover:text-black transition-all duration-300"
          >
            Enquire
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl"
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-luxury-black border-b border-white/10 md:hidden flex flex-col items-center py-10 space-y-6"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg uppercase tracking-widest hover:text-luxury-gold"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/enquire"
              onClick={() => setIsOpen(false)}
              className="px-8 py-3 border border-luxury-gold text-luxury-gold uppercase tracking-widest"
            >
              Enquire
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
