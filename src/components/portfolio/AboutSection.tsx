import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, Briefcase, GraduationCap, Code2, Gamepad2 } from "lucide-react";

const stats = [
  { value: "4+", label: "Years Learning" },
  { value: "10+", label: "Projects Built" },
  { value: "15+", label: "Technologies" },
  { value: "100%", label: "Dedication" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase">About Me</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-3">
            Turning ideas into{" "}
            <span className="text-gradient-primary">reality</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
              A motivated Full Stack Web Developer and Computer Science & Design undergraduate 
              with strong fundamentals in web development, software engineering, and problem-solving.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Experienced in building responsive websites, database-driven applications, and 
              cloud-based systems using modern technologies such as HTML, CSS, Java, SQL, Bootstrap, 
              React, and Python. Hands-on experience with real-time projects including cloud-based 
              appointment systems, face swap & deepfake applications, and MRI image segmentation 
              using deep learning.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Passionate about learning new technologies, writing clean code, and contributing 
              to innovative software solutions.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MapPin, text: "Mysore, India" },
                { icon: Calendar, text: "Open to work" },
                { icon: GraduationCap, text: "B.E CSE & Design" },
                { icon: Briefcase, text: "Full Stack Dev" },
                { icon: Code2, text: "ATME College, Mysore" },
                { icon: Gamepad2, text: "Gaming & Sports" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="card-elevated p-6 text-center hover:border-primary/30 transition-colors group"
              >
                <div className="text-3xl font-display font-bold text-gradient-primary mb-1 group-hover:text-gradient-gold transition-all">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
