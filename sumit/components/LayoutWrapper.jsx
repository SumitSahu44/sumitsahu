"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import Navbar, { homeNavItems } from "@/components/Navbar";

const LayoutWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const preloaderRef = useRef(null);
  const mainRef = useRef(null);
  const menuCurtainRef = useRef(null);

  const closeMenu = () => {
    window.lenis?.start();
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    desktop.addEventListener("change", onResize);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      desktop.removeEventListener("change", onResize);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // 4. Global Lenis scroll manager
  useEffect(() => {
    if (loading) return;
    const { pathname, hash } = window.location;
    if (pathname === "/" && homeNavItems.some(({ href }) => href === "/" + hash)) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    }
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);
    window.lenis = lenis;
    return () => { cancelAnimationFrame(frameId); lenis.destroy(); if (window.lenis === lenis) delete window.lenis; };
  }, [loading]);

  // 5. Stop Lenis scrolling when menu is active
  useEffect(() => {
    const globalLenis = window.lenis;
    if (globalLenis) {
      if (menuOpen) {
        globalLenis.stop();
      } else {
        globalLenis.start();
      }
    }
  }, [menuOpen]);

  useEffect(() => {
    const overlay = preloaderRef.current;
    const heroCopy = mainRef.current.querySelectorAll(".hero-desc");
    const heroTitles = mainRef.current.querySelectorAll(".hero-title-line");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (heroCopy.length) gsap.set(heroCopy, { opacity: 1 });
      setLoading(false);
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ onComplete: () => setLoading(false) });
      timeline
        .to(".intro-signature", {
          clipPath: "inset(-20% 0% -20% 0%)", duration: 1.1, ease: "none",
        })
        .to(overlay, { yPercent: -100, duration: 0.42, ease: "power3.inOut" }, "+=0.18");

      if (heroTitles.length) {
        timeline.fromTo(heroTitles, { yPercent: 100 }, {
          yPercent: 0, duration: 0.55, stagger: 0.08, ease: "power3.out",
        }, "-=0.38");
      }
      if (heroCopy.length) {
        timeline.fromTo(heroCopy, { opacity: 0, y: 16 }, {
          opacity: 1, y: 0, duration: 0.4, ease: "power2.out",
        }, "-=0.35");
      }
    }, overlay);

    return () => context.revert();
  }, []);

  // 7. GSAP Menu Liquid Curtain Transitions
  useEffect(() => {
    if (loading) return;

    if (menuOpen) {
      const opening = gsap.timeline()
        .set(menuCurtainRef.current, { display: "flex", opacity: 1 })
        .to("#menu-curtain-path", {
          attr: { d: "M 0 0 L 100 0 L 100 100 Q 50 120 0 100 Z" },
          duration: 0.45,
          ease: "power3.in"
        })
        .to("#menu-curtain-path", {
          attr: { d: "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z" },
          duration: 0.35,
          ease: "power2.out"
        })
        .fromTo(".menu-link-item", {
          y: 80,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out"
        }, "-=0.2");
      return () => opening.kill();
    } else {
      const closing = gsap.timeline({
        onComplete: () => {
          gsap.set(menuCurtainRef.current, { display: "none" });
        }
      })
      .to(".menu-link-item", {
        opacity: 0,
        y: -30,
        duration: 0.3,
        ease: "power2.inOut"
      })
      .to("#menu-curtain-path", {
        attr: { d: "M 0 0 L 100 0 L 100 0 Q 50 30 0 0 Z" },
        duration: 0.35,
        ease: "power3.in"
      })
      .to("#menu-curtain-path", {
        attr: { d: "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z" },
        duration: 0.35,
        ease: "power2.out"
      });
      return () => closing.kill();
    }
  }, [menuOpen, loading]);

  return (
    <>
      {loading && (
        <div
          ref={preloaderRef}
          aria-hidden="true"
          className="fixed inset-0 z-[999] grid place-items-center overflow-hidden bg-[#050505] select-none"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,#ff8c000e,transparent_55%)]" />
          <span
            className="intro-signature signature-wordmark relative block px-[0.28em] py-[0.18em] text-[clamp(5rem,19vw,12rem)] leading-none text-white"
            style={{ clipPath: "inset(-20% 100% -20% 0%)" }}
          >
            Sumit
          </span>
        </div>
      )}

      {/* --- CREATIVE NAVBAR --- */}
      <Navbar onMenuToggle={() => setMenuOpen(open => !open)} isMenuOpen={menuOpen} onNavigate={closeMenu} />

      {/* --- PREMIUM FULLSCREEN MENU OVERLAY --- */}
      <div
        ref={menuCurtainRef}
        id="mobile-navigation"
        inert={!menuOpen}
        className="fixed inset-0 z-[90] hidden flex-col overflow-hidden text-white"
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
      >
        {/* The SVG liquid curtain */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none fill-[#0d0d0d] z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path id="menu-curtain-path" d="M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z" />
        </svg>

        <nav aria-label="Mobile navigation" data-lenis-prevent className="relative z-10 flex h-full w-full flex-col gap-5 overflow-y-auto px-6 pt-36 pb-6 sm:gap-6 sm:pt-40 md:pt-44">
          {homeNavItems.map(({ name, href }) => (
            <div key={href} className="shrink-0 overflow-hidden py-1">
              <a
                href={href}
                onClick={closeMenu}
                className="menu-link-item block w-fit text-[clamp(2rem,8vw,4rem)] leading-tight font-black tracking-tighter uppercase transition-colors hover:text-[#ff8c00]"
              >
                {name}
              </a>
            </div>
          ))}
        </nav>
      </div>

      {/* --- MAIN PAGE CONTENT --- */}
      <main ref={mainRef} className="opacity-100">
        {children}
      </main>
    </>
  );
};

export default LayoutWrapper;