import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSun,
  HiClock,
  HiGlobeAlt,
  HiSparkles,
  HiAdjustments,
} from "react-icons/hi";
import SunCalc from "suncalc";

// --- DATA: Locations with Coordinates & Timezones ---
const globalLocations = [
  {
    name: "Rishikesh, India",
    lat: 30.0869,
    lng: 78.2676,
    timezone: "Asia/Kolkata",
  },
  {
    name: "Udaipur, India",
    lat: 24.5854,
    lng: 73.7125,
    timezone: "Asia/Kolkata",
  },
  { name: "Goa, India", lat: 15.2993, lng: 74.124, timezone: "Asia/Kolkata" },
  { name: "London, UK", lat: 51.5074, lng: -0.1278, timezone: "Europe/London" },
  {
    name: "Paris, France",
    lat: 48.8566,
    lng: 2.3522,
    timezone: "Europe/Paris",
  },
  {
    name: "New York, USA",
    lat: 40.7128,
    lng: -74.006,
    timezone: "America/New_York",
  },
  {
    name: "Santorini, Greece",
    lat: 36.3932,
    lng: 25.4615,
    timezone: "Europe/Athens",
  },
  {
    name: "Bali, Indonesia",
    lat: -8.4095,
    lng: 115.1889,
    timezone: "Asia/Makassar",
  },
  {
    name: "Cape Town, SA",
    lat: -33.9249,
    lng: 18.4241,
    timezone: "Africa/Johannesburg",
  },
  {
    name: "Sydney, Australia",
    lat: -33.8688,
    lng: 151.2093,
    timezone: "Australia/Sydney",
  },
  { name: "Custom Location", lat: 0, lng: 0, timezone: "UTC" }, // Triggers manual input
];

// --- HELPER: Format Time for Specific Timezone ---
const formatTimeForZone = (dateObj, timezone) => {
  if (!dateObj || isNaN(dateObj)) return "--:--";

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: timezone,
  }).format(dateObj);
};

// Helper to get decimal hour (0-24) from a Date object in a specific timezone
// (Needed for the slider and background gradient logic)
const getDecimalHour = (dateObj, timezone) => {
  if (!dateObj) return 12;
  const parts = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: timezone,
  }).formatToParts(dateObj);

  const h = parseInt(parts.find((p) => p.type === "hour").value, 10);
  const m = parseInt(parts.find((p) => p.type === "minute").value, 10);
  return h + m / 60;
};

const GoldenHourOracle = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedLocIndex, setSelectedLocIndex] = useState(0);

  // Manual Input State
  const [manualLat, setManualLat] = useState(30.0869);
  const [manualLng, setManualLng] = useState(78.2676);

  const selectedLocation = globalLocations[selectedLocIndex];
  const isCustom = selectedLocIndex === globalLocations.length - 1;

  // 1. Calculate Solar Times using SunCalc
  // SunCalc returns times in local machine time, but they represent the correct absolute moment.
  // We will convert them to the destination timezone for display.
  const solarTimes = useMemo(() => {
    const queryDate = new Date(date);
    // Set time to noon to avoid edge cases with timezone shifts crossing midnight
    queryDate.setHours(12, 0, 0, 0);

    const lat = isCustom ? manualLat : selectedLocation.lat;
    const lng = isCustom ? manualLng : selectedLocation.lng;

    return SunCalc.getTimes(queryDate, lat, lng);
  }, [date, selectedLocIndex, manualLat, manualLng]);

  // 2. Extract Key Times (Sunset / Golden Hour Start)
  // We default to the selected location's timezone. For custom, we default to browser local (undefined).
  const targetTimezone = isCustom ? undefined : selectedLocation.timezone;

  const sunsetDecimal = getDecimalHour(solarTimes.sunset, targetTimezone);
  const goldenStartDecimal = getDecimalHour(
    solarTimes.goldenHour,
    targetTimezone,
  );

  // 3. Set Initial Simulation to Golden Hour Start
  // We use a state initialized with the function to avoid re-calc on every render,
  // but we update it via effect when data changes.
  const [simulatedHour, setSimulatedHour] = useState(17);

  // Background Gradients (24h)
  const getGradient = (hour) => {
    if (hour < 5) return "linear-gradient(to bottom, #020617, #1e1b4b)";
    if (hour < 10) return "linear-gradient(to bottom, #fde68a, #7dd3fc)";
    if (hour < 15) return "linear-gradient(to bottom, #38bdf8, #f0f9ff)";
    // Transition to Golden Hour
    if (hour < goldenStartDecimal)
      return "linear-gradient(to bottom, #fdba74, #fed7aa)";
    // GOLDEN HOUR
    if (hour >= goldenStartDecimal && hour < sunsetDecimal + 0.5)
      return "linear-gradient(to bottom, #fb923c, #be185d)";
    // Blue Hour
    if (hour >= sunsetDecimal + 0.5 && hour < sunsetDecimal + 1.5)
      return "linear-gradient(to bottom, #4f46e5, #312e81)";
    return "linear-gradient(to bottom, #0f172a, #000000)";
  };

  // Sync simulation slider when location/date changes
  useMemo(() => {
    setSimulatedHour(goldenStartDecimal);
  }, [goldenStartDecimal]);

  // Display Helper for the Big Clock
  const formatSimulationTime = (decimalHour) => {
    const h = Math.floor(decimalHour);
    const m = Math.floor((decimalHour - h) * 60);
    const ampm = h >= 12 ? "PM" : "AM";
    const dispH = h % 12 || 12;
    const dispM = m < 10 ? `0${m}` : m;
    return `${dispH}:${dispM} ${ampm}`;
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden text-black transition-all duration-1000 ease-in-out font-sans">
      {/* 1. DYNAMIC BACKGROUND */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ background: getGradient(simulatedHour) }}
        transition={{ duration: 0.8 }}
      />

      <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24 grid lg:grid-cols-12 gap-12 items-center h-full">
        {/* LEFT PANEL */}
        <div className="lg:col-span-5 bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl text-white">
          <div className="mb-8 border-b border-white/10 pb-6">
            <h3 className="flex items-center gap-2 text-luxury-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
              <HiSparkles /> Scientific Planner
            </h3>
            <h1 className="text-4xl md:text-5xl font-serif leading-tight">
              Golden Hour <br /> Oracle
            </h1>
          </div>

          <div className="space-y-6">
            {/* Location Select */}
            <div className="relative group">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 block">
                Destination
              </label>
              <div className="relative">
                <HiGlobeAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gold text-xl" />
                <select
                  value={selectedLocIndex}
                  onChange={(e) => setSelectedLocIndex(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white appearance-none focus:outline-none focus:border-luxury-gold transition-colors cursor-pointer hover:bg-white/10 font-serif text-lg"
                >
                  {globalLocations.map((loc, i) => (
                    <option key={loc.name} value={i} className="text-black">
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Manual Coordinates Input */}
            <AnimatePresence>
              {isCustom && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-2 gap-4 overflow-hidden"
                >
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 mb-1 block">
                      Latitude
                    </label>
                    <input
                      type="number"
                      value={manualLat}
                      onChange={(e) => setManualLat(parseFloat(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-luxury-gold font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 mb-1 block">
                      Longitude
                    </label>
                    <input
                      type="number"
                      value={manualLng}
                      onChange={(e) => setManualLng(parseFloat(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-luxury-gold font-mono text-sm"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Date Select */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 block">
                Wedding Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-luxury-gold transition-colors font-mono uppercase tracking-wide cursor-pointer hover:bg-white/10"
              />
            </div>

            {/* DATA DISPLAY */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-luxury-gold/10 border border-luxury-gold/20 p-4 rounded-2xl">
                <p className="text-luxury-gold text-[10px] uppercase tracking-widest mb-1">
                  Golden Start
                </p>
                <div className="text-xl md:text-2xl font-serif">
                  {formatTimeForZone(solarTimes.goldenHour, targetTimezone)}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">
                  Sunset
                </p>
                <div className="text-xl md:text-2xl font-serif text-gray-300">
                  {formatTimeForZone(solarTimes.sunset, targetTimezone)}
                </div>
              </div>
            </div>

            {/* Timezone Indicator */}
            <div className="text-right">
              <span className="text-[9px] uppercase tracking-widest text-white/30 border border-white/10 px-2 py-1 rounded-full">
                Timezone: {targetTimezone || "Local Browser Time"}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: THE SIMULATOR */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center text-center relative h-[600px]">
          {/* THE ORB (CSS Radial Gradient for Perfect Sphere) */}
          <motion.div
            animate={{
              y: (simulatedHour - 13) * 60,
              scale:
                simulatedHour > goldenStartDecimal - 1 &&
                simulatedHour < sunsetDecimal
                  ? 1.5
                  : 1,
              opacity: simulatedHour > sunsetDecimal + 1.5 ? 0 : 1,
            }}
            className="w-48 h-48 absolute top-0 pointer-events-none mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0) 70%)",
            }}
          />

          {/* Time Display */}
          <div className="relative z-10 mb-12">
            <div className="text-7xl md:text-9xl font-serif text-white drop-shadow-2xl">
              {formatSimulationTime(simulatedHour).split(" ")[0]}
            </div>
            <span className="text-xl text-white/60 uppercase tracking-[0.5em]">
              {formatSimulationTime(simulatedHour).split(" ")[1]}
            </span>
          </div>

          {/* Scrubber */}
          <div className="w-full max-w-lg relative z-10 group">
            <input
              type="range"
              min="8"
              max="22"
              step="0.05"
              value={simulatedHour}
              onChange={(e) => setSimulatedHour(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer outline-none slider-thumb-gold"
            />
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 mt-4 font-mono">
              <span>Morning</span>
              <span>Noon</span>
              <span>Golden</span>
              <span>Night</span>
            </div>
          </div>

          {/* Dynamic Advice Text */}
          <div className="absolute bottom-0 w-full h-24 flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              {simulatedHour < 15 && (
                <motion.div
                  key="noon"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/90 text-black px-6 py-3 rounded-full backdrop-blur-md shadow-xl"
                >
                  <p className="font-bold text-sm">
                    High Contrast. Stay Indoors.
                  </p>
                </motion.div>
              )}
              {simulatedHour >= 15 && simulatedHour < goldenStartDecimal && (
                <motion.div
                  key="afternoon"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/90 text-black px-6 py-3 rounded-full backdrop-blur-md shadow-xl"
                >
                  <p className="font-bold text-sm">
                    Softening. Good for Arrivals.
                  </p>
                </motion.div>
              )}
              {simulatedHour >= goldenStartDecimal &&
                simulatedHour <= sunsetDecimal + 0.2 && (
                  <motion.div
                    key="golden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1.1 }}
                    exit={{ opacity: 0 }}
                    className="bg-luxury-gold text-black px-8 py-4 rounded-full shadow-[0_0_40px_rgba(212,175,55,0.6)] border border-white/50"
                  >
                    <p className="font-serif italic text-lg">
                      ✨ Perfect Light. Vows & Portraits.
                    </p>
                  </motion.div>
                )}
              {simulatedHour > sunsetDecimal + 0.2 && (
                <motion.div
                  key="blue"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-indigo-900/90 text-white px-6 py-3 rounded-full backdrop-blur-md shadow-xl border border-white/20"
                >
                  <p className="font-bold text-sm">
                    Blue Hour. Ambient & Moody.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoldenHourOracle;
