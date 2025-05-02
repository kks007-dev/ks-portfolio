"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  const [showEmail, setShowEmail] = useState(false);
  const [showContext, setShowContext] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const bannerRef = useRef(null);

  // Handle keyboard events for email reveal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "e") {
        setShowEmail(true);
      }
    };
  
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "e") {
        setShowEmail(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
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

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      {/* Gradient Banner */}
      <div 
        ref={bannerRef} 
        className="w-full relative overflow-hidden z-10"
        style={{ 
          paddingTop: '2rem', 
          paddingBottom: '2rem', 
          transition: 'background 0.2s ease-out' 
        }}
      >
       <div className="max-w-7xl mx-auto px-4 relative">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start">
            <div>
              <h1 className="text-5xl font-bold text-white">Krish Singh</h1>
              <div className="mt-1">
                <p className="text-gray-300">Robotics Engineer & Full Stack Developer</p>
                <p className="text-gray-400 text-sm">Founder at STARS Non-Profit »</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-gray-300">Researching, prototyping, designing and testing <span className="text-gray-400">by day</span></p>
              <p className="text-gray-300">coding, competing, leading teams <span className="text-gray-400">by night</span></p>
              <div className="text-left md:text-right mt-4 md:mt-0">
             
              {showEmail ? (
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
        </div> <div className="absolute top-0 left-0 w-full h-full nebula-gradient opacity-80"></div>
        <div 
          className="max-w-6xl mx-auto px-4 md:px-8 relative z-10"
          style={{ opacity: 1 - scrollProgress * 0.8 }}
        >
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 pb-32"> {/* Added bottom padding to prevent overlap with fixed elements */}
        
        {/* Education Section */}
        <section className="max-w-6xl mx-auto p-4 md:p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Education 🎓</h2>
          <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6">
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
        <section className="max-w-6xl mx-auto p-4 md:p-8">
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
            <div className="space-y-6 bg-gray-900/50 backdrop-blur-md rounded-xl p-6">
              <div>
                <p className="text-gray-300">
                  I founded <span className="text-blue-400 hover:underline cursor-pointer">S.T.A.R.S Non-Profit 501c3</span>, a student-run organization 
                  dedicated to bridging the gap between students and professional industries. We provide hands-on training in advanced 
                  technologies like CNC, 3D printing, and laser cutting. I've raised over $50,000 in funds and developed 
                  a free online learning portal with interactive courses and resources.
                </p>
              </div>

              <div>
                <p className="text-gray-300">
                  As Founder and Team Captain of <span className="text-blue-400 hover:underline cursor-pointer">FIRST Robotics Competition Robo-Colts #9478</span>,
                  I led our team to the FIRST World Championship. I raised $70,000+ through grants and developed multiple computer 
                  vision modules, power hubs, and algorithms for an 8 motor swerve odometry. We've now merged with 
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
            <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6">
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

        {/* Projects Section */}
        <section className="max-w-6xl mx-auto p-4 md:p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Passion Projects 🚀</h2>
          <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-blue-400 mr-2 mt-1">›</span>
                  <p>{project}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recognition Section */}
        <section className="max-w-6xl mx-auto p-4 md:p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Recognition & Awards 🏆</h2>
          <div className="space-y-6 bg-gray-900/50 backdrop-blur-md rounded-xl p-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div className="text-gray-400 mb-2 md:mb-0">FIRST</div>
              <div className="text-left md:text-right">2024 Dean's List World Championship Finalist</div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div className="text-gray-400 mb-2 md:mb-0">FRC</div>
              <div className="text-left md:text-right">Rookie All-Star, Rookie Inspiration & World Championship Qualifier</div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div className="text-gray-400 mb-2 md:mb-0">TSA</div>
              <div className="text-left md:text-right">National Conference Engineering Design Top 12, TX-Championship 1st Place</div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div className="text-gray-400 mb-2 md:mb-0">FTC</div>
              <div className="text-left md:text-right">Semi-Finalist at Texas State Championship, Multiple Regional Awards</div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div className="text-gray-400 mb-2 md:mb-0">AFA CyberPatriot</div>
              <div className="text-left md:text-right">Platinum Windows Server Award | Nationwide Cybersecurity Competition</div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div className="text-gray-400 mb-2 md:mb-0">Academic</div>
              <div className="text-left md:text-right">AP Scholar Award, Presidential Gold Seal Award</div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="max-w-6xl mx-auto p-4 md:p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Technical Skills 🛠️</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">💻</span>
                Programming & Development
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  Python (Certified), Machine Learning
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  JavaScript, TypeScript, React, Node.js
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  Java (Certified), C++, Flutter
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  HTML, CSS, Full Stack Development
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">🔧</span>
                Engineering & Design
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  3D Modeling & Printing (Industrial)
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  CNC Machining & Laser Cutting
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  Robotics Design & Construction
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  PCB Design & Electronics
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Additional Interests Section */}
        <section className="max-w-6xl mx-auto p-4 md:p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Additional Interests 🌟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">💃</span>
                Dance & Performance
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  NAACH Bollywood Dance Institute (Performance Team A)
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  Harmony Fusion Arts Dance Team (Co-Captain)
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  Performed at Miller Outdoor Theatre & Discovery Green
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  Choreographer for multiple productions
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">🎯</span>
                Other Pursuits
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  Investment Portfolio Management
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  Archery (Boy Scouts of America)
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  Table Tennis (8+ years experience)
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  PC Building & Component Customization
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Space Theme Background Effect */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-black"></div>
        
        {/* Stars */}
        {Array.from({ length: 150 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute bg-white rounded-full"
            initial={{ opacity: Math.random() * 0.7 + 0.3 }}
            animate={{ 
              opacity: [Math.random() * 0.7 + 0.3, Math.random() * 0.5 + 0.5, Math.random() * 0.7 + 0.3],
            }}
            transition={{ 
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
          />
        ))}

        {/* Constellations */}
        <svg className="absolute top-0 left-0 w-full h-full" style={{ opacity: 0.5 }}>
          {/* Big Dipper */}
          <g className="constellation">
            <circle cx="10%" cy="15%" r="2" fill="white" />
            <circle cx="15%" cy="18%" r="2" fill="white" />
            <circle cx="20%" cy="20%" r="2" fill="white" />
            <circle cx="25%" cy="22%" r="2" fill="white" />
            <circle cx="30%" cy="18%" r="2" fill="white" />
            <circle cx="35%" cy="16%" r="2" fill="white" />
            <circle cx="40%" cy="13%" r="2" fill="white" />
            <line x1="10%" y1="15%" x2="15%" y2="18%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <line x1="15%" y1="18%" x2="20%" y2="20%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <line x1="20%" y1="20%" x2="25%" y2="22%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <line x1="25%" y1="22%" x2="30%" y2="18%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <line x1="30%" y1="18%" x2="35%" y2="16%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <line x1="35%" y1="16%" x2="40%" y2="13%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          </g>
          
          {/* Orion */}
          <g className="constellation">
            <circle cx="70%" cy="65%" r="2" fill="white" />
            <circle cx="73%" cy="60%" r="2" fill="white" />
            <circle cx="75%" cy="70%" r="2" fill="white" />
            <circle cx="78%" cy="65%" r="3" fill="#4F9CF9" /> {/* Blue star */}
            <circle cx="80%" cy="75%" r="2" fill="white" />
            <circle cx="83%" cy="60%" r="2" fill="white" />
            <circle cx="85%" cy="70%" r="2" fill="white" />
            <line x1="70%" y1="65%" x2="73%" y2="60%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <line x1="73%" y1="60%" x2="78%" y2="65%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <line x1="78%" y1="65%" x2="83%" y2="60%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <line x1="75%" y1="70%" x2="78%" y2="65%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <line x1="78%" y1="65%" x2="80%" y2="75%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <line x1="80%" y1="75%" x2="85%" y2="70%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          </g>
        </svg>

        {/* Animated Rocket */}
        <motion.div
          className="absolute"
          initial={{ top: "110%", left: "10%" }}
          animate={{ top: "-10%", left: "30%" }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatDelay: 20
          }}
          style={{ zIndex: 5 }}
        >
          <div className="relative">
            <div className="absolute w-2 h-8 bg-orange-500 rounded-full blur-md -bottom-8 left-1/2 transform -translate-x-1/2"></div>
            <div className="w-4 h-10 bg-gray-300 rounded-t-full relative">
              <div className="absolute bottom-0 left-0 w-4 h-2 bg-red-500"></div>
              <div className="absolute -left-2 bottom-2 w-2 h-3 bg-gray-400 -skew-y-12"></div>
              <div className="absolute -right-2 bottom-2 w-2 h-3 bg-gray-400 skew-y-12"></div>
            </div>
          </div>
        </motion.div>

        {/* Orbiting Planet */}
        <motion.div
          className="absolute w-12 h-12 rounded-full"
          style={{
            background: "radial-gradient(circle, #2C5282 0%, #1A365D 100%)",
            boxShadow: "0 0 15px rgba(66, 153, 225, 0.5)"
          }}
          initial={{ top: "50%", left: "85%" }}
          animate={{
            top: ["50%", "55%", "50%", "45%", "50%"],
            left: ["85%", "86%", "87%", "86%", "85%"],
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute top-1 left-3 w-2 h-2 rounded-full bg-blue-300 opacity-70"></div>
          <div className="absolute top-3 left-7 w-3 h-3 rounded-full bg-blue-200 opacity-60"></div>
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-gray-200"
            initial={{ top: 0, left: 0, rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ 
              transformOrigin: "6px 6px",
              top: -3, 
              left: 5
            }}
          />
        </motion.div>

        {/* Shooting Stars */}
        <motion.div
          className="absolute h-px w-20 bg-white"
          initial={{ top: "-5%", left: "110%", rotate: -45 }}
          animate={{ top: "30%", left: "70%" }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 7
          }}
          style={{ boxShadow: "0 0 20px 2px white" }}
        />
        
        <motion.div
          className="absolute h-px w-12 bg-white"
          initial={{ top: "-5%", left: "40%", rotate: -45 }}
          animate={{ top: "15%", left: "20%" }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 12
          }}
          style={{ boxShadow: "0 0 20px 2px white" }}
        />
      </div>

      {/* Fixed UI Elements - Rearranged for better spacing */}
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

      {/* Neptune Visualization - Bottom right corner */}
      <motion.div
        className="fixed bottom-1/2 right-16 w-24 h-24 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.6, 0.8, 0.6], 
          scale: [1, 1.03, 1],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          background: "radial-gradient(circle, #00BFFF 0%, #1E40AF 100%)",
          boxShadow: "0 0 20px rgba(0, 191, 255, 0.7)",
          transform: "translateY(-50%)"
        }}
      >
        <div className="w-full h-full rounded-full relative overflow-hidden">
          <div className="absolute w-full h-full bg-blue-900 opacity-20" 
            style={{
              backgroundImage: "linear-gradient(0deg, transparent 0%, #164e63 100%)"
            }}
          ></div>
          <div className="absolute w-8 h-3 bg-cyan-200 opacity-30 rounded-full top-3 left-3 blur-sm"></div>
          <div className="absolute w-6 h-2 bg-cyan-200 opacity-20 rounded-full bottom-5 right-7 blur-sm"></div>
        </div>
      </motion.div>
    </div>
  );
}