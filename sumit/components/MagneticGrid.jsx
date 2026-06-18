"use client";
import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// --- MAGNETIC WRAPPER COMPONENT (Reusable) ---
const Magnetic = ({ children, strength = 1 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for that organic magnetic feel
  const springConfig = { damping: 15, stiffness: 150 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Bounding calculation: moves child towards cursor within bounds
    const moveX = (clientX - left - width / 2) * strength;
    const moveY = (clientY - top - height / 2) * strength;
    
    x.set(moveX);
    y.set(moveY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
    >
      {children}
    </motion.div>
  );
};

// --- MAIN GRID COMPONENT ---
const MagneticGrid = () => {
  const projects = [
    { title: "MERN Commerce", cat: "Development", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600" },
    { title: "Team Leadership", cat: "Management", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600" },
    { title: "Brand Identity", cat: "Creative", img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=600" },
    { title: "Next.js Architecture", cat: "Tech Stack", img: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=600" },
  ];

  return (
    <section className="py-24 bg-[#050505] text-white px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <h2 className="text-5xl md:text-8xl font-black uppercase leading-none tracking-tighter">
            Where <span className="text-[#ff8c00]">Logic</span> <br /> Meets <span className="italic font-light opacity-50 underline decoration-[#ff8c00]">Art</span>
          </h2>
          <p className="text-gray-500 max-w-xs font-mono text-sm leading-relaxed">
            Hover over the artifacts to feel the digital gravity. Crafting unique MERN experiences.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10 rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
          {projects.map((item, index) => (
            <Magnetic key={index} strength={0.15}> {/* Wraps each item */}
              <div className="group relative w-full h-[350px] md:h-[400px] bg-[#0d0d0d] p-10 flex flex-col justify-between overflow-hidden cursor-pointer transition-colors duration-500 hover:bg-[#080808]">
                
                {/* Background Image Reveal */}
                <motion.img 
                  src={item.img} 
                  alt={item.title} 
                  className="absolute inset-0 z-0 w-full h-full object-cover grayscale opacity-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 ease-out" 
                />

                {/* Content - Top Part */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#ff8c00] font-mono uppercase tracking-[0.3em]">
                      Artifact 0{index + 1}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter group-hover:tracking-wider transition-all duration-500">
                      {item.title}
                    </h3>
                  </div>
                  
                  {/* Arrow Icon */}
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:border-[#ff8c00]/50 group-hover:text-[#ff8c00] group-hover:rotate-45 transition-all duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Content - Bottom Part */}
                <div className="relative z-10 flex justify-between items-end">
                    <span className="text-xl text-gray-500 font-light italic">
                        {item.cat}
                    </span>
                    <div className="w-1 h-1 bg-[#ff8c00] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Bottom Border Glow */}
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff8c00]/50 to-transparent group-hover:w-full transition-all duration-700" />
              </div>
            </Magnetic>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MagneticGrid;