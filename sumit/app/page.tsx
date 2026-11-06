import Hero from "@/components/SimpleHero";
import OverviewSection from "@/components/OverviewSection";
import WorkShowcase from "@/components/WorkShowcase";
import VideoRevealSection from "@/components/VideoRevealSection";
import KineticText from "@/components/KineticText";
import GsapHorizontalScroll from "@/components/GsapHorizontalScroll";
import MagneticGrid from "@/components/MagneticGrid";
import FixedBgSection from "@/components/FixedBgSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <OverviewSection /> */}
      {/* <WorkShowcase /> */}
      <VideoRevealSection />
      {/* <MagneticGrid /> */}
      <FixedBgSection />
      <GsapHorizontalScroll />
      <KineticText />
      <ProjectsSection />
      <Footer />
    </main>
  );
}