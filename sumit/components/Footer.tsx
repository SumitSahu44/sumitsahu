"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [timeString, setTimeString] = useState("");

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

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/SumitSahu44" },
    { name: "LinkedIn", url: "https://linkedin.com/in/sumitsahu44" },
    { name: "Email", url: "mailto:sumitsahu5328@gmail.com" },
  ];

  return (
    <footer className="relative bg-[#050505] text-white pt-28 pb-12 px-6 md:px-20 overflow-hidden border-t border-white/5">
      {/* Subtle Ambient Backlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#ff8c00] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Section 1: Clean & Elegant Call To Action --- */}
        <div className="mb-20">
          <span className="text-[#ff8c00] font-mono text-xs tracking-[0.25em] uppercase block mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white/90 leading-tight max-w-4xl">
            Have a project in mind? <br />
            <a 
              href="mailto:sumitsahu5328@gmail.com" 
              className="text-[#ff8c00] hover:text-[#ff4500] transition-colors duration-300 font-sans font-bold underline decoration-[#ff8c00]/30 hover:decoration-[#ff4500]/50"
            >
              Let's work together.
            </a>
          </h2>
        </div>

        {/* Minimal Divider */}
        <div className="w-full h-[1px] bg-white/10 mb-16" />

        {/* --- Section 2: Info & Directory Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 mb-20">
          
          {/* Brand & Live Info Column */}
          <div className="flex flex-col justify-between h-full space-y-8 md:space-y-0">
            <div className="space-y-4">
              <span className="text-2xl font-sans font-semibold text-white tracking-tighter block">
                Sumit <span className="text-[#ff8c00] font-sans font-bold not-italic">SAHU</span>
              </span>
              <p className="text-gray-500 text-xs leading-relaxed max-w-xs font-light">
                MERN Stack Developer & Team Lead crafting performance-optimized web architectures with design precision.
              </p>
            </div>

            {/* Availability & Location Time */}
            <div className="space-y-2 pt-6 md:pt-0">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
                  Indore, IN — {timeString || "00:00:00"} IST
                </span>
              </div>
              <span className="inline-block text-[9px] font-mono tracking-wider bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 uppercase font-semibold">
                Available for roles
              </span>
            </div>
          </div>

          {/* Directory Navigation Links */}
          <div className="flex flex-col">
            <h4 className="text-[#ff8c00] font-mono text-[10px] tracking-[0.25em] uppercase mb-6 font-bold">
              Navigation
            </h4>
            <div className="flex flex-col max-w-[200px]">
              {["Work", "Services", "About", "Experience"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase() === "services" ? "capabilities" : item.toLowerCase()}`}
                  className="group flex items-center justify-between py-2.5 border-b border-white/5 hover:border-[#ff8c00]/30 transition-colors duration-300 text-xs font-mono text-gray-400 hover:text-white"
                >
                  <span>{item}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#ff8c00] text-[8px]">
                    ●
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Social Links (Clean, arrow tilt on hover) */}
          <div className="flex flex-col">
            <h4 className="text-[#ff8c00] font-mono text-[10px] tracking-[0.25em] uppercase mb-6 font-bold">
              Social Channels
            </h4>
            <div className="flex flex-col max-w-[200px]">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-2.5 border-b border-white/5 hover:border-[#ff8c00]/30 transition-colors duration-300 text-xs font-mono text-gray-400 hover:text-white"
                >
                  <span>{link.name}</span>
                  <span className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-gray-500 group-hover:text-[#ff8c00]">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* --- Section 3: Copyright & Credits --- */}
        <div className="w-full pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} Sumit Sahu. All rights reserved.</p>
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/20">
            React 19 & Next.js 16
          </p>
        </div>

      </div>
    </footer>
  );
}