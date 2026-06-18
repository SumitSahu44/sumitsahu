"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const SumitHero = () => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the "magnetic" cursor feel
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [maskPos, setMaskPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubX = smoothX.on("change", (v) => setMaskPos(prev => ({ ...prev, x: v })));
    const unsubY = smoothY.on("change", (v) => setMaskPos(prev => ({ ...prev, y: v })));
    return () => { unsubX(); unsubY(); };
  }, [smoothX, smoothY]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0a0a] cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* --- Jiggle Filter --- */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="distort">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="5">
              <animate attributeName="baseFrequency" dur="8s" values="0.015;0.025;0.015" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
        </defs>
      </svg>

      {/* --- Layer 1: Base (The "Old/Draft" or B&W look) --- */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center grayscale opacity-30 transition-transform duration-0"
        style={{ 
          backgroundImage: `url('/images/Hero-front.png')`,
          transform: 'none' // Fixing the tilt issue
        }}
      />

      {/* --- Layer 2: Reveal (The "Real/HD/Color" look) --- */}
      <div
        className="absolute inset-0 z-10 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('/images/Hero-back.png')`,
          WebkitMaskImage: `radial-gradient(circle 180px at ${maskPos.x}px ${maskPos.y}px, black 100%, transparent 0%)`,
          maskImage: `radial-gradient(circle 180px at ${maskPos.x}px ${maskPos.y}px, black 100%, transparent 0%)`,
          filter: isHovered ? "url(#distort)" : "none",
        }}
      />

      {/* --- Content: Left Aligned for Portfolio --- */}
      <div className="absolute inset-0 z-20 flex items-center px-10 md:px-24 pointer-events-none">
        <div className="max-w-4xl">
          <span className="hero-tagline text-[#ff8c00] font-mono text-sm md:text-base mb-4 block tracking-[0.25em] opacity-0">
            MERN STACK DEVELOPER & TEAM LEAD
          </span>
          <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.9] uppercase flex flex-col">
            <span className="overflow-hidden block py-1">
              <span className="hero-title-line inline-block">Sumit</span>
            </span>
            <span className="overflow-hidden block py-1">
              <span className="hero-title-line inline-block stroke-text">Sahu</span>
            </span>
          </h1>
          <p className="hero-desc mt-8 text-gray-400 text-base md:text-lg max-w-md font-light leading-relaxed opacity-0">
            Crafting high-end digital experiences with code and aesthetic precision.
          </p>
        </div>
      </div>

      {/* --- Unique Cursor: "The Fluid Ring" --- */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
      >
        {/* Main Circle */}
        <motion.div 
          animate={{ 
            scale: isHovered ? [1, 1.2, 1] : 0,
            rotate: isHovered ? 360 : 0 
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-[1px] border-dashed border-white rounded-full flex items-center justify-center"
        />
        {/* Inner Solid Dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
        
        {/* Floating Label */}
        <motion.span 
          animate={{ y: isHovered ? 40 : 20, opacity: isHovered ? 1 : 0 }}
          className="absolute text-[10px] text-white font-mono tracking-widest uppercase w-max"
        >
          Explore Reality
        </motion.span>
      </motion.div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.5);
        }
      `}</style>
    </section>
  );
};

export default SumitHero;