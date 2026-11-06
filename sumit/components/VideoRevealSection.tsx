"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const VideoRevealSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pill = pillRef.current;
    const spacer = spacerRef.current;
    const section = sectionRef.current;
    if (!pill || !spacer || !section) return;

    // Get the exact position of the spacer element to place pill perfectly
    const syncPillToSpacer = () => {
      const rect = spacer.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      gsap.set(pill, {
        left: rect.left - sectionRect.left + rect.width / 2,
        top: rect.top - sectionRect.top + rect.height / 2,
        xPercent: -50,
        yPercent: -50,
        width: rect.width,
        height: rect.height,
        transformOrigin: "center center",
      });
    };

    syncPillToSpacer();
    window.addEventListener("resize", syncPillToSpacer);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const nav = document.querySelector(".nav-container") as HTMLElement;
            if (nav) {
              if (self.progress > 0.7) {
                nav.style.opacity = String(1 - (self.progress - 0.7) / 0.3);
                nav.style.pointerEvents = "none";
              } else {
                nav.style.opacity = "1";
                nav.style.pointerEvents = "";
              }
            }
          },
          onLeave: () => {
            const nav = document.querySelector(".nav-container") as HTMLElement;
            if (nav) { nav.style.opacity = "1"; nav.style.pointerEvents = ""; }
          },
          onEnterBack: () => {
            const nav = document.querySelector(".nav-container") as HTMLElement;
            if (nav) { nav.style.opacity = "1"; nav.style.pointerEvents = ""; }
          },
        },
      });

      // Fade out header and bottom text
      tl.to([headerRef.current, descRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.25,
        stagger: 0.05,
        ease: "power2.inOut",
      }, 0)
        // Fade + shrink the headline text
        .to(textRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          ease: "power2.inOut",
        }, 0)
        // Expand pill to cover full viewport
        .to(pill, {
          width: "100vw",
          height: "100vh",
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          duration: 1.0,
          ease: "power2.inOut",
        }, 0)
        // Remove border radius simultaneously
        .to(pill, {
          borderRadius: "0px",
          duration: 0.85,
          ease: "power2.in",
        }, 0.15);
    }, sectionRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", syncPillToSpacer);
      const nav = document.querySelector(".nav-container") as HTMLElement;
      if (nav) { nav.style.opacity = "1"; nav.style.pointerEvents = ""; }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#050505] flex items-center select-none"
      style={{ overflow: "clip" }}
    >
      {/* 1. Header Tagline — top bar */}
      <div
        ref={headerRef}
        className="absolute top-12 left-0 w-full flex justify-between px-6 md:px-16 text-[9px] md:text-xs font-mono tracking-[0.3em] text-white/40 uppercase z-10 pointer-events-none"
      >
        <span>SUMIT SAHU — PORTFOLIO</span>
        <span>CREATIVE ENGINEER</span>
      </div>

      {/* 2. Left-aligned Headline Typography */}
      <div
        ref={textRef}
        className="relative z-10 w-full flex flex-col items-start px-6 md:px-16 lg:px-24 pointer-events-none"
      >
        <h2 className="font-sans font-black text-[9vw] lg:text-[90px] leading-[1.0] uppercase tracking-tighter text-white whitespace-nowrap">
          BUILDING SYSTEMS
        </h2>
        <div className="font-sans font-black text-[9vw] lg:text-[90px] leading-[1.0] uppercase tracking-tighter text-white flex items-center gap-[2.5vw] lg:gap-[28px] mt-1">
          <span>THAT</span>
          {/* Invisible spacer — pill overlays exactly here */}
          <div
            ref={spacerRef}
            className="w-[22vw] h-[8.5vw] lg:w-[240px] lg:h-[90px] rounded-full pointer-events-none flex-shrink-0"
          />
          <span>WORK</span>
        </div>
      </div>

      {/* 3. Video Pill — absolutely positioned, synced to spacer, expands on scroll */}
      <div
        ref={pillRef}
        className="absolute z-[60] overflow-hidden bg-black shadow-[0_0_60px_rgba(0,0,0,0.9)]"
        style={{
          borderRadius: "4.5vw",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <video
          ref={videoRef}
          src="https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ transform: "scale(1.08)" }}
        />
        {/* Inner vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* 4. Bottom Footer Info */}
      <div
        ref={descRef}
        className="absolute bottom-10 left-0 w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-16 text-[9px] md:text-xs font-mono tracking-[0.25em] text-white/35 gap-2 z-10 pointer-events-none"
      >
        <span>© 2026 / INDORE, IN</span>
        <span>FULL-STACK ARCHITECTURE &amp; INTERACTIVE DESIGN</span>
      </div>
    </section>
  );

};

export default VideoRevealSection;
