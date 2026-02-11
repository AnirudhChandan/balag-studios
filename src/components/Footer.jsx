import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-luxury-black border-t border-white/10 overflow-hidden pt-20 pb-10">
      {/* INFINITE MARQUEE */}
      <div className="relative flex overflow-x-hidden mb-20">
        <div className="animate-marquee whitespace-nowrap flex gap-10">
          <span className="text-8xl md:text-[10rem] font-serif text-white/5 uppercase opacity-30">
            BalaG Studios — Capturing Eternity —
          </span>
          <span className="text-8xl md:text-[10rem] font-serif text-white/5 uppercase opacity-30">
            BalaG Studios — Capturing Eternity —
          </span>
        </div>

        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-10">
          <span className="text-8xl md:text-[10rem] font-serif text-white/5 uppercase opacity-30">
            BalaG Studios — Capturing Eternity —
          </span>
          <span className="text-8xl md:text-[10rem] font-serif text-white/5 uppercase opacity-30">
            BalaG Studios — Capturing Eternity —
          </span>
        </div>
      </div>

      {/* STANDARD FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center md:text-left">
        <div>
          <h3 className="text-2xl font-serif text-white mb-4">BALAG STUDIOS</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Crafting timeless visual narratives for couples who believe in
            magic. Based in Rishikesh, available worldwide.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-luxury-gold uppercase tracking-widest text-xs mb-2">
            Links
          </h4>
          <Link
            to="/gallery"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Portfolio
          </Link>
          <Link
            to="/about"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            About Us
          </Link>
          <Link
            to="/enquire"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Contact
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-luxury-gold uppercase tracking-widest text-xs mb-2">
            Connect
          </h4>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Instagram
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Vimeo
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Facebook
          </a>
        </div>
      </div>

      <div className="text-center mt-20 text-gray-600 text-[10px] uppercase tracking-widest">
        © 2026 BalaG Studios. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
