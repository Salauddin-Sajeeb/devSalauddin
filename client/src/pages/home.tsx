import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin,
  Menu,
  X
} from "lucide-react";
import { 
  SiReact, 
  SiJavascript, 
  SiPython, 
  SiNodedotjs, 
  SiDocker, 
  SiAmazon,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiTensorflow,
  SiFirebase,
  SiExpress,SiRedux
} from "react-icons/si";

const skills = {
  frontend: [
    { name: "React", percentage: 95, icon: SiReact },
    { name: "Next.js", percentage: 90, icon: SiNextdotjs },
    { name: "TypeScript", percentage: 90, icon: SiTypescript },
    { name: "Tailwind CSS", percentage: 85, icon: SiTailwindcss },
    { name: "Redux", percentage: 80, icon: SiRedux },
  ],
  backend: [
    { name: "Node.js", percentage: 88, icon: SiNodedotjs },
    { name: "Express", percentage: 85, icon: SiExpress },
    { name: "MongoDB", percentage: 80, icon: SiMongodb },
    { name: "MySQL", percentage: 78, icon: SiMysql },
    { name: "PostgreSql", percentage: 82, icon: SiPostgresql },
   
  ]
};

const projects = [
  {
    title: "(ERP) platform for education",
    description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    technologies: ["React", "Node.js", "MySql"],
    colors: ["bg-blue-500", "bg-green-500", "bg-purple-500"],
    live:"https://school-management-rho-pink.vercel.app/",
    server:"https://github.com/Salauddin-Sajeeb/school-management-server",
    client:"https://github.com/Salauddin-Sajeeb/school-management-client"
  },
  {
    title: "E-commerce Platform",
    description: "Machine learning dashboard with real-time data visualization and predictive analytics.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    technologies: ["Next.js", "Python", "TensorFlow"],
    colors: ["bg-blue-500", "bg-yellow-500", "bg-red-500"],
    live:"https://elegantshop-frontend.vercel.app/",
    server:"https://github.com/Salauddin-Sajeeb/elegantshop/tree/main/server",
    client:"https://github.com/Salauddin-Sajeeb/elegantshop/tree/main/client"
  },
  {
    title: "Real work",
    description: "full stack website of an Chinese company. developped with react, Typescript and Postgresql",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    technologies: ["React", "Express", "Postgresql","Typescript"],
    colors: ["bg-blue-500", "bg-green-500", "bg-orange-500"],
    live:"https://sunson-tech.com",
    server:"",
    client:""
  }
];

const techIcons = [
  { icon: SiReact, color: "text-blue-400" },
  { icon: SiNextdotjs, color: "text-white" },
  { icon: SiNodedotjs, color: "text-green-500" },
  { icon: SiMongodb, color: "text-green-400" },
  { icon: SiMysql, color: "text-blue-600" },

];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const aboutY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  // Navigation scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "tech", "portfolio", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send(
        "service_t088jdt", //serviceId
        "template_25ocdoq", //templateId
        {
          user_name: formData.name,
          user_email: formData.email,
          message: formData.message,
        },
        "4sywGXy1bqtWFoVMf" //public key
      );
       toast({
      title: "✅ Message Sent",
      description: "Thanks for reaching out! I'll reply soon.",
      duration: 6000,
    });
     
    } catch (error) {
     toast({
      title: "❌ Failed to Send",
      description: "Please try again later.",
      variant: "destructive",
      duration: 5000,
    });
      
    }
       finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="relative overflow-x-hidden">
      <CustomCursor />
      
      {/* Fixed Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 glass-morphism"
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="text-2xl font-bold text-gradient cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection("home")}
            >
              DevPortfolio
            </motion.div>
            
            <ul className="hidden md:flex space-x-8">
              {["Home", "About", "Tech Arsenal", "Portfolio", "Contact"].map((item, index) => {
                const sectionId = item.toLowerCase().replace(" arsenal", "").replace(" ", "");
                return (
                  <li key={item}>
                    <motion.button
                      className={`hover:text-neon-cyan transition-colors duration-300 ${
                        activeSection === sectionId ? "text-neon-cyan" : ""
                      }`}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => scrollToSection(sectionId)}
                    >
                      {item}
                    </motion.button>
                  </li>
                );
              })}
            </ul>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-morphism border-t border-white/20"
            >
              <div className="container mx-auto px-6 py-4">
                <ul className="space-y-4">
                  {["Home", "About", "Tech Arsenal", "Portfolio", "Contact"].map((item) => {
                    const sectionId = item.toLowerCase().replace(" arsenal", "").replace(" ", "");
                    return (
                      <li key={item}>
                        <button
                          className="hover:text-neon-cyan transition-colors duration-300 w-full text-left"
                          onClick={() => scrollToSection(sectionId)}
                        >
                          {item}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen hero-bg flex items-center justify-center">
        {/* Floating Background Shapes */}
        <div className="floating-shapes">
          <motion.div 
            className="floating-shape w-64 h-64 bg-blue-500 rounded-full absolute top-10 left-10 opacity-10"
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="floating-shape w-32 h-32 bg-purple-500 rounded-full absolute top-1/2 right-20 opacity-10"
            animate={{ y: [20, -20, 20] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div 
            className="floating-shape w-48 h-48 bg-cyan-500 rounded-full absolute bottom-20 left-1/3 opacity-10"
            animate={{ y: [-30, 30, -30] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </div>
        
        <motion.div 
          className="container mx-auto px-6 relative z-10"
          style={{ y: heroY }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="text-center lg:text-left">
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                <motion.span 
                  className="block typewriter"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3.5, ease: "easeInOut" }}
                  >
                    Hello, I'm
                </motion.span>
                <motion.span 
                  className="text-gradient block mt-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.8 }}
                  >
                   Salauddin Ahmed
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl lg:text-2xl text-slate-300 mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 0.8 }}
                >
                  React & Next Js Developer with MySql, PostgreSql & Mongodb Database experiences
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3, duration: 0.8 }}
                >
                  <Button 
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 animate-glow"
                    onClick={() => scrollToSection("portfolio")}
                  >
                    View My Work
                  </Button>
                 <Button 
                   onClick={() => window.open("https://docs.google.com/document/d/1ADh-52leNRD8rrCJorWJyZVGNjVXGUmYCbN-mfHTolw", "_blank")}
                  variant="outline"
                 className="px-8 py-4 glass-morphism rounded-lg font-semibold hover:bg-white hover:bg-opacity-20 transition-all duration-300"
                >
                 See Resume
                 </Button>
           
                </motion.div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.5}>
              <div className="flex justify-center lg:justify-center">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-75"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                <img
                src="https://i.ibb.co.com/vvRHvfH8/Whats-App-Image-2025-10-20-at-2-24-40-AM.jpg"
                alt="Professional developer portrait"
                className="relative w-[27rem] h-[29rem] rounded-full  shadow-2xl border-4 border-white border-opacity-20
                  overflow-hidden "
                 />

                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800 relative">
        <motion.div 
          className="container mx-auto px-6"
          style={{ y: aboutY }}
        >
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
                <span className="text-gradient">About Me</span>
              </h2>
            </ScrollReveal>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
                <motion.img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Modern workspace setup with multiple monitors and professional lighting" 
                  className="rounded-xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <div>
                  <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                    I'm a passionate full-stack developer with over 3 years of experience creating 
                    innovative web applications and stunning user interfaces. My journey began with 
                    a curiosity for technology and has evolved into a deep expertise in modern web development.
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      "3+ Years Professional Experience",
                      "20+ Successful Projects Delivered",
                      "Expert in React, Next.js, Node.js, Postgresql, Redux, mySql"
                    ].map((item, index) => (
                      <motion.div 
                        key={item}
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          index === 0 ? "bg-neon-cyan" : 
                          index === 1 ? "bg-neon-coral" : "bg-blue-500"
                        }`} />
                        <span className="text-slate-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tech Arsenal Section */}
      <section id="tech" className="py-20 bg-slate-900 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
              <span className="text-gradient">Tech Arsenal</span>
            </h2>
          </ScrollReveal>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Frontend Skills */}
              <ScrollReveal>
                <Card className="glass-morphism p-8">
                  <h3 className="text-2xl font-bold mb-6 text-neon-cyan">Frontend</h3>
                  <div className="space-y-6">
                    {skills.frontend.map((skill, index) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-slate-300 flex items-center gap-2">
                            <skill.icon className="w-4 h-4" />
                            {skill.name}
                          </span>
                          <span className="text-slate-400">{skill.percentage}%</span>
                        </div>
                        <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
                          <motion.div 
                            className="skill-bar h-full bg-gradient-to-r from-blue-500 to-purple-600"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.percentage}%` }}
                            transition={{ delay: index * 0.2, duration: 1.5, ease: "easeOut" }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
              
              {/* Backend Skills */}
              <ScrollReveal delay={0.3}>
                <Card className="glass-morphism p-8">
                  <h3 className="text-2xl font-bold mb-6 text-neon-coral">Backend</h3>
                  <div className="space-y-6">
                    {skills.backend.map((skill, index) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-slate-300 flex items-center gap-2">
                            <skill.icon className="w-4 h-4" />
                            {skill.name}
                          </span>
                          <span className="text-slate-400">{skill.percentage}%</span>
                        </div>
                        <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
                          <motion.div 
                            className="skill-bar h-full bg-gradient-to-r from-blue-500 to-purple-600"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.percentage}%` }}
                            transition={{ delay: index * 0.2, duration: 1.5, ease: "easeOut" }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            </div>
            
            {/* Technology Icons */}
            <ScrollReveal delay={0.6}>
              <div className="mt-16 text-center">
                <div className="flex flex-wrap justify-center gap-8">
                  {techIcons.map((tech, index) => (
                    <motion.div 
                      key={index}
                      className="glass-morphism rounded-xl p-6 hover:scale-110 transition-transform duration-300"
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <tech.icon className={`text-4xl ${tech.color}`} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-slate-800 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
              <span className="text-gradient">Featured Projects</span>
            </h2>
          </ScrollReveal>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 0.2}>
                <motion.div 
                  className="project-card glass-morphism rounded-xl overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: -15,
                    z: 50
                  }}
                  transition={{ duration: 0.6 }}
                  style={{ 
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-neon-cyan">{project.title}</h3>
                    <p className="text-slate-300 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge 
                          key={tech}
                          className={`${project.colors[techIndex]} bg-opacity-20 text-white border-none`}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button
                       onClick={() => window.open(project.live, "_blank")}
                        variant="ghost"
                        size="sm"
                        className="text-neon-cyan hover:text-white hover:bg-neon-cyan/20 p-0"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button 
                       onClick={() => window.open(project.client, "_blank")}
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white hover:bg-slate-700 p-0"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Cliend Code
                      </Button>
                       <Button 
                       onClick={() => window.open(project.server, "_blank")}
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white hover:bg-slate-700 p-0"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Server Code
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
              <span className="text-gradient">Get In Touch</span>
            </h2>
          </ScrollReveal>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <ScrollReveal>
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-neon-cyan">Let's Create Something Amazing</h3>
                  <p className="text-slate-300 mb-8 leading-relaxed">
                    Ready to bring your ideas to life? I'm always excited to work on new projects 
                    and collaborate with fellow innovators. Let's discuss how we can create 
                    exceptional digital experiences together.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      { icon: Mail, label: "Email", value: "salauddinahmed648@gmail.com", color: "text-neon-cyan" },
                      { icon: Phone, label: "Phone", value: "+8801890342817", color: "text-neon-coral" },
                      { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh", color: "text-blue-400" }
                    ].map((contact, index) => (
                      <motion.div 
                        key={contact.label}
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-12 h-12 glass-morphism rounded-lg flex items-center justify-center">
                          <contact.icon className={`w-5 h-5 ${contact.color}`} />
                        </div>
                        <div>
                          <div className="text-slate-300">{contact.label}</div>
                          <div className="text-white">{contact.value}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <Card className="glass-morphism p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-slate-300 mb-2">Name</label>
                      <Input 
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-slate-800 bg-opacity-50 border-slate-600 text-white focus:border-neon-cyan"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2">Email</label>
                      <Input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-slate-800 bg-opacity-50 border-slate-600 text-white focus:border-neon-cyan"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2">Message</label>
                      <Textarea 
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="bg-slate-800 bg-opacity-50 border-slate-600 text-white focus:border-neon-cyan resize-none"
                        required
                      />
                    </div>
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition-transform duration-300"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-800 border-t border-slate-700">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              className="text-2xl font-bold text-gradient mb-4 md:mb-0"
              whileHover={{ scale: 1.05 }}
            >
              Portfolio
            </motion.div>
            
            <div className="flex space-x-6">
              {[
                { icon: Github, href: "https://github.com/Salauddin-Sajeeb" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/salauddin749/" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href}
                  className="w-12 h-12 glass-morphism rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="text-center text-slate-400 mt-8">
            <p>&copy; 2025 Salauddin Ahmed. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
