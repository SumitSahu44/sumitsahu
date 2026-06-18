import Hero from "@/components/Hero";
import WorkShowcase from "@/components/WorkShowcase";
import KineticText from "@/components/KineticText";
import MagneticGrid from "@/components/MagneticGrid"; 
import StickyReveal from "@/components/StickyReveal";
import FixedBgSection from "@/components/FixedBgSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkShowcase />  
      <StickyReveal />
      <MagneticGrid />
      <FixedBgSection />  
      <KineticText />
      <Footer />
    </main>
  );
}