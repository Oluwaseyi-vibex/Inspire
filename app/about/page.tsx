"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { handleHashClick } from "@/lib/scroll";

const CHAPTERS = [
  {
    date: "April 17, 2007",
    title: "The Birth of a Movement",
    body: "In Port Harcourt, Franklin and over 40 like-minded youths formally inaugurated the InspireNigeriaChild Initiative — then known as Deforce. Within the humble walls of a church, encouraged by Prophet Elijah Elijah and Rev. Mrs. Rachel Daramola, they built music, dance, and drama units, taking messages of hope, faith, and transformation to churches and streets.",
  },
  {
    date: "October 30, 2007",
    title: "A Mission to Revolutionize Education",
    body: "The Inspired Niger Delta Schools Conference launched at Raboni Hall, Port Harcourt — over 800 students, educators, parents, and stakeholders, with legendary actress Hilda Dokubo and the late Engr. Emmanuel Ugweri as guest speakers. Young people weren't just attendees but contributors: testifying, leading discussions, inspiring peers.",
  },
  {
    date: "The Why",
    title: "The Motivation Behind the Mission",
    body: "A belief in the boundless potential of children — addressing root causes, not symptoms. Creative expression gave youths a safe space to discover talent, build confidence, and find purpose. Those on the brink of despair found hope; those who had strayed into cultism and vice were guided back into the light.",
  },
  {
    date: "2026 · 19th Anniversary",
    title: "Celebrating Years of Impact",
    body: "From a church hall to a movement touching countless lives across the Niger Delta and beyond — producing bright young minds representing the region nationally and globally. Under Amb. Richard Franklin's leadership, the mission continues: revolutionizing education so every child shines.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[18vw] font-black leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(175,0,0,0.12)]"
        >
          INSPIRED
        </div>
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-32 md:grid-cols-2 md:gap-14 md:px-12 md:pt-40">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-brand"
            >
              Our Story · Since 2007
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl md:text-6xl"
            >
              A Vision to Transform Generations
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg"
            >
              Eighteen years ago, a spark ignited in the heart of a young
              leader in Port Harcourt — a call to action against cultism and
              social vices sweeping through secondary schools. That spark
              became the InspireNigeriaChild Initiative.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-brand-deep"
              >
                See the Journey <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <a
                href="#contact"
                onClick={(e) => handleHashClick(e, "#contact")}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-7 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:border-brand hover:text-brand"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="overflow-hidden rounded-[2.5rem] border border-brand/15 bg-gradient-to-b from-brand/10 via-brand/[0.04] to-transparent">
              <Image
                src="/hero/Asset 5@2x.png"
                alt="Amb. Richard Franklin, founder of the InspireNigeriaChild Initiative"
                width={1129}
                height={1043}
                priority
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full border border-neutral-200 bg-white px-6 py-2.5 text-center shadow-lg">
              <p className="text-sm font-bold text-neutral-900">
                Amb. Richard Franklin
              </p>
              <p className="text-xs text-neutral-500">Founder</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-brand">
            The Journey So Far
          </p>
          <h2 className="font-display text-4xl font-bold text-neutral-900 md:text-5xl">
            From a Spark to a Movement
          </h2>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-[19px] top-4 w-px bg-neutral-200 md:left-[23px]"
          />
          <div className="flex flex-col gap-8">
            {CHAPTERS.map((chapter, i) => (
              <motion.article
                key={chapter.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.05 }}
                className="relative pl-14 md:pl-16"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-[11px] top-7 h-4 w-4 rounded-full border-[3px] border-brand bg-white md:left-[15px] md:h-5 md:w-5"
                />
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                  <p className="mb-2 inline-block rounded-full bg-brand/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
                    {chapter.date}
                  </p>
                  <h3 className="mb-3 font-display text-2xl font-semibold text-neutral-900">
                    {chapter.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
                    {chapter.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Quote band */}
      <section className="bg-neutral-950 px-6 py-16 md:py-24">
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <blockquote className="font-display text-2xl font-semibold leading-snug text-white md:text-4xl">
            “One idea, nurtured with passion and purpose, can inspire a nation
            and change the world.”
          </blockquote>
          <figcaption className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.25em]">
            <span className="text-neutral-400">Conquer Fear</span>
            <span aria-hidden="true" className="text-[#d80f12]">
              ✦
            </span>
            <span className="text-neutral-400">Secured Future</span>
          </figcaption>
        </motion.figure>
      </section>

      {/* Gallery invite */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6 rounded-3xl border border-neutral-200 bg-neutral-50 px-6 py-12 text-center md:py-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand">
            19th Anniversary
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-bold text-neutral-900 md:text-4xl">
            View the journey through memories from selected editions
          </h2>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-brand-deep"
          >
            Browse the Gallery <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
