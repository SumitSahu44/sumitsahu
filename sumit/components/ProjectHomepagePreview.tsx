"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown, RotateCcw } from "lucide-react";

export default function ProjectHomepagePreview({ src, name }: { src: string; name: string }) {
  const [playing, setPlaying] = useState<boolean | null>(null);

  return (
    <button
      type="button"
      aria-label={`Scroll ${name} homepage preview`}
      aria-pressed={playing === true}
      data-playing={playing ?? undefined}
      onClick={() => setPlaying((current) => !current)}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setPlaying(null);
      }}
      onBlur={() => setPlaying(null)}
      className="project-homepage-preview relative block w-full cursor-pointer overflow-hidden rounded-b-md bg-[#171717] text-left"
    >
      <Image
        src={src}
        alt={`${name} homepage screenshot`}
        width={1280}
        height={720}
        unoptimized
        className="project-homepage-image block h-auto w-full"
      />
      <span className="project-preview-hint pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#080808] px-2.5 py-1.5 text-[10px] font-medium text-white shadow-md">
        {playing ? <><RotateCcw size={12} aria-hidden="true" /> Back to top</> : <><ArrowDown size={12} aria-hidden="true" /> <span className="hidden [@media(hover:hover)]:inline">Hover to scroll</span><span className="[@media(hover:hover)]:hidden">Tap to scroll</span></>}
      </span>
    </button>
  );
}
