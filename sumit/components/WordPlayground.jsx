"use client";

import { useRef, useState } from "react";
import { ArrowDown, RotateCcw, Shuffle } from "lucide-react";
import FallingText from "./FallingText";
import FoldText from "./FoldText";

const controlClass = "inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-sm font-semibold transition-colors hover:border-[#ff8c00] hover:text-[#ff8c00] disabled:opacity-35 disabled:hover:border-white/20 disabled:hover:text-white";

export default function WordPlayground() {
  const controls = useRef(null);
  const [playing, setPlaying] = useState(false);

  return (
    <section id="playground" aria-labelledby="playground-heading" className="border-t border-white/10 px-4 py-16 text-white sm:px-6 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div data-scroll-reveal="" className="mb-6">
          <h2 id="playground-heading" className="text-[clamp(2.25rem,7vw,6rem)] leading-none font-black tracking-tighter uppercase">
            Play with{" "}
            <span className="inline-block whitespace-nowrap text-[#ff8c00]">
              <FoldText
                text="gravity"
                trigger="hover"
                hoverRefold
                refoldRadius={140}
                refoldAngle={45}
                fontSize="inherit"
                fontWeight="inherit"
              />
              .
            </span>
          </h2>
          <p className="mt-3 text-sm text-white/65">Drop the words, then drag them around or give them a shake.</p>
        </div>

        <div className="h-[clamp(17rem,45svh,29rem)] overflow-hidden rounded-2xl border border-white/15 bg-[#121110] [background-image:radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:20px_20px]">
          <FallingText
            text="GOOD WEBSITES DON’T JUST SIT STILL."
            highlightWords={["SIT", "STILL"]}
            trigger="hover"
            variant="tiles"
            fontSize="clamp(1.125rem, 4vw, 3rem)"
            accentColor="#ff8c00"
            bounciness={0.35}
            scatter={0.65}
            stagger={0.06}
            className="font-black tracking-tight"
            controlsRef={controls}
            onPlayingChange={setPlaying}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" disabled={playing} onClick={() => controls.current?.play()} className={controlClass}>
            <ArrowDown size={16} aria-hidden="true" /> Drop words
          </button>
          <button type="button" disabled={!playing} onClick={() => controls.current?.shake()} className={controlClass}>
            <Shuffle size={16} aria-hidden="true" /> Shake
          </button>
          <button type="button" disabled={!playing} onClick={() => controls.current?.reset()} className={controlClass}>
            <RotateCcw size={16} aria-hidden="true" /> Reset
          </button>
        </div>
      </div>
    </section>
  );
}
