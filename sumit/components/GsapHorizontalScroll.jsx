"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const GsapHorizontalScroll = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      // Get the total scrollable width
      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth);
      };

      // Horizontal scroll animation
      const progressBar = section.querySelector(".hscroll-progress-bar");
      const scrollHint = section.querySelector(".hscroll-scroll-hint");

      const horizontalTween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Animate progress bar width
            if (progressBar) {
              gsap.set(progressBar, { width: `${self.progress * 100}%` });
            }
            // Fade out scroll hint once user starts scrolling
            if (scrollHint && self.progress > 0.02) {
              gsap.to(scrollHint, { opacity: 0, y: -10, duration: 0.4, ease: "power2.out" });
            }
          },
        },
      });

      // Animate each word group as it enters viewport
      const wordGroups = gsap.utils.toArray(".hscroll-word-group");
      wordGroups.forEach((group, i) => {
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
    }, sectionRef);

    return () => ctx.revert();
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
        { text: "Full", color: "orange", size: "large", rotate: 2 },
        { text: "Stack", color: "purple", size: "large", rotate: -4 },
      ],
      decor: ["semicircle", "star"],
    },
    {
      id: "group-3",
      words: [
        { text: "GSAP", color: "green-gradient", size: "large" },
        { text: "&", color: "transparent", size: "regular" },
        { text: "Motion", color: "orange-gradient", size: "large", rotate: 5 },
      ],
      decor: ["hourglass", "circle"],
    },
    {
      id: "group-4",
      words: [
        { text: "E-Com", color: "pink", size: "large", rotate: -2 },
        { text: "SaaS", color: "green", size: "large", rotate: 3 },
      ],
      decor: ["bolt", "worm"],
    },
    {
      id: "group-5",
      words: [
        { text: "Node", color: "purple-gradient", size: "large" },
        { text: "+", color: "transparent", size: "regular" },
        { text: "MongoDB", color: "orange", size: "large", rotate: -6 },
      ],
      decor: ["flower", "diamond"],
    },
    {
      id: "group-6",
      words: [
        { text: "Pixel", color: "green", size: "large", rotate: 4 },
        { text: "Perfect", color: "pink", size: "large", rotate: -3 },
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

      {/* Section Label */}
      <div
        style={{
          position: "absolute",
          top: "clamp(20px, 4vh, 40px)",
          left: "clamp(20px, 4vw, 60px)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#0ae448",
            boxShadow: "0 0 12px #0ae448",
          }}
        />
        <span
          style={{
            fontFamily: "'Inter', 'SF Pro', system-ui, sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            color: "rgba(255, 252, 225, 0.5)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          What I Do
        </span>
      </div>

      {/* The horizontal scrolling track */}
      <div
        ref={trackRef}
        style={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          width: "fit-content",
          paddingLeft: "15vw",
          paddingRight: "15vw",
          gap: "0",
        }}
      >
        {/* Intro panel */}
        <div
          className="hscroll-word-group"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "40vw",
            paddingRight: "8vw",
            position: "relative",
          }}
        >
          <span
            className="hscroll-word"
            style={{
              fontFamily: "'Inter', 'SF Pro', system-ui, sans-serif",
              fontSize: "clamp(13px, 1.3vw, 18px)",
              fontWeight: 400,
              color: "rgba(255, 252, 225, 0.55)",
              letterSpacing: "-0.01em",
              lineHeight: 1.55,
              maxWidth: "380px",
              marginBottom: "30px",
            }}
          >
            I build creative websites for different sectors — from SaaS and e-commerce to agencies and portfolios. Every project, a unique digital experience.
          </span>
          <h2
            className="hscroll-word"
            style={{
              fontFamily: "'Inter', 'SF Pro', system-ui, sans-serif",
              fontSize: "clamp(40px, 5vw, 72px)",
              fontWeight: 700,
              color: "#fffce1",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
            }}
          >
            My
            <br />
            <span style={{ color: "#ff8709" }}>Tech</span>
            <br />
            Stack
          </h2>
        </div>

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
                      color: isTransparent ? colors.text : colors.text,
                      borderRadius: isTransparent ? "0" : "10px",
                      fontFamily: "'Inter', 'SF Pro', system-ui, sans-serif",
                      fontSize: isLarge
                        ? "clamp(48px, 6.5vw, 110px)"
                        : "clamp(32px, 4vw, 64px)",
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

        {/* Ending panel */}
        <div
          className="hscroll-word-group"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "50vw",
            paddingLeft: "8vw",
            position: "relative",
          }}
        >
          <div
            className="hscroll-word"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', 'SF Pro', system-ui, sans-serif",
                fontSize: "clamp(14px, 1.2vw, 18px)",
                fontWeight: 500,
                color: "rgba(255, 252, 225, 0.4)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Got a project in mind?
            </span>
            <div
              style={{
                width: "clamp(50px, 8vw, 100px)",
                height: "1px",
                background: "linear-gradient(90deg, transparent, #ff8709, transparent)",
              }}
            />
            <a
              href="mailto:sumitsahu5328@gmail.com"
              style={{
                fontFamily: "'Inter', 'SF Pro', system-ui, sans-serif",
                fontSize: "clamp(10px, 1vw, 13px)",
                fontWeight: 600,
                color: "#ff8709",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Let&apos;s Build Together ↗
            </a>
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

      {/* Scroll progress indicator */}
      <div
        className="hscroll-progress"
        style={{
          position: "absolute",
          bottom: "clamp(20px, 4vh, 40px)",
          left: "clamp(20px, 4vw, 60px)",
          right: "clamp(20px, 4vw, 60px)",
          height: "2px",
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          borderRadius: "1px",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        <div
          className="hscroll-progress-bar"
          style={{
            height: "100%",
            width: "0%",
            background: "linear-gradient(90deg, #0ae448, #00bae2)",
            borderRadius: "1px",
            transition: "none",
          }}
        />
      </div>

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
        className="hscroll-scroll-hint"
        style={{
          position: "absolute",
          bottom: "clamp(55px, 8vh, 80px)",
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

