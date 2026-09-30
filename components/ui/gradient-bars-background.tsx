"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const STYLES = `
@keyframes gb-pulse {
  0%, 100% { transform: scale(1); opacity: 0.65; }
  50% { transform: scale(1.08); opacity: 1; }
}

@keyframes gb-float-y {
  0%, 100% { transform: translateY(calc(var(--gb-intensity, 24px) * -1)); }
  50% { transform: translateY(var(--gb-intensity, 24px)); }
}

@keyframes gb-float-x {
  0%, 100% { transform: translateX(calc(var(--gb-intensity, 24px) * -1)); }
  50% { transform: translateX(var(--gb-intensity, 24px)); }
}

@keyframes gb-wave-y {
  0%, 100% { transform: translateY(calc(var(--gb-intensity, 24px) * -1)) scaleY(1); opacity: 0.55; }
  50% { transform: translateY(var(--gb-intensity, 24px)) scaleY(1.12); opacity: 1; }
}

@keyframes gb-wave-x {
  0%, 100% { transform: translateX(calc(var(--gb-intensity, 24px) * -1)) scaleX(1); opacity: 0.55; }
  50% { transform: translateX(var(--gb-intensity, 24px)) scaleX(1.12); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .gb-bar {
    animation: none !important;
  }
}
`;

export type GradientBarsAnimation = "pulse" | "float" | "wave" | "none";
export type GradientBarsDirection = "x" | "y";

interface GradientBarsBackgroundProps {
  /** How many bars render */
  bars?: number;
  /** Bar thickness in px */
  barWidth?: number;
  /** Bar length (any CSS length) */
  barHeight?: string;
  /** Lay bars out along the Y axis (vertical) or X axis (horizontal) */
  direction?: GradientBarsDirection;
  /** Gradient start color */
  gradientFrom?: string;
  /** Gradient end color */
  gradientTo?: string;
  /** Animation mode */
  animation?: GradientBarsAnimation;
  /** Animation duration in seconds */
  duration?: number;
  /** How far bars travel (px) for float/wave */
  intensity?: number;
  /** Per-bar animation offset in seconds (rippling effect) */
  stagger?: number;
  /** Base background behind the bars */
  backgroundColor?: string;
  className?: string;
}

function animationName(
  animation: GradientBarsAnimation,
  direction: GradientBarsDirection
): string | undefined {
  if (animation === "none") return undefined;
  if (animation === "pulse") return "gb-pulse";
  if (animation === "float") return direction === "y" ? "gb-float-y" : "gb-float-x";
  return direction === "y" ? "gb-wave-y" : "gb-wave-x";
}

/**
 * Fully animated, code-based gradient bars background.
 * Render it as an absolutely-positioned layer behind hero content.
 */
export const GradientBarsBackground: React.FC<GradientBarsBackgroundProps> = ({
  bars = 24,
  barWidth = 32,
  barHeight = "100%",
  direction = "y",
  gradientFrom = "rgba(216, 15, 18, 0.10)",
  gradientTo = "rgba(254, 203, 21, 0.10)",
  animation = "wave",
  duration = 6,
  intensity = 24,
  stagger = 0.15,
  backgroundColor = "transparent",
  className,
}) => {
  const vertical = direction === "y";
  const name = animationName(animation, direction);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none flex overflow-hidden",
          vertical ? "flex-row items-stretch justify-center" : "flex-col justify-center",
          className
        )}
        style={{ backgroundColor, gap: barWidth / 2 }}
      >
        {Array.from({ length: bars }).map((_, i) => (
          <div
            key={i}
            className="gb-bar shrink-0 grow rounded-full"
            style={
              {
                "--gb-intensity": `${intensity}px`,
                width: vertical ? barWidth : "100%",
                height: vertical ? barHeight : barWidth,
                background: vertical
                  ? `linear-gradient(180deg, transparent 0%, ${gradientFrom} 25%, ${gradientTo} 75%, transparent 100%)`
                  : `linear-gradient(90deg, transparent 0%, ${gradientFrom} 25%, ${gradientTo} 75%, transparent 100%)`,
                animationName: name,
                animationDuration: `${duration}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                // Negative delays so every bar is mid-motion on load.
                animationDelay:
                  name !== undefined ? `-${(i * stagger).toFixed(2)}s` : undefined,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
};

export default GradientBarsBackground;
