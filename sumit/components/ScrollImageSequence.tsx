"use client";

import { useEffect, useRef } from "react";

const TOTAL = 10;
// 50vh per frame → 500vh total — feels fast & responsive
const SCROLL_PER_FRAME = 50; // vh
const SRCS = Array.from({ length: TOTAL }, (_, i) => `/10img/${i + 1}.png`);

export default function ScrollImageSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const bitmaps      = useRef<(ImageBitmap | null)[]>(Array(TOTAL).fill(null));
  const lastFrame    = useRef(-1);
  const rafPending   = useRef(false);

  /* ── preload as ImageBitmap (GPU-ready, instant draw) ── */
  useEffect(() => {
    SRCS.forEach((src, i) => {
      fetch(src)
        .then((r) => r.blob())
        .then((blob) => createImageBitmap(blob))
        .then((bmp) => {
          bitmaps.current[i] = bmp;
          if (i === 0) drawFrame(0);
        })
        .catch(() => {
          // fallback: plain Image
          const img = new window.Image();
          img.src = src;
          img.onload = () => {
            createImageBitmap(img).then((bmp) => {
              bitmaps.current[i] = bmp;
              if (i === 0) drawFrame(0);
            });
          };
        });
    });
  }, []); // eslint-disable-line

  /* ── draw one frame ── */
  const drawFrame = (idx: number) => {
    const canvas = canvasRef.current;
    const bmp    = bitmaps.current[idx];
    if (!canvas || !bmp) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const W = canvas.width  = window.innerWidth;
    const H = canvas.height = window.innerHeight;

    const scale = Math.max(W / bmp.width, H / bmp.height);
    const w = bmp.width  * scale;
    const h = bmp.height * scale;
    ctx.drawImage(bmp, (W - w) / 2, (H - h) / 2, w, h);
  };

  /* ── scroll → frame index (direct, no lerp) ── */
  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const scrolled = -el.getBoundingClientRect().top;
      const maxScroll = el.offsetHeight - window.innerHeight;
      const p   = Math.max(0, Math.min(1, scrolled / maxScroll));
      // map to 0…TOTAL-1 with full range coverage
      const idx = Math.min(TOTAL - 1, Math.floor(p * TOTAL));

      if (idx === lastFrame.current) return;
      lastFrame.current = idx;

      if (!rafPending.current) {
        rafPending.current = true;
        requestAnimationFrame(() => {
          drawFrame(lastFrame.current);
          rafPending.current = false;
        });
      }
    };

    const onResize = () => {
      // force canvas resize + redraw
      if (canvasRef.current) {
        canvasRef.current.width  = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
      drawFrame(Math.max(0, lastFrame.current));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []); // eslint-disable-line

  return (
    <div
      ref={containerRef}
      style={{ height: `${TOTAL * SCROLL_PER_FRAME}vh` }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position : "sticky",
          top      : 0,
          left     : 0,
          width    : "100%",
          height   : "100vh",
          display  : "block",
          background: "#000",
        }}
      />
    </div>
  );
}
