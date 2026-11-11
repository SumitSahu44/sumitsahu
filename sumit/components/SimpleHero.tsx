"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const specialties = [
  "Web Development",
  "Full-Stack Apps",
  "API Integration",
  "Web Animation",
];

export default function SimpleHero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-[#050505] md:min-h-[max(100svh,30rem)]">
      <div className="pointer-events-none absolute inset-0 scale-105">
        <Image
          src="/images/Hero-back.jpg"
          alt="Portrait of Sumit Sahu"
          fill
          priority
          sizes="100vw"
          className="select-none object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 md:from-black/50" />
        <div className="absolute inset-0 bg-black/10" />
      </div>
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative z-20 flex w-full flex-1 flex-col items-start justify-end gap-3 px-5 pt-20 pb-5 md:flex-row md:items-center md:justify-between md:gap-0 md:px-12 md:pb-20">
        <div className="w-full md:w-[60%]">
          <h1 className="flex flex-col text-[clamp(1.9rem,8vw,3.6rem)] leading-[0.85] font-black tracking-tighter text-white uppercase md:text-[clamp(2.65rem,8.4vw,8.8rem)]">
            <span className="block overflow-hidden py-1">
              <span className="hero-title-line inline-block">Full-Stack</span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="hero-title-line inline-block">Developer</span>
            </span>
          </h1>
        </div>

        <div className="hero-desc w-full text-left opacity-0 md:w-[35%] md:max-w-xs">
          <h2 className="mb-2 text-lg leading-tight font-bold tracking-tight text-white sm:text-2xl md:mb-4 md:text-3xl">
            I build websites and apps that feel fast and easy to use.
          </h2>
          <p className="text-xs leading-relaxed font-light text-white/75 md:text-sm">
            From responsive pages and smooth interactions to APIs and databases, I build the pieces your website needs to work end to end.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
        className="relative z-20 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:absolute md:inset-x-0 md:bottom-8 md:pb-0"
      >
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-2.5 px-5 md:flex md:items-end md:justify-between md:px-12">
          {specialties.map((title, index) => (
            <div key={title} className="flex flex-col text-left">
              <span className="mb-0.5 block font-mono text-[10px] font-black tracking-widest text-[#ff8c00] md:mb-1.5 md:text-xs">
                #0{index + 1}
              </span>
              <span className="text-[11px] font-semibold tracking-wider text-white/90 uppercase md:text-xs">
                {title}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
