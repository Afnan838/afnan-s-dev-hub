import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import CertificationsSection from "@/components/portfolio/CertificationsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";
import ParticleBackground from "@/components/portfolio/ParticleBackground";

const Index = () => (
  <div className="min-h-screen bg-background relative">
    <div className="absolute inset-0 bg-noise mix-blend-overlay z-[0] pointer-events-none fixed" />
    <div className="absolute inset-0 bg-grid-pattern z-[0] pointer-events-none fixed" />
    <ParticleBackground />
    <Navbar />
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ExperienceSection />
    <CertificationsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
