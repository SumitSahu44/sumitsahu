"use client";
import React from "react";

interface NavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function Navbar({ onMenuToggle, isMenuOpen }: NavbarProps) {
  return (
    <header className="nav-container fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 md:py-8 flex justify-between items-center pointer-events-none">
      {/* Landing Signature Logo */}
      <div className="nav-logo-sig pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-2xl shadow-xl transition-all duration-300 hover:border-[#ff8c00]/40">
        <a href="#" className="text-xl font-serif italic text-white tracking-tighter block">
          Sumit <span className="text-[#ff8c00] font-sans font-bold not-italic">SAHU</span>
        </a>
      </div>

      {/* Glass Menu */}
      <nav className="hidden md:flex pointer-events-auto items-center bg-black/50 backdrop-blur-2xl border border-white/10 px-8 py-3.5 rounded-full gap-8 shadow-2xl">
        {['Work', 'Services', 'About', 'Experience'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase() === 'services' ? 'capabilities' : item.toLowerCase()}`}
            className="group relative text-xs font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300"
          >
            {item}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#ff8c00] rounded-full transition-all duration-300 group-hover:w-8" />
          </a>
        ))}
      </nav>

      {/* CTA & Mobile Toggle */}
      <div className="pointer-events-auto flex items-center gap-4">
        <a
          href="mailto:sumitsahu5328@gmail.com"
          className="hidden sm:inline-block px-6 py-2.5 bg-gradient-to-r from-[#ff8c00] to-[#ff4500] text-black text-xs font-bold uppercase tracking-widest rounded-full hover:shadow-[0_0_20px_rgba(255,140,0,0.4)] transition-all duration-300 transform active:scale-95 hover:scale-105"
        >
          Let's Talk
        </a>
        
        {/* Mobile Toggle Button */}
        <button
          onClick={onMenuToggle}
          aria-label="Toggle Menu"
          className="w-12 h-12 flex flex-col justify-center items-center gap-1.5 bg-white/5 border border-white/10 rounded-full cursor-pointer hover:bg-white/15 hover:border-white/20 transition-all duration-300 focus:outline-none"
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