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
    { company: "Wix", period: "Aug 2023 — Now" },
    { company: "Zori", period: "Nov 2020 — Now" },
    { company: "OLX Ukraine (via Rebbix)", period: "Nov 2021 — Jun 2023" },
    { company: "ELEKS", period: "Jul 2017 — Oct 2021" },
    { company: "Finsweet", period: "May 2020 — Oct 2020" },
    { company: "dops.digital", period: "Jan 2017 — Jul 2017" },
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
                <p className="text-gray-300">Software Engineer</p>
                <p className="text-gray-400 text-sm">Currently at STARS »</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-gray-300">Researching, prototyping, designing and testing <span className="text-gray-400">by day</span></p>
              <p className="text-gray-300">coding, no-coding, launching products <span className="text-gray-400">by night</span></p>
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
        {/* Header */}
        
        <header className="max-w-6xl mx-auto p-4 pt-8 md:p-8">
          <div className="flex flex-col items-start">
         
          </div>
          
          <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
            </div>
            
          </div>
        </header>

        {/* Work Experience Section */}
        <section className="max-w-6xl mx-auto p-4 md:p-8 mt-8">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">Where I&apos;ve worked</h2>            <div className="flex space-x-2 mt-2 md:mt-0 md:ml-4">
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
  I&apos;m currently working at <span className="text-blue-400 hover:underline cursor-pointer">Wix</span>, specifically in the Analytics product.
  We&apos;re helping people make informed decisions about their website.
</p>
              </div>

              <div>
              <p className="text-gray-300">
  Also, I&apos;m the founding designer at <span className="text-blue-400 hover:underline cursor-pointer">Zorir</span> – an app to find professionals
  by recommendations.
</p>
              </div>

              <div>
              <p className="text-gray-300">
  Before Wix I designed <span className="text-blue-400 hover:underline cursor-pointer">OLX</span> – the most popular classifieds in Ukraine
  with over 15M MAU. I worked on &quot;OLX Delivery,&quot; which is the part of
  the product where buyers make purchases and sellers approve them.
</p>
              </div>

              <div>
              <p className="text-gray-300">
  Before OLX I worked at <span className="text-blue-400 hover:underline cursor-pointer">ELEKS</span> – one of the biggest outsourcing
  companies in Ukraine.
</p>
              </div>

              <div>
                <p className="text-gray-300">
                  While working in ELEKS I briefly joined <span className="text-blue-400 hover:underline cursor-pointer">Finesweet</span> – a famous
                  Webflow agency, where I designed a few projects.
                </p>
              </div>

              <div>
                <p className="text-gray-300">
                  Before that I worked in <span className="text-blue-400 hover:underline cursor-pointer">dops.digital</span> – a design studio. This was my
                  first full-time job.
                </p>
              </div>

              <div>
                <p className="text-gray-300">
                  Before joining dops.digital I freelanced for multiple years, mainly
                  designing websites and simple interfaces.
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

        {/* Recognition Section */}
        <section className="max-w-6xl mx-auto p-4 md:p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Recognition 🏆</h2>
          <div className="space-y-6 bg-gray-900/50 backdrop-blur-md rounded-xl p-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div className="text-gray-400 mb-2 md:mb-0">awwwards.</div>
              <div className="text-left md:text-right">Young Jury (2020–now), x2 Honorable Mention</div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div className="flex items-center gap-2 mb-2 md:mb-0">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">P</div>
                <span className="text-gray-400">Product Hunt</span>
              </div>
              <div className="text-left md:text-right">x3 Product of the Day</div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div className="text-gray-400 mb-2 md:mb-0">Figma</div>
              <div className="text-left md:text-right">Plugins featured, grant recipient</div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div className="flex items-center gap-2 mb-2 md:mb-0">
                <span className="text-gray-400">Webflow</span>
              </div>
              <div className="text-left md:text-right">Webflow Awards 2022 Finalist for companies.tools</div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div className="text-gray-400 mb-2 md:mb-0">CSSDesignAwards</div>
              <div className="text-left md:text-right">Special Kudos for thepentool.co</div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div className="text-gray-400 mb-2 md:mb-0">Bēhance</div>
              <div className="text-left md:text-right">x10 Behance Galleries</div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div className="flex items-center gap-2 mb-2 md:mb-0">
                <span className="text-gray-400">Framer</span>
              </div>
              <div className="text-left md:text-right">Featured on Framer Showcase for 2022 CT Recap</div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div className="flex items-center gap-2 mb-2 md:mb-0">
                <span className="text-gray-400">Awards</span>
              </div>
              <div className="text-left md:text-right">&quot;The Very Best Example of Website Design&quot;</div>            </div>
          </div>
        </section>

        {/* Interests Section */}
        <section className="max-w-6xl mx-auto p-4 md:p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Cosmic Interests 🌌</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">🚀</span>
                Space Exploration Technologies
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  Spacecraft propulsion systems
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  Orbital mechanics simulations
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  Deep space communication networks
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  Habitation modules for extended missions
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">🔭</span>
                Astrophysics & Astronomy
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  Black hole event horizons
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  Exoplanet discovery techniques
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  Relativistic effects at galactic scales
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">›</span>
                  Stellar evolution patterns
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
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 2 }}
        style={{
          background: "radial-gradient(circle, #2B6CB0 0%, #1A365D 70%, #0F172A 100%)",
          boxShadow: "0 0 20px rgba(43, 108, 176, 0.5)",
          filter: "blur(1px)"
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}