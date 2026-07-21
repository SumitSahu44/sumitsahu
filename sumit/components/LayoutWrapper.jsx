"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const LayoutWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [timeString, setTimeString] = useState("");

  const preloaderRef = useRef(null);
  const menuCurtainRef = useRef(null);

  // Menu items with high-end project images
  const menuItems = [
    { name: "Home", href: "/", previewImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800" },
    { name: "Work", href: "/#work", previewImg: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800" },
    { name: "Services", href: "/#capabilities", previewImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800" },
    { name: "About", href: "/about", previewImg: "/images/Hero-front.png" },
    { name: "Experience", href: "/#experience", previewImg: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=800" },
    { name: "Contact", href: "/contact", previewImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800" },
  ];

  // Motion values for magnetic menu hover image preview
  const menuMouseX = useMotionValue(0);
  const menuMouseY = useMotionValue(0);
  const springX = useSpring(menuMouseX, { damping: 40, stiffness: 350 });
  const springY = useSpring(menuMouseY, { damping: 40, stiffness: 350 });

  const handleMenuMouseMove = (e) => {
    if (!menuCurtainRef.current) return;
    const rect = menuCurtainRef.current.getBoundingClientRect();
    menuMouseX.set(e.clientX - rect.left);
    menuMouseY.set(e.clientY - rect.top);
  };

  // 1. Dynamic Clock for Indore Timezone
  useEffect(() => {
    const updateClock = () => {
      const options = {
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

  // 2. Slow-down Organic Progress Loader
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      const increment = currentProgress > 75 ? Math.random() * 1.5 : Math.random() * 4 + 1.2;
      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(Math.floor(currentProgress));
      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);



  // 4. Global Lenis scroll manager
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
    window.lenis = lenis;
    return () => lenis.destroy();
  }, [loading]);

  // 5. Stop Lenis scrolling when menu is active
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

  // 6. GSAP Preloader Curve Reveal Timeline
  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: () => setLoading(false),
      });

      // 1. Fade out the center content
      tl.to(".preloader-content", {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power4.inOut"
      })
      // 2. Animate the liquid curtain path to pull up
      .to("#preloader-path", {
        attr: { d: "M 0 0 L 100 0 L 100 0 Q 50 50 0 0 Z" },
        duration: 0.8,
        ease: "power3.in"
      }, "-=0.2")
      .to("#preloader-path", {
        attr: { d: "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z" },
        duration: 0.4,
        ease: "power2.out"
      })
      // 3. Reveal page components
      .fromTo(".nav-container", {
        y: -50,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all"
      }, "-=0.6")
      .fromTo(".hero-tagline", {
        y: 30,
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

  // 7. GSAP Menu Liquid Curtain Transitions
  useEffect(() => {
    if (loading) return;

    if (menuOpen) {
      gsap.timeline()
        .set(menuCurtainRef.current, { display: "flex", opacity: 1 })
        .to("#menu-curtain-path", {
          attr: { d: "M 0 0 L 100 0 L 100 100 Q 50 120 0 100 Z" },
          duration: 0.45,
          ease: "power3.in"
        })
        .to("#menu-curtain-path", {
          attr: { d: "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z" },
          duration: 0.35,
          ease: "power2.out"
        })
        .fromTo(".menu-link-item", {
          y: 80,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out"
        }, "-=0.2")
        .fromTo(".menu-info-item", {
          opacity: 0,
          x: -20
        }, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out"
        }, "-=0.4");
    } else {
      gsap.timeline({
        onComplete: () => {
          gsap.set(menuCurtainRef.current, { display: "none" });
        }
      })
      .to(".menu-link-item, .menu-info-item", {
        opacity: 0,
        y: -30,
        duration: 0.3,
        ease: "power2.inOut"
      })
      .to("#menu-curtain-path", {
        attr: { d: "M 0 0 L 100 0 L 100 0 Q 50 30 0 0 Z" },
        duration: 0.35,
        ease: "power3.in"
      })
      .to("#menu-curtain-path", {
        attr: { d: "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z" },
        duration: 0.35,
        ease: "power2.out"
      });
    }
  }, [menuOpen, loading]);

  return (
    <>
      {/* --- PRELOADER PANEL --- */}
      <AnimatePresence>
        {loading && (
          <div
            ref={preloaderRef}
            className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden select-none pointer-events-auto"
          >
            {/* Liquid SVG Curtain background */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
              <svg className="w-full h-full fill-[#050505]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path id="preloader-path" d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z" />
              </svg>
            </div>

            {/* Premium Center Content */}
            <div className="preloader-content relative z-10 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
              {/* Subtle radial glow */}
              <div className="absolute w-[500px] h-[500px] bg-radial from-[#ff8c00]/5 to-transparent blur-3xl pointer-events-none" />

              {/* Elegant Typography Title with progress-based clipping */}
              <div className="relative font-sans font-black tracking-[0.25em] text-4xl sm:text-6xl md:text-8xl uppercase select-none">
                {/* Background outline */}
                <div className="stroke-text select-none text-white/10">
                  SUMIT SAHU
                </div>
                {/* Foreground fill */}
                <div 
                  className="absolute top-0 left-0 text-white overflow-hidden select-none whitespace-nowrap transition-all duration-75 ease-out"
                  style={{ width: `${progress}%`, borderRight: progress < 100 ? "2px solid #ff8c00" : "none" }}
                >
                  SUMIT SAHU
                </div>
              </div>

              {/* Minimal status detail & percentage */}
              <div className="w-64 sm:w-80 mt-8 flex justify-between items-center text-[10px] font-mono tracking-[0.3em] text-white/40">
                <span className="text-[#ff8c00] font-semibold animate-pulse">SYSTEM RUNNING</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CREATIVE NAVBAR --- */}
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} isMenuOpen={menuOpen} />

      {/* --- PREMIUM FULLSCREEN MENU OVERLAY --- */}
      <div
        ref={menuCurtainRef}
        onMouseMove={handleMenuMouseMove}
        className="fixed inset-0 z-[90] text-white flex-col md:flex-row justify-between items-stretch overflow-hidden hidden"
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
      >
        {/* The SVG liquid curtain */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none fill-[#0d0d0d] z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path id="menu-curtain-path" d="M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z" />
        </svg>

        {/* Floating Mouse-Follow Preview Image */}
        <motion.div
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: hoveredIndex !== null ? 1 : 0,
            opacity: hoveredIndex !== null ? 0.8 : 0,
            rotate: hoveredIndex !== null ? 4 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 pointer-events-none z-50 w-[320px] h-[200px] overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(255,140,0,0.15)] hidden md:block"
        >
          {hoveredIndex !== null && (
            <img
              src={menuItems[hoveredIndex].previewImg}
              alt=""
              className="w-full h-full object-cover scale-105"
            />
          )}
        </motion.div>

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-stretch pt-28 pb-8 px-6 md:px-16 overflow-y-auto md:overflow-hidden">
          
          {/* Left Column: Clock, Socials, Details */}
          <div className="w-full md:w-5/12 flex flex-col justify-between py-6 md:py-12 border-b md:border-b-0 md:border-r border-white/5 pr-0 md:pr-12 mb-6 md:mb-0 select-none">
            <div className="space-y-4">
              <span className="menu-info-item block text-[10px] font-mono tracking-[0.3em] text-[#ff8c00] uppercase font-bold">
                Location & Time
              </span>
              <div className="menu-info-item text-xl md:text-3xl font-mono text-white/90">
                INDORE, IN <span className="text-[#ff8c00] animate-pulse">/</span> {timeString || "00:00:00"}
              </div>
            </div>

            <div className="space-y-6 mt-8 md:mt-0">
              <div className="space-y-2">
                <span className="menu-info-item block text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase font-bold">
                  Quick Contact
                </span>
                <a
                  href="mailto:sumitsahu5328@gmail.com"
                  className="menu-info-item block text-base md:text-lg text-white hover:text-[#ff8c00] transition-colors font-light"
                >
                  sumitsahu5328@gmail.com
                </a>
              </div>

              <div className="space-y-2">
                <span className="menu-info-item block text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase font-bold">
                  Social Channels
                </span>
                <div className="flex gap-4 md:gap-6 flex-wrap">
                  {[
                    { name: "GitHub", href: "https://github.com/SumitSahu44" },
                    { name: "LinkedIn", href: "https://linkedin.com/in/sumitsahu44" },
                    { name: "Instagram", href: "https://instagram.com" },
                  ].map((soc) => (
                    <a
                      key={soc.name}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="menu-info-item text-xs font-mono uppercase tracking-widest text-white/60 hover:text-[#ff8c00] transition-colors"
                    >
                      {soc.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Navigation Links */}
          <div className="w-full md:w-7/12 flex flex-col justify-center pl-0 md:pl-16 py-4">
            <nav className="flex flex-col gap-2 md:gap-4">
              {menuItems.map((item, index) => (
                <div key={item.name} className="overflow-hidden py-1 md:py-2">
                  <div className="menu-link-item">
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={`inline-block text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter transition-all duration-300 ${
                        hoveredIndex !== null && hoveredIndex !== index
                          ? "opacity-20 blur-[1px] translate-x-2"
                          : "opacity-100 text-white"
                      } hover:text-[#ff8c00]`}
                    >
                      {item.name}
                    </Link>
                  </div>
                </div>
              ))}
            </nav>
          </div>

        </div>
      </div>

      {/* --- MAIN PAGE CONTENT --- */}
      <main className="opacity-100">
        {children}
      </main>
    </>
  );
};

export default LayoutWrapper;