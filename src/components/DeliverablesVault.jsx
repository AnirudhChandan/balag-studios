import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealText from "./RevealText";

const items = [
  {
    id: 1,
    title: "Heirloom Album",
    subtitle: "Handcrafted in Italy",
    detail:
      "A 40-page layflat album bound in premium linen or Italian leather. Archival quality paper that lasts generations.",
    img: "https://images.unsplash.com/photo-1544333323-537245bb4211?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Cinematic Film",
    subtitle: "4K Narrative Edit",
    detail:
      "Not just a music video. A 20-minute documentary feature film with professional sound design, color grading, and licensed music.",
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "The Master Gallery",
    subtitle: "Cloud Infinite",
    detail:
      "Your private, password-protected digital vault. Unlimited full-resolution downloads for you and your guests for 10 years.",
    img: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Same-Day Teaser",
    subtitle: "Instant Gratification",
    detail:
      "A 60-second high-energy reel edited and delivered during your reception. Perfect for that immediate Instagram announcement.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
  },
];

const DeliverablesVault = () => {
  const [active, setActive] = useState(items[0]); // Default to first item

  return (
    <section className="bg-luxury-black py-32 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-luxury-gray/5 -skew-x-12 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-luxury-gold uppercase tracking-[0.3em] text-xs mb-4"
          >
            The Deliverables
          </motion.h3>
          <RevealText
            text="Your Legacy, Packaged."
            className="font-serif text-4xl md:text-6xl text-white"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-16 items-start">
          {/* LEFT: THE INTERACTIVE LIST */}
          <div className="w-full md:w-1/2 space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setActive(item)}
                className="group relative border-b border-white/10 py-8 cursor-pointer transition-colors duration-500 hover:border-luxury-gold/50"
              >
                <div className="flex justify-between items-baseline z-10 relative">
                  <div>
                    <h2
                      className={`text-3xl md:text-4xl font-serif transition-all duration-500 ${
                        active.id === item.id
                          ? "text-white translate-x-4"
                          : "text-white/40 group-hover:text-white/80"
                      }`}
                    >
                      {item.title}
                    </h2>
                    <p
                      className={`text-xs uppercase tracking-widest mt-2 transition-all duration-500 ${
                        active.id === item.id
                          ? "text-luxury-gold translate-x-4 opacity-100"
                          : "text-gray-500 opacity-0 h-0 overflow-hidden"
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  </div>

                  <span
                    className={`font-mono text-xs transition-colors duration-500 ${
                      active.id === item.id
                        ? "text-luxury-gold"
                        : "text-white/20"
                    }`}
                  >
                    0{item.id}
                  </span>
                </div>

                {/* Hover indicator dot */}
                {active.id === item.id && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-luxury-gold rounded-full"
                  />
                )}
              </div>
            ))}
          </div>

          {/* RIGHT: THE VISUALIZER VAULT */}
          <div className="w-full md:w-1/2 sticky top-32">
            <div className="relative aspect-[4/5] md:aspect-square rounded-sm overflow-hidden border border-white/10 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <img
                    src={active.img}
                    alt={active.title}
                    className="w-full h-full object-cover opacity-60"
                  />

                  {/* Text Overlay inside the image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-10">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-luxury-gold font-serif text-3xl mb-4 italic">
                        "{active.subtitle}"
                      </h3>
                      <p className="text-gray-200 text-sm leading-relaxed max-w-sm font-sans">
                        {active.detail}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Decorative Frame Elements */}
              <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-white/30" />
              <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-white/30" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-white/30" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-white/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverablesVault;
