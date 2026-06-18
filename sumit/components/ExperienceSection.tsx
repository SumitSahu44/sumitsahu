"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ExperienceSection = () => {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade in animation for each timeline item
    const items = gsap.utils.toArray(".timeline-item");
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
    });

    // Vertical line drawing animation
    gsap.fromTo(
      ".progress-line",
      { height: 0 },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 70%",
          end: "bottom 90%",
          scrub: 0.5,
        },
      }
    );
  }, []);

  const experiences = [
    {
      role: "Full Stack Developer & Team Lead",
      company: "Current Organization",
      date: "2025 - Present",
      desc: "Leading a team of developers to build high-performance MERN applications with modern UI/UX.",
    },
    {
      role: "Full Stack Web Developer",
      company: "TechiWeb Solutions",
      date: "2024 - 2025",
      desc: "Developed custom web solutions and integrated complex API architectures.",
    },
    {
      role: "Software Development Intern",
      company: "Mittal Alliance",
      date: "Jan 2025 - Feb 2025",
      desc: "Gained hands-on experience in enterprise-level software workflows.",
    },
  ];

  return (
    <section ref={triggerRef} className="relative py-20 bg-[#050505] text-white overflow-hidden px-6 md:px-20">
      {/* Background Decorative Orange Glow */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-[#ff8c00] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-[#ff4500] opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-7xl font-black uppercase mb-20 tracking-tighter">
          My <span className="text-[#ff8c00] italic">Journey</span>
        </h2>

        <div className="relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 w-[2px] h-full bg-white/10">
            <div className="progress-line w-full bg-gradient-to-b from-[#ff8c00] to-[#ff4500]" />
          </div>

          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`timeline-item relative flex flex-col md:flex-row items-center w-full ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Connector Dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-[#ff8c00] border border-[#ff8c00] rounded-full z-10" />

                <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12 text-right"}`}>
                  <span className="text-[#ff8c00] font-mono text-sm tracking-widest">{exp.date}</span>
                  <h3 className="text-2xl md:text-4xl font-bold mt-2">{exp.role}</h3>
                  <h4 className="text-gray-400 font-medium text-lg mb-4">{exp.company}</h4>
                  <p className="text-gray-500 leading-relaxed max-w-md ml-auto mr-0">
                    {exp.desc}
                  </p>
                </div>
                <div className="hidden md:block md:w-2/12" />
                <div className="hidden md:block md:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;