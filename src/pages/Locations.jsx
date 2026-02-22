import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { locationData } from "../data/locations";
import { HiLocationMarker } from "react-icons/hi";
import SEO from "../components/SEO";

const Locations = () => {
  const [hoveredLocation, setHoveredLocation] = useState(null);

  return (
    <div className="bg-luxury-black min-h-screen pt-24 pb-10 px-4 overflow-hidden flex flex-col items-center">
      <SEO
        title="Location Scout"
        description="Explore our interactive map of real weddings across India. See how we capture love in Rishikesh, Goa, Udaipur, and beyond."
        url="/map"
      />
      {/* Header */}
      <div className="text-center mb-10 z-10 relative">
        <h2 className="text-luxury-gold uppercase tracking-widest text-sm mb-2">
          Location Scout
        </h2>
        <h1 className="font-serif text-4xl md:text-5xl text-white">
          Explore Our Weddings
        </h1>
        <p className="text-gray-400 text-xs mt-2 uppercase tracking-wide">
          Click a pin to view the full story
        </p>
      </div>

      {/* THE MAP CONTAINER */}
      <div className="relative w-full max-w-6xl aspect-[16/9] bg-[#1a1a1a] rounded-xl border border-white/10 shadow-2xl overflow-hidden group">
        {/* 1. MAP IMAGE (Static Background) */}
        {/* Replace this URL with your actual stylized map image of Rishikesh */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity duration-500 group-hover:opacity-60"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=80")',
          }}
        />

        {/* Dark overlay to make pins pop */}
        <div className="absolute inset-0 bg-black/30" />

        {/* 2. THE PINS */}
        {locationData.map((loc) => (
          <Link to={`/weddings/${loc.id}`} key={loc.id}>
            <div
              className="absolute cursor-pointer"
              style={{ top: `${loc.lat}%`, left: `${loc.lng}%` }}
              onMouseEnter={() => setHoveredLocation(loc)}
              onMouseLeave={() => setHoveredLocation(null)}
            >
              {/* Pulsing Pin Effect */}
              <div className="relative flex items-center justify-center w-8 h-8 -translate-x-1/2 -translate-y-1/2">
                <span className="absolute w-full h-full bg-luxury-gold/50 rounded-full animate-ping" />
                <div className="relative w-3 h-3 bg-luxury-gold rounded-full shadow-[0_0_20px_rgba(212,175,55,0.8)] border border-white" />
              </div>
            </div>
          </Link>
        ))}

        {/* 3. HOVER PREVIEW MODAL (The "Shock") */}
        <AnimatePresence>
          {hoveredLocation && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute pointer-events-none z-20 w-64 bg-black/90 border border-luxury-gold/30 rounded-lg overflow-hidden shadow-2xl backdrop-blur-md"
              style={{
                // Simple logic to keep tooltip on screen:
                // If marker is on the right (>50%), show tooltip to the left.
                top: `${hoveredLocation.lat - 10}%`,
                left:
                  hoveredLocation.lng > 50
                    ? "auto"
                    : `${hoveredLocation.lng + 2}%`,
                right:
                  hoveredLocation.lng > 50
                    ? `${100 - hoveredLocation.lng + 2}%`
                    : "auto",
              }}
            >
              {/* Mini Video Loop */}
              <div className="h-32 w-full bg-gray-800 relative">
                <img
                  src={hoveredLocation.videoPreview}
                  alt="preview"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-luxury-gold font-serif text-lg leading-none mb-1">
                  {hoveredLocation.couple}
                </h3>
                <p className="text-white/60 text-[10px] uppercase tracking-widest mb-2">
                  {hoveredLocation.title}
                </p>
                <div className="text-xs text-gray-400 italic leading-tight">
                  "{hoveredLocation.description}"
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Locations;
