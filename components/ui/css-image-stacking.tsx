"use client";
import { ReactLenis } from "lenis/react";
import { motion } from "motion/react";
import { AnimatedMarqueeHero } from "@/components/ui/animated-marquee-hero";
import { ContentWithIllustration } from "@/components/ui/content-with-illustration";

export default function CssImageStacking() {

  return (
    <ReactLenis root options={{ duration: 0.8 }}>
      <main className="bg-white">

        <AnimatedMarqueeHero
          tagline="19th Inspired Niger Delta Schools Conference • Nov 11–14, 2026 • Yenagoa"
          title="Values Re-orientation: Hope for a Better Nigeria"
          description="Over 45,000 students, teens and parents from 700+ schools across the nine Niger Delta states. Preliminaries October 12–30 — Grand Converge in Yenagoa. Strictly by invitation."
          ctaText="Join the 2026 Conference"
          images={[
            "/inspire/gallery/2024/2.png",
            "/inspire/gallery/2021/4.png",
            "/inspire/gallery/2024/9.png",
            "/inspire/gallery/2024/5.png",
            "/inspire/5.png",
            "/inspire/6.png",
            "/inspire/7.png",
            "/inspire/8.png",
            "/inspire/9.png",
            "/inspire/10.png",
            "/inspire/11.png",
            "/inspire/12.png",
          ]}
        />

        <section id="about" className="w-full bg-white py-12 md:py-16 px-6 md:px-12" data-nav-bg="light">
          <ContentWithIllustration
            title="An Insight into Inspire Nigeria Child"
            highlightedText="Inspire"
            paragraphs={[
              "The Nigerian society we experience today is far removed from the aspirations and dreams of its founding visionaries. In the Niger Delta, the plight of the Nigerian child paints a grim picture of what the future may hold if urgent action is not taken.",
              "The Inspire Nigeria Child Project emerges as a beacon of hope — a consciously designed platform for values re-orientation, guiding adolescents toward positive choices, cultural pride, and self-actualization.",
              "At the 19th Grand Converge in Yenagoa, over 45,000 students, teens and their parents from more than 700 schools across the nine Niger Delta states will gather under one theme: Values Re-orientation — the hope for a better Nigeria.",
            ]}
            imageSrc="/about-illustration.jpg"
            imageAlt="Illustration of students learning together"
            iconSrc="/logo.svg"
            iconAlt="Inspire Nigeria Child logo"
          />

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-6 mb-6"
            >
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 md:p-8">
                <h3 className="text-2xl font-semibold font-display mb-3 text-neutral-900">Our Mission</h3>
                <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                  Establish a platform for children to challenge societal norms that perpetuate negative influences. Empower kids to serve as ambassadors and lifestyle models, inspiring and educating their peers.
                </p>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 md:p-8">
                <h3 className="text-2xl font-semibold font-display mb-3 text-neutral-900">Our Vision</h3>
                <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                  Reorient the Nigerian child to counteract the negative influences they encounter daily — shaping moral standards and life awareness at the critical adolescent stage, before choices become regrets.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-neutral-900 rounded-xl p-6 md:p-8 text-white"
            >
              <h3 className="text-xl font-semibold font-display mb-3">The 19th Grand Converge — Yenagoa 2026</h3>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                Preliminaries tour nine states from October 12th to 30th, 2026, featuring essay writing and speech presentations on issues that matter — from oil theft and spillage to tech skills and &ldquo;My Niger Delta Dream&rdquo;. Finalists converge November 11th–14th in Yenagoa for three inspiring days of exhibitions, panel discussions, concerts and awards. Access is strictly by invitation.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="gallery" className="w-full bg-neutral-50 py-24 px-6 md:px-12" data-nav-bg="light">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold font-display mb-12 text-center text-neutral-900"
            >
              Our Impact
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Students, Teens & Parents", value: "45,000+" },
                { label: "Schools Across the Region", value: "700+" },
                { label: "Niger Delta States", value: "9" },
                { label: "Anniversary Edition", value: "19th" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: 0.2 * i }}
                  className="text-center bg-white border border-neutral-200 rounded-xl p-6 shadow-sm"
                >
                  <p className="text-3xl md:text-4xl font-bold font-display text-[#d80f12]">{stat.value}</p>
                  <p className="text-neutral-600 text-sm mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* <footer className="group bg-background" data-nav-bg="light">
          <h1 className="text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-linear-to-r from-neutral-400 to-neutral-800 bg-clip-text text-transparent transition-all ease-linear">
            INSPIRE
          </h1>
          <div className="bg-background h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full"></div>
        </footer> */}
      </main>
    </ReactLenis>
  );
}
