import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkShowcase from "@/components/WorkShowcase";
import WorkSection from "@/components/WorkSection";
import ExperienceSection from "@/components/ExperienceSection";
import CreativeStack from "@/components/CreativeStack";
// import KineticText from "@/components/KineticText";
import MagneticGrid from "@/components/MagneticGrid"; 
import StickyReveal from "@/components/StickyReveal";
import FixedBgSection from "@/components/FixedBgSection";
export default function Home() {
  return (
    <main>
      {/* <Navbar /> */}
      <Hero />
      <WorkShowcase />  
         <StickyReveal />
      {/* <WorkSection /> */}
      <MagneticGrid />
      <FixedBgSection />  
      {/* <KineticText /> */}
   
      <CreativeStack />
      <ExperienceSection />
    </main>
  );
}