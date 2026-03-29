import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, BookOpen, Sparkles, ArrowRight, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppLayout from "@/components/AppLayout";
import heroImage from "@/assets/hero-spices.jpg";
import card1 from "@/assets/recipe-card-1.jpg";
import card2 from "@/assets/recipe-card-2.jpg";
import card3 from "@/assets/recipe-card-3.jpg";

const featuredRecipes = [
  { title: "Butter Chicken", region: "North India", time: "45 min", image: card1 },
  { title: "Hyderabadi Biryani", region: "South India", time: "60 min", image: card2 },
  { title: "Masala Dosa", region: "Karnataka", time: "30 min", image: card3 },
];

const features = [
  { icon: Mic, title: "Voice Capture", desc: "Speak your recipe naturally and watch AI structure it in real time." },
  { icon: Sparkles, title: "AI Processing", desc: "Intelligent parsing extracts ingredients, steps, and metadata automatically." },
  { icon: BookOpen, title: "Recipe Library", desc: "Save, browse, and export your recipe collection as professional PDFs." },
];

const Index = () => (
  <AppLayout>
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Indian spices" className="h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
      </div>
      <div className="container relative py-24 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl space-y-6"
        >
          <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight">
            Cook with your <span className="text-gradient-orange">voice</span>, powered by AI
          </h1>
          <p className="text-lg text-muted-foreground">
            Capture authentic Indian recipes by simply speaking. Our AI transforms your words into beautifully structured recipes in real time.
          </p>
          <div className="flex gap-3">
            <Button asChild size="lg" className="glow-orange">
              <Link to="/voice-recipe">
                <Mic className="h-5 w-5 mr-2" />
                Start Recording
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border/50">
              <Link to="/recipes">
                Browse Recipes <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section className="container py-20">
      <div className="grid gap-6 md:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <Card className="border-border/30 bg-card/60 backdrop-blur hover:bg-card/90 transition-colors h-full">
              <CardContent className="pt-6 space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Featured Recipes */}
    <section className="container pb-20">
      <h2 className="text-3xl font-display font-bold mb-8 text-center">
        Featured <span className="text-gradient-orange">Recipes</span>
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {featuredRecipes.map(({ title, region, time, image }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-border/30 bg-card/60 overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="aspect-square overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="pt-4 space-y-2">
                <h3 className="font-display font-semibold text-lg">{title}</h3>
                <div className="flex gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> {region}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" /> {time}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  </AppLayout>
);

export default Index;
