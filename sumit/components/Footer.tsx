"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [timeString, setTimeString] = useState("");
  const nameRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nameRef, { once: true, margin: "-100px" });

  // Live Indore (IST) Clock
  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeString(new Date().toLocaleTimeString("en-US", options));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const topCols = [
    {
      lines: ["MERN Stack Developer", "Team Lead, Full-Stack"],
    },
    {
      lines: ["3+ Years of Experience", <a key="w" href="#work" className="underline underline-offset-2 hover:text-white transition-colors duration-200">View Work</a>],
    },
    {
      lines: ["Indore, Madhya Pradesh", `${currentYear}`],
    },
  ];

  return (
    <footer className="relative bg-[#080808] text-white overflow-hidden border-t border-white/[0.06]">

      {/* Subtle ambient gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-[#ff8c00] opacity-[0.025] blur-[120px] rounded-full pointer-events-none" />

      {/* ── TOP INFO ROW ── */}
      <div className="px-6 md:px-12 pt-14 pb-10 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/[0.06] relative z-10">
        {topCols.map((col, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            {col.lines.map((line, j) => (
              <span
                key={j}
                className={`font-mono text-[11px] md:text-xs tracking-[0.15em] uppercase ${
                  j === 0 ? "text-white/55" : "text-white/30"
                }`}
              >
                {line}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* ── GIANT NAME ── */}
      <div
        ref={nameRef}
        className="relative z-10 px-6 md:px-10 py-6 md:py-8 overflow-hidden border-b border-white/[0.06]"
      >
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-black uppercase leading-[0.88] tracking-[-0.03em] text-white select-none"
          style={{
            fontSize: "clamp(3.5rem, 13vw, 11rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Sumit Sahu
        </motion.h2>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="relative z-10 px-6 md:px-12 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">

        {/* Left: contact */}
        <div className="flex items-center gap-6">
          <a
            href="mailto:sumitsahu5328@gmail.com"
            className="font-mono text-[11px] tracking-[0.15em] uppercase text-white/45 hover:text-white transition-colors duration-300"
          >
            Contact
          </a>
          <a
            href="mailto:sumitsahu5328@gmail.com"
            className="font-mono text-[11px] tracking-[0.12em] text-white/30 hover:text-[#ff8c00] transition-colors duration-300"
          >
            sumitsahu5328@gmail.com
          </a>
        </div>

        {/* Center: live clock + availability */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/25">
            {timeString || "00:00:00"} IST
          </span>
        </div>

        {/* Right: copyright + socials */}
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/20">
            © {currentYear} Sumit Sahu
          </span>
          {[
            { label: "GitHub", href: "https://github.com/SumitSahu44" },
            { label: "LinkedIn", href: "https://linkedin.com/in/sumitsahu44" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/30 hover:text-white transition-colors duration-300"
            >
              {s.label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}