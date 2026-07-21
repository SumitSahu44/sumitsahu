"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const VideoRevealSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial state setup for the pill and video to prevent layout shifts
    gsap.set(pillRef.current, {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: "center center"
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Animate layout elements during scroll zoom
      tl.to([headerRef.current, descRef.current], {
        opacity: 0,
        y: -30,
        duration: 0.3,
        stagger: 0.1,
        ease: "power2.inOut"
      }, 0)
      .to(textRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.5,
        ease: "power2.inOut"
      }, 0)
      .to(pillRef.current, {
        width: "100vw",
        height: "100vh",
        top: "50%",
        left: "50%",
        duration: 1.0,
        ease: "power2.inOut"
      }, 0)
      .to(pillRef.current, {
        borderRadius: "0px",
        duration: 1.0,
        ease: "power2.in"
      }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden bg-[#050505] flex items-center justify-center select-none"
    >
      {/* 1. PRODUCT-FOCUSED DEVELOPER - Header Tagline */}
      <div 
        ref={headerRef} 
        className="absolute top-12 left-0 w-full flex justify-between px-6 md:px-16 text-[9px] md:text-xs font-mono tracking-[0.3em] text-white/40 uppercase z-10 pointer-events-none"
      >
        <span>SUMIT SAHU — PORTFOLIO</span>
        <span>CREATIVE ENGINEER</span>
      </div>

      {/* 2. Headline Typography Container */}
      <div 
        ref={textRef} 
        className="relative z-10 w-full text-center flex flex-col items-center justify-center px-4 pointer-events-none"
      >
        <h2 className="font-sans font-black text-[8vw] lg:text-[84px] leading-[1.05] uppercase tracking-tighter text-white">
          BUILDING SYSTEMS
        </h2>
        <div className="font-sans font-black text-[8vw] lg:text-[84px] leading-[1.05] uppercase tracking-tighter text-white flex items-center justify-center gap-[3vw] lg:gap-[30px] mt-2">
          <span>THAT</span>
          {/* Spacer to hold the layout position for the overlaying pill */}
          <div className="w-[22vw] h-[9vw] lg:w-[240px] lg:h-[95px] rounded-full pointer-events-none" />
          <span>WORK</span>
        </div>
      </div>

      {/* 3. The Pinned Video Pill Overlay */}
      <div 
        ref={pillRef}
        className="absolute z-20 w-[22vw] h-[9vw] lg:w-[240px] lg:h-[95px] rounded-[4.5vw] lg:rounded-[48px] overflow-hidden bg-black border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-auto video-reveal-pill"
        style={{
          left: "50%",
        }}
      >
        <video
          ref={videoRef}
          src="https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
        />
        {/* Subtle dark vignette overlay inside the video */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* 4. Bottom Tagline / Info Footer */}
      <div 
        ref={descRef} 
        className="absolute bottom-12 left-0 w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-16 text-[9px] md:text-xs font-mono tracking-[0.25em] text-white/40 gap-2 z-10 pointer-events-none"
      >
        <span>© 2026 / INDORE, IN</span>
        <span>FULL-STACK ARCHITECTURE & INTERACTIVE DESIGN</span>
      </div>
    </section>
  );
};

export default VideoRevealSection;
