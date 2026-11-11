"use client";

import { useEffect } from "react";
import styles from "./ScrollReveals.module.css";

export default function ScrollReveals() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.replace(styles.pending, styles.entering);
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -24px 0px" });

    for (const element of elements) {
      // Leave content already visible on load or after scroll restoration alone.
      if (element.getBoundingClientRect().top < window.innerHeight) continue;
      element.classList.add(styles.pending);
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
      for (const element of elements) element.classList.remove(styles.pending, styles.entering);
    };
  }, []);

  return null;
}
