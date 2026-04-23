import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mic, ArrowRight, Sparkles, ChefHat, FileText, Globe, Star, Zap, Utensils, Clock, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className="section-card group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/20"
  >
    <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity duration-500 group-hover:bg-primary/10 opacity-0 group-hover:opacity-100" />
    <div className="relative z-10">
      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-white/5">
        <Icon className="h-7 w-7 text-primary drop-shadow-md" />
      </div>
      <h3 className="text-2xl font-bold font-display mb-4 text-foreground tracking-tight">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-lg">
        {description}
      </p>
    </div>
  </motion.div>
);

const StepCard = ({ number, title, description, delay }: { number: string, title: string, description: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="flex gap-6 relative"
  >
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary font-bold text-xl font-display shadow-[0_0_15px_rgba(var(--primary),0.3)]">
        {number}
      </div>
      <div className="w-px h-full bg-gradient-to-b from-primary/50 to-transparent mt-4" />
    </div>
    <div className="pb-12 pt-2">
      <h4 className="text-2xl font-bold font-display mb-2 text-white">{title}</h4>
      <p className="text-muted-foreground text-lg">{description}</p>
    </div>
  </motion.div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-50 overflow-hidden selection:bg-primary/30">
      {/* Premium Abstract Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[60%] rounded-full bg-accent/10 blur-[150px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[70%] h-[60%] rounded-full bg-blue-600/10 blur-[150px]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 border-b border-white/5 bg-background/50 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/20 transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-primary via-primary to-accent shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <ChefHat className="h-6 w-6 text-white drop-shadow-md relative z-10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-2xl font-bold font-display tracking-tight text-white flex items-center">
              Zest<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">ify</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">How it works</a>
            <div className="h-4 w-px bg-white/10" />
            <Link to="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5 font-medium rounded-xl px-4">Sign In</Button>
            </Link>
            <Link to="/login">
              <Button className="bg-white text-black hover:bg-slate-200 font-semibold px-6 py-5 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5">
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-40 pb-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(var(--primary),0.1)]"
          >
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span className="text-sm font-semibold tracking-wide uppercase">Introducing Zestify 2.0</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-bold font-display tracking-tight mb-8 max-w-5xl mx-auto leading-[1.05]"
          >
            Your Kitchen, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent drop-shadow-sm">
               Reimagined by AI.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
          >
            Speak your ingredients, get Michelin-worthy recipes in seconds. <strong className="text-white font-medium">Zestify</strong> is your personal voice-activated sous chef, fluent in every Indian language.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/login">
              <Button className="gradient-btn h-16 px-10 text-lg font-semibold rounded-2xl w-full sm:w-auto flex items-center gap-3 group shadow-[0_0_40px_rgba(var(--primary),0.4)] hover:shadow-[0_0_60px_rgba(var(--primary),0.6)]">
                <Mic className="h-6 w-6 group-hover:scale-110 transition-transform" />
                Start Cooking
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </Link>
            
            <div className="flex items-center justify-center gap-4 text-sm text-slate-400 font-medium">
              <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                   <div key={i} style={{zIndex: 5-i}} className="w-10 h-10 rounded-full border-2 border-[#030712] bg-slate-800 flex items-center justify-center overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover opacity-80" />
                   </div>
                ))}
              </div>
              <div className="flex flex-col items-start">
                <div className="flex text-yellow-500">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span>Loved by 10,000+ chefs</span>
              </div>
            </div>
          </motion.div>

          {/* Premium UI Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-24 relative mx-auto max-w-6xl perspective-[2000px]"
          >
            <div className="absolute inset-x-0 -top-10 h-[200px] bg-gradient-to-b from-primary/20 to-transparent blur-[100px] -z-10" />
            
            <div className="relative rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-4 md:p-6 transform-gpu rotate-x-[2deg] hover:rotate-x-0 transition-all duration-700">
              <div className="rounded-[2rem] border border-white/5 bg-[#0f172a]/90 aspect-[16/9] md:aspect-[21/9] flex items-center justify-center relative overflow-hidden shadow-inner">
                {/* Simulated Glass UI Elements */}
                <div className="absolute top-8 left-8 flex gap-3 opacity-60">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                
                <div className="absolute top-8 right-8 flex gap-4">
                  <div className="h-10 w-32 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center px-4 gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="text-xs text-white/70">English</span>
                  </div>
                </div>

                <div className="flex flex-col items-center z-10">
                  <div className="relative mb-8 group cursor-pointer">
                    <div className="absolute inset-0 bg-primary/40 rounded-full blur-2xl group-hover:bg-primary/60 transition-all duration-500 animate-pulse-recording" />
                    <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_50px_rgba(var(--primary),0.5)] relative z-10 border-4 border-white/10 group-hover:scale-105 transition-transform duration-500">
                      <Mic className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-medium text-white mb-4 drop-shadow-md text-center max-w-sm md:max-w-none px-4">"I have paneer, spinach, and tomatoes..."</h3>
                  <div className="flex gap-2">
                    <div className="h-1.5 w-12 bg-primary rounded-full animate-pulse" />
                    <div className="h-1.5 w-1.5 bg-primary/50 rounded-full" />
                    <div className="h-1.5 w-1.5 bg-primary/30 rounded-full" />
                  </div>
                </div>

                {/* Decorative floating ingredients/elements */}
                <div className="absolute left-[10%] md:left-[15%] top-[20%] md:top-[30%] w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center -rotate-12 animate-float shadow-xl">
                  <Utensils className="w-6 h-6 text-orange-400" />
                </div>
                <div className="absolute right-[10%] md:right-[20%] bottom-[15%] md:bottom-[20%] w-20 h-20 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center rotate-12 animate-float-delayed shadow-xl">
                  <Clock className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Stats/Logo Cloud Section */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02] relative z-10">
        <div className="container mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex items-center gap-2 text-xl font-display font-bold"><Zap className="text-yellow-500" /> Lightning Fast</div>
           <div className="flex items-center gap-2 text-xl font-display font-bold"><Heart className="text-red-500" /> Healthy Choices</div>
           <div className="flex items-center gap-2 text-xl font-display font-bold"><Globe className="text-blue-500" /> 11+ Languages</div>
           <div className="flex items-center gap-2 text-xl font-display font-bold"><Users className="text-purple-500" /> Community Loved</div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="inline-flex items-center justify-center mb-6"
            >
              <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-slate-300">
                Next-Gen Features
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold font-display mb-8 leading-tight">Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Culinary Experience</span></h2>
            <p className="text-slate-400 text-xl leading-relaxed">Beyond just recipes. Zestify brings an entire ecosystem of AI-powered tools directly to your kitchen counter.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              delay={0.1}
              icon={Mic}
              title="Voice-First AI"
              description="Talk naturally. Say 'I want something spicy with chicken' and Zestify instantly crafts the perfect recipe."
            />
            <FeatureCard 
              delay={0.2}
              icon={Globe}
              title="Regional Expertise"
              description="Authentic instructions in Hindi, Tamil, Telugu, Malayalam, Marathi, Bengali, and more."
            />
            <FeatureCard 
              delay={0.3}
              icon={FileText}
              title="Premium Exports"
              description="Generate gorgeous, print-ready PDF recipe cards with automatic styling and layout."
            />
            <FeatureCard 
              delay={0.4}
              icon={Zap}
              title="Smart Substitutions"
              description="Missing an ingredient? Our AI instantly suggests the perfect alternatives based on flavor profiles."
            />
            <FeatureCard 
              delay={0.5}
              icon={Utensils}
              title="Dietary Intelligence"
              description="Automatically adapt any recipe for Keto, Vegan, Gluten-Free, or specific allergy requirements."
            />
            <FeatureCard 
              delay={0.6}
              icon={Clock}
              title="Step-by-Step Mode"
              description="Hands-free cooking mode that reads instructions one at a time, pacing with your cooking speed."
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="relative z-10 py-32 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">From fridge to plate in <span className="text-primary">minutes</span></h2>
              <p className="text-slate-400 text-xl mb-12">No typing, no scrolling with messy hands. Just speak, listen, and cook.</p>
              
              <div className="space-y-2">
                <StepCard number="1" title="Tell Ira what you have" description="Open the app and just say the ingredients you see in your fridge." delay={0.1} />
                <StepCard number="2" title="Choose your vibe" description="Want something quick? Spicy? Healthy? Just mention your preference." delay={0.2} />
                <StepCard number="3" title="Follow along" description="Get a perfectly structured recipe tailored exactly to your inputs." delay={0.3} />
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl -z-10 rounded-full" />
               <img src="https://images.unsplash.com/photo-1556910103-1c02745a872f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Cooking with Zestify" className="rounded-3xl border border-white/10 shadow-2xl w-full object-cover aspect-[4/3] opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-bold font-display mb-8">Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Zestify</span> your meals?</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">Join thousands of home chefs who have revolutionized their kitchen experience.</p>
          <Link to="/login">
            <Button className="gradient-btn h-16 px-12 text-xl font-bold rounded-2xl shadow-[0_0_40px_rgba(var(--primary),0.5)] hover:scale-105 transition-transform duration-300">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#030712] pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <ChefHat className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-display font-bold text-white">Zestify</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                The world's first conversational AI cooking assistant, designed for modern kitchens.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div>
                <h4 className="text-white font-semibold mb-6">Product</h4>
                <ul className="space-y-4 text-slate-400">
                  <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Languages</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-6">Company</h4>
                <ul className="space-y-4 text-slate-400">
                  <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-6">Legal</h4>
                <ul className="space-y-4 text-slate-400">
                  <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} Zestify AI. All rights reserved.</p>
            <div className="flex gap-6">
               <a href="#" className="hover:text-white transition-colors">Twitter</a>
               <a href="#" className="hover:text-white transition-colors">Instagram</a>
               <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
