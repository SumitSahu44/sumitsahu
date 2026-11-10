"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const VideoRevealSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pill = pillRef.current;
    const spacer = spacerRef.current;
    const section = sectionRef.current;
    const text = textRef.current;
    if (!pill || !spacer || !section || !text) return;

    // Layout offsets keep the starting position independent of the scroll scale.
    const pillStart = {
      left: () => text.offsetLeft + spacer.offsetLeft + spacer.offsetWidth / 2,
      top: () => text.offsetTop + spacer.offsetTop + spacer.offsetHeight / 2,
      width: () => spacer.offsetWidth,
      height: () => spacer.offsetHeight,
      "--video-radius": () => `${spacer.offsetHeight / 2}px`,
      xPercent: -50,
      yPercent: -50,
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${section.clientHeight * (section.clientWidth < 640 ? 1 : 1.5)}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const nav = document.querySelector(".nav-container") as HTMLElement;
            if (nav) {
              if (self.isActive && self.progress > 0.7) {
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

      // Fade + shrink the headline text
      tl.to(text, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power2.inOut",
      }, 0)
        // Expand pill to cover full viewport
        .fromTo(pill, pillStart, {
          width: () => section.clientWidth,
          height: () => section.clientHeight,
          left: () => section.clientWidth / 2,
          top: () => section.clientHeight / 2,
          "--video-radius": "0px",
          xPercent: -50,
          yPercent: -50,
          duration: 1.0,
          ease: "power2.inOut",
        }, 0);
    }, sectionRef);

    return () => {
      ctx.revert();
      const nav = document.querySelector(".nav-container") as HTMLElement;
      if (nav) { nav.style.opacity = "1"; nav.style.pointerEvents = ""; }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="building-systems"
      className="relative flex h-[100svh] w-full items-center select-none bg-[#050505]"
      style={{ overflow: "clip" }}
    >
      <div
        ref={textRef}
        className="pointer-events-none relative z-10 flex w-full justify-center px-4"
      >
        <h2 className="flex flex-col items-center whitespace-nowrap font-sans text-[clamp(1.5rem,8.8vw,90px)] leading-none font-black tracking-tighter text-white uppercase">
          <span>BUILDING SYSTEMS</span>
          <span className="mt-1 flex items-center gap-[0.28em]">
            <span>THAT</span>
            <span ref={spacerRef} aria-hidden="true" className="block h-[0.95em] w-[2.6em] shrink-0" />
            <span>WORK</span>
          </span>
        </h2>
      </div>

      {/* Video Pill — absolutely positioned, synced to spacer, expands on scroll */}
      <div
        ref={pillRef}
        className="absolute z-[60] size-0 overflow-hidden border border-white/10 bg-black shadow-[0_0_60px_rgba(0,0,0,0.9)]"
        style={{ borderRadius: "var(--video-radius, 0px)" }}
      >
        <video
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

    </section>
  );

};

export default VideoRevealSection;
