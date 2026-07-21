import ScrollImageSequence from "@/components/ScrollImageSequence";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visual Journey | Sumit Sahu",
  description:
    "A cinematic scroll-driven visual experience — 10 frames, one seamless journey.",
};

export default function TenImgPage() {
  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <ScrollImageSequence />
    </main>
  );
}
