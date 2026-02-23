import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"; // REMOVED Environment import
import SEO from "../components/SEO";
import Globe from "../components/Globe";

const Locations = () => {
  return (
    <div className="bg-luxury-black min-h-screen pt-24 pb-10 px-4 overflow-hidden flex flex-col items-center">
      <SEO
        title="Location Scout"
        description="Explore our interactive 3D map of real weddings across India. See how we capture love globally."
        url="/map"
      />

      {/* Header */}
      <div className="text-center mb-10 z-10 relative pointer-events-none">
        <h2 className="text-luxury-gold uppercase tracking-widest text-sm mb-2">
          Location Scout
        </h2>
        <h1 className="font-serif text-4xl md:text-5xl text-white">
          Explore Our Weddings
        </h1>
        <p className="text-gray-400 text-xs mt-2 uppercase tracking-wide">
          Drag to spin the globe. Click a gold pin to view the story.
        </p>
      </div>

      {/* THE 3D MAP CONTAINER */}
      <div className="relative w-full max-w-6xl aspect-square md:aspect-[16/9] bg-[#050505] rounded-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden cursor-grab active:cursor-grabbing">
        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-10" />

        {/* The React Three Fiber Engine */}
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          {/* THE FIX 2: Boosted ambient light to reveal the continents */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <directionalLight
            position={[-10, -10, -5]}
            intensity={1}
            color="#d4af37"
          />

          <Suspense fallback={null}>
            <Globe />
            {/* Removed the Environment tag entirely */}

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Locations;
