"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { handleHashClick } from "@/lib/scroll";
import { GradientBarsBackground } from "@/components/ui/gradient-bars-background";

// Props interface for the component
interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  ctaText: string;
  images: string[];
  className?: string;
}

// Reusable Button component styled like in the image
const ActionButton = ({ children }: { children: React.ReactNode }) => (
  <motion.a
    href="#about"
    onClick={(e) => handleHashClick(e, "#contact")}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="mt-8 inline-block px-8 py-3 rounded-full bg-white text-brand font-semibold shadow-lg transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
  >
    {children}
  </motion.a>
);

// Animation variants for the text content
const FADE_IN_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const MARQUEE_STYLES = `
@keyframes hero-marquee-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes hero-marquee-right {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}

.hero-marquee-track {
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.hero-marquee-paused:hover .hero-marquee-track {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .hero-marquee-track {
    animation: none;
  }
}
`;

const MARQUEE_PHRASES = [
  "Conquer Fear",
  "Secured Future",
  "Values Re-orientation",
  "700+ Schools",
  "9 States, One Stage",
  "Yenagoa 2026",
];

// The main hero component
export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  ctaText,
  images,
  className,
}) => {
  // Duplicate images for a seamless loop (translate -50% loops perfectly)
  const duplicatedImages = [...images, ...images];
  const reduceMotion = useReducedMotion();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MARQUEE_STYLES }} />
      <section
        className={cn(
          "relative w-full min-h-screen h-screen overflow-hidden bg-[linear-gradient(120deg,#af0000_0%,#c21114_35%,#fecb15_110%)] flex flex-col items-center justify-center text-center px-4 pt-28 pb-72 md:pb-80",
          className
        )}
      >
        {/*
      <GradientBarsBackground
        bars={28}
        direction="y"
        gradientFrom="rgba(175, 0, 0, 0.10)"
        gradientTo="rgba(254, 203, 21, 0.10)"
        animation="wave"
        duration={7}
        intensity={28}
        stagger={0.18}
        className="absolute inset-0"
      />
      */}
        <motion.img
          src="/hero/Asset 4@2x.png"
          alt=""
          initial={reduceMotion ? false : { opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
          loading="eager"
          fetchPriority="high"
          aria-hidden="true"
          className="absolute top-18 md:top-0 right-0 z-[5] block h-[66vh] w-auto object-contain object-bottom opacity-50 [mask-image:linear-gradient(to_right,transparent,black_30%)] sm:h-[70vh] sm:opacity-70 lg:h-[95vh] lg:opacity-100"
        />
        <div className="z-10 flex flex-col items-center [text-shadow:0_2px_24px_rgba(0,0,0,0.28)]">
          {/* Tagline */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={FADE_IN_ANIMATION_VARIANTS}
            className="mb-4 inline-block px-4 py-1.5 text-sm font-medium text-white"
          >
            {tagline}
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white"
          >
            {typeof title === "string" ? (
              title.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={FADE_IN_ANIMATION_VARIANTS}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))
            ) : (
              title
            )}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial="hidden"
            animate="show"
            variants={FADE_IN_ANIMATION_VARIANTS}
            transition={{ delay: 0.5 }}
            className="mt-6 max-w-xl text-base md:text-lg text-white/85"
          >
            {description}
          </motion.p>

          {/* Call to Action Button */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={FADE_IN_ANIMATION_VARIANTS}
            transition={{ delay: 0.6 }}
          >
            <ActionButton>{ctaText}</ActionButton>
          </motion.div>
        </div>

        {/* Dual creative marquee: photos glide left, rally phrases drift right */}
        <div className="hero-marquee-paused absolute bottom-0 left-0 w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div
            aria-hidden="true"
            className="hero-marquee-track flex w-max items-end gap-4 pr-4"
            style={{ animationName: "hero-marquee-left", animationDuration: "45s" }}
          >
            {duplicatedImages.map((src, index) => (
              <div
                key={index}
                className="relative aspect-[3/4] h-36 md:h-48 flex-shrink-0"
                style={{
                  rotate: `${index % 2 === 0 ? -2 : 2}deg`,
                }}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover rounded-2xl shadow-xl ring-1 ring-white/30"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="overflow-hidden py-3">
            <div
              aria-hidden="true"
              className="hero-marquee-track flex w-max items-center"
              style={{ animationName: "hero-marquee-right", animationDuration: "60s" }}
            >
              {[0, 1].map((half) => (
                <div key={half} className="flex items-center">
                  {MARQUEE_PHRASES.map((phrase) => (
                    <span key={phrase} className="flex items-center">
                      <span className="whitespace-nowrap px-6 text-sm font-black uppercase tracking-[0.3em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.65)] md:text-base">
                        {phrase}
                      </span>
                      <span aria-hidden="true" className="text-sm text-white/90 md:text-base">
                        ✦
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AnimatedMarqueeHero;
