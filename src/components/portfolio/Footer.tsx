import { Code2, Github, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => (
  <footer className="py-12 border-t border-border/50">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Code2 className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display font-bold text-foreground">Mohammed Afnan</span>
        </div>

        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Mohammed Afnan. Crafted with passion.
        </p>

        <div className="flex items-center gap-4">
          {[
            { icon: Github, href: "https://github.com/Afnan838" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/mohammed-afnan-080860247" },
            { icon: Mail, href: "mailto:afuaduis838@gmail.com" },
            { icon: Phone, href: "tel:+919480224372" },
          ].map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
