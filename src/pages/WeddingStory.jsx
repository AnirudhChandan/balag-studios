import { useParams, Link } from "react-router-dom";
import { locationData } from "../data/locations";
import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi";
import SEO from "../components/SEO";

const WeddingStory = () => {
  const { id } = useParams();
  const data = locationData.find((item) => item.id === id);

  if (!data)
    return (
      <div className="text-white pt-32 text-center">Wedding not found.</div>
    );

  return (
    <div className="bg-luxury-black min-h-screen text-white pt-24 pb-20 px-6">
      <SEO
        title={`${data.couple} | ${data.title}`}
        description={`See the full story of ${data.couple}'s wedding at ${data.title}. ${data.description}`}
        image={data.fullStory.images[0]} // Uses the first image of their story
        url={`/weddings/${id}`}
      />
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          to="/map"
          className="inline-flex items-center gap-2 text-luxury-gold uppercase tracking-widest text-xs mb-10 hover:opacity-80 transition-opacity"
        >
          <HiArrowLeft /> Back to Map
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <span className="border border-white/20 px-4 py-1 rounded-full text-xs uppercase tracking-widest text-gray-400">
            {data.title}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif mt-6 mb-4">
            {data.couple}
          </h1>
          <p className="text-xl text-gray-300 font-serif italic max-w-2xl mx-auto">
            "{data.description}"
          </p>
        </motion.div>

        {/* Story Content */}
        <div className="grid gap-12">
          {data.fullStory.images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[16/9] overflow-hidden rounded-sm"
            >
              <img
                src={img}
                alt="Wedding shot"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto leading-relaxed text-gray-400">
          <p>{data.fullStory.text}</p>
        </div>
      </div>
    </div>
  );
};

export default WeddingStory;
