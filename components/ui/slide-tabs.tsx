"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { goToSection, handleHashClick } from "@/lib/scroll";

export const SlideTabsExample = () => {
  return (
    <div className="bg-neutral-100 py-20 w-full min-h-screen">
      <SlideTabs />
    </div>
  );
};

export const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const goMobile = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      // Let the menu close first so layout is stable when measuring.
      requestAnimationFrame(() => goToSection(href.replace(/^#/, "")));
    }
  };

  return (
    <>
      {/* Desktop pill bar */}
      <ul
        onMouseLeave={() => {
          setPosition((pv) => ({
            ...pv,
            opacity: 0,
          }));
        }}
        className="relative mx-auto hidden w-fit normal-case items-center justify-center rounded-lg border-[0.1px] border-white/25 bg-black/30 backdrop-blur-md p-2 px-4 md:flex lg:p-3 lg:px-6"
      >
        <li className="relative z-10 block cursor-pointer mr-6 lg:mr-12">
          <Link href="/" aria-label="Inspire home">
            <Image src="/logo.svg" alt="Inspire" width={80} height={80} className="h-12 w-12 rounded-xl lg:h-16 lg:w-16" />
          </Link>
        </li>
        {["Home", "About", "Gallery", "Contact"].map((item) => (
          <Tab key={item} setPosition={setPosition} href={item === "Home" ? "/" : item === "Gallery" ? "/gallery" : `#${item.toLowerCase()}`}>{item}</Tab>
        ))}


        <Link href="#contact" onClick={(e) => handleHashClick(e, "#contact")} className="ml-4 cursor-pointer uppercase rounded-sm bg-[#d80f12] backdrop-blur-md px-4 py-1 text-xs text-white transition-all hover:bg-[#D80F12]/80 hover:text-white md:px-6 md:py-1.5 md:text-sm">
          Support
        </Link>

        <Cursor position={position} />
      </ul>

      {/* Mobile bar + dropdown */}
      <div className="w-full md:hidden">
        <div className="flex items-center justify-between rounded-2xl border-[0.1px] border-white/25 bg-black/40 py-2 pl-3 pr-2 backdrop-blur-md">
          <Link href="/" aria-label="Inspire home" className="flex items-center">
            <Image src="/logo.svg" alt="Inspire" width={44} height={44} className="h-11 w-11 rounded-xl" />
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              aria-label="Mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-2 overflow-hidden rounded-2xl border-[0.1px] border-white/25 bg-black/70 p-2 backdrop-blur-xl"
            >
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "#about" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault();
                      goMobile(item.href);
                    } else {
                      setMenuOpen(false);
                    }
                  }}
                  className="block min-h-[48px] rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  goMobile("#contact");
                }}
                className={cn(
                  "mt-1 block min-h-[48px] rounded-xl bg-[#d80f12] px-4 py-3",
                  "text-center text-sm font-semibold uppercase tracking-widest text-white",
                  "transition-colors hover:bg-[#D80F12]/80"
                )}
              >
                Support
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const Tab = ({ children, setPosition, href }: { children: string; setPosition: any; href: string }) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-2 py-1 text-[10px] uppercase text-white mix-blend-difference md:px-4 md:py-2 md:text-xs"
    >
      <Link
        href={href}
        onClick={href.startsWith("#") ? (e) => handleHashClick(e, href) : undefined}
      >
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-white md:h-12"
    />
  );
};
export default SlideTabs;
