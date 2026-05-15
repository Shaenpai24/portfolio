/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { 
  FlaskConical, 
  Sun, 
  Terminal, 
  Microscope, 
  Layers, 
  Network, 
  ArrowUpRight,
  AtSign,
  ArrowRight,
  Github,
  Linkedin
} from "lucide-react";

export default function App() {
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.body.style.setProperty('--x', `${e.clientX}px`);
      document.body.style.setProperty('--y', `${e.clientY}px`);
      setMousePos({ x: `${e.clientX}px`, y: `${e.clientY}px` });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen font-sans" ref={containerRef}>
      {/* Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.5 bg-accent z-[100] shadow-[0_0_10px_#FF4D00] origin-left"
        style={{ scaleX }}
      />

      {/* Atmospheric Overlays */}
      <div className="flashlight-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[radial-gradient(circle,rgba(255,77,0,0.03)_0%,transparent_70%)]" />
        <div className="absolute top-1/4 right-1/4 w-[1px] h-32 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-[1px] bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/5 backdrop-blur-xl border-b border-white/10 h-16">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FlaskConical className="text-accent w-5 h-5" />
            <span className="font-mono text-xs tracking-[0.2em] text-white uppercase">SHASHANK // RESEARCH_LAB</span>
          </div>
          <div className="hidden md:block font-mono text-[10px] text-accent/40 tracking-widest">
            DEPT_01 // SEC_042
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8">
              <a href="#systems" className="font-mono text-[10px] text-accent font-bold tracking-widest">SYSTEMS</a>
              <a href="#logs" className="font-mono text-[10px] text-outline/60 hover:text-accent transition-colors tracking-widest font-bold">LOGS</a>
            </nav>
            <button className="text-accent hover:scale-110 transition-transform cursor-pointer">
              <Sun className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Rope Switch (Decorative) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[55] flex flex-col items-center">
        <div className="h-[120px] w-[2px] bg-gradient-to-b from-outline/40 to-outline pointer-events-none relative">
          <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-3 h-6 bg-primary rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
        </div>
      </div>

      <main>
        {/* DEPT_01: Hero */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 revealed-content overflow-hidden">
          {/* Vertical Label from Design */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left hidden md:block">
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] opacity-30 whitespace-nowrap">Available for collaboration</span>
          </div>

          <div className="text-center max-w-5xl z-10 px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center mb-12"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-2">Portfolio © 2024</span>
              <span className="text-[11px] font-mono opacity-50">SHASHANK LAB // 12.9716° N, 77.5946° E</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-display text-[80px] leading-[0.85] md:text-[160px] text-white mb-8 tracking-tighter font-black uppercase"
            >
              SHASHANK<br/>VENKATA
            </motion.h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
              <h2 className="text-xl md:text-2xl font-light italic text-accent font-serif tracking-tight">AI Researcher & System Architect</h2>
              <div className="h-[1px] w-32 md:w-48 bg-accent opacity-30"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button className="bg-accent text-black px-10 py-4 font-mono text-[10px] uppercase tracking-widest hover:brightness-110 transition-all font-bold">
                Enter_Void
              </button>
              <button className="border border-white/20 text-white px-10 py-4 font-mono text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all font-bold">
                View_Archive
              </button>
            </div>

            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              {[
                { label: 'LATENCY', status: 'STABLE', desc: 'Sub-millisecond data processing pipelines for high-frequency simulations.' },
                { label: 'CORE_OS', status: 'V.4.2.0', desc: 'Neural architecture search engines built on proprietary laboratory clusters.' },
                { label: 'SENSORS', status: 'ACTIVE', desc: 'Distributed sensing networks capturing atmospheric research data.' }
              ].map((item, idx) => (
                <div key={idx} className="group cursor-default">
                  <div className="flex items-center justify-between font-mono text-[10px] text-accent mb-4 font-bold">
                    <span>{item.label}</span>
                    <span className="opacity-50">{item.status}</span>
                  </div>
                  <div className="h-px w-full bg-white/10 mb-4 group-hover:bg-accent transition-colors" />
                  <p className="font-mono text-[9px] text-outline uppercase tracking-wider leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEPT_02: The Foundation (Summary) */}
        <section id="foundation" className="relative py-40 revealed-content">
          <div className="max-w-7xl mx-auto px-6">
            <div className="md:w-8/12 mx-auto">
              <div className="mb-12">
                <span className="font-mono text-xs text-secondary uppercase tracking-[0.3em] font-bold underline underline-offset-4 decoration-accent/40">CORE_LOGIC_INIT</span>
                <h2 className="font-display text-4xl md:text-7xl mt-4 text-accent tracking-tighter leading-none font-bold">DEPT_02 // THE_FOUNDATION</h2>
              </div>
              <div className="grid md:grid-cols-12 gap-12 items-start">
                <div className="md:col-span-8 space-y-6">
                  <p className="text-xl text-outline leading-relaxed">
                    Currently a second-year Computer Science researcher specializing in AI. My focus lies at the intersection of structural complexity and autonomous logic. I build systems that don't just execute—they <span className="text-accent italic font-medium">perceive</span>. 
                  </p>
                  <p className="text-xl text-outline leading-relaxed">
                    I enjoy building things that are hard to build—from physics-accurate game engines and graph-based learning tools to ML security pipelines and RL environments.
                  </p>
                </div>
                <div className="md:col-span-4 flex flex-col gap-4">
                  <div className="p-6 border border-white/10 backdrop-blur-md bg-white/5 rounded-lg group hover:border-accent/40 transition-colors">
                    <span className="font-mono text-xs text-secondary block mb-2 font-bold">STATUS</span>
                    <span className="font-mono text-sm text-white uppercase tracking-wider font-bold">ACTIVE_RESEARCH_ROTATION</span>
                  </div>
                  <div className="p-6 border border-white/10 backdrop-blur-md bg-white/5 rounded-lg group hover:border-accent/40 transition-colors">
                    <span className="font-mono text-xs text-secondary block mb-2 font-bold">FIELD</span>
                    <span className="font-mono text-sm text-white uppercase tracking-wider font-bold">AI_SYSTEMS_INTELLIGENCE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEPT_03: Active Simulations (Projects) */}
        <section id="projects" className="relative py-40 bg-[#080f10]/30 revealed-content">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
              <div>
                <span className="font-mono text-xs text-secondary uppercase tracking-[0.3em] font-bold">SIMULATION_QUEUE</span>
                <h2 className="font-display text-4xl md:text-7xl mt-4 text-accent tracking-tighter leading-none font-bold">DEPT_03 // ACTIVE_SIMS</h2>
              </div>
              <div className="flex items-center gap-4 text-outline font-mono text-xs font-bold">
                <Terminal className="w-4 h-4 text-accent" />
                <span className="tracking-widest">05_MODULES_DETECTED</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {[
                { 
                  id: 'M_01',
                  name: 'Project Golfero', 
                  desc: 'A hybrid real-time golf simulation system integrating a custom C/Raylib physics engine with Python AI modules.',
                  tech: 'C // RAYLIB // PYTHON // CMA-ES',
                  status: 'STABLE',
                  latency: '16ms',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0HX5LABED32Ko3N131pdqU8Ab-liXEnq18OykNIMgKpLsilcY9cOUZB8IwC0RWRddL5SoDTPbNJ7y7NPx3xu1sUdgk22_G3cJdadYhzBHOGFFw7qBRcgjqqYjQ9cZ6Xe7Paf_ebCIZqq2hNyXON5Yt_AWM-1Lh04-uiTUxRZmffi75_CUi_5PsRNfXtPUH13zooyXeFceUZSt-c5sEjIF4XzdyYe8v4S3wsBPHrW0BYAc2px1NtejE-kZVYv5unKsxwv53pfkzyWA' 
                },
                { 
                  id: 'M_02',
                  name: 'ChainForge', 
                  desc: 'Offline-first educational system converting notes into prerequisite-based learning graphs using DAG modeling.',
                  tech: 'JS // GRAPH_ALGORITHMS // SVG',
                  status: 'OPTIMIZING',
                  latency: '24ms',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0yxmZ8FRoqI5pkMRRJKxGD954q5jM8fvwbUoKEd18OLgCs7BPxcBl7jAWa-F5K8DsqctT3a37L6gD-V1YuHGlzFQxuZlPUpTkC1RuaDlkhCqBt9BzToBVp9aFVOAE0Z71sh7sssV181gcvntp-o7Hpc6lWZF9thBZUNbcOopTEBexWGW036k5g1Lb7-YSZX3POs3ywpBKf1Idbe-fFJGS48mblZ5xDy3DJ4u7u1IH-R0YtRwjziBaPOVbxeGH2y46UzTns_cibG9h'
                },
                { 
                  id: 'M_03',
                  name: 'NetReaper', 
                  desc: 'Adversarial-resilient intrusion detection pipeline achieving 97.3% classification accuracy with XGBoost.',
                  tech: 'PYTHON // SCIKIT-LEARN // XGBOOST',
                  status: 'SECURE',
                  latency: '9ms',
                  img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
                },
                { 
                  id: 'M_04',
                  name: 'RL Budget Planner', 
                  desc: 'Reinforcement Learning financial simulation environment across 12 financial crisis scenarios.',
                  tech: 'FASTAPI // REINFORCEMENT_LEARNING',
                  status: 'TRAINING',
                  latency: '14ms',
                  img: 'https://images.unsplash.com/photo-1611974717482-192a5499f57f?auto=format&fit=crop&q=80&w=800'
                }
              ].map((project, idx) => (
                <motion.div 
                  key={project.id}
                  whileHover={{ y: -5 }}
                  className="group relative p-8 border border-white/5 bg-white/5 backdrop-blur-xl hover:border-accent/40 transition-all rounded-lg overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-outline/40 tracking-[0.3em] font-bold">{project.id}</div>
                  <div className="mb-10 aspect-video bg-black overflow-hidden border border-white/5 rounded relative">
                    <img 
                      src={project.img} 
                      alt={project.name}
                      className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
                  </div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-display text-3xl text-white group-hover:text-accent transition-colors font-bold">{project.name}</h3>
                    <ArrowUpRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                  </div>
                  <p className="text-sm text-outline mb-8 leading-relaxed opacity-80">{project.desc}</p>
                  
                  <div className="space-y-3 font-mono text-[9px] border-t border-white/5 pt-6 font-bold tracking-widest text-outline/80">
                    <div className="flex justify-between items-center">
                      <span>STATUS</span>
                      <div className="dotted-leader" />
                      <span className="text-accent">{project.status}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>LATENCY</span>
                      <div className="dotted-leader" />
                      <span className="text-white">{project.latency}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>TECH</span>
                      <div className="dotted-leader" />
                      <span className="text-secondary">{project.tech}</span>
                    </div>
                  </div>
                  
                  {/* Subtle Glow */}
                  <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-accent/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
            
            <div className="mt-24 text-center">
              <button className="px-10 py-4 bg-accent text-black font-mono text-xs font-bold rounded hover:shadow-[0_0_20px_rgba(255,77,0,0.3)] transition-all tracking-widest">
                ACCESS_FULL_ARCHIVE
              </button>
            </div>
          </div>
        </section>

        {/* DEPT_04: Core Systems (Skills) */}
        <section id="systems" className="relative py-40 revealed-content">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <span className="font-mono text-xs text-secondary uppercase tracking-[0.3em] font-bold">SYSTEMS_ARCHITECTURE.AI</span>
              <h2 className="font-display text-4xl md:text-7xl mt-4 text-accent tracking-tighter leading-none font-bold underline underline-offset-8">DEPT_04 // CORE_SYSTEMS</h2>
            </div>
            
            <div className="grid md:grid-cols-12 gap-12">
              {/* AI & ML */}
              <div className="md:col-span-4 p-8 rounded-lg bg-white/[0.02] border border-white/10 group hover:border-accent/20 transition-all">
                <span className="font-mono text-xs text-secondary mb-8 block font-bold">NEURAL_DEPARTMENTS</span>
                <h3 className="font-display text-3xl text-white mb-10 font-bold">Artificial Intelligence</h3>
                <div className="space-y-8">
                  {[
                    { label: 'Reinforcement Learning', val: 0.94 },
                    { label: 'Predictive Analytics', val: 0.88 },
                    { label: 'Anomaly Detection', val: 0.82 },
                    { label: 'Feature Engineering', val: 0.78 }
                  ].map((skill, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between items-end font-mono text-[9px] uppercase tracking-widest font-bold">
                        <span className="text-white/60">{skill.label}</span>
                        <span className="text-accent">{Math.round(skill.val * 100)}%</span>
                      </div>
                      <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.val * 100}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="h-full bg-accent" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulation & Others */}
              <div className="md:col-span-8 flex flex-col gap-8">
                <div className="p-8 rounded-lg bg-white/[0.02] border border-white/10 flex flex-col md:flex-row gap-12 items-center group hover:border-accent/20 transition-all">
                  <div className="w-full md:w-1/3">
                    <span className="font-mono text-[10px] text-secondary mb-4 block font-bold tracking-widest">MODULE_02</span>
                    <h3 className="font-display text-3xl text-white font-bold tracking-tighter">Simulations</h3>
                    <p className="text-sm text-outline mt-4 leading-relaxed font-sans opacity-80">High-fidelity environmental modelling for autonomous agent stress-testing and validation.</p>
                  </div>
                  <div className="flex-1 w-full grid grid-cols-2 gap-4 font-mono font-bold tracking-widest">
                    {[
                      { label: 'STABILITY', val: '99.9%' },
                      { label: 'LATENCY', val: '14ms' },
                      { label: 'COMPUTE', val: 'HYBRID' },
                      { label: 'THROUGHPUT', val: '4.2GB/S' }
                    ].map((stat, i) => (
                      <div key={i} className="border border-white/5 p-4 rounded bg-white/[0.01]">
                        <span className="text-[8px] text-outline block mb-1 uppercase">{stat.label}</span>
                        <span className="text-accent text-lg">{stat.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 rounded-lg bg-white/[0.02] border border-white/10 group hover:border-accent/20 transition-all">
                  <span className="font-mono text-[10px] text-secondary mb-4 block font-bold tracking-widest">MODULE_03</span>
                  <h3 className="font-display text-3xl text-white mb-8 font-bold tracking-tighter">Core Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Python', 'JavaScript', 'C', 'Java', 'C#', 
                      'FastAPI', 'React', 'TypeScript', 'Django', 
                      'Git', 'Docker', 'Linux', 'IPC', 'SVG', 'REST_APIs'
                    ].map((tech, i) => (
                      <span key={i} className="px-3 py-1 border border-white/20 rounded-full font-mono text-[9px] text-white uppercase tracking-widest hover:border-accent hover:text-accent transition-all cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEPT_05: Record Log (Education & Achievements) */}
        <section id="logs" className="relative py-40 bg-[#080f10]/30 revealed-content">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20 flex justify-between items-end">
              <div>
                <span className="font-mono text-xs text-secondary uppercase tracking-[0.3em] font-bold">HISTORICAL_RECORDS</span>
                <h2 className="font-display text-4xl md:text-7xl mt-4 text-accent tracking-tighter leading-none font-bold underline underline-offset-8 decoration-accent/20">DEPT_05 // RECORD_LOG</h2>
              </div>
              <span className="hidden md:block font-mono text-[10px] text-outline font-bold tracking-[0.2em]">[TOTAL_ENTRIES: 003]</span>
            </div>

            <div className="space-y-16">
              {[
                { 
                  date: '2024 — 2028', 
                  title: 'B.Tech CS (AI Specialization)', 
                  org: 'Amrita Vishwa Vidyapeetham', 
                  desc: 'Focusing on emergent behaviors in AI systems. Relevant Coursework: Data Structures, Algorithms, Graph Theory, OOP, Machine Learning. CGPA: 8.54' 
                },
                { 
                  date: '2024 (WINNER)', 
                  title: 'Think Run and Debug Hackathon', 
                  org: 'ASEB CSI CHAPTER', 
                  desc: 'Devised FlowState, an AI-powered productivity orchestration platform integrating intelligent task decomposition and workflow analytics.' 
                },
                { 
                  date: '2024 (VP)', 
                  title: 'College Math Club Leadership', 
                  org: 'AMRITA UNIV.', 
                  desc: 'Organized technical and problem-solving events; led digitization of club workflows improving participation and operational efficiency.' 
                }
              ].map((entry, i) => (
                <div key={i} className="group flex flex-col md:flex-row gap-6 md:gap-12 relative pb-16 border-b border-white/5 last:border-0 hover:border-accent/40 transition-colors">
                  <div className="md:w-32 flex-shrink-0">
                    <span className="font-mono text-xs text-secondary font-bold tracking-widest">{entry.date}</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center mb-4">
                      <h4 className="font-display text-2xl md:text-3xl text-white font-bold group-hover:text-accent transition-colors">{entry.title}</h4>
                      <div className="dotted-leader hidden md:block" />
                      <span className="font-mono text-xs text-outline uppercase tracking-widest font-bold whitespace-nowrap">{entry.org}</span>
                    </div>
                    <p className="text-base text-outline/80 leading-relaxed max-w-3xl font-sans">{entry.desc}</p>
                  </div>
                  <div className="md:w-12 flex justify-end">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
                      <ArrowUpRight className="w-4 h-4 text-outline group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEPT_06: Terminate Connection (Contact) */}
        <section id="contact" className="relative py-40 revealed-content">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20">
              <span className="font-mono text-xs text-secondary uppercase tracking-[0.3em] font-bold">SIGNAL_OUTBOUND</span>
              <h2 className="font-display text-4xl md:text-7xl mt-4 text-accent tracking-tighter leading-none font-bold underline underline-offset-8">DEPT_06 // UPLINK</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <p className="text-xl text-outline mb-12 leading-relaxed font-sans max-w-md">
                  System open for collaboration on high-fidelity research and engineering initiatives. Select a protocol below to establish uplink.
                </p>
                <div className="space-y-4">
                  {[
                    { label: 'GITHUB // SOURCE_CONTROL', icon: Terminal, href: 'https://github.com/shashank-c-v' },
                    { label: 'LINKEDIN // PROF_LOG', icon: Layers, href: 'https://linkedin.com/in/shashank-c-v' },
                    { label: 'EMAIL // DIRECT_UPLINK', icon: AtSign, href: 'mailto:shaenpai@gmail.com' }
                  ].map((link, i) => (
                    <a 
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-6 border border-white/5 hover:border-accent hover:bg-accent/5 transition-all rounded-lg"
                    >
                      <div className="flex items-center gap-5">
                        <link.icon className="text-secondary w-5 h-5 group-hover:text-accent transition-colors" />
                        <span className="font-mono text-xs font-bold tracking-widest text-white/80 group-hover:text-white transition-colors">{link.label}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-lg bg-white/[0.02] border border-white/10 backdrop-blur-xl">
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-4">
                    <label className="font-mono text-[10px] text-outline uppercase tracking-widest font-bold block">Sender Identity</label>
                    <input 
                      type="text" 
                      placeholder="NAME / ORGANIZATION" 
                      className="w-full bg-transparent border-b border-white/20 focus:border-accent outline-none px-0 py-3 font-mono text-sm tracking-widest transition-colors font-bold uppercase placeholder:text-outline/30 placeholder:font-normal" 
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="font-mono text-[10px] text-outline uppercase tracking-widest font-bold block">Return Address</label>
                    <input 
                      type="email" 
                      placeholder="EMAIL_PROTOCOL" 
                      className="w-full bg-transparent border-b border-white/20 focus:border-accent outline-none px-0 py-3 font-mono text-sm tracking-widest transition-colors font-bold uppercase placeholder:text-outline/30 placeholder:font-normal" 
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="font-mono text-[10px] text-outline uppercase tracking-widest font-bold block">Transmission Content</label>
                    <textarea 
                      rows={4} 
                      placeholder="MESSAGE_DATA_STREAM..." 
                      className="w-full bg-transparent border-b border-white/20 focus:border-accent outline-none px-0 py-3 font-mono text-sm tracking-widest transition-colors resize-none font-bold uppercase placeholder:text-outline/30 placeholder:font-normal" 
                    />
                  </div>
                  <button className="w-full py-5 bg-accent text-black font-mono text-xs font-bold uppercase tracking-[0.3em] rounded hover:shadow-[0_0_30px_rgba(255,77,0,0.4)] transition-all active:scale-[0.98]">
                    INITIATE_HANDSHAKE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-32 border-t border-white/5 opacity-40 hover:opacity-100 transition-opacity">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="font-mono text-[10px] text-white tracking-widest font-bold">
            © 2024 SHASHANK. ALL RIGHTS RESERVED. [SYSTEM_STABLE]
          </div>
          <div className="flex gap-12 font-mono text-[10px] font-bold tracking-widest">
            <a href="https://github.com/shashank-c-v" className="hover:text-accent transition-colors underline decoration-accent/40 underline-offset-4">GITHUB</a>
            <a href="https://linkedin.com/in/shashank-c-v" className="hover:text-accent transition-colors underline decoration-accent/40 underline-offset-4">LINKEDIN</a>
            <a href="#" className="hover:text-accent transition-colors underline decoration-accent/40 underline-offset-4 text-outline/60">SOURCE_ARCHIVE</a>
          </div>
        </div>
      </footer>

      {/* Bottom Nav (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-black/60 backdrop-blur-xl border-t border-white/5 h-20 flex justify-around items-center rounded-t-xl">
        {[
          { label: 'DEPT_01', icon: Terminal, active: true },
          { label: 'DEPT_02', icon: Microscope },
          { label: 'DEPT_03', icon: Layers },
          { label: 'DEPT_04', icon: Network }
        ].map((btn, i) => (
          <button key={i} className={`flex flex-col items-center justify-center gap-1 transition-all ${btn.active ? 'text-accent scale-110' : 'text-outline/40 scale-90'}`}>
            <btn.icon className="w-5 h-5" />
            <span className="font-mono text-[8px] font-bold tracking-widest">{btn.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}