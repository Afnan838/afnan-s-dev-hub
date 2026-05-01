import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const fallbackSkills = [
  { category: "Frontend", skills: [{ name: "HTML / CSS", level: 90 }, { name: "React.js", level: 82 }, { name: "Bootstrap 5", level: 88 }, { name: "Tailwind CSS", level: 80 }] },
  { category: "Backend & Languages", skills: [{ name: "Java", level: 85 }, { name: "Python", level: 80 }, { name: "C / C++", level: 78 }, { name: "JavaScript", level: 82 }] },
  { category: "Database & Cloud", skills: [{ name: "SQL / MySQL", level: 85 }, { name: "Cloud Computing", level: 75 }, { name: "Git & GitHub", level: 82 }, { name: "DevOps", level: 70 }] },
  { category: "Core Skills", skills: [{ name: "Data Structures & Algorithms", level: 80 }, { name: "UI/UX Design", level: 78 }, { name: "Problem Solving", level: 88 }, { name: "SDLC & Debugging", level: 82 }] },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data: dbSkills } = useQuery({
    queryKey: ["public-skills"],
    queryFn: async () => {
      const { data } = await supabase.from("skills").select("*").order("category").order("display_order");
      return data;
    },
  });

  const skillCategories = dbSkills && dbSkills.length > 0
    ? Object.entries(
        dbSkills.reduce((acc, s) => {
          (acc[s.category] = acc[s.category] || []).push({ name: s.name, level: s.level });
          return acc;
        }, {} as Record<string, { name: string; level: number }[]>)
      ).map(([category, skills]) => ({ category, skills }))
    : fallbackSkills;

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase">Skills</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-3">
            My <span className="text-gradient-primary">tech stack</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.15 }}
              className="card-elevated p-6 hover:border-primary/20 transition-colors"
            >
              <h3 className="font-display font-semibold text-lg mb-5 text-foreground">
                {cat.category}
              </h3>
              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">{skill.name}</span>
                      <span className="text-primary font-medium">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + ci * 0.15 + si * 0.08, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundImage: "var(--gradient-primary)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
