"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";

export function LiquidButton({
  children,
  className,
  ...props
}: React.ComponentProps<"button"> & { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 250, damping: 29, mass: 0.45 });
  const py = useSpring(my, { stiffness: 250, damping: 29, mass: 0.45 });

  const rotateX = useTransform(my, [-1, 1], [5, -5]);
  const rotateY = useTransform(mx, [-1, 1], [-5, 5]);
  const opacity = useTransform(px, [0, 0.5, 1], [0, 0.5, 0.8]);
  const opacity2 = useTransform(py, [0, 0.5, 1], [0, 0.5, 0.8]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
    setMouseX(e.clientX);
    setMouseY(e.clientY);
  }, [mx, my]);

  useEffect(() => {
    if (!hovered) {
      mx.set(0);
      my.set(0);
    }
  }, [hovered, mx, my]);

  return (
    <motion.button
      ref={btnRef}
      className={`relative overflow-hidden rounded-lg px-8 py-3.5 font-semibold text-sm text-white backdrop-blur-md transition-all duration-300 ${className}`}
      style={{
        background: hovered
          ? "linear-gradient(150deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05) 42%, rgba(255,255,255,0.2))"
          : "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.2)",
        backdropFilter: "blur(4px) saturate(1.1)",
        WebkitBackdropFilter: "blur(4px) saturate(1.1)",
        boxShadow: pressed
          ? "inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(255,255,255,0.1)"
          : hovered
          ? "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 1px rgba(255,255,255,0.2)"
          : "inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 1px rgba(255,255,255,0.1)",
        transformPerspective: 900,
        rotateX,
        rotateY,
      }}
      animate={{ scale: pressed ? 0.97 : hovered ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 125, damping: 25, mass: 0.65 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); mx.set(0); my.set(0); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseMove={handleMouseMove}
      {...(props as any)}
    >
      {/* Liquid gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-red-900/10 to-red-900/30 bg-[length:200%_200%] animate-[liquid_3s_ease-in-out_infinite]" />

      {/* Shine reflection */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse 70px 36px at ${mouseX - (btnRef.current?.getBoundingClientRect().left || 0)}px ${mouseY - (btnRef.current?.getBoundingClientRect().top || 0)}px, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 35%, rgba(255,255,255,0) 78%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Edge light rim */}
      <div className="absolute inset-0 rounded-lg" style={{
        boxShadow: hovered
          ? "inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(255,255,255,0.2), inset 5px 0 8px -7px rgba(0,0,0,0.4), inset -5px 0 8px -7px rgba(0,0,0,0.3)"
          : "inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(255,255,255,0.08)",
      }} />

      {/* Hover glow */}
      {hovered && (
        <div className="absolute inset-0 rounded-lg bg-white/5 pointer-events-none animate-pulse" />
      )}

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
