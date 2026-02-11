import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser"; // Import EmailJS
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";

const Enquire = () => {
  const form = useRef(); // Reference to the HTML form

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");

    // REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
    const SERVICE_ID = "service_poqiy8s";
    const TEMPLATE_ID = "template_sae8nkm";
    const PUBLIC_KEY = "XIlkFdMny_Pm27tvQ";

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      message: formData.message,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY).then(
      (result) => {
        console.log(result.text);
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", date: "", message: "" }); // Clear form
      },
      (error) => {
        console.log(error.text);
        setStatus("error");
      },
    );
  };

  return (
    <div className="bg-luxury-black min-h-screen flex items-center justify-center py-20 px-4 md:px-0">
      <div className="max-w-7xl w-full grid md:grid-cols-2 shadow-2xl overflow-hidden">
        {/* Left Side: Image & Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative hidden md:block min-h-[800px]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")',
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-0 left-0 p-12 text-white z-10">
              <h2 className="text-3xl font-serif mb-6">Let's Create Magic</h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center gap-4">
                  <HiOutlinePhone className="text-luxury-gold text-xl" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-4">
                  <HiOutlineMail className="text-luxury-gold text-xl" />
                  <span>hello@balagstudios.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <HiOutlineLocationMarker className="text-luxury-gold text-xl" />
                  <span>Rishikesh, Uttarakhand</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: The Form */}
        <div className="bg-luxury-gray/30 backdrop-blur-sm p-8 md:p-16 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-luxury-gold uppercase tracking-widest text-sm mb-2">
              Inquiry
            </h3>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-10">
              Tell Us Your Story
            </h1>

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8 p-4 bg-green-900/20 border border-green-500/30 rounded-lg"
              >
                <h3 className="text-xl font-serif text-green-400">
                  Message Sent!
                </h3>
                <p className="text-gray-300 text-sm">
                  We will be in touch shortly.
                </p>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg"
              >
                <h3 className="text-xl font-serif text-red-400">
                  Something went wrong.
                </h3>
                <p className="text-gray-300 text-sm">
                  Please email us directly at hello@balagstudios.com
                </p>
              </motion.div>
            )}

            <form ref={form} onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-gray-600 py-3 text-white focus:outline-none focus:border-luxury-gold transition-colors placeholder-gray-500"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-gray-600 py-3 text-white focus:outline-none focus:border-luxury-gold transition-colors placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-600 py-3 text-white focus:outline-none focus:border-luxury-gold transition-colors placeholder-gray-500"
                  />
                </div>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-600 py-3 text-white focus:outline-none focus:border-luxury-gold transition-colors text-gray-400"
                  />
                </div>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Tell us about your event (Venue, Style, Vision...)"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-gray-600 py-3 text-white focus:outline-none focus:border-luxury-gold transition-colors placeholder-gray-500 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="px-10 py-4 bg-luxury-gold text-black font-semibold uppercase tracking-widest hover:bg-white transition-colors duration-300 disabled:opacity-50"
              >
                {status === "submitting" ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Enquire;
