import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ParticleBackground from "@/components/portfolio/ParticleBackground";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-noise mix-blend-overlay z-[1]" />
      <div className="absolute inset-0 bg-grid-pattern z-[1]" />
      <ParticleBackground />

      {/* Decorative Blur Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-gradient-to-r from-accent/20 to-primary/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full bg-gradient-to-r from-gold/20 to-accent/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-glass flex items-center justify-center mx-auto mb-8 shadow-glow rotate-3 hover:rotate-6 hover:scale-105 transition-all duration-500">
            <span className="font-display font-black text-4xl md:text-5xl text-foreground tracking-tighter">
              M<span className="text-gradient-primary">A</span>
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6 tracking-tight"
        >
          Welcome to <br />
          <span className="text-gradient-premium">My Universe</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light"
        >
          Explore my journey as a Full Stack Web Developer. 
          Discover premium applications, modern designs, and seamless user experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-display font-semibold px-8 py-6 text-base rounded-xl transition-all hover:scale-105"
            onClick={() => navigate("/portfolio")}
          >
            Enter Portfolio <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
