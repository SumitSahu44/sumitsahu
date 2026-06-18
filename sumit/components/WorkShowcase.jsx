"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Tilt from "react-parallax-tilt";
import Lenis from "@studio-freight/lenis";

const WorkShowcase = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const horizontalRef = useRef(null);

  useEffect(() => {
    // 1. Smooth Scroll Initialization (Global Lenis)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Horizontal Scroll Logic
    const context = gsap.context(() => {
      const pin = gsap.fromTo(
        horizontalRef.current,
        { x: 0 },
        {
          x: "-200vw", // Cards ke count ke hisab se scroll width
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=3000", // Scroll length
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        }
      );

      // Background Parallax Layer Movement
      gsap.to(".bg-parallax", {
        x: -500,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top bottom",
          scrub: true,
        }
      });
    });

    return () => {
      context.revert();
      lenis.destroy();
    };
  }, []);

  const projects = [
    {
      title: "The Silk Route",
      category: "Textile E-commerce",
      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000",
      tech: ["Next.js", "GSAP", "Tailwind"],
    },
    {
      title: "MixNuts Wellness",
      category: "Health & Supplements",
      img: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2000",
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Digital Success",
      category: "Marketing Agency",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000",
      tech: ["Three.js", "Framer Motion"],
    },
  ];

  return (
    <div className="bg-[#050505] text-white selection:bg-[#ff8c00]">
      {/* SECTION HEADER */}
      <div className="h-[40vh] flex items-end px-10 md:px-24 pb-10">
        <div className="max-w-4xl">
          <h2 className="text-sm font-mono tracking-[0.5em] text-[#ff8c00] mb-4 uppercase">
            / Selected Creations
          </h2>
          <h3 className="text-5xl md:text-8xl font-black uppercase leading-none">
            Transforming Pixels <br /> into <span className="italic font-light opacity-50 underline-offset-8 underline decoration-[#ff8c00]">Masterpieces</span>
          </h3>
        </div>
      </div>

      {/* HORIZONTAL WRAPPER */}
      <div ref={triggerRef} className="overflow-hidden">
        {/* BACKGROUND 3D FEEL LAYERS */}
        <div className="bg-parallax absolute top-0 left-0 w-[400vw] h-full pointer-events-none opacity-10">
           <span className="text-[40rem] font-black text-white whitespace-nowrap uppercase">
             SUMIT SAHU • CREATIVE • DEVELOPER • LEAD •
           </span>
        </div>

        <div ref={horizontalRef} className="flex h-screen w-[300vw] items-center px-[10vw] relative z-10">
          
          {/* INTRO CARD */}
          <div className="w-[80vw] h-[70vh] shrink-0 flex flex-col justify-center gap-6">
            <h4 className="text-6xl font-bold max-w-lg">Every project is a story of <span className="text-[#ff8c00]">Innovation.</span></h4>
            <div className="flex gap-4">
               <div className="w-12 h-[1px] bg-white mt-4" />
               <p className="text-gray-400 text-xl font-light">Swipe or Scroll to explore the artifacts.</p>
            </div>
          </div>

          {/* PROJECT CARDS */}
          {projects.map((project, index) => (
            <div key={index} className="w-[70vw] h-[80vh] shrink-0 px-10 flex items-center">
              <Tilt 
                tiltMaxAngleX={5} 
                tiltMaxAngleY={5} 
                perspective={1000}
                className="w-full h-[65vh] group relative"
              >
                {/* CARD INNER */}
                <div className="relative w-full h-full bg-[#0d0d0d] rounded-[2.5rem] overflow-hidden border border-white/5 transition-colors group-hover:border-[#ff8c00]/30 shadow-2xl">
                  
                  {/* IMAGE LAYER */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 z-0"
                  >
                    <img src={project.img} className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-500" alt={project.title} />
                  </motion.div>

                  {/* CONTENT LAYER */}
                  <div className="relative z-10 p-10 md:p-16 flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start">
                      <span className="text-[#ff8c00] font-mono tracking-widest text-lg">0{index + 1}</span>
                      <div className="flex gap-2">
                        {project.tech.map((t, i) => (
                          <span key={i} className="px-3 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-tighter backdrop-blur-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-5xl md:text-7xl font-bold mb-2 uppercase group-hover:tracking-wider transition-all duration-500">
                        {project.title}
                      </h5>
                      <p className="text-xl text-gray-300 font-light italic">{project.category}</p>
                      
                      <button className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-full translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-3">
                        EXPLORE CASE STUDY 
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* NOISE OVERLAY */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>
              </Tilt>
            </div>
          ))}

          {/* FINAL CTA */}
          <div className="w-[50vw] shrink-0 flex items-center justify-center">
            <div className="text-center">
               <h2 className="text-5xl font-bold mb-10">Thinking of the <br/> next big thing?</h2>
               <a href="mailto:sumit@example.com" className="relative group inline-block">
                  <div className="absolute -inset-4 bg-[#ff8c00] rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity" />
                  <span className="text-6xl md:text-[8rem] font-black underline decoration-[#ff8c00]">HIRE ME</span>
               </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-parallax {
          will-change: transform;
        }
        @media (max-width: 768px) {
           h3 { font-size: 3rem; }
        }
      `}</style>
    </div>
  );
};

export default WorkShowcase;