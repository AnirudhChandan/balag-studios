const GrainOverlay = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        // Using a highly compressed, static noise image instead of a live SVG
        backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px",
        opacity: 0.04, // Pure opacity, NO mix-blend-mode. This saves the GPU.
        transform: "translateZ(0)", // Hardware acceleration
      }}
    />
  );
};

export default GrainOverlay;
