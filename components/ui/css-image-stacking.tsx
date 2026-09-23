"use client";
import { ReactLenis } from "lenis/react";
import { GradientBackground } from "./jade-sky";

export default function CssImageStacking() {
  return (
    <ReactLenis root>
      <main className="bg-background">
        <div className="wrapper">
          <section className="text-foreground h-screen w-full grid place-content-center sticky top-0 relative overflow-hidden">
            <GradientBackground className="absolute inset-0" />

            <div className="flex flex-col items-center gap-6 text-center">
              <p className="text-white/80 text-sm font-medium uppercase tracking-widest">Give Hope To Every Child</p>
              <h1 className="2xl:text-7xl text-5xl font-bold leading-tight font-display">Inspire Nigeria Child</h1>
              <p className="text-white/70 text-sm md:text-base max-w-xl leading-relaxed">We Seek Out World Changers And Difference Makers Around The Nigeria, And Inspire Them To Fulfil Their Unique Purpose.</p>
              <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
                <button className="px-8 py-3.5 cursor-pointer bg-white text-red-900 font-semibold rounded-lg hover:bg-red-50 transition-colors active:scale-95 text-sm">Support</button>
                <button className="px-8 py-3.5 cursor-pointer bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-colors active:scale-95 text-sm">Learn More</button>
              </div>
            </div>
          </section>
        </div>

        <section className="text-foreground w-full bg-background">
          <>
            <div className="sm:sticky sm:top-0 w-full">
              <figure className="w-full h-screen flex items-center justify-center">
                <img
                  src="/hero1.png"
                  alt=""
                  className="transition-all duration-300 w-[90%] h-full object-contain mx-auto"
                />
              </figure>
            </div>
            <div className="sm:sticky sm:top-2 w-full">
              <figure className="w-full h-screen flex items-center justify-center">
                <img
                  src="/hero2.png"
                  alt=""
                  className="transition-all duration-300 w-[90%] h-full object-contain mx-auto [box-shadow:0_-5px_16px_4px_rgba(0,0,0,0.8),0_2px_4px_-1px_rgba(0,0,0,0.06)]"
                />
              </figure>
            </div>
            <div className="sm:sticky sm:top-4 w-full">
              <figure className="w-full h-screen flex items-center justify-center">
                <img
                  src="/hero3.png"
                  alt=""
                  className="transition-all duration-300 w-[90%] h-full object-contain mx-auto"
                />
              </figure>
            </div>
            <div className="sm:sticky sm:top-6 w-full">
              <figure className="w-full h-screen flex items-center justify-center">
                <img
                  src="/hero4.png"
                  alt=""
                  className="transition-all duration-300 w-[90%] h-full object-contain mx-auto"
                />
              </figure>
            </div>
            <div className="sm:sticky sm:top-8 w-full">
              <figure className="w-full h-screen flex items-center justify-center">
                <img
                  src="/hero5.png"
                  alt=""
                  className="transition-all duration-300 w-[90%] h-full object-contain mx-auto"
                />
              </figure>
            </div>
            <div className="sm:sticky sm:top-12 w-full">
              <figure className="w-full h-screen flex items-center justify-center">
                <img
                  src="/hero6.png"
                  alt=""
                  className="transition-all duration-300 w-[90%] h-full object-contain mx-auto"
                />
              </figure>
            </div>
            <div className="sm:sticky sm:top-16 w-full">
              <figure className="w-full h-screen flex items-center justify-center">
                <img
                  src="/hero7.png"
                  alt=""
                  className="transition-all duration-300 w-[90%] h-full object-contain mx-auto"
                />
              </figure>
            </div>
          </>
        </section>

        <footer className="group bg-background">
          <h1 className="text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-linear-to-r from-neutral-400 to-neutral-800 bg-clip-text text-transparent transition-all ease-linear">
            INSPIRE
          </h1>
          <div className="bg-background h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full"></div>
        </footer>
      </main>
    </ReactLenis>
  );
}
