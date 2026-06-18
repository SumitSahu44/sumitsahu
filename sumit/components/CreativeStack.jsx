"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const CreativeStack = () => {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".stack-card");
    
    // 3D Timeline Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=3000", // Scroll ki length
        scrub: 1,
        pin: true, // Screen lock ho jayegi cards reveal hone tak
        anticipatePin: 1,
      }
    });

    // Cards spread logic
    tl.to(cards, {
      x: (i) => (i - (cards.length - 1) / 2) * 350, // Horizontal spread
      rotateY: (i) => (i - (cards.length - 1) / 2) * 15, // 3D Tilt
      z: (i) => Math.abs(i - (cards.length - 1) / 2) * -100, // Depth
      rotateZ: (i) => (i - (cards.length - 1) / 2) * 5, // Casual fan effect
      ease: "power2.inOut",
      stagger: 0.1
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const data = [
    { title: "MERN Stack", icon: "🚀", color: "from-blue-600/20" },
    { title: "Team Leadership", icon: "👑", color: "from-[#ff8c00]/20" },
    { title: "UI/UX Design", icon: "🎨", color: "from-purple-600/20" },
    { title: "Next.js Expert", icon: "⚡", color: "from-emerald-600/20" },
  ];

  return (
    <div ref={triggerRef} className="relative h-screen w-full bg-[#050505] overflow-hidden">
      {/* Background Heading */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-[20vw] font-black text-white/[0.03] uppercase select-none">
          Capabilities
        </h2>
      </div>

      {/* Cards Container */}
      <div 
        ref={containerRef} 
        className="relative flex items-center justify-center w-full h-full"
        style={{ perspective: "1500px" }} // Important for 3D
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="stack-card absolute w-[300px] h-[450px] md:w-[350px] md:h-[500px] rounded-[2rem] p-1 border border-white/10 shadow-2xl transition-all duration-500 hover:border-[#ff8c00]/50"
          >
            {/* Card Content */}
            <div className={`w-full h-full rounded-[1.8rem] bg-gradient-to-br ${item.color} to-black p-8 flex flex-col justify-between backdrop-blur-3xl relative overflow-hidden`}>
              
              {/* Glossy Overlay */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

              <div className="text-6xl">{item.icon}</div>
              
              <div>
                <h3 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm font-mono leading-relaxed">
                  Crafting high-end digital architectures with focus on performance and aesthetics.
                </p>
                <div className="mt-6 w-12 h-1 bg-[#ff8c00]" />
              </div>

              {/* Numbering */}
              <span className="absolute top-8 right-8 text-white/10 font-black text-4xl">
                0{index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Instruction */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#ff8c00] to-transparent animate-bounce" />
        <span className="text-[10px] text-gray-500 tracking-[0.4em] uppercase">Scroll to Spread</span>
      </div>
    </div>
  );
};

export default CreativeStack;