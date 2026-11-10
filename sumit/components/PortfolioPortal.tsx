"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import MaskedHeading from "@/components/MaskedHeading";

export default function PortfolioPortal() {
  const entranceRef = useRef<HTMLElement>(null);
  const id = useId();
  const apertureId = `${id}-aperture`;
  const clipId = `${id}-clip`;

  useEffect(() => {
    const entrance = entranceRef.current;
    if (!entrance) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference) and (min-height: 480px)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: entrance,
          start: "top top",
          end: "+=85%",
          scrub: 0.55,
          pin: true,
          anticipatePin: 1,
        },
      });

      timeline
        .fromTo(".portal-aperture", { attr: { r: 53 } }, {
          attr: { r: 900 },
          duration: 0.8,
          ease: "power1.inOut",
        }, 0)
        .fromTo(".portal-frame", { scale: 0.8, svgOrigin: "720 510" }, {
          scale: 1,
          duration: 0.85,
          ease: "power1.out",
        }, 0)
        .fromTo(".portal-entry", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.22 }, 0.08)
        .fromTo(".portal-content", { autoAlpha: 0, y: 22 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
          ease: "power2.out",
        }, 0.55);
    }, entrance);

    return () => media.revert();
  }, []);

  return (
    <section
      id="portfolio-portal"
      ref={entranceRef}
      aria-labelledby="portal-heading"
      className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden bg-[#080808] px-6 py-24 text-white sm:px-12"
    >
      <div aria-hidden="true" className="portal-entry pointer-events-none invisible absolute inset-x-0 top-0 z-10 flex justify-center px-6 pt-[max(3.25rem,8svh)] text-center">
        <div className="w-full max-w-[min(72rem,115svh)]">
          <MaskedHeading
            tag="p"
            text="A door into my work."
            mediaType="video"
            src="https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4"
            poster="/images/Hero-back.jpg"
            reveal="scale"
            trigger="view"
            textScale={0.136}
            lineHeight={0.94}
            weight={800}
            tracking={-0.035}
            parallax={0}
            drift={0}
            grayscale
            tint="#ffad66"
            brightness={1.25}
            className="text-[#ffe6cc]"
          />
        </div>
      </div>

      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
          <defs>
            <circle id={apertureId} className="portal-aperture" cx="720" cy="510" r="900" />
            <clipPath id={clipId}><use href={`#${apertureId}`} /></clipPath>
          </defs>
          <g clipPath={`url(#${clipId})`}>
            <rect width="1440" height="900" fill="#080808" />
            <g className="portal-frame">
              <path d="M0 0 520 330v230L0 900ZM1440 0 920 330v230l520 340Z" fill="#181716" />
              <path d="M0 900 520 560h400l520 340Z" fill="#11100f" />
              <path d="M0 0 520 330h400L1440 0Z" fill="#0d0d0c" />
              <path d="M520 560V330h400v230M410 635V260h620v375M260 736V162h920v574" stroke="#3e3a35" />
              <path d="M0 900 520 560h400l520 340M0 0l520 330m400 0L1440 0" stroke="#38342f" />
              <path d="M592 560 375 900m473-340 217 340M462 598h516M382 650h676M260 730h920" stroke="#252320" />
              <path d="M260 162h920M520 330h400" stroke="#ff8c00" strokeOpacity=".48" />
            </g>
          </g>
          <use href={`#${apertureId}`} fill="none" stroke="#d6c8b8" strokeOpacity=".45" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-[43%] bg-gradient-to-t from-[#080808] to-transparent" />
      </div>

      <div className="portal-content relative z-10 flex flex-col items-center gap-3 text-center sm:gap-5">
        <h2 id="portal-heading" className="text-[clamp(1.125rem,max(3vw,4svh),3rem)] leading-none font-black tracking-tighter whitespace-nowrap uppercase">
          The gallery<span className="text-[#ff8c00]">.</span>
        </h2>
        <a href="#work" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-[#080808] px-4 text-xs font-medium text-white transition-colors hover:border-[#ff8c00] hover:text-[#ff8c00]">
          View projects <ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
