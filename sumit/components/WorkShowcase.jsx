"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Tilt from "react-parallax-tilt";

const WorkShowcase = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const horizontalRef = useRef(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Horizontal Scroll Logic using dynamic widths
    const context = gsap.context(() => {
      const pin = gsap.fromTo(
        horizontalRef.current,
        { x: 0 },
        {
          x: () => -(horizontalRef.current.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${horizontalRef.current.scrollWidth - window.innerWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true, // Re-calculates on window resize
          },
        }
      );
    });

    return () => {
      context.revert();
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
      {/* HORIZONTAL WRAPPER */}
      <div ref={triggerRef} className="relative overflow-hidden bg-[#050505]">

        <div ref={horizontalRef} className="flex h-screen w-fit items-center px-[5vw] md:px-[10vw] relative z-10">
          
          {/* INTRO CARD */}
          <div className="w-[80vw] md:w-[40vw] h-[70vh] shrink-0 flex flex-col justify-center gap-6 px-4 md:px-0">
            <h4 className="text-4xl md:text-6xl font-bold max-w-lg">Every project is a story of <span className="text-[#ff8c00]">Innovation.</span></h4>
            <div className="flex gap-4">
               <div className="w-12 h-[1px] bg-white mt-4" />
               <p className="text-gray-400 text-lg md:text-xl font-light">Swipe or Scroll to explore the artifacts.</p>
            </div>
          </div>

          {/* PROJECT CARDS */}
          {projects.map((project, index) => (
            <div key={index} className="w-[85vw] sm:w-[75vw] md:w-[70vw] h-[70vh] md:h-[80vh] shrink-0 px-3 sm:px-6 md:px-10 flex items-center">
              <Tilt 
                tiltMaxAngleX={5} 
                tiltMaxAngleY={5} 
                perspective={1000}
                className="w-full h-[52vh] sm:h-[60vh] md:h-[65vh] group relative"
              >
                {/* CARD INNER */}
                <div className="relative w-full h-full bg-[#0d0d0d] rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-white/5 transition-colors group-hover:border-[#ff8c00]/30 shadow-2xl">
                  
                  {/* IMAGE LAYER */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 z-0"
                  >
                    <img src={project.img} className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-500" alt={project.title} />
                  </motion.div>

                  {/* CONTENT LAYER */}
                  <div className="relative z-10 p-6 md:p-16 flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start">
                      <span className="text-[#ff8c00] font-mono tracking-widest text-base md:text-lg">0{index + 1}</span>
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {project.tech.map((t, i) => (
                          <span key={i} className="px-2.5 py-0.5 md:px-3 md:py-1 border border-white/20 rounded-full text-[9px] md:text-[10px] uppercase tracking-tighter backdrop-blur-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-2 uppercase group-hover:tracking-wider transition-all duration-500">
                        {project.title}
                      </h5>
                      <p className="text-base md:text-xl text-gray-300 font-light italic">{project.category}</p>
                      
                      <button className="mt-6 px-6 py-2.5 bg-white text-black font-bold rounded-full text-xs md:text-base translate-y-0 opacity-100 md:translate-y-20 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-3">
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
          <div className="w-[80vw] md:w-[50vw] shrink-0 flex items-center justify-center px-4">
            <div className="text-center">
               <h2 className="text-3xl md:text-5xl font-bold mb-10">Thinking of the <br/> next big thing?</h2>
               <a href="mailto:sumitsahu5328@gmail.com" className="relative group inline-block">
                  <div className="absolute -inset-4 bg-[#ff8c00] rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity" />
                  <span className="text-4xl md:text-[8rem] font-black underline decoration-[#ff8c00]">HIRE ME</span>
               </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
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