"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function Navbar({ onMenuToggle, isMenuOpen }: NavbarProps) {
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
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      
      <div className="pointer-events-auto flex items-center">
        <Link
          href="/"
          className="signature-wordmark inline-block text-[2.75rem] leading-none text-white transition-colors hover:text-[#ff8c00] md:text-5xl"
          aria-label="Sumit — Home"
        >
          Sumit
        </Link>
      </div>

      {/* Desktop Links & White Pill CTA */}
      <div className="pointer-events-auto flex items-center gap-8 md:gap-10">
        
        {/* Navigation Links (Desktop Only) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-[0.25em] text-white/50">
          <Link href="/" className="text-white border-b border-[#ff8c00] pb-1.5 font-bold">
            Home
          </Link>
          <Link href="/about" className="hover:text-white hover:text-opacity-80 transition-colors pb-1.5">
            About
          </Link>
          <Link href="#work" className="hover:text-white hover:text-opacity-80 transition-colors pb-1.5">
            Projects
          </Link>
        </nav>

        {/* White Pill CTA Button (Desktop Only) */}
        <a
          href="mailto:sumitsahu5328@gmail.com"
          className="hidden md:flex items-center gap-3 pl-6 pr-2 py-2 bg-white text-black text-[10px] font-mono font-black uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 transform active:scale-95 hover:scale-105"
        >
          Get in Touch
          <div className="w-8 h-8 rounded-full bg-[#ff8c00] flex items-center justify-center text-white">
            <ArrowUpRight className="w-4 h-4 stroke-[3px]" />
          </div>
        </a>

        {/* Hamburger Toggle Button (Mobile Only) */}
        <button
          onClick={onMenuToggle}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
          className="md:hidden w-12 h-12 flex flex-col justify-center items-center gap-1.5 bg-white/5 border border-white/10 rounded-full cursor-pointer hover:bg-white/15 hover:border-white/20 transition-all duration-300 focus:outline-none"
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
