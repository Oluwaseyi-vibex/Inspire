"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { handleHashClick, scrollToSection } from "@/lib/scroll";

interface GalleryCategory {
  id: string;
  heading: string;
  label: string;
  images: string[];
}

const GALLERY_YEARS: GalleryCategory[] = [
  {
    id: "year-2024",
    heading: "2024",
    label: "2024 Edition",
    images: Array.from(
      { length: 16 },
      (_, i) => `/inspire/gallery/2024/${i + 1}.png`
    ),
  },
  {
    id: "year-2021",
    heading: "2021",
    label: "2021 Edition",
    images: Array.from(
      { length: 4 },
      (_, i) => `/inspire/gallery/2021/${i + 1}.png`
    ),
  },
  {
    id: "year-2019",
    heading: "2019",
    label: "2019 Edition",
    images: Array.from(
      { length: 3 },
      (_, i) => `/inspire/gallery/2019/${i + 1}.png`
    ),
  },
  {
    id: "year-2018",
    heading: "2018",
    label: "2018 Edition",
    images: Array.from(
      { length: 3 },
      (_, i) => `/inspire/gallery/2018/${i + 1}.png`
    ),
  },
  {
    id: "year-2017",
    heading: "2017",
    label: "2017 Edition",
    images: Array.from(
      { length: 3 },
      (_, i) => `/inspire/gallery/2017/${i + 1}.png`
    ),
  },
  {
    id: "extras",
    heading: "Extras",
    label: "Extras",
    images: Array.from(
      { length: 27 },
      (_, i) => `/inspire/extras/${i + 1}.png`
    ),
  },
];

interface LightboxState {
  images: string[];
  index: number;
  label: string;
}

function Lightbox({
  state,
  onClose,
  onNavigate,
}: {
  state: LightboxState;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const { images, index, label } = state;
  const total = images.length;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % total);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, total, onClose, onNavigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${label} photo viewer`}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        <p className="text-sm font-semibold text-white/80">
          {label} · {index + 1} / {total}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
        >
          <X aria-hidden="true" className="h-6 w-6" />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-14 pb-4 md:px-24"
        onClick={(e) => e.stopPropagation()}
      >
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => onNavigate((index - 1 + total) % total)}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:left-6"
            >
              <ChevronLeft aria-hidden="true" className="h-7 w-7" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate((index + 1) % total)}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:right-6"
            >
              <ChevronRight aria-hidden="true" className="h-7 w-7" />
            </button>
          </>
        )}
        <motion.figure
          key={images[index]}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="flex max-h-full items-center justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[index]}
            alt={`${label} conference photo ${index + 1}`}
            className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
          />
        </motion.figure>
      </div>
    </motion.div>
  );
}

function YearSection({
  galleryYear,
  onView,
}: {
  galleryYear: GalleryCategory;
  onView: (images: string[], index: number) => void;
}) {
  return (
    <section
      id={galleryYear.id}
      className="mx-auto max-w-6xl scroll-mt-28 px-6 py-14 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.3em] text-brand">
            {galleryYear.label}
          </p>
          <h2 className="font-display text-4xl font-bold text-neutral-900 md:text-5xl">
            {galleryYear.heading}
          </h2>
        </div>
        <p className="text-sm text-neutral-500">
          {galleryYear.images.length}{" "}
          {galleryYear.images.length === 1 ? "photo" : "photos"}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryYear.images.map((src, index) => (
          <motion.figure
            key={src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
          >
            <button
              type="button"
              onClick={() => onView(galleryYear.images, index)}
              aria-label={`View ${galleryYear.label} photo ${index + 1} fullscreen`}
              className="block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${galleryYear.label} conference photo ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40"
              >
                <span className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-white text-neutral-900 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <Expand className="h-5 w-5" />
                </span>
              </span>
            </button>
          </motion.figure>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => scrollToSection("gallery-years")}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 transition-colors hover:text-brand"
        >
          <ArrowUp aria-hidden="true" className="h-4 w-4" />
          Back to all years
        </button>
      </div>
    </section>
  );
}

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const openLightbox = useCallback((images: string[], index: number) => {
    const category = GALLERY_YEARS.find((c) => c.images === images);
    setLightbox({ images, index, label: category?.label ?? "Gallery" });
  }, []);

  const navigateLightbox = useCallback((index: number) => {
    setLightbox((prev) => (prev ? { ...prev, index } : prev));
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pt-32 text-center md:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-5xl font-bold text-neutral-900 md:text-6xl"
        >
          Our <span className="text-brand">Gallery</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg"
        >
          Moments from our journey, year by year.
        </motion.p>
      </div>

      <nav
        id="gallery-years"
        aria-label="Gallery years"
        className="mx-auto mt-10 flex max-w-6xl scroll-mt-28 flex-wrap justify-center gap-2 px-6 md:px-12"
      >
          {GALLERY_YEARS.map(({ id, heading }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleHashClick(e, `#${id}`)}
              className="rounded-full border border-neutral-200 bg-white px-5 py-1.5 text-sm font-semibold text-neutral-700 shadow-sm transition-colors hover:border-brand hover:text-brand"
            >
              {heading}
            </a>
          ))}
      </nav>

      <div className="pb-24">
        {GALLERY_YEARS.map((galleryYear) => (
          <YearSection
            key={galleryYear.id}
            galleryYear={galleryYear}
            onView={openLightbox}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            state={lightbox}
            onClose={closeLightbox}
            onNavigate={navigateLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
