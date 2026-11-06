"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "SaaS Dashboard",
    sector: "SaaS / Fintech",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    year: "2024",
    color: "#ff8c00",
    desc: "Real-time analytics platform with role-based access, animated charts, and dark-mode-first UI.",
  },
  {
    id: "02",
    title: "E-Commerce Store",
    sector: "Retail / Fashion",
    tech: ["React", "Node.js", "MongoDB"],
    year: "2024",
    color: "#0ae448",
    desc: "High-converting storefront with smooth cart UX, Razorpay integration, and custom CMS.",
  },
  {
    id: "03",
    title: "Agency Portfolio",
    sector: "Creative Agency",
    tech: ["Next.js", "GSAP", "Three.js"],
    year: "2023",
    color: "#9d95ff",
    desc: "Award-worthy agency site with WebGL transitions, scroll-driven reveals, and cinematic feel.",
  },
  {
    id: "04",
    title: "Restaurant Platform",
    sector: "Food & Hospitality",
    tech: ["React", "Express", "MySQL"],
    year: "2023",
    color: "#fec5fb",
    desc: "Table-booking system + online ordering with real-time kitchen dashboard and delivery tracking.",
  },
  {
    id: "05",
    title: "EdTech LMS",
    sector: "Education",
    tech: ["Next.js", "Prisma", "Node.js"],
    year: "2024",
    color: "#00bae2",
    desc: "Full-featured learning management system with video streaming, quizzes, and progress tracking.",
  },
];

// Magnetic cursor effect on each row
function ProjectRow({ project, index }) {
  const rowRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const isInView = useInView(rowRef, { once: true, margin: "-60px" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const cursorY = useSpring(mouseY, { damping: 20, stiffness: 300 });

  const handleMouseMove = (e) => {
    const rect = rowRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group border-b border-white/[0.07] cursor-none"
    >
      {/* Row content */}
      <div className="flex items-center justify-between px-6 md:px-12 py-7 md:py-9 gap-6">
        {/* Index */}
        <span
          className="font-mono text-[11px] tracking-widest text-white/20 flex-shrink-0 w-8 transition-colors duration-300"
          style={{ color: hovered ? project.color : undefined }}
        >
          {project.id}
        </span>

        {/* Title */}
        <h3
          className="font-black uppercase text-white text-2xl md:text-4xl lg:text-5xl tracking-tighter flex-1 transition-colors duration-300"
          style={{ color: hovered ? project.color : "rgba(255,255,255,0.9)" }}
        >
          {project.title}
        </h3>

        {/* Sector tag — hidden on mobile */}
        <span className="hidden md:block font-mono text-[11px] tracking-[0.18em] uppercase text-white/30 flex-shrink-0 w-40 text-right group-hover:text-white/60 transition-colors duration-300">
          {project.sector}
        </span>

        {/* Year */}
        <span className="font-mono text-xs text-white/20 flex-shrink-0 group-hover:text-white/50 transition-colors duration-300">
          {project.year}
        </span>

        {/* Arrow */}
        <motion.span
          animate={{ x: hovered ? 0 : -6, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-lg flex-shrink-0"
          style={{ color: project.color }}
        >
          ↗
        </motion.span>
      </div>

      {/* Hover reveal: description strip */}
      <motion.div
        animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden px-6 md:px-12"
      >
        <div className="pb-7 flex flex-wrap items-center gap-6">
          <p className="text-white/45 text-sm font-light leading-relaxed max-w-xl">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-2 ml-auto">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[9px] tracking-widest uppercase px-3 py-1.5 rounded-full border"
                style={{ borderColor: project.color + "44", color: project.color }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Magnetic floating cursor dot */}
      {hovered && (
        <motion.div
          className="absolute top-0 left-0 pointer-events-none z-20 w-3 h-3 rounded-full"
          style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%", backgroundColor: project.color }}
        />
      )}

      {/* Left accent line on hover */}
      <motion.div
        className="absolute left-0 top-0 w-[3px] rounded-r-full"
        animate={{ height: hovered ? "100%" : "0%", opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: project.color }}
      />
    </motion.div>
  );
}

export default function ProjectsSection() {
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-[#050505] text-white overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff8c00] opacity-[0.025] blur-[120px] rounded-full pointer-events-none" />

      {/* ── Section Header ── */}
      <div
        ref={headingRef}
        className="px-6 md:px-12 pt-24 pb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.06]"
      >
        <div>
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff8c00]" />
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-white/40">
              Selected Work
            </span>
          </motion.div>

          {/* Big heading */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 100 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-black uppercase tracking-tighter leading-[0.88] text-white"
              style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
            >
              What I&apos;ve
              <br />
              <span className="text-[#ff8c00]">Built</span>
            </motion.h2>
          </div>
        </div>

        {/* Right side descriptor */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/35 font-light text-sm leading-relaxed max-w-xs md:text-right"
        >
          Websites built across industries — each one crafted with performance, animation, and pixel-level precision.
        </motion.p>
      </div>

      {/* ── Project Rows ── */}
      <div>
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="px-6 md:px-12 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/[0.06]"
      >
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/20">
          50+ Projects Delivered
        </span>
        <a
          href="mailto:sumitsahu5328@gmail.com"
          className="group flex items-center gap-4 font-mono text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors duration-300"
        >
          <span>Start a Project</span>
          <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-[#ff8c00]">
            ↗
          </span>
        </a>
      </motion.div>

    </section>
  );
}
