"use client";
import { ReactLenis } from "lenis/react";

export default function CssImageStacking() {
  return (
    <ReactLenis root>
      <main className="bg-background">
        <div className="wrapper">
          <section className="text-foreground h-screen w-full bg-background grid place-content-center sticky top-0">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
              CSS Sticky Properties for <br /> Stacking Cards. Scroll down! 👇
            </h1>
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
            ui-layout
          </h1>
          <div className="bg-background h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full"></div>
        </footer>
      </main>
    </ReactLenis>
  );
}
