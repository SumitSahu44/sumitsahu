"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/SumitSahu44", color: "hover:text-[#ff8c00]" },
    { name: "LinkedIn", url: "https://linkedin.com/in/sumitsahu44", color: "hover:text-[#ff8c00]" },
    { name: "Email", url: "mailto:sumitsahu5328@gmail.com", color: "hover:text-[#ff8c00]" },
  ];

  return (
    <footer className="relative bg-[#050505] text-white pt-24 pb-12 px-6 md:px-20 overflow-hidden border-t border-white/5">
      {/* Glow Effects */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ff8c00] opacity-[0.04] blur-[100px] rounded-full pointer-events-none" />

      {/* Marquee Text */}
      <div className="w-full overflow-hidden border-b border-white/10 pb-12 mb-16 select-none pointer-events-none">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-[6vw] font-black uppercase tracking-tighter text-white/5 mr-10">
            Sumit Sahu • MERN Stack Architect • Team Lead • UI/UX Designer • Optimization Geek • 
          </span>
          <span className="text-[6vw] font-black uppercase tracking-tighter text-white/5 mr-10">
            Sumit Sahu • MERN Stack Architect • Team Lead • UI/UX Designer • Optimization Geek • 
          </span>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-12 relative z-10">
        {/* Brand Column */}
        <div className="col-span-2 md:col-span-1 space-y-4">
          <span className="text-2xl font-serif italic text-white tracking-tighter">
            Sumit <span className="text-[#ff8c00] font-sans font-bold not-italic">SAHU</span>
          </span>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-light">
            Architecting premium digital assets and high-performance MERN platforms with aesthetic precision.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="col-span-1">
          <h4 className="text-[#ff8c00] font-mono text-[10px] tracking-[0.3em] uppercase mb-6">Navigation</h4>
          <ul className="space-y-3 font-light text-sm text-gray-400">
            {['Work', 'Services', 'About', 'Experience'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase() === 'services' ? 'capabilities' : item.toLowerCase()}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social / Connect Column */}
        <div className="col-span-1">
          <h4 className="text-[#ff8c00] font-mono text-[10px] tracking-[0.3em] uppercase mb-6">Let's Connect</h4>
          <div className="flex flex-col gap-3">
            <span className="text-gray-400 text-sm font-light">Indore, Madhya Pradesh, India</span>
            <div className="flex gap-6 mt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-colors duration-300 text-sm ${link.color}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© {currentYear} Sumit Sahu. All rights reserved.</p>
        <p className="font-mono text-[10px] tracking-wider uppercase">
          Made with Passion & React 19
        </p>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </footer>
  );
}