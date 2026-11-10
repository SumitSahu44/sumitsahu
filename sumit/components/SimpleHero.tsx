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
    <section className="original-hero relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#050505]">
      <div className="pointer-events-none absolute inset-0 scale-105">
        <Image
          src="/images/Hero-back.jpg"
          alt="Portrait of Sumit Sahu"
          fill
          priority
          sizes="100vw"
          className="select-none object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-black/10" />
      </div>
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative z-20 flex h-full w-full flex-col items-start justify-between gap-8 px-6 pt-20 pb-36 md:flex-row md:items-center md:gap-0 md:px-12 md:pb-0">
        <div className="w-full md:w-[60%]">
          <h1 className="flex flex-col text-[clamp(2.65rem,8.4vw,8.8rem)] leading-[0.85] font-black tracking-tighter text-white uppercase">
            <span className="block overflow-hidden py-1">
              <span className="hero-title-line inline-block">Full-Stack</span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="hero-title-line inline-block">Developer</span>
            </span>
          </h1>
        </div>

        <div className="hero-desc mt-auto w-full text-left opacity-0 md:mt-0 md:w-[35%] md:max-w-xs">
          <h2 className="mb-4 text-xl leading-tight font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
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
        className="absolute inset-x-0 bottom-8 z-20"
      >
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-5 px-6 md:flex md:items-end md:justify-between md:px-12">
          {specialties.map((title, index) => (
            <div key={title} className="flex flex-col text-left">
              <span className="mb-1.5 block font-mono text-[10px] font-black tracking-widest text-[#ff8c00] md:text-xs">
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
