import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Code2 } from "lucide-react";

const education = [
  {
    title: "B.E in Computer Science & Design",
    place: "ATME College of Engineering, Mysore",
    period: "2022 – 2026",
    description: "Currently pursuing Bachelor of Engineering in Computer Science & Design. Building strong fundamentals in web development, software engineering, data structures, and AI/ML.",
    highlights: ["Full Stack Web Dev", "AI/ML", "Cloud Computing", "Data Structures"],
  },
  {
    title: "Pre-University (11th-12th)",
    place: "Gopalswamy Shishu Vihara Independent PU College, Mysore",
    period: "2021 – 2022",
    description: "Completed pre-university education with focus on science and mathematics.",
    highlights: ["Science", "Mathematics", "Computer Science"],
  },
  {
    title: "ICSE (1st-10th)",
    place: "Floss Carmeli Convent ICSE School, Mysore",
    period: "2008 – 2020",
    description: "Completed ICSE schooling with strong academic foundation.",
    highlights: ["ICSE Board", "Computer Applications"],
  },
];

const projects = [
  {
    title: "Jan AI Internship Program",
    place: "Chalukya Technologies Pvt Ltd",
    period: "Jan 2026 – Apr 2026",
    description: "Built AI solutions that create real-world impact in communities. Focused on the core principles: Innovate, Implement, and Impact.",
    highlights: ["AI Solutions", "Community Impact", "Innovation"],
  },
  {
    title: "MRI Image Segmentation (Final Year)",
    place: "ATME College of Engineering",
    period: "2025 – 2026",
    description: "CARDIOMYOCARDIUM MRI IMAGE SEGMENTATION USING DEEPLABV3 AND RESNET FOR EARLY DETECTION. Also built a Robotic Process Automation tool that fetches data from the browser in the form of summary.",
    highlights: ["DeepLabV3", "ResNet", "Deep Learning", "RPA"],
  },
  {
    title: "Real-Time Face Swap & Deepfake (3rd Year)",
    place: "ATME College of Engineering",
    period: "2024 – 2025",
    description: "Created a cloud-based appointment scheduling system. Built a mini project on Real-Time Face Swap and One Click Video Deepfake with only a single image.",
    highlights: ["Cloud Systems", "Computer Vision", "AI", "Face Swap"],
  },
  {
    title: "Courier Management System (2nd Year)",
    place: "ATME College of Engineering",
    period: "2023 – 2024",
    description: "Worked on Bootstrap 5.0, created a portfolio and different websites. Built a courier management system using SQL-based languages.",
    highlights: ["Bootstrap 5", "SQL", "CRUD Operations", "Web Design"],
  },
  {
    title: "Personal Website (1st Year)",
    place: "ATME College of Engineering",
    period: "2022 – 2023",
    description: "Created a personal website using web technologies including CSS and JavaScript.",
    highlights: ["HTML", "CSS", "JavaScript", "Web Basics"],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase">Journey</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-3">
            Education & <span className="text-gradient-accent">Experience</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 font-display font-semibold text-xl text-foreground mb-8"
            >
              <GraduationCap className="w-5 h-5 text-primary" /> Education
            </motion.h3>
            <div className="relative pl-8 border-l border-border">
              {education.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                  className="relative mb-8 last:mb-0"
                >
                  <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-primary/20 border-2 border-primary z-10">
                    <div className="absolute inset-1 rounded-full bg-primary" />
                  </div>
                  <div className="card-elevated p-5 hover:border-primary/20 transition-colors">
                    <span className="text-xs text-primary font-medium">{item.period}</span>
                    <h4 className="font-display font-semibold text-foreground mt-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{item.place}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.highlights.map((h) => (
                        <span key={h} className="px-2 py-0.5 text-xs rounded-md bg-secondary text-secondary-foreground">{h}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Projects Timeline */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 font-display font-semibold text-xl text-foreground mb-8"
            >
              <Code2 className="w-5 h-5 text-accent" /> Experience & Projects
            </motion.h3>
            <div className="relative pl-8 border-l border-border">
              {projects.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                  className="relative mb-8 last:mb-0"
                >
                  <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-accent/20 border-2 border-accent z-10">
                    <div className="absolute inset-1 rounded-full bg-accent" />
                  </div>
                  <div className="card-elevated p-5 hover:border-accent/20 transition-colors">
                    <span className="text-xs text-accent font-medium">{item.period}</span>
                    <h4 className="font-display font-semibold text-foreground mt-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{item.place}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.highlights.map((h) => (
                        <span key={h} className="px-2 py-0.5 text-xs rounded-md bg-accent/10 text-accent border border-accent/20">{h}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
