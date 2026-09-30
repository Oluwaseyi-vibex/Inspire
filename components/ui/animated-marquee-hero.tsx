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
    onClick={(e) => handleHashClick(e, "#about")}
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
    <section
      className={cn(
        "relative w-full min-h-screen h-screen overflow-hidden bg-[linear-gradient(135deg,#af0000_0%,#fecb15_100%)] flex flex-col items-center justify-center text-center px-4 pt-28 pb-64 md:pb-72",
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
        className="absolute top-0 right-0 z-[5] hidden h-[95vh] w-auto object-contain object-bottom [mask-image:linear-gradient(to_right,transparent,black_30%)] lg:block"
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
          className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
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
          className="mt-6 max-w-xl text-lg text-white/85"
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

      {/* Animated Image Marquee */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 md:h-2/5 [mask-image:linear-gradient(to_bottom,transparent,black_30%)] overflow-hidden">
        <motion.div
          className="flex gap-4 w-max pr-4 items-end h-full"
          animate={reduceMotion ? undefined : {
            x: ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: 40,
            repeat: Infinity,
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              aria-hidden={index >= images.length}
              className="relative aspect-[3/4] h-48 md:h-64 flex-shrink-0"
              style={{
                rotate: `${index % 2 === 0 ? -2 : 2}deg`,
              }}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover rounded-2xl shadow-xl"
                loading={index < 4 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedMarqueeHero;
