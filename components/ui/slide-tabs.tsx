"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

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
      className="relative mx-auto flex w-fit rounded-lg border-[0.2px] border-white/50 bg-black p-1"
    >
      <li className="relative z-10 block cursor-pointer">
        <Link href="/">
          <Image src="/logo.svg" alt="Inspire" width={80} height={80} className="rounded-xl" />
        </Link>
      </li>
      {["Home", "About", "Gallery", "Support", "Contact"].map((item) => (
        <Tab key={item} setPosition={setPosition}>{item}</Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition }: { children: string; setPosition: any }) => {
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
      {children}
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
