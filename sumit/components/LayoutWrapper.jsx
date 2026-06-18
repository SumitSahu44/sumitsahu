"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/Navbar";

const LayoutWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [statusText, setStatusText] = useState("INITIATING CORE ENGINE");
  
  const preloaderRef = useRef(null);
  const orangePanelRef = useRef(null);
  const grayPanelRef = useRef(null);

  // 1. Single mounting interval for loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  // Update status text based on progress
  useEffect(() => {
    if (progress < 25) {
      setStatusText("INITIATING PORTFOLIO CORE...");
    } else if (progress < 50) {
      setStatusText("LOADING ARTIFACT DATA...");
    } else if (progress < 75) {
      setStatusText("SYNCHRONIZING GRAPHICS ENGINE...");
    } else if (progress < 95) {
      setStatusText("POLISHING PIXELS & SHADERS...");
    } else {
      setStatusText("LAUNCHING EXPERIENCE...");
    }
  }, [progress]);

  // 2. Global Lenis scroll manager
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Expose lenis globally for component control
    window.lenis = lenis;

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  // 3. Stop Lenis scrolling when mobile menu is active
  useEffect(() => {
    const globalLenis = window.lenis;
    if (globalLenis) {
      if (menuOpen) {
        globalLenis.stop();
      } else {
        globalLenis.start();
      }
    }
  }, [menuOpen]);

  // 4. GSAP coordinated reveal animation
  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: () => setLoading(false),
      });

      tl.to(".signature-svg", {
        filter: "drop-shadow(0px 0px 25px #ff8c00)",
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: "power2.inOut",
        delay: 0.3,
      })
      .to(".preloader-status-detail", {
        opacity: 0,
        y: 20,
        duration: 0.5,
      }, "-=0.6")
      .to(preloaderRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
      }, "-=0.2")
      .to(orangePanelRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
      }, "-=1.0")
      .to(grayPanelRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
      }, "-=1.0")
      .fromTo(".nav-container", {
        y: -100,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all"
      }, "-=0.6")
      .fromTo(".hero-tagline", {
        y: 20,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6")
      .fromTo(".hero-title-line", {
        yPercent: 100,
      }, {
        yPercent: 0,
        duration: 1.0,
        ease: "power4.out",
        stagger: 0.15,
      }, "-=0.7")
      .fromTo(".hero-desc", {
        y: 30,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6");
    }
  }, [progress]);

  return (
    <>
      {/* 3-Panel Staggered Reveal Curtains */}
      <AnimatePresence>
        {loading && (
          <>
            {/* Charcoal Panel */}
            <div
              ref={grayPanelRef}
              className="fixed inset-0 z-[997] bg-[#121212]"
            />
            {/* Accent Orange Panel */}
            <div
              ref={orangePanelRef}
              className="fixed inset-0 z-[998] bg-[#ff8c00]"
            />
            {/* Jet Black Preloader Container */}
            <div
              ref={preloaderRef}
              className="fixed inset-0 z-[999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Background Title */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="text-[25vw] font-black text-white/[0.015] leading-none uppercase">
                  SUMIT
                </span>
              </div>

              {/* Monogram / Signature SVG */}
              <div className="relative w-full max-w-lg px-8 flex flex-col items-center">
                <svg viewBox="0 0 400 150" className="signature-svg w-full max-h-[160px] fill-none stroke-[#ff8c00] stroke-[2] stroke-linecap-round">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: progress / 100 }}
                    transition={{ ease: "easeOut", duration: 0.2 }}
                    d="M 20 80 C 40 40, 60 20, 80 40 C 90 50, 85 70, 70 80 C 50 90, 30 70, 45 50 C 60 30, 100 20, 120 50 C 130 65, 125 85, 110 95 C 95 105, 80 95, 90 75 C 105 45, 160 30, 180 60 C 190 75, 175 100, 150 100 C 130 100, 140 80, 165 70 C 200 55, 230 75, 250 85 C 270 95, 290 85, 300 70 C 310 55, 330 65, 350 75"
                  />
                  <text x="50%" y="125" textAnchor="middle" className="text-2xl font-serif italic fill-white/20 stroke-none tracking-wider font-light">
                    Sumit Sahu
                  </text>
                </svg>

                {/* Progress Status Detail */}
                <div className="preloader-status-detail w-full max-w-[320px] mt-8 flex flex-col gap-2 font-mono text-[10px] tracking-[0.2em] text-[#ff8c00] uppercase">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">{statusText}</span>
                    <span className="font-bold text-sm">{progress}%</span>
                  </div>
                  <div className="w-full h-[1px] bg-white/10 overflow-hidden relative">
                    <div
                      className="h-full bg-[#ff8c00] transition-all duration-100 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* --- CREATIVE NAVBAR --- */}
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} isMenuOpen={menuOpen} />

      {/* --- MOBILE FULLSCREEN MENU OVERLAY --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-2xl flex flex-col justify-center px-10 md:hidden"
          >
            <div className="flex flex-col gap-8 text-left mt-8">
              {['Work', 'Services', 'About', 'Experience'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
                >
                  <a
                    href={`#${item.toLowerCase() === 'services' ? 'capabilities' : item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-4xl font-bold uppercase tracking-wider text-white hover:text-[#ff8c00] transition-colors"
                  >
                    {item}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <a
                  href="mailto:sumitsahu5328@gmail.com"
                  onClick={() => setMenuOpen(false)}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#ff8c00] to-[#ff4500] text-black font-bold uppercase text-xs tracking-widest rounded-full inline-block shadow-lg"
                >
                  Let's Talk
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN PAGE CONTENT --- */}
      <main className={loading ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
        {children}
      </main>
    </>
  );
};

export default LayoutWrapper;