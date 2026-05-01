import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, Phone, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const subject = (formData.get("subject") as string).trim();
    const message = (formData.get("message") as string).trim();

    if (!name || !email || !subject || !message) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("contact_messages").insert({ name, email, subject, message });

    try {
      // Replace these placeholders with your actual EmailJS credentials
      await emailjs.send(
        "YOUR_SERVICE_ID", 
        "YOUR_TEMPLATE_ID", 
        {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
        },
        "YOUR_PUBLIC_KEY" 
      );
    } catch (err) {
      console.warn("EmailJS error (this is expected if you haven't set up your credentials yet):", err);
    }

    setLoading(false);

    if (error) {
      toast({ title: "Error", description: "Could not send message. Try again later.", variant: "destructive" });
    } else {
      toast({ title: "Message sent!", description: "Thank you for reaching out. I'll get back to you soon." });
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase">Contact</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-3">
            Let's <span className="text-gradient-primary">connect</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="font-display font-semibold text-2xl text-foreground mb-4">
              Have a project in mind?
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
              Feel free to reach out!
            </p>

            <div className="space-y-5">
              {[
                { icon: Mail, label: "Email", value: "afuaduis838@gmail.com", href: "mailto:afuaduis838@gmail.com" },
                { icon: Phone, label: "Phone", value: "+91 94802 24372", href: "tel:+919480224372" },
                { icon: MapPin, label: "Location", value: "SS Nagar, Mysore, Karnataka 570003", href: null },
                { icon: Linkedin, label: "LinkedIn", value: "mohammed-afnan-080860247", href: "https://www.linkedin.com/in/mohammed-afnan-080860247" },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-foreground font-medium hover:text-primary transition-colors">
                        {value}
                      </a>
                    ) : (
                      <div className="text-sm text-foreground font-medium">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="card-elevated p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Name</label>
                <Input name="name" required placeholder="Your name" className="bg-secondary border-border" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
                <Input name="email" required type="email" placeholder="you@email.com" className="bg-secondary border-border" />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Subject</label>
              <Input name="subject" required placeholder="Project discussion" className="bg-secondary border-border" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Message</label>
              <Textarea name="message" required placeholder="Tell me about your project..." rows={5} className="bg-secondary border-border resize-none" />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-display font-semibold"
            >
              {loading ? "Sending..." : <>Send Message <Send className="w-4 h-4 ml-2" /></>}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
