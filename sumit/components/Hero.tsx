"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue, useMotionTemplate, useTransform, animate } from "framer-motion";

const SumitHero = () => {
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
  const maskSize = useMotionValue(180);

  // Springs for silky smooth tracking
  const springConfig = { damping: 35, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothSize = useSpring(maskSize, springConfig);

  // Center the spotlight position initially on client mount
  useEffect(() => {
    mouseX.set(dimensions.width / 2);
    mouseY.set(dimensions.height / 2);
  }, [dimensions.width, dimensions.height]);

  // Parallax translation offsets based on cursor coordinates
  const bgX = useTransform(smoothX, [0, dimensions.width], [-12, 12]);
  const bgY = useTransform(smoothY, [0, dimensions.height], [-12, 12]);

  const textX = useTransform(smoothX, [0, dimensions.width], [-24, 24]);
  const textY = useTransform(smoothY, [0, dimensions.height], [-24, 24]);

  const badgeX = useTransform(smoothX, [0, dimensions.width], [-36, 36]);
  const badgeY = useTransform(smoothY, [0, dimensions.height], [-36, 36]);

  // Apple-like 3D Card Tilt transforms
  const cardRotateX = useTransform(smoothY, [0, dimensions.height], [12, -12]);
  const cardRotateY = useTransform(smoothX, [0, dimensions.width], [-12, 12]);

  // Motion templates for masking and lighting (avoids React re-renders)
  const maskImage = useMotionTemplate`radial-gradient(circle ${smoothSize}px at ${smoothX}px ${smoothY}px, black 100%, transparent 0%)`;
  const spotlightGlow = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(255, 140, 0, 0.08), transparent 80%)`;

  // Autoplay/Breathing animation loop when mouse is idle or on mobile (no hover)
  useEffect(() => {
    let controlsX: any;
    let controlsY: any;
    let controlsSize: any;

    if (!isHovered) {
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      // Drifts spotlight smoothly around the center of the screen
      controlsX = animate(mouseX, [mouseX.get(), centerX, centerX + 120, centerX - 120, centerX], {
        duration: 10,
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        ease: "easeInOut",
      });

      controlsY = animate(mouseY, [mouseY.get(), centerY, centerY - 60, centerY + 80, centerY], {
        duration: 12,
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        ease: "easeInOut",
      });

      // Gently pulses the spotlight size
      controlsSize = animate(maskSize, [180, 210, 170, 180], {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      });
    } else {
      // Expand mask size slightly on hover
      maskSize.set(220);
    }

    return () => {
      controlsX?.stop();
      controlsY?.stop();
      controlsSize?.stop();
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
          // 92% White dots, 8% Accent Orange dots
          const isAccent = Math.random() > 0.92;
          particles.push({
            x,
            y,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0,
            size: isAccent ? Math.random() * 1.5 + 1.0 : Math.random() * 0.8 + 0.4,
            color: isAccent ? "rgba(255, 140, 0, 0.45)" : "rgba(255, 255, 255, 0.12)"
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
          // Push away velocity
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

        // Apply friction and move
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
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const badges = [
    { name: "⚡ Next.js / React", x: "15%", y: "20%", delay: "0s" },
    { name: "🚀 MERN Stack", x: "78%", y: "15%", delay: "1.5s" },
    { name: "👑 Team Lead", x: "74%", y: "65%", delay: "3s" },
    { name: "🎨 GSAP & Motion", x: "12%", y: "70%", delay: "4.5s" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#050505] cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* --- Interactive HTML5 Canvas Particle Grid --- */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      />

      {/* --- Dynamic Backlight Glow (Follows cursor) --- */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: spotlightGlow }}
      />

      {/* --- Layer 1: Base (B&W Grayscale Look - Optimized JPG) --- */}
      <motion.div
        className="absolute inset-0 z-0 grayscale opacity-25 pointer-events-none transition-transform duration-300 ease-out"
        style={{ x: bgX, y: bgY, scale: 1.02 }}
      >
        <Image
          src="/images/Hero-front.jpg"
          alt="Sumit Sahu Grayscale Base"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none"
        />
      </motion.div>

      {/* --- Layer 2: Reveal (Color Look - Optimized JPG with Mask) --- */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          x: bgX,
          y: bgY,
          scale: 1.02
        }}
      >
        <Image
          src="/images/Hero-back.jpg"
          alt="Sumit Sahu Color Reveal"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none"
        />
      </motion.div>

      {/* --- Interactive Floating Badges (Parallax Depth) --- */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {badges.map((badge, idx) => (
          <motion.div
            key={idx}
            className="absolute pointer-events-auto floating-badge hidden md:block"
            style={{
              left: badge.x,
              top: badge.y,
              x: badgeX,
              y: badgeY,
              animationDelay: badge.delay,
            }}
          >
            <div className="px-5 py-2.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl text-xs font-mono font-bold tracking-wider text-white/80 hover:text-white hover:border-[#ff8c00]/40 hover:shadow-[0_0_25px_rgba(255,140,0,0.15)] transition-all duration-300 transform active:scale-95 cursor-pointer">
              {badge.name}
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- Content: Left Title + Right Stats Card (Below Navbar, Aligned with Logo) --- */}
      <motion.div
        className="absolute inset-0 z-20 flex items-start justify-between px-6 md:px-12 pt-24 md:pt-28 pointer-events-none"
        style={{ x: textX, y: textY }}
      >
        {/* LEFT: Main Title — aligned with navbar logo */}
        <div className="max-w-2xl select-none pointer-events-auto">
          <span className="hero-tagline text-[#ff8c00] font-mono text-xs md:text-sm mb-4 block tracking-[0.35em] opacity-0 uppercase font-semibold">
            MERN STACK DEVELOPER & TEAM LEAD
          </span>
          <h1 className="text-6xl sm:text-7xl md:text-9xl font-black text-white leading-[0.85] uppercase flex flex-col tracking-tighter">
            <span className="overflow-hidden block py-1">
              <span className="hero-title-line inline-block">Sumit</span>
            </span>
            <span className="overflow-hidden block py-1">
              <span className="hero-title-line inline-block stroke-text hover:text-[#ff8c00] transition-colors duration-500">Sahu</span>
            </span>
          </h1>
          <p className="hero-desc mt-8 text-gray-400 text-sm md:text-base max-w-md font-light leading-relaxed opacity-0">
            Crafting high-end digital experiences with code, performance optimization, and aesthetic precision.
          </p>
        </div>

        {/* RIGHT: 3D-Tilting Glassmorphic Stats Card — vertically centered */}
        <motion.div
          className="hidden sm:block select-none pointer-events-auto flex-shrink-0"
          style={{
            x: badgeX,
            y: badgeY,
            rotateX: cardRotateX,
            rotateY: cardRotateY,
            transformStyle: "preserve-3d",
            perspective: 1000
          }}
        >
          <div className="p-6 bg-black/30 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] w-[260px] hover:border-[#ff8c00]/40 hover:shadow-[0_0_30px_rgba(255,140,0,0.12)] transition-all duration-500">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 bg-[#ff8c00] rounded-full animate-ping" />
              <span className="text-[9px] text-white/50 tracking-[0.2em] font-mono uppercase">Developer Status</span>
            </div>
            <h4 className="text-base font-black text-white tracking-tight mb-0.5">SUMIT SAHU</h4>
            <p className="text-[10px] text-gray-400 font-mono mb-4 uppercase tracking-wider">MERN Stack Architect</p>
            <div className="h-[1px] bg-white/10 my-3.5" />
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-white/60 uppercase">Completed</span>
              <span className="text-[#ff8c00] font-bold">50+ Projects</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono mt-1.5">
              <span className="text-white/60 uppercase">Experience</span>
              <span className="text-[#ff8c00] font-bold">3+ Years</span>
            </div>
          </div>
        </motion.div>
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
          className="w-16 h-16 border-[1px] border-dashed border-white rounded-full flex items-center justify-center"
        />
        {/* Inner Solid Dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full" />

        {/* Floating Label */}
        <motion.span
          animate={{ y: isHovered ? 35 : 20, opacity: isHovered ? 0.8 : 0 }}
          className="absolute text-[9px] text-white font-mono tracking-widest uppercase w-max"
        >
          Explore Reality
        </motion.span>
      </motion.div>

      {/* Scroll Down Mouse Wheel Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[9px] text-white/30 tracking-[0.25em] uppercase font-mono">
          Scroll Down
        </span>
        <div className="w-[20px] h-[32px] border border-white/20 rounded-full flex justify-center p-[4px]">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 bg-[#ff8c00] rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default SumitHero;