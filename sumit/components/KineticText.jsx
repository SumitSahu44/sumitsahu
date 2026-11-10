"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import MaskedHeading from "@/components/MaskedHeading";

export default function KineticText() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const text = section.querySelector("[data-masked-text]");
    const motion = gsap.matchMedia();

    motion.add("(prefers-reduced-motion: no-preference)", () => {
      // Keep the measured text in normal flow so it aligns with the video mask.
      gsap.fromTo(text.children, { color: "#a39a91" }, {
        color: "rgba(163, 154, 145, 0)",
        duration: 0.28,
        stagger: 0.08,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${section.clientHeight * (section.clientWidth < 640 ? 0.75 : 1)}`,
          pin: true,
          scrub: true,
        },
      });
    });

    return () => motion.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="digital-philosophy-heading"
      className="relative isolate grid min-h-[100svh] w-full place-items-center overflow-hidden border-y border-white/[0.07] bg-[#050505] px-4 py-16 sm:px-6 md:px-12 md:py-32"
    >
      <div className="w-full max-w-6xl">
        <MaskedHeading
          id="digital-philosophy-heading"
          text="CODE IS NOT JUST LOGIC. IT IS AN ART OF POSSIBILITIES."
          mediaType="video"
          src="https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4"
          poster="/images/Hero-back.jpg"
          reveal="none"
          textScale={0.084}
          mobileTextScale={0.105}
          lineHeight={1}
          weight={900}
          tracking={-0.045}
          parallax={0}
          drift={0}
          saturation={1.2}
          brightness={1.25}
          className="isolate text-[#ffe6cc] [&>[data-masked-media]]:-z-10"
        />
      </div>

      <div aria-hidden="true" className="absolute right-4 bottom-[max(1.25rem,env(safe-area-inset-bottom))] flex items-center gap-3 md:right-12 md:bottom-12 md:gap-4">
        <span className="h-px w-12 bg-white/20 md:w-20" />
        <span className="font-mono text-[10px] tracking-widest text-[#ff8c00] uppercase">Sumit Sahu Edition</span>
      </div>
    </section>
  );
}
