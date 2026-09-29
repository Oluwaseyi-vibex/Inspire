"use client";
import { ReactLenis } from "lenis/react";
import { motion } from "motion/react";
import { AnimatedMarqueeHero } from "@/components/ui/animated-marquee-hero";

export default function CssImageStacking() {

  return (
    <ReactLenis root options={{ duration: 0.8 }}>
      <main className="bg-background">
        <div className="gradient-overlay" style={{ background: "linear-gradient(to right, #3e0f13 37%, #d80f12)" }} />

        <AnimatedMarqueeHero
          tagline="Inspire Nigeria Child Project"
          title="Empowering Every Child to Shine"
          description="Accessible, engaging, and impactful learning experiences for children in the Niger Delta."
          ctaText="Support the Project"
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

        <section id="about" className="text-foreground w-full bg-background py-24 px-6 md:px-12" data-nav-bg="light">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold font-display mb-4"
            >
              About Us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-white/80 text-base md:text-lg leading-relaxed mb-6"
            >
              Your Support is Really Powerful. Every act of support helps shape accessible, engaging, and impactful learning experiences for children in the Niger Delta.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-12 mb-12"
            >
              <div>
                <h3 className="text-2xl font-semibold font-display mb-3">Our Mission</h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  Establish a platform for children to challenge societal norms that perpetuate negative influences. Empower kids to serve as ambassadors and lifestyle models, inspiring and educating their peers.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold font-display mb-3">Our Vision</h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  The Inspire Nigeria Child Project emerges as a beacon of hope. This initiative is a consciously designed platform aimed at reorienting the Nigerian child to counteract the negative influences they encounter daily. The project addresses the critical developmental stages of adolescence, a period where moral standards and life awareness are shaped.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/5 rounded-xl p-6 md:p-8"
            >
              <h3 className="text-xl font-semibold font-display mb-3">Background</h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                The Niger Delta schools conference, themed "Values reorientation: the hope for a better Nigeria," is set to bring together students from across the region to discuss key issues facing their communities and the nation as a whole. As part of the conference, students will be writing essays and giving speech presentations on a number of important sub-topics. These presentations will not only allow students to showcase their knowledge and research skills, but also to engage in critical thinking about the pressing issues facing their communities.
              </p>
              <p className="text-white/60 text-sm md:text-base leading-relaxed mt-4">
                One of the key sub-topics that students will be focusing on is oil theft and the impact of oil subsidy removal on the Nigerian economy. This issue is of critical importance to the Niger Delta region, which is home to a significant portion of Nigeria's oil reserves. By studying and discussing this issue, students will be able to better understand the complexities of the country's oil economy and the challenges that come with it. They will also have the opportunity to propose potential solutions to address these issues and promote sustainable development in the region.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="gallery" className="text-foreground w-full bg-background py-24 px-6 md:px-12" data-nav-bg="light">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold font-display mb-12 text-center"
            >
              Our Impact
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "People Reached", value: "2,597+" },
                { label: "Volunteer", value: "1,945+" },
                { label: "Children Inspired", value: "10M+" },
                { label: "Members", value: "100+" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: 0.2 * i }}
                  className="text-center bg-white/5 rounded-xl p-6"
                >
                  <p className="text-3xl md:text-4xl font-bold font-display text-white">{stat.value}</p>
                  <p className="text-white/60 text-sm mt-2">{stat.label}</p>
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
