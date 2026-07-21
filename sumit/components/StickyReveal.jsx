"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";

const StickyReveal = () => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-[#050505]">
      {/* STICKY IMAGE SECTION */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1565687981296-535f09db714e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvZGVyJTIwcHVzaW5nJTIwYm91bmRhcmllfGVufDB8fDB8fHww')`,
          }}
          className="relative w-full h-full bg-cover bg-center bg-no-repeat"
        >
          {/* Overlay Content on Image */}
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
            <motion.h2 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter"
            >
              Pushing <br /> <span className="text-[#ff8c00]">Boundaries</span>
            </motion.h2 >
            <p className="text-gray-300 mt-6 max-w-md font-light text-lg">
              Crafting digital excellence where every pixel tells a story of innovation.
            </p>
          </div>
        </div>
      </div>

      {/* NEXT COMPONENT */}
      <div className="relative z-20 bg-white text-black min-h-screen w-full px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
                Ready to build the <br /> <span className="text-gray-400">future of web?</span>
              </h3>
              <p className="text-xl text-gray-700 leading-relaxed">
                As a MERN Stack Lead, I don't just write code; I architect experiences that engage users and drive results. This is where creativity meets professional stability.
              </p>
              <button className="mt-10 px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-[#ff8c00] transition-colors duration-300">
                START A PROJECT
              </button>
            </div>
            
            {/* Stats or extra info */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Experience", val: "5+ Yrs" },
                { label: "Projects", val: "50+" },
                { label: "Coffee", val: "Infinite" },
                { label: "Energy", val: "100%" }
              ].map((stat, i) => (
                <div key={i} className="p-8 bg-gray-100 rounded-3xl text-center">
                  <div className="text-3xl font-black">{stat.val}</div>
                  <div className="text-gray-500 text-sm uppercase mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyReveal;