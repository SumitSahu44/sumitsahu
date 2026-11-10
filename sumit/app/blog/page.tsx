"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogPage() {
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
          Insights & Stories
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 font-light text-base md:text-lg leading-relaxed animate-pulse"
        >
          Under construction. Writing in progress.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-6"
        >
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#ff8c00] to-[#ff4500] text-black font-bold uppercase text-xs tracking-widest rounded-full hover:shadow-[0_0_25px_rgba(255,140,0,0.5)] transition-all duration-300 transform active:scale-95"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
