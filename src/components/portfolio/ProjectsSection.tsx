import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Tilt from "react-parallax-tilt";

const fallbackProjects = [
  {
    id: "1",
    title: "MRI Image Segmentation",
    description: "Cardiomyocardium MRI Image Segmentation using DeepLabV3 and ResNet for early cardiac disease detection. Final year major project.",
    tags: ["Python", "DeepLabV3", "ResNet", "Deep Learning"],
    category: "AI/ML",
    live_url: null,
    github_url: "https://github.com/Afnan838",
  },
  {
    id: "2",
    title: "Real-Time Face Swap & Deepfake",
    description: "One-click video deepfake with a single image. Real-time face swap application using computer vision and AI techniques.",
    tags: ["Python", "Computer Vision", "AI", "OpenCV"],
    category: "AI/ML",
    live_url: null,
    github_url: "https://github.com/Afnan838",
  },
  {
    id: "3",
    title: "Cloud-Based Appointment System",
    description: "Cloud-based appointment scheduling system with real-time booking, notifications, and admin management panel.",
    tags: ["React", "Cloud", "SQL", "REST API"],
    category: "Full Stack",
    live_url: null,
    github_url: "https://github.com/Afnan838",
  },
  {
    id: "4",
    title: "Robotic Process Automation",
    description: "RPA tool that automatically fetches data from the browser and generates structured summaries for efficient data processing.",
    tags: ["Python", "RPA", "Web Scraping", "Automation"],
    category: "Automation",
    live_url: null,
    github_url: "https://github.com/Afnan838",
  },
  {
    id: "5",
    title: "Courier Management System",
    description: "Full CRUD courier management system with tracking, status updates, and SQL-based database management.",
    tags: ["Bootstrap 5", "SQL", "JavaScript", "CRUD"],
    category: "Full Stack",
    live_url: null,
    github_url: "https://github.com/Afnan838",
  },
  {
    id: "6",
    title: "Personal Portfolio Website",
    description: "Responsive personal portfolio website built from scratch showcasing projects, skills, and contact information.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive"],
    category: "Frontend",
    live_url: null,
    github_url: "https://github.com/Afnan838",
  },
  {
    id: "7",
    title: "Spoken Spoons",
    description: "An AI-powered recipe application with a voice assistant named Ira, premium responsive design, and administrative features.",
    tags: ["React", "AI", "Voice Assistant", "Responsive"],
    category: "Full Stack",
    live_url: null,
    github_url: "https://github.com/Afnan838/spoken-spoons.git",
  },
];

const colorMap: Record<string, string> = {
  "Full Stack": "from-primary/20 to-primary/5",
  "Frontend": "from-accent/20 to-primary/10",
  "AI/ML": "from-gold/20 to-accent/10",
  "Automation": "from-primary/15 to-gold/10",
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState("All");

  const { data: dbProjects } = useQuery({
    queryKey: ["public-projects"],
    queryFn: async () => {
      const { data } = await supabase.from("projects").select("*").order("display_order");
      return data;
    },
  });

  const projects = dbProjects && dbProjects.length > 0 ? dbProjects : fallbackProjects;
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))];
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase">Projects</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-3">
            Featured <span className="text-gradient-primary">work</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-3 mb-12 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filtered.map((project, i) => {
            const color = colorMap[project.category ?? ""] ?? "from-primary/15 to-primary/5";
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="h-full"
              >
                <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} transitionSpeed={2500} className="card-elevated overflow-hidden group hover:border-primary/30 transition-all h-full flex flex-col">
                  <div className={`h-40 bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
                    <Layers className="w-12 h-12 text-primary/40 group-hover:text-primary/60 transition-colors" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {(project.tags ?? []).map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.github_url && (
                      <Button size="sm" variant="outline" className="text-xs border-border hover:border-primary/30" asChild>
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-3.5 h-3.5 mr-1.5" /> Code
                        </a>
                      </Button>
                    )}
                    {project.live_url && (
                      <Button size="sm" className="text-xs bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Live Demo
                        </a>
                      </Button>
                    )}
                    {!project.github_url && !project.live_url && (
                      <Button size="sm" variant="outline" className="text-xs border-border opacity-50 cursor-default">
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
