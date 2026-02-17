import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { HiArrowRight, HiCheck, HiOutlineArrowLeft } from "react-icons/hi";

// --- CONFIGURATION ---
const eventTypes = [
  {
    id: "wedding",
    label: "Wedding",
    img: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "prewedding",
    label: "Pre-Wedding",
    img: "https://images.unsplash.com/photo-1522673607200-1645062cd495?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "editorial",
    label: "Editorial / Fashion",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
  },
];

const vibes = [
  "Candid",
  "Cinematic",
  "Traditional",
  "Royal",
  "Intimate",
  "Grand Party",
  "Black & White",
  "Drone/Aerial",
];

const Enquire = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    eventType: "",
    selectedVibes: [],
    name: "",
    email: "",
    phone: "",
    date: "",
    location: "",
  });
  const [status, setStatus] = useState("idle");

  // --- HANDLERS ---
  const handleTypeSelect = (type) => {
    setFormData({ ...formData, eventType: type });
    setStep(2);
  };

  const toggleVibe = (vibe) => {
    const current = formData.selectedVibes;
    if (current.includes(vibe)) {
      setFormData({
        ...formData,
        selectedVibes: current.filter((v) => v !== vibe),
      });
    } else {
      setFormData({ ...formData, selectedVibes: [...current, vibe] });
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");

    // EMAIL CONFIG
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const finalMessage = `
      New Visual Inquiry:
      Type: ${formData.eventType}
      Vibe: ${formData.selectedVibes.join(", ")}
      
      Details:
      Name: ${formData.name}
      Date: ${formData.date}
      Location: ${formData.location}
      Phone: ${formData.phone}
      Email: ${formData.email}
    `;

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      message: finalMessage,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY).then(
      () => setStatus("success"),
      () => setStatus("error"),
    );
  };

  // --- ANIMATION VARIANTS ---
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "circOut" },
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.5, ease: "circIn" },
    }),
  };

  return (
    <section className="bg-luxury-black min-h-screen pt-24 pb-12 px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* PROGRESS HEADER */}
      <div className="w-full max-w-2xl mb-12 flex justify-between items-center text-xs uppercase tracking-widest text-gray-500">
        <button
          onClick={() => step > 1 && setStep(step - 1)}
          disabled={step === 1 || status === "success"}
          className="flex items-center gap-2 hover:text-luxury-gold disabled:opacity-30 transition-colors"
        >
          <HiOutlineArrowLeft /> Back
        </button>
        <div className="flex gap-2">
          <span className={step >= 1 ? "text-luxury-gold" : "text-gray-700"}>
            01
          </span>
          <span className="text-gray-700">/</span>
          <span className={step >= 2 ? "text-luxury-gold" : "text-gray-700"}>
            02
          </span>
          <span className="text-gray-700">/</span>
          <span className={step >= 3 ? "text-luxury-gold" : "text-gray-700"}>
            03
          </span>
        </div>
      </div>

      <div className="w-full max-w-4xl relative min-h-[500px]">
        <AnimatePresence mode="wait" custom={step}>
          {/* --- STEP 1: EVENT TYPE --- */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full text-center"
            >
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-12">
                What are we capturing?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {eventTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => handleTypeSelect(type.label)}
                    className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg border border-white/10 hover:border-luxury-gold transition-colors"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${type.img})` }}
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-serif text-white tracking-widest uppercase border border-white/30 px-6 py-3 bg-black/20 backdrop-blur-sm group-hover:bg-luxury-gold group-hover:text-black group-hover:border-luxury-gold transition-all">
                        {type.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* --- STEP 2: THE VIBE --- */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full text-center max-w-2xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                Define your Vibe
              </h2>
              <p className="text-gray-400 mb-12">Select as many as you like.</p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {vibes.map((vibe) => {
                  const isSelected = formData.selectedVibes.includes(vibe);
                  return (
                    <button
                      key={vibe}
                      onClick={() => toggleVibe(vibe)}
                      className={`px-6 py-3 rounded-full text-sm uppercase tracking-widest border transition-all duration-300 ${
                        isSelected
                          ? "bg-luxury-gold border-luxury-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                          : "bg-transparent border-white/20 text-gray-400 hover:border-white hover:text-white"
                      }`}
                    >
                      {vibe}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 text-white border-b border-luxury-gold pb-1 hover:text-luxury-gold transition-colors"
              >
                Next Step <HiArrowRight />
              </button>
            </motion.div>
          )}

          {/* --- STEP 3: CONTACT --- */}
          {step === 3 && (
            <motion.div
              key="step3"
              custom={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full max-w-xl mx-auto"
            >
              {status === "success" ? (
                <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <HiCheck className="text-black text-3xl" />
                  </div>
                  <h2 className="text-3xl font-serif text-white mb-2">
                    Request Received
                  </h2>
                  <p className="text-gray-400">
                    We'll reach out to {formData.email} shortly.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-4xl font-serif text-white mb-8 text-center">
                    Final Details
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-luxury-gold rounded-sm"
                      />
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-luxury-gold rounded-sm"
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-luxury-gold rounded-sm"
                    />
                    <div className="grid md:grid-cols-2 gap-6">
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-luxury-gold rounded-sm uppercase text-gray-400"
                      />
                      <input
                        type="text"
                        name="location"
                        placeholder="City / Venue"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-luxury-gold rounded-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-5 bg-luxury-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 mt-4"
                    >
                      {status === "submitting" ? "Sending..." : "Send Request"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Enquire;
