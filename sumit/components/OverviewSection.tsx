"use client";
import React from "react";
import { motion } from "framer-motion";
import { Cpu, Layers, Briefcase, ArrowUpRight, Globe, Award } from "lucide-react";

const OverviewSection = () => {
  const stats = [
    { value: "5+ Yrs", label: "Experience", icon: <Briefcase className="w-4 h-4 text-[#ff8c00]" /> },
    { value: "50+", label: "Projects Built", icon: <Cpu className="w-4 h-4 text-[#ff8c00]" /> },
    { value: "100%", label: "Clean Code", icon: <Award className="w-4 h-4 text-[#ff8c00]" /> },
    { value: "Remote", label: "Indore, IN", icon: <Globe className="w-4 h-4 text-[#ff8c00]" /> },
  ];

  const capabilities = [
    {
      num: "01",
      title: "MERN & Next.js Systems",
      desc: "Architecting lightning-fast backends and SEO-optimized frontend systems. Specializing in responsive routing, server components, and secure databases.",
      tags: ["Next.js", "Node.js", "MongoDB", "REST APIs"],
      icon: <Cpu className="w-6 h-6 text-[#ff8c00]" />,
      color: "from-blue-500/10",
    },
    {
      num: "02",
      title: "Creative Frontends & Motion",
      desc: "Breathing life into static mockups with high-performance animations using GSAP and Framer Motion. Optimizing for physical, natural micro-interactions.",
      tags: ["GSAP", "Framer Motion", "UX Physics", "Micro-motion"],
      icon: <Layers className="w-6 h-6 text-[#ff8c00]" />,
      color: "from-[#ff8c00]/10",
    },
    {
      num: "03",
      title: "Technical Team Leadership",
      desc: "Structuring production-ready codebases, facilitating team sprints, conducting rigorous code reviews, and maintaining scalable UI/UX systems.",
      tags: ["Agile Lead", "Systems design", "Clean Engine", "Code Review"],
      icon: <Briefcase className="w-6 h-6 text-[#ff8c00]" />,
      color: "from-purple-500/10",
    },
  ];

  return (
    <section className="relative bg-[#050505] text-white overflow-hidden py-32 px-6 md:px-12 border-b border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff8c00] opacity-[0.02] blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-600/5 opacity-[0.015] blur-[150px] rounded-full pointer-events-none" />

      {/* Grid container */}
      <div className="max-w-7xl mx-auto">
        
        {/* TOP ROW: Title & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Left Column: Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#ff8c00] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.4em] text-white/50">
                OVERVIEW & SERVICES
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.95] text-white max-w-2xl">
              Architecting High-Performance <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#ff8c00]">
                Digital Systems.
              </span>
            </h2>

            <p className="text-white/60 text-sm md:text-base font-light leading-relaxed max-w-xl">
              I bridge the gap between creative visual expression and robust, technical full-stack engineering. By combining Next.js performance optimizations with fluid interaction mechanics, I build scalable systems that feel invisible and run flawlessly.
            </p>
          </motion.div>

          {/* Right Column: Mini Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 grid grid-cols-2 gap-4 w-full"
          >
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="relative overflow-hidden bg-white/[0.01] border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-32 hover:border-[#ff8c00]/25 transition-[border-color] duration-500"
              >
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-white/5 rounded-xl">
                    {stat.icon}
                  </div>
                  <span className="text-[9px] font-mono tracking-wider text-white/20">#{idx + 1}</span>
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl font-black tracking-tight text-white">{stat.value}</div>
                  <div className="text-[10px] font-mono tracking-wider text-white/40 uppercase">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* BOTTOM ROW: Capabilities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilities.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              /* Removed CSS transition-all to prevent jitter loop with Framer Motion whileHover */
              className="group relative rounded-3xl border border-white/10 bg-white/[0.02] p-8 overflow-hidden transition-[border-color,background-color,box-shadow] duration-500 hover:border-[#ff8c00]/30 hover:bg-white/[0.04] hover:shadow-[0_20px_50px_rgba(255,140,0,0.04)] cursor-pointer flex flex-col justify-between min-h-[350px] backdrop-blur-md"
            >
              {/* Backlight gradient hover highlight */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              {/* Upper Part */}
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center">
                  {/* Icon with hover rotation & scale */}
                  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:border-[#ff8c00]/30 group-hover:bg-[#ff8c00]/5">
                    {item.icon}
                  </div>
                  <span className="font-mono text-xs font-semibold text-white/20 group-hover:text-[#ff8c00]/40 transition-colors duration-300">
                    // SERVICE {item.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#ff8c00] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Lower Part */}
              <div className="pt-6 border-t border-white/5 mt-6 relative z-10 flex flex-wrap gap-2 items-center justify-between">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, tagIdx) => (
                    <span 
                      key={tagIdx} 
                      className="px-2.5 py-0.5 border border-white/10 bg-white/5 rounded-full text-[9px] uppercase tracking-wider text-white/60 font-mono transition-colors group-hover:border-[#ff8c00]/20 group-hover:text-[#ff8c00] duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Action Indicator */}
                <div className="text-white/20 group-hover:text-[#ff8c00] transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OverviewSection;
