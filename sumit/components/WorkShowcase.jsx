"use client";

import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { ArrowUpRight } from "lucide-react";

const WorkShowcase = () => {
  const projects = [
    {
      title: "Deshi Tokri",
      category: "E-Commerce",
      img: "https://images.unsplash.com/photo-1610348725531-843dff163e2c?auto=format&fit=crop&w=1200&q=80",
      url: "https://deshitokri.com",
      span: "md:col-span-2",
      themeColor: "#22c55e",
      glowColor: "rgba(34, 197, 94, 0.12)",
    },
    {
      title: "Medverz Education",
      category: "EdTech",
      img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
      url: "https://medverzeducation.com",
      span: "md:col-span-1",
      themeColor: "#3b82f6",
      glowColor: "rgba(59, 130, 246, 0.12)",
    },
    {
      title: "Growvia Digital",
      category: "Marketing",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      url: "https://growviadigitalmarketing.com",
      span: "md:col-span-1",
      themeColor: "#ec4899",
      glowColor: "rgba(236, 72, 153, 0.12)",
    },
    {
      title: "Five Hands",
      category: "Studio",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      url: "https://fivehands.co",
      span: "md:col-span-2",
      themeColor: "#a855f7",
      glowColor: "rgba(168, 85, 247, 0.12)",
    },
    {
      title: "Astavakra",
      category: "Wellness",
      img: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80",
      url: "https://astavakra.com/",
      span: "md:col-span-1",
      themeColor: "#f97316",
      glowColor: "rgba(249, 115, 22, 0.12)",
    },
    {
      title: "Dreamy Design",
      category: "Design",
      img: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=1200&q=80",
      url: "https://dreamydesign.co.in/",
      span: "md:col-span-1",
      themeColor: "#06b6d4",
      glowColor: "rgba(6, 182, 212, 0.12)",
    },
    {
      title: "Jeevan Shaadi",
      category: "Matrimony",
      img: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&w=1200&q=80",
      url: "https://jeevanshaadi.com",
      span: "md:col-span-1",
      themeColor: "#ef4444",
      glowColor: "rgba(239, 68, 68, 0.12)",
    },
  ];

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  };

  const handleCardClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  return (
    <section className="bg-[#050505] py-24 md:py-36 text-white selection:bg-[#ff8c00] overflow-hidden relative">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ff8c00]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#ff8c00] animate-pulse" />
              <span className="text-[#ff8c00] text-xs font-mono uppercase tracking-[0.25em]">
                Selected Work
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">
              Featured <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">Showcase</span>
            </h2>
          </div>
          
          <div className="max-w-md">
            <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed">
              A gallery of live production websites. Move your cursor over a card to experience the interactives and click to open the site.
            </p>
          </div>
        </div>

        {/* BENTO GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`${project.span} h-[380px] md:h-[450px] cursor-none group relative`}
            >
              <Tilt
                tiltMaxAngleX={4}
                tiltMaxAngleY={4}
                perspective={1200}
                scale={1.01}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor="#ffffff"
                glarePosition="all"
                className="w-full h-full"
              >
                {/* CARD OUTER WRAPPER WITH GLOW BORDER */}
                <div
                  onClick={() => handleCardClick(project.url)}
                  onMouseMove={handleMouseMove}
                  className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/5 group-hover:border-white/15 shadow-2xl transition-all duration-500 flex flex-col justify-between p-6 md:p-8 select-none"
                  style={{
                    WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                    transform: "translate3d(0, 0, 0)",
                    isolation: "isolate",
                  }}
                >
                  {/* Hover Light Spot Follow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                    style={{
                      background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), ${project.glowColor}, transparent 45%)`
                    }}
                  />

                  {/* HIGH OPACITY IMAGE BACKGROUND */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {/* Softer and shorter bottom gradient for typography legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <img 
                      src={project.img} 
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out" 
                      alt={project.title} 
                      loading="lazy"
                    />
                  </div>

                  {/* CUSTOM HOVER CURSOR ARROW */}
                  <div
                    className="hidden md:flex absolute pointer-events-none w-12 h-12 rounded-full items-center justify-center font-bold text-black opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 z-50 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-black/40"
                    style={{
                      left: "var(--mx, 50%)",
                      top: "var(--my, 50%)",
                      backgroundColor: project.themeColor,
                      willChange: "left, top",
                      transition: "left 0.1s cubic-bezier(0.25, 1, 0.5, 1), top 0.1s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease, transform 0.25s ease",
                    }}
                  >
                    <ArrowUpRight className="w-5 h-5 text-black" strokeWidth={2.5} />
                  </div>

                  {/* SUBTLE CARD HEADER (NUM ONLY) */}
                  <div className="relative z-20 flex justify-between items-center">
                    <span className="text-[10px] font-mono tracking-widest text-white/30 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/5">
                      0{index + 1}
                    </span>
                  </div>

                  {/* MINIMALIST BOTTOM CONTENT */}
                  <div className="relative z-20 flex items-end justify-between gap-4 mt-auto">
                    <div className="space-y-0.5">
                      <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.25em] text-white/50 block">
                        {project.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider group-hover:text-[#ff8c00] transition-colors duration-300 leading-none">
                        {project.title}
                      </h3>
                    </div>
                    
                    {/* Mobile/Tablet fallback indicator */}
                    <div 
                      className="flex md:hidden w-8 h-8 rounded-full items-center justify-center shrink-0 shadow-lg"
                      style={{ backgroundColor: project.themeColor }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-black" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* NOISE OVERLAY */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-30" />
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-20 md:mt-32 text-center relative z-20">
          <p className="text-gray-400 text-sm font-mono tracking-widest uppercase mb-4">Want to start a project?</p>
          <a 
            href="mailto:sumitsahu5328@gmail.com" 
            className="group relative inline-flex items-center gap-3 text-2xl md:text-4xl font-black uppercase tracking-tight hover:text-[#ff8c00] transition-colors duration-300"
          >
            Let's build something epic
            <span className="inline-block transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
              <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-[#ff8c00]" strokeWidth={2.5} />
            </span>
            <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#ff8c00] to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default WorkShowcase;