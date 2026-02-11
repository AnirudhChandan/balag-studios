import { motion } from "framer-motion";
import { teamMembers } from "../data/team";
import RevealText from "./RevealText"; // Import

const About = () => {
  return (
    <div className="bg-luxury-black min-h-screen text-white pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section 1: The Philosophy */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-luxury-gold uppercase tracking-widest text-sm mb-6">
              Our Philosophy
            </h2>

            {/* UPDATED HEADLINE LOGIC */}
            <div className="font-serif text-5xl md:text-6xl mb-8 leading-tight">
              <RevealText text="We Don't Just Take Photos," />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="italic text-gray-400 block mt-2"
              >
                We Freeze Time.
              </motion.span>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              At BalaG Studios, we believe that a wedding is not just an event;
              it is a tapestry of fleeting emotions. Our approach is
              unobtrusive, candid, and deeply artistic. We step back and let the
              magic unfold, capturing the laughter, the tears, and the silent
              glances that define your love story.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Based in the spiritual heart of Rishikesh, we draw inspiration
              from the flow of the Ganges—constant, calm, and eternal. That is
              how we want your memories to feel.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[600px] w-full"
          >
            <div
              className="absolute inset-0 bg-cover bg-center rounded-sm grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1511285560982-1351cdeb9821?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")',
              }}
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-luxury-gold/30 -z-10" />
            <div className="absolute -top-6 -left-6 w-48 h-48 border border-white/10 -z-10" />
          </motion.div>
        </div>

        {/* Section 2: The Crew */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center"
        >
          <h2 className="text-luxury-gold uppercase tracking-widest text-sm mb-4 text-center">
            The Crew
          </h2>
          {/* UPDATED CREW TITLE */}
          <RevealText
            text="Meet the Storytellers"
            className="font-serif text-4xl text-center justify-center mb-16"
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="overflow-hidden mb-6 relative h-96">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="text-gray-300 text-sm italic">{member.bio}</p>
                </div>
              </div>
              <h3 className="text-2xl font-serif text-white">{member.name}</h3>
              <p className="text-luxury-gold text-sm uppercase tracking-widest mt-2">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
