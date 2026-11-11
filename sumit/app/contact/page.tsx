"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ContactLinks, contactEmail } from "@/components/ContactLinks";

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff8c00] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center max-w-2xl relative z-10 space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black uppercase tracking-tight"
        >
          Let&apos;s Build Together
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 font-light text-base md:text-lg leading-relaxed"
        >
          Interested in working together or have a project in mind? Drop me an email or find me on social media.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
        >
          <a
            href={`mailto:${contactEmail}`}
            className="w-full sm:w-auto text-center px-8 py-3 bg-gradient-to-r from-[#ff8c00] to-[#ff4500] text-black font-bold uppercase text-xs tracking-widest rounded-full hover:shadow-[0_0_25px_rgba(255,140,0,0.5)] transition-all duration-300 transform active:scale-95"
          >
            Email Me
          </a>
          <Link
            href="/"
            className="w-full sm:w-auto text-center px-8 py-3 border border-white/10 hover:border-white/20 text-white font-bold uppercase text-xs tracking-widest rounded-full transition-all duration-300 transform active:scale-95"
          >
            Back to Home
          </Link>
        </motion.div>
        <div className="flex justify-center">
          <ContactLinks />
        </div>
      </div>
    </section>
  );
}
