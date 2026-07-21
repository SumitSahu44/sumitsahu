import Hero from "@/components/SimpleHero";
import OverviewSection from "@/components/OverviewSection";
import WorkShowcase from "@/components/WorkShowcase";
import VideoRevealSection from "@/components/VideoRevealSection";
import KineticText from "@/components/KineticText";
import MagneticGrid from "@/components/MagneticGrid"; 
import StickyReveal from "@/components/StickyReveal";
import FixedBgSection from "@/components/FixedBgSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <OverviewSection />
      <WorkShowcase />  
      <VideoRevealSection />
      <StickyReveal />
      <MagneticGrid />
      <FixedBgSection />  
      <KineticText />
      <Footer />
    </main>
  );
}