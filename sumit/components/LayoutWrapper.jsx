"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const LayoutWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const preloaderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 40);

    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: () => setLoading(false),
      });

      tl.to(".signature-svg", {
        filter: "drop-shadow(0px 0px 20px #ff8c00)",
        duration: 0.5,
      })
      .to(preloaderRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
        delay: 0.5,
      })
      .fromTo(".nav-container", {
        y: -100,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5")
      .fromTo(".nav-logo-sig", {
        scale: 5,
        x: "40vw",
        y: "40vh",
      }, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "expo.inOut",
      }, "-=1.2");
    }
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <div
            ref={preloaderRef}
            className="fixed inset-0 z-[999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Big Number */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[30vw] font-black text-white/[0.02] select-none uppercase">
                Sumit
              </span>
            </div>

            {/* --- SIGNATURE SVG ANIMATION --- */}
            <div className="relative w-full max-w-lg px-10">
              <svg viewBox="0 0 400 150" className="signature-svg w-full fill-none stroke-[#ff8c00] stroke-[2] stroke-linecap-round">
                {/* Is path ko tum kisi bhi online SVG signature generator se replace kar sakte ho */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.1 }}
                  d="M10,80 Q50,20 100,80 T200,80 T300,50" // Example path: Replace with actual signature path
                />
                <text x="20" y="100" className="text-4xl font-serif italic fill-white stroke-none opacity-20">
                  Sumit Sahu
                </text>
              </svg>
              
              {/* Progress Detail */}
              <div className="flex justify-between mt-4 font-mono text-[10px] tracking-widest text-[#ff8c00] uppercase">
                <span>Initializing Experience</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CREATIVE NAVBAR --- */}
      <header className="nav-container fixed top-0 left-0 w-full z-[100] px-6 py-8 flex justify-between items-center pointer-events-none">
        {/* Landing Signature Logo */}
        <div className="nav-logo-sig pointer-events-auto bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl">
           <span className="text-xl font-serif italic text-white tracking-tighter">
             Sumit <span className="text-[#ff8c00]">Sahu</span>
           </span>
        </div>

        {/* Glass Menu */}
        <nav className="hidden md:flex pointer-events-auto items-center bg-black/40 backdrop-blur-2xl border border-white/10 px-8 py-3 rounded-full gap-10 shadow-2xl">
          {['Work', 'Service', 'About'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="group relative text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#ff8c00] transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="pointer-events-auto flex items-center gap-4">
          <button className="hidden sm:block px-6 py-2.5 bg-[#ff8c00] text-black text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-all transform active:scale-95">
            Let's Talk
          </button>
          <div className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 transition-all">
            <div className="w-5 h-[1px] bg-white" />
            <div className="w-3 h-[1px] bg-[#ff8c00] ml-auto mr-2.5" />
          </div>
        </div>
      </header>

      <main className={loading ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
        {children}
      </main>
    </>
  );
};

export default LayoutWrapper;