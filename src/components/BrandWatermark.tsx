import { motion } from "framer-motion";

export function BrandWatermark() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      style={{
        position: "fixed",
        left: "1rem",
        top: "50%",
        transform: "translateY(-50%) rotate(-90deg)",
        transformOrigin: "center center",
        zIndex: 5,
        pointerEvents: "none",
        fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif",
        fontSize: "clamp(0.7rem, 1.5vw, 1rem)",
        letterSpacing: "0.4em",
        color: "rgba(0,180,216,0.15)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
      className="hidden md:block"
    >
      APPÂT DU NORD
    </motion.div>
  );
}
