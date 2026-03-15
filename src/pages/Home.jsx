import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Terminal,
  Code2,
  Layers,
  Database,
  Cloud,
  ChevronDown,
  Download,
  Send,
  Star,
  GitFork,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  ArrowUpRight,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { ThemeToggle } from "@/components/ThemeToggle.jsx";
import resumePdf from "@/assets/Resume.pdf";
import profilePhoto from "@/assets/my photo.jpg";
import shoe_landingpage from "@/assets/shoe_landingpage.png";
import pr1_img1 from "@/assets/pr1_img1.png";
import pr1_img2 from "@/assets/pr1_img2.png";
import pr1_img3 from "@/assets/pr1_img3.png";
import pr2_img1 from "@/assets/pr2_img1.png";
import pr2_img2 from "@/assets/pr2_img2.png";
import pr2_img3 from "@/assets/pr2_img3.png";
import { GitHubCalendar } from "react-github-calendar";
import OrbitSystem from "@/components/OrbitSystem.jsx";


// Mouse glow effect component
function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      className="fixed pointer-events-none z-50 w-[400px] h-[400px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 60%)",
        transform: "translate(-50%, -50%)",
        left: mousePosition.x,
        top: mousePosition.y,
        opacity: isVisible ? 1 : 0,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  );
}

// Section reveal wrapper
function SectionReveal({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated background grid component
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(0, 212, 255, ${0.08 - i * 0.015}) 0%, transparent 70%)`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(10, 10, 15, 0.5) 50%, rgba(10, 10, 15, 1) 100%)",
        }}
      />
    </div>
  );
}

// Floating code particles
function CodeParticles() {
  const particles = [
    { text: "</>", x: "10%", y: "20%", delay: 0 },
    { text: "{ }", x: "85%", y: "15%", delay: 0.5 },
    { text: "=>", x: "75%", y: "70%", delay: 1 },
    { text: "const", x: "15%", y: "80%", delay: 1.5 },
    { text: "() =>", x: "90%", y: "45%", delay: 2 },
    { text: "async", x: "5%", y: "50%", delay: 2.5 },
    { text: "await", x: "92%", y: "80%", delay: 3 },
    { text: "=>", x: "3%", y: "35%", delay: 3.5 },
    { text: "{}", x: "88%", y: "55%", delay: 4 },
    { text: "&&", x: "8%", y: "65%", delay: 4.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs text-electric/15"
          style={{ left: particle.x, top: particle.y }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 5 + i * 0.5,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {particle.text}
        </motion.div>
      ))}
    </div>
  );
}

// Typing effect hook
function useTypingEffect(words, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}

// Navigation component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-background/40 dark:bg-background/30 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/10 dark:border-white/5 shadow-lg shadow-black/5 dark:shadow-black/20"
        : "bg-background/10 dark:bg-transparent backdrop-blur-md"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#"
            className="text-xl font-bold text-gradient"
            whileHover={{ scale: 1.05 }}
          >
            RC
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric transition-all group-hover:w-full" />
              </motion.a>
            ))}
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" className="border-electric/30 text-electric hover:bg-electric/10" asChild>
                <a href={resumePdf} download="Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <motion.div
            className="md:hidden mt-4 pt-8 absolute top-0 left-0 right-0 h-screen bg-background border-b border-border px-6 flex flex-col z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-end pb-8">
              <button
                className="text-foreground"
                onClick={() => setIsOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-muted-foreground hover:text-foreground border-b border-border/50 last:border-0"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-8 flex flex-col gap-6 mt-auto mb-20">
              <div className="flex justify-center border-t border-border/50 pt-8">
                <ThemeToggle />
              </div>
              <Button size="lg" className="bg-electric text-background hover:bg-electric/90 w-full" asChild>
                <a href={resumePdf} download="Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

// Hero Section
function HeroSection() {
  const typingText = useTypingEffect([
    "Full Stack Developer",
    "Problem Solver",
    "AI Enthusiast",
  ]);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      <AnimatedGrid />
      <div className="hidden dark:block">
        <CodeParticles />
      </div>

      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          {/* <Badge
            variant="outline"
            className="border-electric/30 text-electric px-4 py-1 text-sm"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            Available for opportunities
          </Badge> */}
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-gradient-subtle">Hi, I&apos;m </span>
          <span className="text-gradient">Raj Chavda</span>
        </motion.h1>

        <motion.div
          className="h-12 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl text-foreground/60 dark:text-muted-foreground font-mono">
            <span className="text-electric">&gt;</span>{" "}
            <span>{typingText}</span>
            <span className="animate-pulse">|</span>
          </p>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-foreground/50 dark:text-muted-foreground max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Building scalable digital experiences through{" "}
          <span className="text-foreground font-medium">code</span>,{" "}
          <span className="text-foreground font-medium">creativity</span>, and{" "}
          <span className="text-foreground font-medium">problem solving</span>.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-electric hover:bg-electric/90 text-background px-8 h-12"
              asChild
            >
              <a href="#projects">
                View Projects
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="border-border hover:bg-secondary px-8 h-12"
              asChild
            >
              <a href={resumePdf} download="Resume.pdf" target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="border-electric/30 text-electric mb-4">
            About Me
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Crafting Digital <span className="text-gradient">Experiences</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Profile Photo & Modern Animated Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative flex justify-center items-center max-w-full overflow-hidden"
          >
            {/* Responsive scaling wrapper — the orbit visual is designed at 500×500px
                and scales down proportionally on smaller screens */}
            <div
              className="relative"
              style={{
                width: 500,
                height: 500,
                transform: 'scale(clamp(0.6, calc(80vw / 500), 1))',
                transformOrigin: 'center center',
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric/10 dark:from-electric/20 to-cyber/10 dark:to-cyber/20 rounded-full blur-3xl scale-75" />

              {/* Profile image as the core — centered in the 500×500 design space */}
              <div
                className="absolute rounded-full overflow-hidden border-4 border-electric/20 dark:border-electric/30 bg-card/50 backdrop-blur-sm z-30 shadow-[0_0_30px_rgba(0,212,255,0.15)] dark:shadow-[0_0_30px_rgba(0,212,255,0.2)]"
                style={{
                  width: 224,
                  height: 224,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 20%' }}
                />
              </div>

              {/* Orbit System - animated nodes on elliptical paths */}
              <OrbitSystem />

              {/* Floating badges — fixed positions inside the 500×500 design unit */}
              <motion.div
                className="absolute bg-card/90 dark:bg-card/80 backdrop-blur-md border border-border/60 dark:border-border rounded-xl px-4 py-2 shadow-lg z-20 hover:border-electric/40 hover:shadow-electric/10 transition-all duration-300 cursor-default"
                style={{ top: 20, right: 30 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                whileHover={{ scale: 1.08 }}
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-electric" />
                  <span className="text-sm font-medium text-foreground">Full Stack</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bg-card/90 dark:bg-card/80 backdrop-blur-md border border-border/60 dark:border-border rounded-xl px-4 py-2 shadow-lg z-20 hover:border-neon/40 hover:shadow-neon/10 transition-all duration-300 cursor-default"
                style={{ bottom: 30, left: 30 }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                whileHover={{ scale: 1.08 }}
              >
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-neon" />
                  <span className="text-sm font-medium text-foreground">Architecture</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bg-card/90 dark:bg-card/80 backdrop-blur-md border border-border/60 dark:border-border rounded-xl px-4 py-2 shadow-lg z-20 hover:border-orange-400/40 hover:shadow-orange-400/10 transition-all duration-300 cursor-default"
                style={{ top: '50%', left: -20, transform: 'translateY(-50%)' }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                whileHover={{ scale: 1.08 }}
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-medium text-foreground">Creativity</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bg-card/90 dark:bg-card/80 backdrop-blur-md border border-border/60 dark:border-border rounded-xl px-4 py-2 shadow-lg z-20 hover:border-purple-400/40 hover:shadow-purple-400/10 transition-all duration-300 cursor-default"
                style={{ top: '50%', right: -20, transform: 'translateY(-50%)' }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: 1.5 }}
                whileHover={{ scale: 1.08 }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-foreground">AI Enthusiast</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bg-card/90 dark:bg-card/80 backdrop-blur-md border border-border/60 dark:border-border rounded-xl px-4 py-2 shadow-lg z-20 hover:border-blue-400/40 hover:shadow-blue-400/10 transition-all duration-300 cursor-default"
                style={{ bottom: -5, left: '50%', transform: 'translateX(-50%)' }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 0.8 }}
                whileHover={{ scale: 1.08 }}
              >
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-foreground">Mobile Development</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 h-full flex flex-col justify-center"
          >
            <div className="bg-white/5 dark:bg-white/5 backdrop-blur-lg border border-white/10 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 rounded-2xl p-6 md:p-8 group">
              <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                  I&apos;m a passionate <span className="text-foreground">Full Stack Developer</span> building modern web applications. My journey started
                  with a curiosity about how things work, which led me to fall in love with creating
                  elegant solutions to complex problems.
                </p>
                <p>
                  I specialize in <span className="text-foreground">React</span>{" "}
                  and{" "}<span className="text-foreground">Node.js</span> with a keen eye for design
                  and user experience. I believe in writing clean, maintainable code that stands
                  the test of time.
                </p>
                <p>
                  When I&apos;m not coding, you&apos;ll find me contributing to open source,
                  exploring new technologies, or sharing knowledge with the developer community.
                </p>
              </div>
            </div>

            <div className="bg-white/5 dark:bg-white/5 backdrop-blur-lg border border-white/10 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 rounded-xl p-6 group">
              <div className="space-y-3 text-sm md:text-base">
                {[
                  { label: "Location", value: "Gujarat, IN" },
                  { label: "Focus", value: "Full Stack Development" },
                  { label: "Education", value: "B.Tech Information Technology" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="text-foreground font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Skills Section
function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: Code2,
      skills: ["React", "Tailwind CSS", "Framer Motion"],
      color: "from-electric to-cyan-400",
      iconColor: "text-cyan-400",
    },
    {
      title: "Backend",
      icon: Terminal,
      skills: ["Node.js", "Python", "REST APIs", "Express.js"],
      color: "from-cyber to-purple-400",
      iconColor: "text-purple-400",
    },
    {
      title: "Database",
      icon: Database,
      skills: ["MongoDB", "MySQL", "Supabase", "Firebase"],
      color: "from-neon to-green-400",
      iconColor: "text-green-400",
    },
    {
      title: "DevOps & Tools",
      icon: Cloud,
      skills: ["Docker", "Vercel", "Git", "Linux"],
      color: "from-orange-400 to-amber-400",
      iconColor: "text-amber-400",
    },
  ];

  // All skills flattened for marquee
  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({ name: skill, color: cat.color, iconColor: cat.iconColor }))
  );

  return (
    <section id="skills" className="py-32 px-6 relative bg-card/30 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="border-electric/30 text-electric mb-4">
            Skills & Technologies
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A curated collection of technologies I use to build exceptional digital products
          </p>
        </motion.div>

        {/* Animated Marquee */}
        <div className="relative mb-16">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-card/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-card/80 to-transparent z-10 pointer-events-none" />
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...allSkills, ...allSkills].map((skill, i) => (
              <div
                key={i}
                className={`flex-shrink-0 px-6 py-3 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex items-center gap-3 hover:border-electric/40 transition-colors cursor-default`}
              >
                <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${skill.color}`} />
                <span className="text-base font-medium text-foreground/90 whitespace-nowrap">{skill.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Category Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="bg-white/5 dark:bg-white/5 backdrop-blur-lg border-white/10 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/10 dark:hover:bg-white/10 hover:border-electric/30 transition-all duration-300 overflow-hidden group h-full">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} shadow-lg`}
                  >
                    <category.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-foreground">{category.title}</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {category.skills.map((skill, j) => (
                      <span
                        key={j}
                        className="text-xs px-3 py-1 rounded-full bg-secondary/40 text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GitHubCalendarSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-electric/30 text-electric mb-4">
            Open Source
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            GitHub <span className="text-gradient">Contributions</span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/5 dark:bg-white/5 backdrop-blur-lg border border-white/10 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/10 hover:border-electric/30 transition-all duration-300 overflow-hidden p-4 sm:p-8 w-full max-w-full flex justify-center">
            <div className="min-w-fit overflow-x-auto">
              <GitHubCalendar
                username="234rai"
                blockSize={14}
                blockMargin={5}
                fontSize={14}
                colorScheme="dark"
                theme={{
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                }}
              />
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const projects = [
    {
      title: "Disease Prediction System",
      description: "A machine learning based web application for predicting multiple diseases based on user symptoms.",
      images: [pr1_img2, pr1_img1, pr1_img3],
      tags: ["Machine Learning", "Python", "Streamlit"],
      github: "https://github.com/234rai/Diease-Prediction",
      demo: "https://diease-prediction-s2aix5uu2bxqdfayzhk5jz.streamlit.app/",
      featured: true,
    },
    {
      title: "AI-Recruitment-HireHubb",
      description: "An AI powered app for job seekers & recruiters to find best matches.",
      images: [pr2_img2, pr2_img1, pr2_img3],
      tags: ["Flutter", "Dart", "Firebase"],
      github: "https://github.com/234rai/Ai-Recruitment-HireHubb",
      demo: "https://recuritmentproject.web.app",
      featured: true,
    },
    {
      title: "Shoe Landing Page",
      description: "A web page of shoe using basic HTML and CSS with responsive design.",
      image: shoe_landingpage,
      tags: ["HTML", "CSS"],
      github: "https://github.com/234rai/shoe_landing_page",
      demo: "https://234rai.github.io/shoe_landing_page/",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="border-electric/30 text-electric mb-4">
            Featured Work
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Recent <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my expertise in building modern applications
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <Card className="bg-white/5 dark:bg-white/5 backdrop-blur-lg border border-white/10 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/10 dark:hover:bg-white/10 hover:border-electric/30 transition-all duration-300 overflow-hidden h-full">
                <div className="relative aspect-[16/10] overflow-hidden bg-black/20 group flex items-center justify-center p-3">
                  {project.featured && (
                    <div className="absolute top-2 right-2 z-10">
                      <Badge className="bg-electric text-background text-[10px] px-1.5 py-0.5 shadow-md">
                        Featured
                      </Badge>
                    </div>
                  )}
                  {project.images ? (
                    <div className="relative w-full h-full flex items-center justify-center pt-8 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      <div className="flex justify-center items-end h-[115%] w-[105%] gap-2 px-2 pb-2">
                        {/* Apple-style mobile app screenshots display - High Quality */}
                        <div className="relative w-[30%] h-[85%] rotate-[-5deg] translate-y-2 translate-x-2 shadow-[-5px_10px_20px_rgb(0,0,0,0.4)] rounded-[1rem] overflow-hidden border-[2px] border-[#333] dark:border-[#222] z-10 bg-black">
                          <img src={project.images[0]} alt={`${project.title} screen 1`} className="w-full h-full object-cover object-top opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                          <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] pointer-events-none rounded-[0.8rem]" />
                        </div>

                        <div className="relative w-[36%] h-[95%] shadow-[0_15px_35px_rgb(0,0,0,0.6)] rounded-[1.25rem] overflow-hidden border-[3px] border-[#222] dark:border-[#111] z-20 bg-black">
                          <img src={project.images[1]} alt={`${project.title} screen 2`} className="w-full h-full object-cover object-top" />
                          {/* iPhone style top notch */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[12px] bg-[#222] dark:bg-[#111] rounded-b-[6px] z-30" />
                          <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.6)] pointer-events-none rounded-[1rem]" />
                        </div>

                        <div className="relative w-[30%] h-[85%] rotate-[5deg] translate-y-2 -translate-x-2 shadow-[5px_10px_20px_rgb(0,0,0,0.4)] rounded-[1rem] overflow-hidden border-[2px] border-[#333] dark:border-[#222] z-10 bg-black">
                          <img src={project.images[2]} alt={`${project.title} screen 3`} className="w-full h-full object-cover object-top opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                          <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] pointer-events-none rounded-[0.8rem]" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img src={project.image} alt={project.title} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 rounded-md drop-shadow-md" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-base font-semibold mb-1 group-hover:text-electric transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-[10px] px-1.5 py-0.5 bg-secondary/50 rounded-md text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto pt-2">
                    <a
                      href={project.github}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                    {project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-electric transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            className="border-electric/30 text-electric hover:bg-electric/10"
          >
            View All Projects
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// Experience Section
function ExperienceSection() {
  const experiences = [
    {
      type: "education",
      title: "B.Tech Information Technology",
      company: "Marwadi University",
      period: "2022 - Present",
      description: "Learned about web & mobile app development , Artifical Intelligence and it's core maths and computer networking. GPA: 8.55/10.0",
    },
    {
      type: "education",
      title: "Higher Secondary Education",
      company: "OSEM Pathak School",
      period: "2021 - 2022",
      description: "Choose Science stream and learned PCM subjects and know what is science actually it is!",
    },
    {
      type: "education",
      title: "Primary & Secondary Education",
      company: "OSEM Pathak School",
      period: "2011 - 2020",
      description: "Learned and enjoy the school life!",
    },
  ];

  return (
    <section id="experience" className="py-32 px-6 relative bg-card/30">
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="border-electric/30 text-electric mb-4">
            Career Journey
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Experience & <span className="text-gradient">Education</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-foreground/20 dark:bg-electric/20 transform md:-translate-x-1/2" />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex items-center mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
            >
              {/* Timeline node */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-electric border-4 border-background z-10 shadow-[0_0_8px_rgba(0,212,255,0.4)]" />

              {/* Content */}
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-8 md:pl-0`}>
                <Card className="bg-white/5 dark:bg-white/5 backdrop-blur-lg border border-white/10 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/10 dark:hover:bg-white/10 hover:border-electric/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {exp.type === "work" ? (
                        <Briefcase className="w-4 h-4 text-electric" />
                      ) : (
                        <GraduationCap className="w-4 h-4 text-cyber" />
                      )}
                      <span className="text-sm text-muted-foreground">{exp.period}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{exp.title}</h3>
                    <p className="text-sm text-electric mb-3">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.description}</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// GitHub Activity Section
function GitHubSection() {
  const [githubUser, setGithubUser] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const username = "234rai";

  useEffect(() => {
    // Fetch GitHub User Info
    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(data => {
        if (!data.message) setGithubUser(data);
      })
      .catch(console.error);

    // Fetch GitHub Events for Commits
    fetch(`https://api.github.com/users/${username}/events/public`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter PushEvents to show recent commits
          const pushes = data
            .filter(event => event.type === 'PushEvent')
            .slice(0, 5);
          setRecentEvents(pushes);
        }
        setLoadingEvents(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingEvents(false);
      });
  }, []);

  return (
    <section id="github" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="border-electric/30 text-electric mb-4">
            Open Source
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            GitHub <span className="text-gradient">Activity</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Code2, value: githubUser?.public_repos || "0", label: "Public Repos" },
            { icon: Star, value: githubUser?.followers || "0", label: "Followers" },
            { icon: Github, value: githubUser?.following || "0", label: "Following" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="bg-white/5 dark:bg-white/5 backdrop-blur-lg border border-white/10 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/10 dark:hover:bg-white/10 hover:border-electric/30 transition-all duration-300 text-center h-full">
                <CardContent className="p-8">
                  <stat.icon className="w-8 h-8 text-electric mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Push Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/5 dark:bg-white/5 backdrop-blur-lg border border-white/10 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <GitFork className="w-5 h-5 text-electric" />
                  Recent Commits
                </h3>
                <span className="text-sm text-muted-foreground">Latest pushes</span>
              </div>

              <div className="space-y-4">
                {loadingEvents ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <div className="animate-pulse flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" /> Fetching latest activity...
                    </div>
                  </div>
                ) : recentEvents.length > 0 ? (
                  recentEvents.map((event, index) => (
                    <div key={index} className="flex gap-4 p-4 rounded-lg bg-secondary/30 items-start">
                      <div className="mt-1">
                        <Terminal className="w-4 h-4 text-electric" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <a href={`https://github.com/${event.repo.name}`} target="_blank" rel="noopener noreferrer" className="font-medium text-electric hover:underline truncate max-w-[200px] sm:max-w-xs block">
                            {event.repo.name}
                          </a>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(event.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm text-foreground/80 mt-1 line-clamp-1 max-w-[250px] sm:max-w-md">
                          {event.payload.commits && event.payload.commits[0] ? event.payload.commits[0].message : 'Pushed to repository'}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <Terminal className="w-4 h-4" /> No recent commits found over the last 90 days.
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            className="border-electric/30 text-electric hover:bg-electric/10"
            asChild
          >
            <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 w-4 h-4" />
              View GitHub Profile
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // EmailJS requires Service ID, Template ID, and Public Key variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS environment variables are missing!");
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: formData.name,
            reply_to: formData.email,
            message: formData.message,
          },
        }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 relative bg-card/30">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="border-electric/30 text-electric mb-4">
            Get In Touch
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let&apos;s Work <span className="text-gradient">Together</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/5 dark:bg-white/5 backdrop-blur-lg border border-white/10 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-secondary/50 border-border focus:border-electric"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-secondary/50 border-border focus:border-electric"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-secondary/50 border-border focus:border-electric resize-none"
                    />
                  </div>
                  {submitStatus === "success" && (
                    <p className="text-sm text-neon">Message sent successfully!</p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-sm text-destructive">Failed to send. Please try again.</p>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-electric hover:bg-electric/90 text-background h-12"
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 w-4 h-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold mb-4">Connect with me</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: "Email", value: "rajkchavda23804@gmail.com", href: "mailto:rajkchavda23804@gmail.com" },
                    { icon: Linkedin, label: "LinkedIn", value: "Raj Chavda", href: "https://www.linkedin.com/in/raj-chavda-ba6191261" },
                    { icon: Github, label: "GitHub", value: "@234rai", href: "https://github.com/234rai" },
                  ].map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.href}
                      className="flex items-center gap-4 group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="p-3 rounded-xl bg-secondary/50 group-hover:bg-electric/10 transition-colors">
                        <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-electric transition-colors" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{item.label}</div>
                        <div className="text-foreground group-hover:text-electric transition-colors">
                          {item.value}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white/5 dark:bg-white/5 backdrop-blur-lg border border-white/10 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-2xl">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  I&apos;m currently open to new opportunities and interesting projects.
                  Whether you need a full-stack developer for your team or want to collaborate
                  on something exciting, feel free to reach out!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gradient">RC</span>
            <span className="text-muted-foreground">© 2026 Raj Chavda. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/234rai" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:contact@example.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <MouseGlow />
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <GitHubCalendarSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
