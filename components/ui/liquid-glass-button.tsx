"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export function LiquidButton({
  children,
  className,
  ...props
}: React.ComponentProps<"button"> & { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <motion.button
      className={`relative overflow-hidden rounded-lg px-8 py-3.5 font-semibold text-sm border border-white/20 backdrop-blur-md text-white transition-all duration-300 bg-white/10 ${className}`}
      style={{
        background: hovered
          ? "linear-gradient(150deg, rgba(255,255,255,0.32), rgba(255,255,255,0.08) 42%, rgba(255,255,255,0.24))"
          : "rgba(255,255,255,0.1)",
        backdropFilter: hovered ? "blur(3px) saturate(1.08)" : "blur(2.5px) saturate(1.08)",
        WebkitBackdropFilter: hovered ? "blur(3px) saturate(1.08)" : "blur(2.5px) saturate(1.08)",
        boxShadow: hovered
          ? "0 1px 1px #00000028, 0 4px 5px -3px #00000038, 0 12px 20px -10px #00000035"
          : "inset 0 1px 1px #ffffffcc, inset 0 -1px 1px #ffffffaa, inset 1px 0 .5px #ffffffaa, inset -1px 0 .5px #00000020",
      }}
      animate={{
        scale: pressed ? 0.97 : hovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 125, damping: 25, mass: 0.65 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      {...(props as any)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 bg-[length:200%_200%] animate-[liquid_3s_ease-in-out_infinite]" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
