import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Html, useTexture, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { locationData } from "../data/locations";

const GLOBE_RADIUS = 2;

// --- THE PERFECTED GPS MATH ---
const getCoordinates = (lat, lng) => {
  // THE GOLDILOCKS FIX:
  // -90 pushed it to Japan. +90 pushed it to Africa. 0 locks it perfectly onto India.
  const PIN_OFFSET = 0;

  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + PIN_OFFSET) * (Math.PI / 180);

  // Core Three.js Spherical to Cartesian conversion
  const x = -(GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta));
  const y = GLOBE_RADIUS * Math.cos(phi);
  const z = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
};

// The Individual Glowing Pin Component
const Marker = ({ loc }) => {
  const pos = getCoordinates(loc.lat, loc.lng);
  const [hovered, setHovered] = useState(false);
  const markerRef = useRef(null);
  const ringRef = useRef(null);
  const navigate = useNavigate();

  const pulseOffset = loc.lat + loc.lng;

  // 60fps GPU animation
  useFrame(({ clock }) => {
    // 1. Core Pulsing
    if (markerRef.current) {
      markerRef.current.scale.setScalar(
        1 + Math.sin(clock.elapsedTime * 4 + pulseOffset) * 0.2,
      );
    }
    // 2. The Sonar Ripple
    if (ringRef.current) {
      const t = (clock.elapsedTime * 0.5 + (pulseOffset % 1)) % 1;
      ringRef.current.scale.setScalar(1 + t * 4);
      ringRef.current.material.opacity = 0.6 * (1 - t);
    }
  });

  return (
    <group position={pos}>
      {/* The Interactive Gold Core */}
      <mesh
        ref={markerRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={() => {
          document.body.style.cursor = "auto";
          navigate(`/weddings/${loc.id}`);
        }}
      >
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#d4af37" />
      </mesh>

      {/* The Animated Sonar Ripple */}
      <mesh ref={ringRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial
          color="#d4af37"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      {/* The Tooltip */}
      <Html center zIndexRange={[100, 0]} style={{ pointerEvents: "none" }}>
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: -90, scale: 1 }}
              exit={{ opacity: 0, y: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-64 bg-black/90 border border-luxury-gold/30 rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md"
            >
              <div className="h-32 w-full bg-gray-800 relative">
                <img
                  src={loc.videoPreview}
                  alt="preview"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-luxury-gold font-serif text-lg leading-none mb-1">
                  {loc.couple}
                </h3>
                <p className="text-white/60 text-[10px] uppercase tracking-widest mb-2">
                  {loc.title}
                </p>
                <div className="text-xs text-gray-400 italic leading-tight">
                  "{loc.description}"
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Html>
    </group>
  );
};

// The Main Globe Component
const Globe = () => {
  const [earthMap, cloudsMap] = useTexture([
    "https://unpkg.com/three-globe/example/img/earth-night.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
  ]);

  const cloudsRef = useRef(null);

  useFrame(() => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <>
      <Stars
        radius={100}
        depth={50}
        count={4000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* --- INITIAL CAMERA FOCUS --- */}
      {/* The Y-axis rotation (-1.2) spins the globe so India directly faces the user on load */}
      <group rotation={[0.2, -1.2, 0]}>
        {/* The Solid Earth */}
        <Sphere args={[GLOBE_RADIUS, 64, 64]}>
          <meshBasicMaterial map={earthMap} color="#ffffff" />
        </Sphere>

        {/* The Clouds */}
        <Sphere args={[GLOBE_RADIUS * 1.01, 64, 64]} ref={cloudsRef}>
          <meshBasicMaterial
            map={cloudsMap}
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </Sphere>

        {/* The Gold Wireframe */}
        <Sphere args={[GLOBE_RADIUS * 1.005, 32, 32]}>
          <meshBasicMaterial
            color="#d4af37"
            wireframe
            transparent
            opacity={0.03}
          />
        </Sphere>

        {/* The Pins */}
        {locationData.map((loc) => (
          <Marker key={loc.id} loc={loc} />
        ))}
      </group>
    </>
  );
};

export default Globe;
