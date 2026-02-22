import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const rawShots = [
  "/images/gallery1.jpeg",
  "/images/gallery2.jpeg",
  "/images/gallery3.jpeg",
  "/images/gallery4.jpeg",
  "/images/gallery5.jpeg",
  "/images/gallery6.jpeg",
];

const ContactSheet = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const selectedIndex = 2;

  return (
    <section className="bg-white text-black py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-red-600">
              The Process
            </h3>
            <h2 className="text-5xl md:text-7xl font-serif leading-none text-black">
              We Don't Take <br /> Photos.
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-lg text-gray-600 font-serif italic">
              "We curate moments. Out of a thousand clicks, we find the one
              split-second where the soul reveals itself."
            </p>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-100 p-4 border border-gray-300"
        >
          {rawShots.map((src, i) => (
            <div key={i} className="relative aspect-[4/5] overflow-hidden">
              <motion.img
                src={src}
                className={`w-full h-full object-cover transition-all duration-700 ${i === selectedIndex ? "grayscale-0" : "grayscale opacity-60"}`}
              />
              {i === selectedIndex && (
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M 10,10 C 30,5 70,5 90,10 C 95,30 95,70 90,90 C 70,95 30,95 10,90 C 5,70 5,30 10,10"
                      fill="none; stroke: red; stroke-width: 2;"
                      stroke="red"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSheet;
