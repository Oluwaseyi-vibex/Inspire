"use client";

import { motion } from "motion/react";
import { handleHashClick } from "@/lib/scroll";

interface GalleryYear {
  year: string;
  label: string;
  images: string[];
}

const GALLERY_YEARS: GalleryYear[] = [
  {
    year: "2024",
    label: "2024 Edition",
    images: Array.from(
      { length: 16 },
      (_, i) => `/inspire/gallery/2024/${i + 1}.png`
    ),
  },
  {
    year: "2021",
    label: "2021 Edition",
    images: Array.from(
      { length: 4 },
      (_, i) => `/inspire/gallery/2021/${i + 1}.png`
    ),
  },
  {
    year: "2019",
    label: "2019 Edition",
    images: Array.from(
      { length: 3 },
      (_, i) => `/inspire/gallery/2019/${i + 1}.png`
    ),
  },
  {
    year: "2018",
    label: "2018 Edition",
    images: Array.from(
      { length: 3 },
      (_, i) => `/inspire/gallery/2018/${i + 1}.png`
    ),
  },
  {
    year: "2017",
    label: "2017 Edition",
    images: Array.from(
      { length: 3 },
      (_, i) => `/inspire/gallery/2017/${i + 1}.png`
    ),
  },
];

function YearSection({ galleryYear }: { galleryYear: GalleryYear }) {
  return (
    <section
      id={`year-${galleryYear.year}`}
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
            {galleryYear.year}
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
            className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${galleryYear.label} conference photo ${index + 1}`}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

export default function GalleryPage() {
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
        aria-label="Gallery years"
        className="sticky top-16 z-30 mt-10 border-y border-neutral-200 bg-white/85 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2 px-6 py-3 md:px-12">
          {GALLERY_YEARS.map(({ year }) => (
            <a
              key={year}
              href={`#year-${year}`}
              onClick={(e) => handleHashClick(e, `#year-${year}`)}
              className="rounded-full border border-neutral-200 px-5 py-1.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-brand hover:text-brand"
            >
              {year}
            </a>
          ))}
        </div>
      </nav>

      <div className="pb-24">
        {GALLERY_YEARS.map((galleryYear) => (
          <YearSection key={galleryYear.year} galleryYear={galleryYear} />
        ))}
      </div>
    </div>
  );
}
