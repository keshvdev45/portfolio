import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useRef } from "react";

// Matrix Rain Component
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ123456789@#$%^&*()*&^%+-={}[]|\\:";\'<>?,./';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;
      
      drops.forEach((y, index) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, index * fontSize, y * fontSize);
        
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[index] = 0;
        }
        drops[index]++;
      });
    }
    
    const interval = setInterval(draw, 50);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0"
    />
  );
};

// Particle System Component
const ParticleSystem = () => {
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-green-400 rounded-full"
          animate={{
            x: particle.x + (mousePos.x - particle.x) * 0.01,
            y: particle.y + (mousePos.y - particle.y) * 0.01,
          }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  );
};

// Typing Animation Component
const TypingAnimation = ({ text, speed = 50, className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">█</span>
    </span>
  );
};

// Glitch Effect Component
const GlitchText = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 animate-glitch-1 text-red-500 opacity-70">
        {children}
      </span>
      <span className="absolute top-0 left-0 animate-glitch-2 text-blue-500 opacity-70">
        {children}
      </span>
    </div>
  );
};

// Loading Sequence Component
const LoadingSequence = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    "Initializing system...",
    "Loading security modules...",
    "Connecting to networks...",
    "Scanning vulnerabilities...",
    "Loading portfolio data...",
    "System ready!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const stepIndex = Math.floor((progress / 100) * steps.length);
    setCurrentStep(stepIndex);
  }, [progress, steps.length]);

  return (
    <motion.div 
      className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <div className="mb-8">
          <GlitchText className="text-4xl font-bold text-green-400">
            KESHAV.EXE
          </GlitchText>
        </div>
        
        <div className="mb-6">
          <div className="w-80 h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-green-400 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-green-400 mt-2 font-mono">{progress}%</p>
        </div>
        
        <TypingAnimation 
          text={steps[currentStep] || ""}
          className="text-green-300 font-mono"
        />
      </div>
    </motion.div>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  const [heroRef, heroInView] = useInView({ threshold: 0.3 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.3 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.3 });

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return <LoadingSequence onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono overflow-x-hidden relative">
      <MatrixRain />
      <ParticleSystem />
      
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-4 relative z-20"
        style={{ y: y1 }}
      >
        <div className="text-center max-w-4xl">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gray-500 text-xl">$ whoami</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Hey, I'm <GlitchText className="text-cyan-400">Keshav</GlitchText>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <TypingAnimation 
              text="I build with logic, break with reason."
              className="text-xl md:text-2xl mb-8 text-gray-300 block"
              speed={100}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <p className="text-lg md:text-xl text-green-300">
              Dev by day, ethical hacker by passion.
            </p>
          </motion.div>

          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-cyan-500 text-black font-bold rounded-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16, 185, 129, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              Initialize Connection
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        ref={aboutRef}
        className="py-20 px-4 relative z-20"
        style={{ y: y2 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-gray-800/80 backdrop-blur-md rounded-lg p-8 border border-gray-700 shadow-2xl hover:shadow-green-500/20 transition-all duration-500"
            initial={{ opacity: 0, y: 100 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02, rotateX: 5 }}
          >
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={aboutInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              <span className="text-gray-500 text-lg">$ cat about.txt</span>
            </motion.div>
            
            <div className="space-y-6">
              <GlitchText className="text-3xl font-bold text-cyan-400 mb-8">
                whoami
              </GlitchText>
              
              <motion.div 
                className="space-y-4 text-gray-300"
                initial={{ opacity: 0, x: -30 }}
                animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5, staggerChildren: 0.1 }}
              >
                <motion.p className="text-lg" whileHover={{ x: 10, color: "#10b981" }}>
                  🔧 <strong>Engineer</strong> | 🔒 <strong>Web Hacker</strong> | 📚 <strong>Student</strong>
                </motion.p>
                <motion.p 
                  className="text-green-400 text-xl font-semibold"
                  whileHover={{ scale: 1.05 }}
                >
                  "Rooted in tech, rising through code."
                </motion.p>
                <motion.div 
                  className="mt-6 p-4 bg-gray-900/50 rounded border border-green-500/30"
                  whileHover={{ borderColor: "#10b981", boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)" }}
                >
                  <p className="text-sm text-green-300">
                    💡 Passionate about cybersecurity, web development, and ethical hacking.
                    <br />🎯 Constantly learning new technologies and security methodologies.
                    <br />🚀 Building secure, innovative solutions for the digital world.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        ref={skillsRef}
        className="py-20 px-4 relative z-20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="bg-gray-800/80 backdrop-blur-md rounded-lg p-8 border border-gray-700 shadow-2xl"
            initial={{ opacity: 0, y: 100 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={skillsInView ? { opacity: 1 } : {}}
            >
              <span className="text-gray-500 text-lg">$ ls skills/ --detailed</span>
            </motion.div>
            
            <GlitchText className="text-3xl font-bold text-cyan-400 mb-8">
              Technical Arsenal
            </GlitchText>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Programming Languages",
                  icon: "💻",
                  skills: ["Python", "JavaScript", "Bash", "SQL", "HTML/CSS"],
                  color: "green"
                },
                {
                  title: "Security Platforms",
                  icon: "🐧",
                  skills: ["Kali Linux", "Termux", "NetHunter", "Parrot OS", "BlackArch"],
                  color: "red"
                },
                {
                  title: "Penetration Testing",
                  icon: "🔍",
                  skills: ["Nmap", "Hydra", "SQLmap", "Metasploit", "Wireshark"],
                  color: "blue"
                },
                {
                  title: "Web Security",
                  icon: "🛡️",
                  skills: ["BurpSuite", "XSS", "SQLi", "OWASP", "Nikto"],
                  color: "purple"
                }
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  className={`bg-gray-900/60 p-6 rounded-lg border border-gray-600 hover:border-${category.color}-500 transition-all duration-300`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: `0 0 30px rgba(16, 185, 129, 0.3)`,
                    rotateY: 10
                  }}
                >
                  <div className="text-2xl mb-3">{category.icon}</div>
                  <h3 className={`text-lg font-semibold text-${category.color}-400 mb-4`}>
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.li 
                        key={skill}
                        className="text-gray-300 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={skillsInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: (index * 0.1) + (skillIndex * 0.05) }}
                        whileHover={{ x: 5, color: "#10b981" }}
                      >
                        ▸ {skill}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-8 p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg border border-green-500/30"
              whileHover={{ borderColor: "#10b981", boxShadow: "0 0 25px rgba(16, 185, 129, 0.2)" }}
            >
              <p className="text-green-400 text-center text-lg">
                <span className="text-gray-500"># </span>
                "HTML, CSS, JS — Web is my canvas, Security is my brush"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        ref={projectsRef}
        className="py-20 px-4 relative z-20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="bg-gray-800/80 backdrop-blur-md rounded-lg p-8 border border-gray-700 shadow-2xl"
            initial={{ opacity: 0, y: 100 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={projectsInView ? { opacity: 1 } : {}}
            >
              <span className="text-gray-500 text-lg">$ ls projects/ --showcase</span>
            </motion.div>
            
            <GlitchText className="text-3xl font-bold text-cyan-400 mb-8">
              Featured Projects
            </GlitchText>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "Kalash Recon",
                  description: "Advanced Website Scanner & Intelligence Gatherer",
                  details: "Comprehensive reconnaissance tool with subdomain enumeration, port scanning, and vulnerability detection capabilities.",
                  tech: ["Python", "Nmap", "DNS", "HTTP"],
                  status: "Active",
                  color: "green"
                },
                {
                  name: "SQLBypasser",
                  description: "Intelligent Admin Login Override Tool",
                  details: "Automated SQL injection detection and bypass system with advanced payload generation and WAF evasion techniques.",
                  tech: ["Python", "SQLmap", "Burp", "Payloads"],
                  status: "Updated",
                  color: "red"
                },
                {
                  name: "WiFi Raider",
                  description: "Next-Gen Wi-Fi Security Assessment Tool",
                  details: "High-performance wireless network auditing suite with handshake capture, dictionary attacks, and WPS exploitation.",
                  tech: ["Python", "Aircrack", "Hashcat", "WiFi"],
                  status: "Beta",
                  color: "blue"
                },
                {
                  name: "SocialMap",
                  description: "Stealth Profile Intelligence System",
                  details: "OSINT tool for discovering hidden social media profiles through HTML parsing, metadata extraction, and cross-referencing.",
                  tech: ["JavaScript", "OSINT", "Scraping", "Analytics"],
                  status: "Live",
                  color: "purple"
                }
              ].map((project, index) => (
                <motion.div
                  key={project.name}
                  className={`bg-gray-900/60 p-6 rounded-lg border border-gray-600 hover:border-${project.color}-500 transition-all duration-500`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={projectsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: `0 0 40px rgba(16, 185, 129, 0.3)`,
                    rotateY: 5
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-xl font-bold text-${project.color}-400`}>
                      {project.name}
                    </h3>
                    <motion.span 
                      className={`px-2 py-1 text-xs bg-${project.color}-500/20 text-${project.color}-300 rounded-full`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {project.status}
                    </motion.span>
                  </div>
                  
                  <p className="text-gray-300 font-semibold mb-3">{project.description}</p>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.details}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <motion.span
                        key={tech}
                        className="px-2 py-1 bg-gray-800 text-green-300 rounded text-xs border border-gray-600"
                        whileHover={{ scale: 1.1, backgroundColor: "#1f2937" }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  
                  <motion.button
                    className={`w-full py-2 bg-gradient-to-r from-${project.color}-600 to-${project.color}-500 text-white rounded font-semibold hover:from-${project.color}-500 hover:to-${project.color}-400 transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details →
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Legal Section */}
      <motion.section className="py-20 px-4 relative z-20">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-yellow-900/30 backdrop-blur-md rounded-lg p-8 border border-yellow-600 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(245, 158, 11, 0.3)" }}
          >
            <div className="mb-4">
              <span className="text-gray-500 text-lg">$ cat legal_disclaimer.txt</span>
            </div>
            <GlitchText className="text-2xl font-bold text-yellow-400 mb-6">
              🚨 Legal & Ethical Notice
            </GlitchText>
            <motion.p 
              className="text-yellow-200 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              ⚡ All security demonstrations and tools showcased are conducted within legal boundaries 
              and authorized environments only. This portfolio serves as proof of technical capabilities 
              and ethical hacking skills, not as a threat or malicious intent. Always practicing 
              responsible disclosure and white-hat methodologies.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Contact Section */}
      <motion.section className="py-20 px-4 relative z-20">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-gray-800/80 backdrop-blur-md rounded-lg p-8 border border-gray-700 shadow-2xl"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="text-gray-500 text-lg">$ connect --to keshav --all-channels</span>
            </div>
            
            <GlitchText className="text-3xl font-bold text-cyan-400 mb-8">
              Let's Connect
            </GlitchText>
            
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div className="space-y-4">
                {[
                  { 
                    platform: "GitHub", 
                    url: "https://github.com/keshvdev45", 
                    icon: "🐙", 
                    color: "purple",
                    description: "Check out my repositories" 
                  },
                  { 
                    platform: "Instagram", 
                    url: "https://www.instagram.com/kehv_dev?igsh=MWpzbnFvczhscmNlZw==", 
                    icon: "📸", 
                    color: "pink",
                    description: "Follow my dev journey" 
                  },
                  { 
                    platform: "Email", 
                    url: "mailto:keshav@example.com", 
                    icon: "📧", 
                    color: "blue",
                    description: "Direct communication" 
                  }
                ].map((contact, index) => (
                  <motion.a
                    key={contact.platform}
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block p-4 bg-gray-900/60 rounded-lg border border-gray-600 hover:border-${contact.color}-500 transition-all duration-300`}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 0 25px rgba(16, 185, 129, 0.3)",
                      x: 10
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{contact.icon}</span>
                      <div>
                        <p className={`text-${contact.color}-400 font-semibold`}>
                          {contact.platform}
                        </p>
                        <p className="text-gray-400 text-sm">{contact.description}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
              
              <motion.div 
                className="bg-gray-900/60 p-6 rounded-lg border border-green-500/30"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ borderColor: "#10b981", boxShadow: "0 0 25px rgba(16, 185, 129, 0.2)" }}
              >
                <h3 className="text-green-400 font-semibold mb-4">🟢 Status Dashboard</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Availability:</span>
                    <span className="text-green-400">Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Response Time:</span>
                    <span className="text-green-400">~ 2-4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Timezone:</span>
                    <span className="text-green-400">IST (GMT+5:30)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Open to:</span>
                    <span className="text-green-400">Opportunities</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-cyan-500 text-black font-bold rounded-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16, 185, 129, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 Let's Build Something Amazing!
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="py-8 px-4 border-t border-gray-700 relative z-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.p 
            className="text-gray-500"
            whileHover={{ color: "#10b981" }}
          >
            <span className="text-green-400">$</span> echo "Thanks for exploring my digital realm 🌐"
          </motion.p>
          <motion.p 
            className="text-gray-600 text-sm mt-2"
            whileHover={{ color: "#10b981" }}
          >
            © 2025 Keshav - Crafted with 💚 and lots of ☕
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;