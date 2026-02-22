import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { locationData } from "../data/locations";

const GLOBE_RADIUS = 2;

// The math to convert GPS coordinates to a 3D sphere
const getCoordinates = (lat, lng) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta));
  const z = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
  const y = GLOBE_RADIUS * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

// The Individual Glowing Pin Component
const Marker = ({ loc }) => {
  const pos = getCoordinates(loc.lat, loc.lng);
  const [hovered, setHovered] = useState(false);
  const markerRef = useRef(null);
  const navigate = useNavigate();

  // THE FIX: Use a deterministic offset based on the unique coordinates
  // This satisfies React's purity rules while keeping the pins out of sync
  const pulseOffset = loc.lat + loc.lng;

  // 60fps GPU animation for the pulsing effect
  useFrame(({ clock }) => {
    if (markerRef.current) {
      markerRef.current.scale.setScalar(
        1 + Math.sin(clock.elapsedTime * 4 + pulseOffset) * 0.2,
      );
    }
  });

  return (
    <group position={pos}>
      {/* 1. The Interactive Gold Core */}
      <mesh
        ref={markerRef}
        onPointerOver={(e) => {
          e.stopPropagation(); // Prevents hovering multiple pins at once
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

      {/* 2. The Transparent Glow Halo */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.3} />
      </mesh>

      {/* 3. The 3D UI Overlay (The Tooltip) */}
      <Html center zIndexRange={[100, 0]} style={{ pointerEvents: "none" }}>
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: -90, scale: 1 }} // Floats above the pin
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
  return (
    <group rotation={[0.3, -1.2, 0]}>
      {" "}
      {/* Rotated to face India by default */}
      {/* The Solid Dark Earth */}
      <Sphere args={[GLOBE_RADIUS, 64, 64]}>
        <meshStandardMaterial color="#0a0a0a" roughness={0.6} metalness={0.8} />
      </Sphere>
      {/* The Holographic Wireframe Grid */}
      <Sphere args={[GLOBE_RADIUS * 1.01, 32, 32]}>
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.05}
        />
      </Sphere>
      {/* Render all the pins */}
      {locationData.map((loc) => (
        <Marker key={loc.id} loc={loc} />
      ))}
    </group>
  );
};

export default Globe;
