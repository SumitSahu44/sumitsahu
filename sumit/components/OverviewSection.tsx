"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Layers,
  Briefcase,
  ArrowUpRight,
  Globe,
  Award,
  Sparkles,
  Zap,
  Palette,
  Code2,
  Terminal,
  Compass,
  CheckCircle2,
  Sliders,
  Eye
} from "lucide-react";

const OverviewSection = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tickerItems = [
    "PRODUCT DESIGN",
    "BRAND IDENTITY",
    "UX ARCHITECTURE",
    "MOTION PHYSICS",
    "NEXT.JS FULL-STACK",
    "DESIGN SYSTEMS",
    "CREATIVE DIRECTION",
  ];

  const stats = [
    { value: "05+", label: "Years Experience", detail: "Product & UI/UX", icon: <Briefcase className="w-4 h-4 text-[#ff8c00]" /> },
    { value: "50+", label: "Projects Delivered", detail: "Global Clients", icon: <Globe className="w-4 h-4 text-[#ff8c00]" /> },
    { value: "99%", label: "Client Satisfaction", detail: "Awwwards Standard", icon: <Award className="w-4 h-4 text-[#ff8c00]" /> },
    { value: "100%", label: "Code Quality", detail: "Clean Architecture", icon: <Cpu className="w-4 h-4 text-[#ff8c00]" /> },
  ];

  const capabilities = [
    {
      num: "01",
      badge: "CORE MASTERY",
      title: "Product Design & UX Systems",
      desc: "Transforming complex business logic into intuitive, human-centered digital products. I design bulletproof UI systems, micro-interactions, and visual guidelines scaled for growth.",
      tags: ["Figma Systems", "UX Research", "Wireframing", "Design Tokens", "Prototyping"],
      icon: <Palette className="w-6 h-6 text-[#ff8c00]" />,
      accent: "from-amber-500/20 via-[#ff8c00]/10 to-transparent",
      span: "lg:col-span-7",
      previewType: "design_system",
    },
    {
      num: "02",
      badge: "INTERACTION ENGINE",
      title: "Creative Frontends & Physics Motion",
      desc: "Bringing static layouts to life with fluid 60fps motion physics, GSAP timelines, and Framer Motion orchestrations that captivate users.",
      tags: ["GSAP", "Framer Motion", "Three.js / Canvas", "Tailwind CSS"],
      icon: <Zap className="w-6 h-6 text-[#ff8c00]" />,
      accent: "from-orange-500/20 via-yellow-500/10 to-transparent",
      span: "lg:col-span-5",
      previewType: "motion",
    },
    {
      num: "03",
      badge: "BRAND STRATEGY",
      title: "Brand Identity & Visual Language",
      desc: "Building memorable visual identities that stand out in crowded markets. From typography hierarchies to iconic logomarks and design direction.",
      tags: ["Visual Identity", "Brand Guidelines", "Art Direction", "Typography"],
      icon: <Compass className="w-6 h-6 text-[#ff8c00]" />,
      accent: "from-red-500/20 via-[#ff8c00]/10 to-transparent",
      span: "lg:col-span-5",
      previewType: "brand",
    },
    {
      num: "04",
      badge: "ENGINEERING",
      title: "Full-Stack Architecture & Scale",
      desc: "Architecting enterprise Next.js applications, serverless APIs, and lightning-fast frontends built with clean modular code structure.",
      tags: ["Next.js 14", "React", "TypeScript", "Node.js", "REST / GraphQL"],
      icon: <Code2 className="w-6 h-6 text-[#ff8c00]" />,
      accent: "from-[#ff8c00]/20 via-orange-600/10 to-transparent",
      span: "lg:col-span-7",
      previewType: "code",
    },
  ];

  return (
    <section className="relative bg-[#050505] text-white overflow-hidden py-24 md:py-36 border-b border-white/10 select-none">

      {/* Dynamic Ambient Backlight Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#ff8c00] opacity-[0.035] blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-600/5 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02] pointer-events-none" />

      {/* --- 1. CONTINUOUS BRAND MARQUEE TICKER --- */}
      <div className="w-full overflow-hidden border-y border-white/10 bg-white/[0.015] py-4 mb-20 md:mb-28 backdrop-blur-md">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite]">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 mx-6">
              <span className="text-xs md:text-sm font-mono tracking-[0.35em] text-white/70 uppercase font-semibold">
                {item}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#ff8c00] opacity-80" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* --- 2. HEADER STATEMENT & STATS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20 md:mb-28">

          {/* Left Side: Brand Manifesto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#ff8c00] animate-pulse" />
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-white/80 font-bold">
                Philosophy & Execution
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] text-white">
              Crafting Iconic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#ff8c00]">
                Brand Systems.
              </span>
            </h2>

            <p className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-2xl">
              I bridge high-end visual design with rigorous full-stack software architecture. Every component, motion curve, and interface layout is engineered to elevate brands into industry leaders.
            </p>

            <div className="pt-2 flex items-center gap-6 text-xs font-mono text-white/50 uppercase tracking-widest">
              <span className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#ff8c00]" /> Product Strategy
              </span>
              <span className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#ff8c00]" /> Design Systems
              </span>
            </div>
          </motion.div>

          {/* Right Side: Glass Stats Cards */}
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
                className="group relative overflow-hidden bg-white/[0.02] border border-white/10 p-6 rounded-2xl flex flex-col justify-between h-36 hover:border-[#ff8c00]/40 hover:bg-white/[0.04] transition-all duration-500 backdrop-blur-md shadow-lg"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff8c00]/5 rounded-full blur-xl group-hover:bg-[#ff8c00]/15 transition-all duration-500 pointer-events-none" />
                <div className="flex justify-between items-start relative z-10">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl group-hover:scale-110 group-hover:border-[#ff8c00]/30 transition-all duration-300">
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-mono tracking-wider text-white/30 font-bold">0{idx + 1}</span>
                </div>
                <div className="space-y-0.5 relative z-10">
                  <div className="text-3xl md:text-4xl font-black tracking-tight text-white group-hover:text-[#ff8c00] transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-semibold text-white/90 uppercase tracking-wide">
                    {stat.label}
                  </div>
                  <div className="text-[9px] font-mono text-white/40 tracking-wider">
                    {stat.detail}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* --- 3. BENTO GRID OF CAPABILITIES & SERVICES --- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.35em] text-white/50 font-bold flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#ff8c00]" /> Specialized Capabilities
            </h3>
            <span className="text-xs font-mono text-white/30 hidden sm:block">
              04 SERVICED DISCIPLINES
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {capabilities.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className={`group relative rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-[#ff8c00]/40 hover:bg-white/[0.035] hover:shadow-[0_20px_50px_rgba(255,140,0,0.06)] backdrop-blur-xl flex flex-col justify-between ${item.span}`}
              >
                {/* Glow Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                {/* Top Section */}
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:border-[#ff8c00]/40 group-hover:bg-[#ff8c00]/10">
                        {item.icon}
                      </div>
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono tracking-widest text-[#ff8c00] font-bold uppercase">
                        {item.badge}
                      </span>
                    </div>
                    <span className="font-mono text-sm font-bold text-white/30 group-hover:text-[#ff8c00]/60 transition-colors">
                      /{item.num}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white group-hover:text-[#ff8c00] transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Interactive Visual Element Widget for Extra Brand Polish */}
                {item.previewType === "design_system" && (
                  <div className="mt-8 mb-4 p-4 rounded-2xl bg-black/40 border border-white/10 relative z-10 grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                      <div className="text-[10px] font-mono text-white/40 mb-1">GRID SYSTEM</div>
                      <div className="text-xs font-bold text-[#ff8c00]">12 COL FLUID</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                      <div className="text-[10px] font-mono text-white/40 mb-1">CONTRAST</div>
                      <div className="text-xs font-bold text-white">AAA RATING</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                      <div className="text-[10px] font-mono text-white/40 mb-1">TOKENS</div>
                      <div className="text-xs font-bold text-[#ff8c00]">DYNAMIC</div>
                    </div>
                  </div>
                )}

                {item.previewType === "motion" && (
                  <div className="mt-8 mb-4 p-4 rounded-2xl bg-black/40 border border-white/10 relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#ff8c00] animate-ping" />
                      <span className="text-xs font-mono text-white/80">60 FPS INTERACTION PHYSICS</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#ff8c00] bg-[#ff8c00]/10 px-2.5 py-1 rounded-md">GSAP 3</span>
                  </div>
                )}

                {item.previewType === "brand" && (
                  <div className="mt-8 mb-4 p-4 rounded-2xl bg-black/40 border border-white/10 relative z-10 flex items-center gap-2 overflow-hidden">
                    <div className="w-6 h-6 rounded-full bg-[#ff8c00]" />
                    <div className="w-6 h-6 rounded-full bg-white" />
                    <div className="w-6 h-6 rounded-full bg-zinc-800 border border-white/20" />
                    <span className="ml-auto text-[10px] font-mono text-white/50 uppercase tracking-widest">SYSTEM PALETTE</span>
                  </div>
                )}

                {item.previewType === "code" && (
                  <div className="mt-8 mb-4 p-4 rounded-2xl bg-black/40 border border-white/10 relative z-10 font-mono text-xs text-white/70 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#ff8c00]" />
                      <span>app/api/systems/route.ts</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded">200 OK</span>
                  </div>
                )}

                {/* Bottom Part */}
                <div className="pt-6 border-t border-white/10 mt-4 relative z-10 flex flex-wrap gap-2 items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-3 py-1 border border-white/10 bg-white/5 rounded-full text-[10px] uppercase tracking-wider text-white/80 font-mono transition-all group-hover:border-[#ff8c00]/30 group-hover:text-white duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-black group-hover:bg-[#ff8c00] group-hover:border-[#ff8c00] transition-all duration-300 transform group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5px]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Tailwind CSS Marquee animation Keyframes helper inline */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
};

export default OverviewSection;
