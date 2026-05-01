import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileText, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Typewriter from "typewriter-effect";
import profilePhoto from "@/assets/profile-photo.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[150px] animate-pulse-glow" style={{ animationDelay: "3s" }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-accent to-gold blur-md opacity-60 animate-pulse-glow" />
              <img
                src={profilePhoto}
                alt="Mohammed Afnan - Full Stack Web Developer"
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-primary/30"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">Available for opportunities</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6"
          >
            Hi, I'm{" "}
            <span className="text-gradient-primary">Mohammed</span>
            <br />
            <span className="text-gradient-accent">Afnan</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-mono h-20"
          >
            <Typewriter
              options={{
                strings: [
                  "Full Stack Web Developer crafting responsive apps.",
                  "CS Design Undergraduate exploring AI/ML.",
                  "Passionate about clean code and cloud systems."
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-display font-semibold px-8"
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-secondary font-display"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Mail className="w-4 h-4 mr-2" /> Get In Touch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex items-center justify-center gap-5"
          >
            {[
              { icon: Github, href: "https://github.com/Afnan838", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/mohammed-afnan-080860247", label: "LinkedIn" },
              { icon: Mail, href: "mailto:afuaduis838@gmail.com", label: "Email" },
              { icon: Phone, href: "tel:+919480224372", label: "Phone" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-secondary border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:glow-primary transition-all"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
