"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const KineticText = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray(".kinetic-word");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500", // Original scroll length
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animation: Scattering to Perfection (Original broad values)
      tl.fromTo(
        words,
        {
          x: () => (Math.random() - 0.5) * 1000,
          y: () => (Math.random() - 0.5) * 1000,
          z: () => Math.random() * -1000,
          rotationX: () => Math.random() * 360,
          rotationY: () => Math.random() * 360,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          opacity: 1,
          stagger: 0.05,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const sentence = "Code is not just logic it is an art of possibilities";
  const wordsArray = sentence.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-[#050505] flex items-center justify-center overflow-hidden px-4"
      style={{ perspective: "1000px" }}
    >
      {/* Background Subtle Text */}
      <div className="absolute top-10 left-10 opacity-10 select-none">
        <span className="text-white font-mono text-xs md:text-sm tracking-[1em] uppercase">
          Digital Philosophy / {new Date().getFullYear()}
        </span>
      </div>

      {/* Main Kinetic Text Container */}
      <h2
        ref={textRef}
        className="flex flex-wrap justify-center items-center text-center max-w-5xl gap-x-4 md:gap-x-8 gap-y-2"
      >
        {wordsArray.map((word, index) => (
          <span
            key={index}
            className="kinetic-word inline-block text-5xl md:text-8xl font-black uppercase text-white tracking-tighter"
          >
            {word === "art" ? (
              <span className="text-[#ff8c00]">
                {word}
              </span>
            ) : (
              word
            )}
          </span>
        ))}
      </h2>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 right-10 flex gap-4 items-center">
        <div className="w-20 h-[1px] bg-white/20" />
        <span className="text-[10px] text-[#ff8c00] font-mono uppercase tracking-widest">
          Sumit Sahu Edition
        </span>
      </div>
    </section>
  );
};

export default KineticText;