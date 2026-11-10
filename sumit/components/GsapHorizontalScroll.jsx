"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const projectPreviews = [
  { name: "Deshi Tokri", src: "/images/projects/deshi-tokri.webp" },
  { name: "Noorzaar", src: "/images/projects/noorzaar.webp" },
];

const GsapHorizontalScroll = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const rowRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const motion = gsap.matchMedia(sectionRef);

    motion.add({ desktop: "(min-width: 768px)", all: "all" }, ({ conditions }) => {
      const track = conditions.desktop ? trackRef.current : rowRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      // Get the total scrollable width
      const getScrollAmount = () => {
        return -Math.max(0, track.scrollWidth - section.clientWidth);
      };

      // Horizontal scroll animation
      const scrollHint = section.querySelector(".hscroll-scroll-hint");

      const horizontalTween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${-getScrollAmount()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scrollHint?.classList.toggle("opacity-0", self.progress > 0.02);
          },
        },
      });

      // Animate each word group as it enters viewport
      const wordGroups = track.querySelectorAll(".hscroll-word-group");
      wordGroups.forEach((group) => {
        const words = group.querySelectorAll(".hscroll-word");
        const decorElements = group.querySelectorAll(".hscroll-decor");

        // Words animate in with stagger
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 80,
            rotateX: -45,
            scale: 0.7,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: group,
              containerAnimation: horizontalTween,
              start: "left 85%",
              end: "left 40%",
              scrub: 1,
            },
          }
        );

        // Decorative elements animate separately
        gsap.fromTo(
          decorElements,
          {
            opacity: 0,
            scale: 0,
            rotation: -180,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            stagger: 0.1,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: group,
              containerAnimation: horizontalTween,
              start: "left 80%",
              end: "left 35%",
              scrub: 1,
            },
          }
        );
      });
    });

    return () => motion.revert();
  }, []);

  // Word groups data — Sumit's web dev identity
  const wordGroups = [
    {
      id: "group-1",
      words: [
        { text: "React", color: "green", size: "large" },
        { text: "&", color: "transparent", size: "regular" },
        { text: "Next.js", color: "pink", size: "large", rotate: -3 },
      ],
      decor: ["flower", "diamond"],
    },
    {
      id: "group-2",
      words: [
        { text: "TypeScript", color: "orange", size: "large", rotate: 2 },
        { text: "Tailwind CSS", color: "purple", size: "large", rotate: -4 },
      ],
      decor: ["semicircle", "star"],
    },
    {
      id: "group-3",
      words: [
        { text: "GSAP", color: "green-gradient", size: "large" },
        { text: "&", color: "transparent", size: "regular" },
        { text: "Framer Motion", color: "orange-gradient", size: "large", rotate: 5 },
      ],
      decor: ["hourglass", "circle"],
    },
    {
      id: "group-4",
      words: [
        { text: "Node.js", color: "pink", size: "large", rotate: -2 },
        { text: "Express", color: "green", size: "large", rotate: 3 },
      ],
      decor: ["bolt", "worm"],
    },
    {
      id: "group-5",
      words: [
        { text: "MongoDB", color: "purple-gradient", size: "large" },
        { text: "+", color: "transparent", size: "regular" },
        { text: "REST APIs", color: "orange", size: "large", rotate: -6 },
      ],
      decor: ["flower", "diamond"],
    },
    {
      id: "group-6",
      words: [
        { text: "Git", color: "green", size: "large", rotate: 4 },
        { text: "GitHub", color: "pink", size: "large", rotate: -3 },
      ],
      decor: ["star", "semicircle"],
    },
  ];

  // Color mappings matching GSAP's vibrant palette
  const colorMap = {
    green: { bg: "#0ae448", text: "#0e100f" },
    pink: { bg: "#fec5fb", text: "#0e100f" },
    orange: { bg: "#ff8709", text: "#0e100f" },
    purple: { bg: "#9d95ff", text: "#0e100f" },
    "green-gradient": { bg: "linear-gradient(114deg, #0ae448 20%, #abff84 65%)", text: "#0e100f" },
    "orange-gradient": { bg: "linear-gradient(111deg, #ff8709 19%, #f7bdf8 73%)", text: "#0e100f" },
    "purple-gradient": { bg: "linear-gradient(154deg, #f7bdf8 32%, #2f3cc0 93%)", text: "#0e100f" },
    transparent: { bg: "transparent", text: "#fffce1" },
  };

  // SVG decorative elements
  const DecorElement = ({ type }) => {
    const decorStyles = {
      position: "absolute",
      pointerEvents: "none",
    };

    switch (type) {
      case "flower":
        return (
          <svg
            className="hscroll-decor"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            style={{ ...decorStyles, top: "-40px", right: "20px" }}
          >
            <circle cx="40" cy="25" r="18" fill="#fec5fb" />
            <circle cx="55" cy="40" r="18" fill="#fec5fb" />
            <circle cx="40" cy="55" r="18" fill="#fec5fb" />
            <circle cx="25" cy="40" r="18" fill="#fec5fb" />
            <circle cx="40" cy="40" r="10" fill="#ff69b4" />
          </svg>
        );
      case "diamond":
        return (
          <svg
            className="hscroll-decor"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            style={{ ...decorStyles, top: "10px", right: "-15px" }}
          >
            <rect
              x="14"
              y="0"
              width="19.8"
              height="19.8"
              rx="3"
              transform="rotate(45 14 0)"
              fill="#ff8709"
            />
          </svg>
        );
      case "semicircle":
        return (
          <svg
            className="hscroll-decor"
            width="200"
            height="110"
            viewBox="0 0 200 110"
            fill="none"
            style={{ ...decorStyles, bottom: "-20px", left: "50%", transform: "translateX(-50%)" }}
          >
            <defs>
              <linearGradient id="semi-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ae448" />
                <stop offset="100%" stopColor="#00bae2" />
              </linearGradient>
            </defs>
            <path d="M0 110 A100 100 0 0 1 200 110" fill="url(#semi-grad)" />
          </svg>
        );
      case "star":
        return (
          <svg
            className="hscroll-decor"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            style={{ ...decorStyles, top: "-30px", left: "10px" }}
          >
            <path
              d="M25 0L31.18 18.82L50 25L31.18 31.18L25 50L18.82 31.18L0 25L18.82 18.82L25 0Z"
              fill="#0ae448"
            />
          </svg>
        );
      case "hourglass":
        return (
          <svg
            className="hscroll-decor"
            width="35"
            height="55"
            viewBox="0 0 35 55"
            fill="none"
            style={{ ...decorStyles, top: "-15px", left: "-20px" }}
          >
            <path
              d="M5 0H30L17.5 22L30 44H5L17.5 22L5 0Z"
              fill="#9d95ff"
              opacity="0.8"
            />
          </svg>
        );
      case "circle":
        return (
          <svg
            className="hscroll-decor"
            width="55"
            height="55"
            viewBox="0 0 55 55"
            fill="none"
            style={{ ...decorStyles, top: "-45px", left: "30px" }}
          >
            <circle
              cx="27.5"
              cy="27.5"
              r="22"
              stroke="#00bae2"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="27.5"
              cy="27.5"
              r="10"
              fill="#050505"
            />
          </svg>
        );
      case "bolt":
        return (
          <svg
            className="hscroll-decor"
            width="45"
            height="70"
            viewBox="0 0 45 70"
            fill="none"
            style={{ ...decorStyles, top: "-50px", right: "40px" }}
          >
            <path
              d="M25 0L0 40H20L15 70L45 25H22L25 0Z"
              fill="#0ae448"
            />
          </svg>
        );
      case "worm":
        return (
          <svg
            className="hscroll-decor"
            width="60"
            height="30"
            viewBox="0 0 60 30"
            fill="none"
            style={{ ...decorStyles, bottom: "-20px", right: "30px" }}
          >
            <path
              d="M5 25C5 25 15 5 25 5C35 5 30 25 40 25C50 25 55 5 55 5"
              stroke="#fec5fb"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="gsap-hscroll-section"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#050505",
      }}
    >
      {/* Top border line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
      />

      <div
        ref={trackRef}
        className="relative flex h-[100svh] w-full flex-col gap-5 pt-[clamp(4.5rem,13svh,7rem)] md:w-max md:flex-row md:items-center md:gap-0 md:px-12 md:pt-0"
      >
        <div className="relative z-10 shrink-0 px-4 md:w-[38vw] md:pr-10 md:pl-0">
          <h2 className="text-[clamp(2rem,9vw,3.5rem)] leading-[0.95] font-black tracking-tight text-[#fffce1] md:text-[clamp(2.75rem,5.4vw,5.75rem)]">
            My tech <br className="hidden md:block" />
            <span className="text-[#ff8709]">stack.</span>
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70 md:mt-6 lg:text-base">
            I build responsive websites and full-stack apps with React and Next.js.
            Node.js and MongoDB power the backend, and GSAP brings the interface to life.
          </p>
        </div>

        <div ref={rowRef} className="flex w-max min-h-0 flex-1 items-center px-4 pb-10 max-md:max-h-[min(52svh,28rem)] md:flex-none md:px-0 md:pb-0">
        {/* Word groups */}
        {wordGroups.map((group) => (
          <div
            key={group.id}
            className="hscroll-word-group"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(12px, 2vw, 24px)",
              minWidth: "fit-content",
              padding: "0 clamp(30px, 5vw, 80px)",
              position: "relative",
              perspective: "800px",
            }}
          >
            {/* Decorative SVG elements */}
            {group.decor.map((decorType, dIdx) => (
              <DecorElement key={`${group.id}-decor-${dIdx}`} type={decorType} />
            ))}

            {/* Word badges */}
            {group.words.map((word, wIdx) => {
              const colors = colorMap[word.color];
              const isTransparent = word.color === "transparent";
              const isLarge = word.size === "large";
              const rotation = word.rotate || 0;

              return (
                <div
                  key={`${group.id}-word-${wIdx}`}
                  className="hscroll-word"
                  style={{
                    position: "relative",
                    transformStyle: "preserve-3d",
                    transform: `rotate(${rotation}deg)`,
                  }}
                >
                  {/* Shadow behind badge */}
                  {!isTransparent && (
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        right: "-12px",
                        bottom: "-12px",
                        backgroundColor: "#000",
                        borderRadius: "10px",
                        opacity: 0.4,
                        zIndex: 1,
                      }}
                    />
                  )}

                  {/* The badge itself */}
                  <span
                    style={{
                      display: "inline-flex",
                      padding: isLarge
                        ? "clamp(12px, 1.5vh, 18px) clamp(16px, 2vw, 24px)"
                        : "clamp(8px, 1vh, 14px) clamp(10px, 1.5vw, 18px)",
                      background: colors.bg,
                      color: colors.text,
                      borderRadius: isTransparent ? "0" : "10px",
                      fontFamily: "'Inter', 'SF Pro', system-ui, sans-serif",
                      fontSize: isLarge
                        ? "clamp(30px, 5.2vw, 90px)"
                        : "clamp(20px, 3.5vw, 54px)",
                      fontWeight: 600,
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      whiteSpace: "nowrap",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {word.text}
                  </span>
                </div>
              );
            })}
          </div>
        ))}

        <div className="relative z-10 my-auto ml-6 grid w-[calc(100vw-3rem)] shrink-0 items-center gap-3 overflow-hidden rounded-2xl bg-[#ff8709] p-4 text-[#17100b] sm:p-6 md:my-0 md:ml-12 md:w-[calc(100vw-6rem)] md:grid-cols-[1.25fr_1fr] md:gap-6 md:p-10 lg:p-14">
          <div className="relative z-10 min-w-0">
            <h3 className="text-[clamp(2rem,6.5vw,7rem)] leading-[0.94] font-black tracking-tighter">
              See what<br />I build.
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed md:mt-4">
              Explore the storefronts and business websites in my portfolio.
            </p>
            <a
              href="#work"
              className="group mt-3 inline-flex items-center gap-3 rounded-full bg-[#17100b] px-4 py-3 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-[#17100b] focus-visible:outline-[#17100b] sm:px-5 md:mt-5"
            >
              Explore Project Lab
              <span aria-hidden="true" className="text-base leading-none transition-transform motion-safe:group-hover:translate-x-0.5">↗</span>
            </a>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-2 md:gap-3">
            {projectPreviews.map(({ name, src }) => (
              <figure key={name} className="min-w-0 overflow-hidden rounded-lg border border-[#17100b]/20 bg-[#17100b] text-white md:rounded-xl">
                <div className="relative h-12 bg-[#f6e4cc] max-md:[@media(max-height:650px)]:h-9 md:aspect-[16/10] md:h-auto">
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 40vw, (max-width: 1279px) 18vw, 20vw"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="px-2 py-1.5 text-[11px] leading-tight font-semibold md:px-3 md:py-2.5 md:text-sm">
                  {name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* Bottom border line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
      />

      {/* Background ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          height: "60vh",
          background: "radial-gradient(ellipse, rgba(10, 228, 72, 0.03) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Scroll hint */}
      <div
        className="hscroll-scroll-hint pointer-events-none transition-opacity duration-300"
        style={{
          position: "absolute",
          bottom: "clamp(24px, 5vh, 48px)",
          right: "clamp(20px, 4vw, 60px)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "rgba(255, 252, 225, 0.35)",
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        <span>Scroll</span>
        <svg
          width="28"
          height="14"
          viewBox="0 0 28 14"
          fill="none"
          style={{
            animation: "hscroll-arrow-bounce 1.4s ease-in-out infinite",
          }}
        >
          <path
            d="M1 7H27M21 1L27 7L21 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <style>{`
        @keyframes hscroll-arrow-bounce {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(6px); }
        }
      `}</style>
    </section>
  );
};

export default GsapHorizontalScroll;

