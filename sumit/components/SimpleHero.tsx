"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue, useMotionTemplate, useTransform, animate } from "framer-motion";

const SimpleHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  // Get screen dimensions on mount & resize
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Motion values for cursor coordinates
  const mouseX = useMotionValue(960);
  const mouseY = useMotionValue(540);
  const maskSize = useMotionValue(130);

  // Springs for silky smooth tracking
  const springConfig = { damping: 35, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Center the spotlight position initially on client mount
  useEffect(() => {
    mouseX.set(dimensions.width / 2);
    mouseY.set(dimensions.height / 2);
  }, [dimensions.width, dimensions.height]);

  // Parallax translation offsets based on cursor coordinates for subtle depth
  const bgX = useTransform(smoothX, [0, dimensions.width], [-10, 10]);
  const bgY = useTransform(smoothY, [0, dimensions.height], [-10, 10]);
  
  const textX = useTransform(smoothX, [0, dimensions.width], [-15, 15]);
  const textY = useTransform(smoothY, [0, dimensions.height], [-15, 15]);

  const rightTextX = useTransform(smoothX, [0, dimensions.width], [-10, 10]);
  const rightTextY = useTransform(smoothY, [0, dimensions.height], [-10, 10]);

  // Spotlight overlay gradient
  const spotlightGlow = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(255, 140, 0, 0.08), transparent 80%)`;

  // Autoplay/Breathing animation loop when mouse is idle
  useEffect(() => {
    let controlsX: any;
    let controlsY: any;

    if (!isHovered) {
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      // Drifts spotlight smoothly around the center of the screen
      controlsX = animate(mouseX, [mouseX.get(), centerX, centerX + 100, centerX - 100, centerX], {
        duration: 10,
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        ease: "easeInOut",
      });

      controlsY = animate(mouseY, [mouseY.get(), centerY, centerY - 50, centerY + 70, centerY], {
        duration: 12,
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        ease: "easeInOut",
      });
    }

    return () => {
      controlsX?.stop();
      controlsY?.stop();
    };
  }, [isHovered, dimensions.width, dimensions.height]);

  // Interactive HTML5 Canvas Particle Grid System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      ox: number;
      oy: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];

      const gap = 48; // Spacing between dots
      for (let x = gap / 2; x < canvas.width; x += gap) {
        for (let y = gap / 2; y < canvas.height; y += gap) {
          const isAccent = Math.random() > 0.92;
          particles.push({
            x,
            y,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0,
            size: isAccent ? Math.random() * 1.5 + 1.0 : Math.random() * 0.8 + 0.4,
            color: isAccent ? "rgba(255, 140, 0, 0.3)" : "rgba(255, 255, 255, 0.08)"
          });
        }
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mx = mouseX.get();
      const my = mouseY.get();

      particles.forEach((p) => {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Repel particles when cursor gets close
        const forceRadius = 150;
        if (dist < forceRadius) {
          const force = (forceRadius - dist) / forceRadius;
          const angle = Math.atan2(dy, dx);
          const rx = -Math.cos(angle) * force * 5.0;
          const ry = -Math.sin(angle) * force * 5.0;
          p.vx += rx;
          p.vy += ry;
        }

        // Spring force pulling particles back to original positions
        const spring = 0.07;
        const friction = 0.84;
        p.vx += (p.ox - p.x) * spring;
        p.vy += (p.oy - p.y) * spring;

        p.vx *= friction;
        p.vy *= friction;
        p.x += p.vx;
        p.y += p.vy;

        // Render dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    init();
    animateParticles();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [dimensions.width, dimensions.height]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#050505] cursor-none flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* --- Fullscreen Back Image (Parallax Depth) --- */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ x: bgX, y: bgY, scale: 1.05 }}
      >
        <Image
          src="/images/Hero-back.jpg"
          alt="Sumit Sahu Portrait Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none"
        />
        {/* Subtle Vignette & Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </motion.div>

      {/* --- Interactive HTML5 Canvas Particle Grid --- */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none w-full h-full"
      />

      {/* --- Dynamic Backlight Glow (Follows cursor) --- */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: spotlightGlow }}
      />

      {/* --- Main Responsive Flex Grid for Overlays --- */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 z-20 flex flex-col md:flex-row items-start md:items-center justify-between h-full pt-28 pb-32 md:py-0 gap-8 md:gap-0">
        
        {/* --- Left Side: Title --- */}
        <motion.div
          className="w-full md:w-[50%] select-none pointer-events-auto flex flex-col text-left"
          style={{ x: textX, y: textY }}
        >
          <span className="hero-tagline text-white/80 font-mono text-sm md:text-base tracking-[0.2em] mb-4 block uppercase font-medium opacity-0">
            Hey, I'm a
          </span>
          <h1 className="text-6xl sm:text-8xl md:text-[7.5rem] lg:text-[9.5rem] font-black text-white leading-[0.82] tracking-tighter uppercase flex flex-col">
            <span className="overflow-hidden block py-1">
              <span className="hero-title-line inline-block">Design</span>
            </span>
            <span className="overflow-hidden block py-1">
              <span className="hero-title-line inline-block">Manager</span>
            </span>
          </h1>
        </motion.div>

        {/* --- Right Side: Description --- */}
        <motion.div
          className="hero-desc w-full md:w-[32%] md:max-w-xs select-none pointer-events-auto flex flex-col text-left opacity-0 mt-auto md:mt-0"
          style={{ x: rightTextX, y: rightTextY }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-4 tracking-tight">
            Great design should <br className="hidden md:block" /> feel invisible.
          </h2>
          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed">
            From logo to language, I build brands that connect and convert.
          </p>
        </motion.div>

      </div>

      {/* --- Bottom Navigation / Stats Row --- */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 z-20 flex flex-wrap justify-between items-end gap-6 md:gap-4 pointer-events-auto"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-wrap justify-between gap-6 md:gap-4">
          {[
            { num: "#01", title: "Product Design" },
            { num: "#02", title: "Packaging Design" },
            { num: "#03", title: "Photo & Film" },
            { num: "#04", title: "Creative Direction" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col text-left min-w-[120px] md:min-w-0">
              <span className="text-[#ff8c00] font-mono text-[10px] md:text-xs font-black tracking-widest mb-1.5 block">
                {item.num}
              </span>
              <span className="text-white/90 text-[11px] md:text-xs font-semibold uppercase tracking-wider">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* --- Unique Cursor: "The Fluid Ring" --- */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
      >
        {/* Main Circle */}
        <motion.div 
          animate={{ 
            scale: isHovered ? [1, 1.15, 1] : 0,
            rotate: isHovered ? 360 : 0 
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-14 h-14 border-[1px] border-dashed border-white rounded-full flex items-center justify-center"
        />
        {/* Inner Solid Dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full" />
      </motion.div>
    </section>
  );
};

export default SimpleHero;
