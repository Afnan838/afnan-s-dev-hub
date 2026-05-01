import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award } from "lucide-react";

const certifications = [
  { name: "Python", color: "from-primary to-primary/60" },
  { name: "Java", color: "from-accent to-accent/60" },
  { name: "React.js", color: "from-primary to-accent" },
  { name: "DevOps", color: "from-gold to-gold/60" },
  { name: "SQL", color: "from-primary/80 to-gold/80" },
  { name: "C and C++", color: "from-accent/80 to-primary/80" },
  { name: "Git", color: "from-gold/80 to-accent/80" },
];

const languages = [
  { name: "English", level: "Fluent" },
  { name: "Kannada", level: "Native" },
  { name: "Hindi", level: "Fluent" },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-gold tracking-widest uppercase">Certifications & Languages</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-3">
            Courses & <span className="text-gradient-gold">credentials</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-gold" /> Course Certifications
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="card-elevated p-4 flex items-center gap-3 hover:border-gold/30 transition-colors group"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center shrink-0 opacity-80 group-hover:opacity-100 transition-opacity`}>
                    <Award className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{cert.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-display font-semibold text-xl text-foreground mb-6">🌐 Languages</h3>
            <div className="space-y-4">
              {languages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="card-elevated p-5 flex items-center justify-between hover:border-primary/20 transition-colors"
                >
                  <span className="font-display font-medium text-foreground">{lang.name}</span>
                  <span className="text-sm text-primary font-medium px-3 py-1 rounded-full bg-primary/10 border border-primary/20">{lang.level}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="font-display font-semibold text-xl text-foreground mb-4">✨ Qualities</h3>
              <div className="flex flex-wrap gap-2">
                {["Problem-solving", "Creativity", "Communication", "Time Management", "Quick Learner", "Adaptability"].map((q) => (
                  <span key={q} className="px-3 py-1.5 text-sm rounded-full bg-accent/10 text-accent border border-accent/20 font-medium">
                    {q}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
