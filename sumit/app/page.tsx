import Hero from "@/components/SimpleHero";
import OverviewSection from "@/components/OverviewSection";
import WorkShowcase from "@/components/WorkShowcase";
import VideoRevealSection from "@/components/VideoRevealSection";
import KineticText from "@/components/KineticText";
import GsapHorizontalScroll from "@/components/GsapHorizontalScroll";
import MagneticGrid from "@/components/MagneticGrid";
import FixedBgSection from "@/components/FixedBgSection";
import ProjectsSection from "@/components/ProjectsSection";
import WordPlayground from "@/components/WordPlayground";
import Footer from "@/components/Footer";
import ScrollReveals from "@/components/ScrollReveals";
import { ServicesSection, ContactSection } from "@/components/PortfolioDetails";

export default function Home() {
  return (
    <main>
      <ScrollReveals />
      <Hero />
      {/* <OverviewSection /> */}
      {/* <WorkShowcase /> */}
      <VideoRevealSection />
      {/* <MagneticGrid /> */}
      <FixedBgSection />
      <ServicesSection />
      <GsapHorizontalScroll />
      <KineticText />
      <div className="portfolio-gallery bg-[#080808]">
        <ProjectsSection />
        <ContactSection />
        <WordPlayground />
        <Footer />
      </div>
    </main>
  );
}
