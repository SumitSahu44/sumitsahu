"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FixedBgSection = () => {
  const containerRef = useRef(null);

  // Scroll tracking for the parallax effect on text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Text ko thoda extra speed se upar bhejne ke liye
  const textY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div className="relative">
      {/* 1. THE FIXED BACKGROUND LAYER */}
      <section 
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Is div ko fixed rakhenge taaki content iske upar se slide ho */}
        <div 
          className="fixed inset-0 z-[-1] w-full h-full bg-cover bg-center bg-no-repeat grayscale-[20%]"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1565687981296-535f09db714e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvZGVyJTIwcHVzaW5nJTIwYm91bmRhcmllfGVufDB8fDB8fHww')`, // Teri orange/black wali image
            backgroundAttachment: 'fixed' // Traditional approach (Desktop focus)
          }}
        >
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* 2. THE FLOATING TEXT CONTENT */}
        <motion.div 
          style={{ y: textY, opacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <span className="text-[#ff8c00] font-mono tracking-[0.5em] mb-4 uppercase text-sm">
            About My Vision
          </span>
          <h2 className="text-6xl md:text-[10rem] font-black text-white uppercase leading-none tracking-tighter">
            Digital <br /> <span className="text-transparent stroke-white stroke-[1px]">Architect</span>
          </h2>
          <p className="mt-8 text-gray-300 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            Leading teams to transform complex requirements into seamless, 
            high-performance web applications using the MERN stack.
          </p>
        </motion.div>
      </section>

      {/* 3. NEXT COMPONENT (JO UPAR AAYEGA) */}
      <section className="relative z-20 bg-[#0a0a0a] min-h-screen w-full py-32 px-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Content of the next section */}
          <div className="space-y-6">
            <h3 className="text-[#ff8c00] text-4xl font-bold italic">Leadership.</h3>
            <p className="text-gray-400">Managing a 3-member team to deliver pixel-perfect solutions for global brands like Parekh Group.</p>
          </div>
          <div className="space-y-6">
            <h3 className="text-[#ff8c00] text-4xl font-bold italic">Precision.</h3>
            <p className="text-gray-400">Optimizing WordPress and React apps for lightning-fast load times and SEO dominance.</p>
          </div>
          <div className="space-y-6">
            <h3 className="text-[#ff8c00] text-4xl font-bold italic">Innovation.</h3>
            <p className="text-gray-400">Integrating GSAP, Three.js, and Framer Motion to create websites that don't just work—they perform.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FixedBgSection;