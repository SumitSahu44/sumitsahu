"use client";
import React, { useEffect, useRef, useState } from "react";

export const homeNavItems = [
  { name: "Home", href: "/#top" },
  { name: "Work", href: "/#work" },
  { name: "Services", href: "/#capabilities" },
  { name: "About", href: "/#about" },
  { name: "Tech Stack", href: "/#tech-stack" },
  { name: "Contact", href: "/#contact" },
];

interface NavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  onNavigate: () => void;
}

export default function Navbar({ onMenuToggle, isMenuOpen, onNavigate }: NavbarProps) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // 10px threshold taaki chote scroll pe toggle na ho
      if (currentY > lastScrollY.current + 10) {
        setHidden(true);   // scroll down → hide
      } else if (currentY < lastScrollY.current - 10) {
        setHidden(false);  // scroll up → show
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="nav-container fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 md:py-8 flex justify-between items-center pointer-events-none"
      style={{
        transform: hidden && !isMenuOpen ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      
      <div className="pointer-events-auto flex items-center">
        <a
          href="/#top"
          onClick={onNavigate}
          className="signature-wordmark inline-block text-[2.75rem] leading-none text-white transition-colors hover:text-[#ff8c00] md:text-5xl"
          aria-label="Sumit — Home"
        >
          Sumit
        </a>
      </div>

      <div className="pointer-events-auto flex items-center gap-8 md:gap-10">
        
        {/* Navigation Links (Desktop Only) */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-5 text-xs font-mono uppercase tracking-[0.14em] text-white/75 xl:gap-8">
          {homeNavItems.map(({ name, href }) => (
            <a key={href} href={href} className="whitespace-nowrap transition-colors hover:text-[#ff8c00]">
              {name}
            </a>
          ))}
        </nav>

        {/* Hamburger Toggle Button (Mobile Only) */}
        <button
          onClick={onMenuToggle}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          className="lg:hidden w-12 h-12 flex flex-col justify-center items-center gap-1.5 bg-white/5 border border-white/10 rounded-full cursor-pointer hover:bg-white/15 hover:border-white/20 transition-all duration-300"
        >
          <div
            className={`h-[1.5px] bg-white transition-all duration-300 ease-in-out ${
              isMenuOpen ? "w-5 rotate-45 translate-y-[4.5px]" : "w-5"
            }`}
          />
          <div
            className={`h-[1.5px] bg-[#ff8c00] transition-all duration-300 ease-in-out ${
              isMenuOpen ? "w-0 opacity-0" : "w-3 ml-auto mr-3.5"
            }`}
          />
          <div
            className={`h-[1.5px] bg-white transition-all duration-300 ease-in-out ${
              isMenuOpen ? "w-5 -rotate-45 -translate-y-[4.5px]" : "w-5"
            }`}
          />
        </button>
      </div>

    </header>
  );
}
