"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { handleHashClick } from "@/lib/scroll";

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

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit normal-case items-center justify-center rounded-lg border-[0.1px] border-white/25 bg-black/30 backdrop-blur-md p-3 px-6"
    >
      <li className="relative z-10 block cursor-pointer mr-12">
        <Link href="/">
          <Image src="/logo.svg" alt="Inspire" width={80} height={80} className="rounded-xl" />
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
