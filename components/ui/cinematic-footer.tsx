"use client";

import * as React from "react";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";
import { handleHashClick, scrollToTopAnimated } from "@/lib/scroll";

// -------------------------------------------------------------------------
// 1. FOOTER STYLES (explicit dark palette — self-contained, no theme tokens)
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  font-family: var(--font-montserrat), sans-serif;
  -webkit-font-smoothing: antialiased;
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(216, 15, 18, 0.5)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(216, 15, 18, 0.8)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Subtle grid backdrop */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Brand-red aurora glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(216, 15, 18, 0.22) 0%,
    rgba(216, 15, 18, 0.08) 40%,
    transparent 70%
  );
}

/* Glass pill */
.footer-glass-pill {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%);
  box-shadow:
      0 10px 30px -10px rgba(0, 0, 0, 0.6),
      inset 0 1px 1px rgba(255, 255, 255, 0.12),
      inset 0 -1px 2px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: background 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

a.footer-glass-pill:hover,
button.footer-glass-pill:hover {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%);
  border-color: rgba(255, 255, 255, 0.22);
  box-shadow:
      0 20px 40px -10px rgba(0, 0, 0, 0.7),
      inset 0 1px 1px rgba(255, 255, 255, 0.2);
}

/* Giant outlined background text (stroke only — no gradient fill) */
.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.09);
}

@media (prefers-reduced-motion: reduce) {
  .animate-footer-breathe,
  .animate-footer-scroll-marquee,
  .animate-footer-heartbeat {
    animation: none;
  }
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC WRAPPER (motion-based, no GSAP)
// -------------------------------------------------------------------------
function Magnetic({
  children,
  className,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 16 });
  const springY = useSpring(y, { stiffness: 200, damping: 16 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.4);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const MARQUEE_PHRASES = [
  "Values Re-orientation",
  "Conquer Fear",
  "Secured Future",
  "700+ Schools",
  "9 States, One Stage",
];

function MarqueeRow() {
  return (
    <div className="flex items-center" aria-hidden="true">
      {MARQUEE_PHRASES.map((phrase) => (
        <span key={phrase} className="flex items-center">
          <span className="px-6">{phrase}</span>
          <span className="text-[#d80f12]">✦</span>
        </span>
      ))}
    </div>
  );
}

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end end"],
  });
  const giantY = useTransform(scrollYProgress, [0, 1], ["10vh", "0vh"]);
  const giantScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const giantOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const scrollToTop = () => {
    scrollToTopAnimated();
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/*
        Curtain-reveal wrapper: the fixed footer lives inside this clipped box,
        so it is only ever visible within these bounds as the page scrolls.
      */}
      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="cinematic-footer-wrapper fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-neutral-950 text-neutral-200">
          {/* Ambient light & grid */}
          <div className="footer-aurora animate-footer-breathe pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[80px]" />
          <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

          {/* Giant background text */}
          <motion.div
            style={
              reduceMotion
                ? undefined
                : { y: giantY, scale: giantScale, opacity: giantOpacity }
            }
            className="footer-giant-bg-text pointer-events-none absolute -bottom-[5vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
          >
            INSPIRE
          </motion.div>

          {/* 1. Diagonal marquee */}
          <div className="absolute left-0 top-12 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-white/10 bg-white/5 py-4 shadow-2xl backdrop-blur-md">
            <div className="animate-footer-scroll-marquee flex w-max text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 md:text-sm">
              <MarqueeRow />
              <MarqueeRow />
            </div>
          </div>

          {/* 2. Main center content */}
          <div className="relative z-10 mx-auto mt-20 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6">
            <motion.h2
              initial={reduceMotion ? false : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-4 text-center text-5xl font-black tracking-tighter text-white md:text-8xl"
            >
              See you in Yenagoa.
            </motion.h2>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="mb-12 text-center text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400 md:text-sm"
            >
              November 11–14, 2026 · Yenagoa
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="flex w-full flex-col items-center gap-6"
            >
              {/* Primary anchor pills */}
              <div className="flex w-full flex-wrap justify-center gap-4">
                <Magnetic disabled={reduceMotion ?? false}>
                  <a
                    href="#about"
                    onClick={(e) => handleHashClick(e, "#about")}
                    className="footer-glass-pill flex items-center gap-3 rounded-full px-10 py-5 text-sm font-bold text-white md:text-base"
                  >
                    Explore the Conference
                  </a>
                </Magnetic>
                <Magnetic disabled={reduceMotion ?? false}>
                  <a
                    href="#gallery"
                    onClick={(e) => handleHashClick(e, "#gallery")}
                    className="footer-glass-pill flex items-center gap-3 rounded-full px-10 py-5 text-sm font-bold text-white md:text-base"
                  >
                    Our Impact
                  </a>
                </Magnetic>
                <Magnetic disabled={reduceMotion ?? false}>
                  <a
                    href="#contact"
                    onClick={(e) => handleHashClick(e, "#contact")}
                    className="footer-glass-pill flex items-center gap-3 rounded-full px-10 py-5 text-sm font-bold text-white md:text-base"
                  >
                    Get in Touch
                  </a>
                </Magnetic>
              </div>

              {/* Event fact pills */}
              <div className="mt-2 flex w-full flex-wrap justify-center gap-3 md:gap-6">
                {["Nov 11–14, 2026", "Yenagoa", "19th Edition"].map((fact) => (
                  <span
                    key={fact}
                    className="footer-glass-pill rounded-full px-6 py-3 text-xs font-medium text-brand md:text-sm"
                  >
                    {fact}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 3. Bottom bar */}
          <div className="relative z-20 flex w-full flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:px-12">
            <div className="order-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-500 md:order-1 md:text-xs">
              © 2026 Inspire Nigeria Child Project. All rights reserved.
            </div>

            <div className="footer-glass-pill order-1 flex cursor-default items-center gap-2 rounded-full px-6 py-3 md:order-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 md:text-xs">
                Conquer Fear
              </span>
              <span
                aria-hidden="true"
                className="animate-footer-heartbeat text-sm text-[#d80f12] md:text-base"
              >
                ❤
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 md:text-xs">
                Secured Future
              </span>
            </div>

            <Magnetic
              disabled={reduceMotion ?? false}
              className="order-3"
            >
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="footer-glass-pill group flex h-12 w-12 items-center justify-center rounded-full text-neutral-400 hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </button>
            </Magnetic>
          </div>
        </footer>
      </div>
    </>
  );
}

export default CinematicFooter;
