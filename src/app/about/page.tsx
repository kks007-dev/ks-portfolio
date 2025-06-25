"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Database, Rocket, Code } from "lucide-react";

// Starfield background component
const StarField = () => {
  const [stars, setStars] = React.useState<{ id: number; x: number; y: number; size: number; opacity: number; twinkleSpeed: number; }[]>([]);
  React.useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 100; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 3 + 1
      });
    }
    setStars(newStars);
  }, []);
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.twinkleSpeed}s infinite ease-in-out alternate`
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

function EasterEggSpaceBurst({ onEnd }: { onEnd: () => void }) {
  // Animate a burst of stars, comets, and rockets
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onEnd, 1000);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onEnd]);
  // Generate random stars/comets/rockets
  const burst = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 2 + 1,
    type: i % 6 === 0 ? "rocket" : i % 5 === 0 ? "comet" : "star"
  }));
  return show ? (
    <div className="fixed inset-0 pointer-events-none z-50">
      {burst.map(obj =>
        obj.type === "star" ? (
          <motion.div
            key={obj.id}
            className="absolute rounded-full bg-white shadow-lg"
            style={{
              left: `${obj.x}%`,
              top: `${obj.y}%`,
              width: `${obj.size * 2 + 2}px`,
              height: `${obj.size * 2 + 2}px`,
              opacity: 0.9
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, delay: obj.id * 0.04 }}
          />
        ) : obj.type === "comet" ? (
          <motion.div
            key={obj.id}
            className="absolute"
            style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 400, opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, delay: obj.id * 0.05 }}
          >
            <svg width="60" height="16" viewBox="0 0 60 16">
              <ellipse cx="50" cy="8" rx="8" ry="5" fill="#60a5fa" filter="url(#glow)" />
              <rect x="0" y="5" width="50" height="6" rx="3" fill="url(#comet-gradient)" />
              <defs>
                <linearGradient id="comet-gradient" x1="0" y1="8" x2="50" y2="8" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fff" stopOpacity="0.01" />
                  <stop offset="0.5" stopColor="#60a5fa" stopOpacity="0.2" />
                  <stop offset="1" stopColor="#60a5fa" stopOpacity="0.7" />
                </linearGradient>
                <filter id="glow" x="40" y="3" width="20" height="10" filterUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </motion.div>
        ) : (
          <motion.div
            key={obj.id}
            className="absolute"
            style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: -120, opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, delay: obj.id * 0.06 }}
          >
            <svg width="32" height="32" viewBox="0 0 64 64">
              <g filter="url(#shadow)">
                <rect x="29" y="18" width="6" height="24" rx="3" fill="#7C3AED" />
                <polygon points="32,6 38,18 26,18" fill="#818CF8" />
                <ellipse cx="32" cy="26" rx="3" ry="3.5" fill="#b3e0ff" stroke="#60a5fa" strokeWidth="1.5" />
                <polygon points="29,42 24,54 32,48" fill="#6366F1" />
                <polygon points="35,42 40,54 32,48" fill="#6366F1" />
                <ellipse cx="32" cy="56" rx="4" ry="8" fill="#fbbf24" opacity="0.85" />
                <ellipse cx="32" cy="60" rx="10" ry="3" fill="#222B4F" opacity="0.25" />
              </g>
              <defs>
                <filter id="shadow" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
                </filter>
              </defs>
            </svg>
          </motion.div>
        )
      )}
    </div>
  ) : null;
}

export default function About() {
  const [showEmail, setShowEmail] = useState(false);
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [showContext, setShowContext] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const bannerRef = useRef(null);
  const [visitorId, setVisitorId] = useState(4358);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [typed, setTyped] = useState("");

  // Handle keyboard events for email reveal (permanent after first 'e')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "e") {
        setShowEmail(true);
        setEmailRevealed(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle scroll for banner effect
  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const scrollY = window.scrollY;
        const triggerPoint = 100; // Start fading after scrolling this many pixels
        const fadeDistance = 300; // Complete fade over this distance
        
        // Calculate fade progress (0 to 1)
        const progress = Math.min(Math.max((scrollY - triggerPoint) / fadeDistance, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorId((prev) => prev + 1);
    }, 2000); // Update every 2 seconds for demo
    return () => clearInterval(interval);
  }, []);

  // Easter egg: listen for 'krish' typed in sequence
  useEffect(() => {
    if (easterEggActive) return;
    const handler = (e: KeyboardEvent) => {
      const next = (typed + e.key).slice(-5).toLowerCase();
      setTyped(next);
      if (next === "krish") {
        setEasterEggActive(true);
        setTimeout(() => setTyped(""), 1000);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [typed, easterEggActive]);

  // Work history data
  const workHistory = [
    { company: "STARS Non-Profit", period: "2022 — Now" },
    { company: "Robo-Colts FRC #9478", period: "2023 — Now" },
    { company: "FIRST Tech Challenge", period: "2017 — Now" },
    { company: "RICE University PATHS_UP", period: "Summer 2024" },
    { company: "University of Houston I-TECH", period: "Summer 2023 — 2024" },
    { company: "VentureStarters", period: "2024 — Now" },
  ];

  // Education data
  const education = {
    school: "Harmony School of Innovation, Sugar Land, TX",
    period: "Aug. 2021 - May 2025",
    rank: "Class Rank: 20/201",
    gpa: "GPA: 4.53/4.0 (Weighted), 3.84/4.0 (Unweighted)",
    act: "ACT Superscore: 33 (M:34, S:32, E:34, R:31)"
  };

  // Projects data
  const projects = [
    "S.T.A.R.S Portal | Full Stack Development; Node.JS, React, TypeScript",
    "I.D.R.O.N Solar Powered Household Radiation Detector",
    "TSA Carbon Pollution Energy App | Predictive Carbon Footprint",
    "Microcontroller Vitamin D Health Device | RICE University Research",
    "Diligence Financial Platform (Beta) | Financial Indicators and Data",
    "Un-Leach | Leachate Contamination Research Project"
  ];

  // Tech stack/skills (example, update as needed)
  const techStack = [
    "TypeScript", "React", "Node.js", "Python", "C++", "Java", "GraphQL", "TailwindCSS", "PostgreSQL", "TensorFlow", "D3.js", "Jest", "Docker", "Git", "Figma"
  ];

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden font-sans">
      {/* Space Background */}
      <StarField />
      <div className="absolute inset-0 bg-cover bg-center opacity-20 -z-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(100, 50, 255, 0.3), transparent 30%), radial-gradient(circle at 70% 30%, rgba(50, 100, 255, 0.3), transparent 40%)'
        }}
      />

      {/* Gradient Banner */}
      <div 
        ref={bannerRef} 
        className="w-full relative overflow-hidden z-10"
        style={{ 
          paddingTop: '2rem', 
          paddingBottom: '2rem', 
          transition: 'background 0.2s ease-out',
          background: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.4))'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 relative">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start">
            <div>
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Krish Singh</h1>
              <div className="mt-1">
                <p className="text-gray-300">Robotics Engineer & Full Stack Developer</p>
                <p className="text-gray-400 text-sm">Founder at STARS Non-Profit »</p>
              </div>
              {/* Tech Stack Section */}
              <div className="mt-6 flex flex-wrap gap-2">
                {techStack.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-800 rounded-full text-xs text-blue-200 border border-blue-700 shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-gray-300">Researching, prototyping, designing and testing <span className="text-gray-400">by day</span></p>
              <p className="text-gray-300">coding, competing, leading teams <span className="text-gray-400">by night</span></p>
              <div className="text-left md:text-right mt-4 md:mt-0">
                {(showEmail || emailRevealed) ? (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-blue-400"
                  >
                    krishksingh07@gmail.com
                  </motion.p>
                ) : (
                  <p className="text-gray-500 text-sm">Press E to see email</p>
                )}
              </div>
            </div>
          </header>
        </div>
        <div className="absolute top-0 left-0 w-full h-full nebula-gradient opacity-80"></div>
      </div>

      {/* Easter Egg Animation Overlay */}
      {easterEggActive && (
        <EasterEggSpaceBurst onEnd={() => setEasterEggActive(false)} />
      )}

      {/* Visitor ID & Console Log Banner */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-2">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-lg">👩‍🚀 Hello, explorer</span>
          <div className="flex gap-1">
            {visitorId.toString().split("").map((digit, idx) => (
              <span key={idx} className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded-md font-mono text-lg border border-blue-700 shadow-sm">
                {digit}
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-2 font-mono">// visitor_id</span>
        </div>
        <div className="bg-[#181f2a] rounded-lg px-4 py-2 font-mono text-blue-300 text-base w-fit shadow-md border border-blue-900">
          <span className="text-xs text-blue-400 mr-2 select-none">UA</span>
          <span>console.log("newest development: stars portal v2.2!");</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Education Section */}
            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-6">Education 🎓</h2>
              <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <h3 className="text-xl font-semibold">{education.school}</h3>
                  <div className="text-blue-400">{education.period}</div>
                </div>
                <div className="space-y-2 text-gray-300">
                  <p>{education.rank}</p>
                  <p>{education.gpa}</p>
                  <p>{education.act}</p>
                  <p className="text-gray-400 mt-4">STEM Coursework: PLTW Intro to Engineering Design, Principles of Applied Engineering, AP Computer Science Principles, AP Calculus AB, AP Calculus BC, AP Physics 1, AP Physics C Mechanics, AP Chemistry, PLTW Aerospace Engineering, PLTW Engineering Design and Development</p>
                </div>
              </div>
            </section>

            {/* Work Experience Section */}
            <section className="mt-8">
              <div className="flex flex-col md:flex-row md:items-center">
                <h2 className="text-2xl font-bold">Experience & Leadership</h2>
                <div className="flex space-x-2 mt-2 md:mt-0 md:ml-4">
                  <button 
                    className={`${showContext ? 'bg-gray-800' : 'bg-gray-900'} hover:bg-gray-700 text-sm px-3 py-1 rounded-md`}
                    onClick={() => setShowContext(true)}
                  >
                    Give me context
                  </button>
                  <button 
                    className={`${!showContext ? 'bg-gray-800' : 'bg-gray-900'} hover:bg-gray-700 text-sm px-3 py-1 rounded-md`}
                    onClick={() => setShowContext(false)}
                  >
                    Just show me the list
                  </button>
                </div>
              </div>

              {showContext ? (
                <div className="space-y-6 bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-gray-800 mt-4">
                  <div>
                    <p className="text-gray-300">
                      I&apos;ve founded <span className="text-blue-400 hover:underline cursor-pointer">S.T.A.R.S Non-Profit 501c3</span>, a student-run organization
                      dedicated to bridging the gap between students and professional industries. We provide hands-on training in advanced
                      technologies like CNC, 3D printing, and laser cutting. I&apos;ve raised over $50,000 in funds and developed
                      a free online learning portal with interactive courses and resources.
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-300">
                      As Founder and Team Captain of <span className="text-blue-400 hover:underline cursor-pointer">FIRST Robotics Competition Robo-Colts #9478</span>,
                      I led our team to the FIRST World Championship. I raised $70,000+ through grants and developed multiple computer
                      vision modules, power hubs, and algorithms for an 8 motor swerve odometry.
                      We&apos;ve now merged with
                      Harmony School of Innovation to create an advanced robotics program.
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-300">
                      As Lead Programmer for <span className="text-blue-400 hover:underline cursor-pointer">FIRST Tech Challenge</span> teams,
                      I developed my own integration of OpenCV Camera Vision with virtual spline mapping autonomous movement.
                      Our teams achieved multiple league placements, advancement to state championship, and we were semifinalists 
                      in the FIRST in Texas District Championship.
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-300">
                      I researched digital electronics at <span className="text-blue-400 hover:underline cursor-pointer">RICE University PATHS_UP</span> Young Scholars
                      Electronics Internship, designing custom printed circuit boards (PCBs) and exploring correlation between 
                      vitamin D deficiency and muscle tension. I also trained Image Python AI models with camera vision experts.
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-300">
                      At <span className="text-blue-400 hover:underline cursor-pointer">University of Houston I-TECH STEM Internship</span>, I served as 
                      Modeling and Printing Manager, working with industrial 3D printers and modeling software to build prototypes.
                      I also created AR/VR Custom Models of Amino Acid Compounds and worked with multi-material machines.
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-300">
                      With <span className="text-blue-400 hover:underline cursor-pointer">VentureStarters Business Internship</span>, I've been 
                      learning the principles of pitching startups, acquiring funding, and the legal process. I've connected 
                      with over 200 startup professionals through various technology and sciences events.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-gray-800 mt-4">
                  {workHistory.map((job, index) => (
                    <div key={index} className="flex justify-between py-3 border-b border-gray-800 last:border-0">
                      <div className="text-white">{job.company}</div>
                      <div className="text-blue-400">{job.period}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <button className="border border-green-500 text-green-500 hover:bg-green-900/20 rounded-full px-6 py-3 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Available for projects
                </button>
              </div>
            </section>
          </div>

          {/* Right Column - Projects & Quick Links */}
          <div className="lg:col-span-1">
            {/* Easter Egg Message at top of right column */}
            <div className="w-full flex justify-center items-center mt-2 mb-4">
              <span className="text-xs text-blue-300 opacity-70 animate-pulse">Type <span className="font-mono bg-blue-900 px-1 rounded">krish</span> for a special surprise!</span>
            </div>
            {/* Projects Section */}
            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-6">Passion Projects 🚀</h2>
              <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-gray-800">
                <div className="space-y-4">
                  {projects.map((project, index) => {
                    const [title, desc] = project.split('|');
                    return (
                      <Link 
                        href="/demo" 
                        key={index}
                        className="block p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors border border-gray-700"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-blue-900/50 text-blue-400">
                            {index === 0 ? <Database className="w-5 h-5" /> :
                             index === 1 ? <Rocket className="w-5 h-5" /> :
                             <Code className="w-5 h-5" />}
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{title.trim()}</h3>
                            {desc && (
                              <p className="text-sm text-gray-400 mt-1">{desc.trim()}</p>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-6">
                  <Link 
                    href="/demo"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300"
                  >
                    View all projects
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>

            {/* Quick Links */}
            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
              <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-gray-800">
                <div className="space-y-3">
                  <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                    <span className="text-2xl">🏠</span>
                    <span>Home</span>
                  </Link>
                  <Link href="/demo" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                    <span className="text-2xl">🚀</span>
                    <span>Projects</span>
                  </Link>
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                    <span className="text-2xl">💻</span>
                    <span>GitHub</span>
                  </a>
                  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                    <span className="text-2xl">🔗</span>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Navigation - Bottom center */}
      <motion.div 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Link href="/" className="bg-gray-800/80 hover:bg-gray-700 w-16 h-16 rounded-lg flex flex-col items-center justify-center text-xs backdrop-blur-md">
          <span className="mb-1">🚀</span>
          Home
        </Link>
        <Link href="/about" className="bg-gray-700/80 hover:bg-gray-600 w-16 h-16 rounded-lg flex flex-col items-center justify-center text-xs backdrop-blur-md">
          <span className="mb-1">👨‍💻</span>
          About
        </Link>
        <Link href="/demo" className="bg-gray-800/80 hover:bg-gray-700 w-16 h-16 rounded-lg flex flex-col items-center justify-center text-xs backdrop-blur-md">
          <span className="mb-1">🧪</span>
          Demos
        </Link>
      </motion.div>
    </div>
  );
}