"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

const WorkSection = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Smooth Scroll (Lenis)
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP Horizontal Scroll
    gsap.registerPlugin(ScrollTrigger);
    
    const pin = gsap.fromTo(
      sectionRef.current,
      { x: 0 },
      {
        x: "-200vw", // Jitne cards hain uske hisaab se adjust karein
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      }
    );

    return () => {
      pin.kill();
      lenis.destroy();
    };
  }, []);

  const projects = [
    { title: "MERN Stack", desc: "Scalable Web Apps", color: "from-blue-500" },
    { title: "Next.js 14", desc: "SEO & Performance", color: "from-purple-500" },
    { title: "Three.js", desc: "3D Immersive Design", color: "from-cyan-500" },
    { title: "Team Lead", desc: "Architecture & Mentoring", color: "from-emerald-500" },
  ];

  return (
    <div className="overflow-hidden bg-[#050505]">
      {/* Spacer for intro transition */}
      <div className="h-[20vh]" />

      <div ref={triggerRef}>
        <div ref={sectionRef} className="flex h-screen w-[300vw] relative items-center px-[10vw]">
          
          {/* Section Heading Card */}
          <div className="w-[80vw] shrink-0 flex flex-col justify-center">
            <h2 className="text-[15vw] font-black text-white leading-none uppercase tracking-tighter">
              Selected <br /> <span className="text-blue-600">Artifacts</span>
            </h2>
            <p className="text-gray-500 text-2xl mt-5 font-mono">/ SCROLL TO EXPLORE</p>
          </div>

          {/* Project Cards Loop */}
          {projects.map((item, index) => (
            <div 
              key={index} 
              className="w-[60vw] h-[70vh] shrink-0 px-10"
            >
              <div className={`relative w-full h-full bg-gradient-to-br ${item.color} to-black p-[1px] rounded-3xl group overflow-hidden`}>
                <div className="absolute inset-0 bg-[#0a0a0a] rounded-3xl transition-transform duration-500 group-hover:scale-[0.98]" />
                
                {/* Background Text Decor */}
                <span className="absolute -bottom-10 -right-10 text-[15rem] font-black text-white/5 pointer-events-none uppercase">
                  {index + 1}
                </span>

                <div className="relative z-10 p-12 h-full flex flex-col justify-between">
                  <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center text-white text-3xl font-mono">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-6xl font-bold text-white mb-4 uppercase">{item.title}</h3>
                    <p className="text-xl text-gray-400 font-light max-w-xs">{item.desc}</p>
                    <div className="mt-10 flex items-center gap-4">
                      <div className="h-[1px] w-20 bg-blue-500" />
                      <span className="text-blue-500 font-mono tracking-widest text-sm">VIEW PROJECT</span>
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.1),transparent_40%)]" 
                     onMouseMove={(e) => {
                       const rect = e.currentTarget.getBoundingClientRect();
                       e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
                       e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
                     }}
                />
              </div>
            </div>
          ))}

          {/* Final Call to Action Card */}
          <div className="w-[80vw] shrink-0 flex items-center justify-center">
            <button className="group relative px-12 py-6 overflow-hidden rounded-full border border-white">
              <span className="relative z-10 text-white text-2xl font-bold transition-colors group-hover:text-black">
                LETS CONNECT
              </span>
              <div className="absolute inset-0 bg-white translate-y-[101%] transition-transform duration-500 group-hover:translate-y-0" />
            </button>
          </div>

        </div>
      </div>

      {/* Footer Space */}
      <div className="h-[20vh]" />
    </div>
  );
};

export default WorkSection;