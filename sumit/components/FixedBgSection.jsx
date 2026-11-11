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

  // Restrict the parallax translation range to keep the text centered and prevent top collisions
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div className="relative">
      {/* 1. THE FIXED BACKGROUND LAYER */}
      <section 
        id="about"
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
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-28 pb-16"
        >
          <h2 className="text-6xl md:text-[10rem] font-black text-white uppercase leading-none tracking-tighter">
            Digital <br /> <span className="text-transparent stroke-white stroke-[1px]">Architect</span>
          </h2>
          <p className="mt-8 text-gray-300 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            Leading teams to transform complex requirements into seamless, 
            high-performance web applications using the MERN stack.
          </p>
        </motion.div>
      </section>

    </div>
  );
};

export default FixedBgSection;
