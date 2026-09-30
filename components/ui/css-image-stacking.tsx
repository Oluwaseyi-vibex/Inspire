"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import { motion } from "motion/react";
import { AnimatedMarqueeHero } from "@/components/ui/animated-marquee-hero";
import { ContentWithIllustration } from "@/components/ui/content-with-illustration";
import { ImpactSection } from "@/components/ui/impact-section";
import { registerLenis, registerNavigator, scrollToSection } from "@/lib/scroll";

/** Exposes the root Lenis instance for animated anchor scrolling + deep links. */
let didHandleInitialHash = false;

function LenisRegistrar() {
  const lenis = useLenis();
  const router = useRouter();
  useEffect(() => {
    registerLenis(lenis ?? null);
    registerNavigator((href) => router.push(href));
    // One-time deep-link handling: useLenis callbacks fire on every scroll,
    // so this must NOT live in one — it would yank the user back each scroll.
    if (lenis && !didHandleInitialHash) {
      didHandleInitialHash = true;
      const hash = window.location.hash.replace(/^#/, "");
      if (hash && document.getElementById(hash)) {
        setTimeout(() => scrollToSection(hash), 100);
      }
    }
  }, [lenis, router]);
  return null;
}

export default function CssImageStacking() {

  return (
    <ReactLenis root options={{ duration: 0.8 }}>
      <LenisRegistrar />
      <main className="bg-white">

        <AnimatedMarqueeHero
          tagline="19th Inspired Niger Delta Schools Conference • Nov 11–14, 2026 • Yenagoa"
          title={
            <>
              <span className="block">Values Re-orientation:</span>
              <span className="block">Hope for a Better Nigeria</span>
            </>
          }
          description="Over 45,000 students, teens and parents from 700+ schools across the nine Niger Delta states. Preliminaries October 12–30 — Grand Converge in Yenagoa."
          ctaText="Join the Conference"
          images={[
            "/inspire/gallery/2024/1.png",
            "/inspire/gallery/2024/3.png",
            "/inspire/gallery/2024/6.png",
            "/inspire/gallery/2024/7.png",
            "/inspire/gallery/2024/8.png",
            "/inspire/gallery/2024/10.png",
            "/inspire/gallery/2021/1.png",
            "/inspire/gallery/2021/2.png",
            "/inspire/gallery/2021/3.png",
            "/inspire/gallery/2019/1.png",
            "/inspire/gallery/2018/1.png",
            "/inspire/gallery/2017/1.png",
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
            iconSrc="/logo-white.png"
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
                Preliminaries tour nine states from October 12th to 30th, 2026, featuring essay writing and speech presentations on issues that matter — from oil theft and spillage to tech skills and &ldquo;My Niger Delta Dream&rdquo;. Finalists converge November 11th–14th in Yenagoa for three inspiring days of exhibitions, panel discussions, concerts and awards. All are welcome to be part of it.
              </p>
            </motion.div>
          </div>
        </section>

        <ImpactSection />

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
