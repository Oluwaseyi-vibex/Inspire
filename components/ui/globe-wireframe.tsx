"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";

interface GlobeWireframeProps {
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  graticuleColor?: string;
  graticuleOpacity?: number;
  sphereOutlineColor?: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableInteraction?: boolean;
  showGraticule?: boolean;
}

type CountryFeatures = d3.ExtendedFeatureCollection;

const ATLAS_URLS = [
  "/data/countries-110m.json",
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
];

/**
 * Lightweight wireframe globe. Rotation lives in a ref and the SVG is redrawn
 * imperatively — no React re-render per animation frame.
 */
export default function GlobeWireframe({
  className = "aspect-square w-full",
  strokeColor = "currentColor",
  strokeWidth = 0.6,
  graticuleColor = "currentColor",
  graticuleOpacity = 0.12,
  sphereOutlineColor = "currentColor",
  autoRotate = true,
  autoRotateSpeed = 0.45,
  enableInteraction = true,
  showGraticule = true,
}: GlobeWireframeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const rotationRef = useRef<[number, number]>([0, 0]);
  const draggingRef = useRef(false);
  const lastPointerRef = useRef<[number, number]>([0, 0]);
  const visibleRef = useRef(false);
  const [features, setFeatures] = useState<CountryFeatures | null>(null);
  const [size, setSize] = useState(0);
  const [ready, setReady] = useState(false);

  const propsRef = useRef({
    strokeColor,
    strokeWidth,
    graticuleColor,
    graticuleOpacity,
    sphereOutlineColor,
    showGraticule,
  });

  const draw = useCallback(() => {
    const svg = svgRef.current;
    if (!svg || !features || size === 0) return;
    const p = propsRef.current;

    const svgSel = d3.select(svg);
    svgSel.selectAll("*").remove();

    const projection = d3
      .geoOrthographic()
      .scale((size / 2) * 0.9)
      .translate([size / 2, size / 2])
      .rotate([rotationRef.current[0], rotationRef.current[1]])
      .precision(0.1);
    const path = d3.geoPath(projection);

    if (p.showGraticule && p.graticuleOpacity > 0) {
      const graticulePath = path(d3.geoGraticule10());
      if (graticulePath) {
        svgSel
          .append("path")
          .attr("d", graticulePath)
          .attr("fill", "none")
          .attr("stroke", p.graticuleColor)
          .attr("stroke-width", 1)
          .attr("opacity", p.graticuleOpacity);
      }
    }

    svgSel
      .selectAll(".country")
      .data(features.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", (d) => path(d as d3.GeoPermissibleObjects) ?? "")
      .attr("fill", "none")
      .attr("stroke", p.strokeColor)
      .attr("stroke-width", p.strokeWidth);

    const sphere = path({ type: "Sphere" } as d3.GeoPermissibleObjects);
    if (sphere) {
      svgSel
        .append("path")
        .attr("d", sphere)
        .attr("fill", "none")
        .attr("stroke", p.sphereOutlineColor)
        .attr("stroke-width", 1)
        .attr("opacity", 0.8);
    }
  }, [features, size]);

  const drawRef = useRef(draw);

  // Load atlas data (self-hosted first, CDN fallback).
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      for (const url of ATLAS_URLS) {
        try {
          const response = await fetch(url);
          if (!response.ok) continue;
          const topology = (await response.json()) as Parameters<
            typeof feature
          >[0];
          const collection = feature(
            topology,
            "countries"
          ) as unknown as CountryFeatures;
          if (!cancelled) {
            setFeatures(collection);
            setReady(true);
          }
          return;
        } catch {
          continue;
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Measure container (square) + track visibility.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const updateSize = () => {
      const width = container.clientWidth || 0;
      setSize((prev) => (prev === width ? prev : width));
    };
    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    visibilityObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  // Redraw when data, size, or style props change.
  useEffect(() => {
    draw();
  }, [draw]);

  // Sync latest values for imperative callbacks (rAF loop, drag handlers).
  useEffect(() => {
    propsRef.current = {
      strokeColor,
      strokeWidth,
      graticuleColor,
      graticuleOpacity,
      sphereOutlineColor,
      showGraticule,
    };
    drawRef.current = draw;
    autoRotateRef.current = { autoRotate, autoRotateSpeed };
  });

  // Auto-rotate loop: mutates the ref and redraws imperatively (no setState).
  const autoRotateRef = useRef({ autoRotate, autoRotateSpeed });
  useEffect(() => {
    let frame: number | null = null;
    const tick = () => {
      const { autoRotate: rotate, autoRotateSpeed: speed } =
        autoRotateRef.current;
      if (rotate && visibleRef.current && !draggingRef.current) {
        rotationRef.current[0] = (rotationRef.current[0] + speed) % 360;
        drawRef.current();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!enableInteraction) return;
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    lastPointerRef.current = [event.clientX, event.clientY];
  };

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!draggingRef.current || !enableInteraction) return;
    const dx = event.clientX - lastPointerRef.current[0];
    const dy = event.clientY - lastPointerRef.current[1];
    lastPointerRef.current = [event.clientX, event.clientY];
    const [lon, lat] = rotationRef.current;
    rotationRef.current = [
      lon + dx * 0.5,
      Math.max(-90, Math.min(90, lat - dy * 0.5)),
    ];
    drawRef.current();
  };

  const endDrag = () => {
    draggingRef.current = false;
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <svg
        ref={svgRef}
        width={size || undefined}
        height={size || undefined}
        viewBox={size ? `0 0 ${size} ${size}` : undefined}
        role="img"
        aria-label="Rotating wireframe globe. Drag to explore."
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="h-auto w-full transition-opacity duration-1000"
        style={{
          cursor: enableInteraction ? "grab" : "default",
          opacity: ready && size > 0 ? 1 : 0,
          touchAction: enableInteraction ? "none" : "auto",
        }}
      />
    </div>
  );
}
