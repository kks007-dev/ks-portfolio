"use client";

import React, { useState, useEffect, JSX } from 'react';
import { Star, Rocket, Code, Database } from 'lucide-react';
import { motion } from "framer-motion";
import Link from 'next/link';
// Demo Projects Data
const projects = [
  {
    id: 1,
    title: "STARS Portal",
    icon: <Database className="w-12 h-12" />,
    description: "A comprehensive backend solution for data management and analytics.",
    media: [
      { type: "image" as const, url: "/projects/stars/dashboard.png", alt: "STARS Dashboard" },
      { type: "video" as const, url: "/projects/stars/demo.mp4", thumbnail: "/projects/stars/thumbnail.png" }
    ],
    achievements: [
      "Reduced data processing time by 60% through optimized algorithms",
      "Implemented real-time analytics for 10,000+ concurrent users",
      "Achieved 99.9% uptime with robust error handling"
    ],
    techStack: ["Node.js", "GraphQL", "PostgreSQL", "Redis"],
    details: [
      { type: "text", content: "Built with Node.js and GraphQL to provide seamless data access across platforms." },
      { type: "text", content: "Features real-time updates, robust authentication, and comprehensive documentation." }
    ]
  },
  {
    id: 2,
    title: "I.D.R.O.N",
    icon: <Code className="w-12 h-12" />,
    description: "Modern frontend framework with responsive components.",
    media: [
      { type: "image" as const, url: "/projects/idron/components.png", alt: "Component Library" },
      { type: "image" as const, url: "/projects/idron/dark-mode.png", alt: "Dark Mode Preview" }
    ],
    achievements: [
      "Developed 50+ reusable components with 95% test coverage",
      "Reduced bundle size by 40% through code splitting",
      "Implemented comprehensive dark mode support"
    ],
    techStack: ["React", "TypeScript", "TailwindCSS", "Jest"],
    details: [
      { type: "text", content: "Component library built with React and TypeScript for type-safe development." },
      { type: "text", content: "Includes 50+ customizable UI elements with dark mode support." }
    ]
  },
  {
    id: 3,
    title: "UnLeach",
    icon: <Rocket className="w-12 h-12" />,
    description: "Data visualization platform for business intelligence.",
    media: [
      { type: "video" as const, url: "/projects/unleach/demo.mp4", thumbnail: "/projects/unleach/thumbnail.png" },
      { type: "image" as const, url: "/projects/unleach/dashboard.png", alt: "Analytics Dashboard" }
    ],
    achievements: [
      "Processed 1M+ data points in real-time",
      "Implemented ML-powered anomaly detection with 95% accuracy",
      "Reduced dashboard load time by 70%"
    ],
    techStack: ["Python", "TensorFlow", "D3.js", "FastAPI"],
    details: [
      { type: "text", content: "Interactive dashboards with customizable metrics and real-time data processing." },
      { type: "text", content: "Machine learning powered insights to identify trends and anomalies." }
    ]
  }
];

// Star component for background animation
const StarField = () => {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; opacity: number; twinkleSpeed: number; }[]>([]);
  
  useEffect(() => {
    const generateStars = () => {
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
    };
    
    generateStars();
  }, []);
  
  return (
    <div className="fixed inset-0 overflow-hidden">
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
    </div>
  );
};

export default function Page() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);
  
  // Define the type for a project
  interface Project {
    id: number;
    title: string;
    icon: JSX.Element;
    description: string;
    media: { type: "image" | "video"; url: string; alt?: string; thumbnail?: string }[];
    achievements: string[];
    techStack: string[];
    details: { type: string; content: string }[];
  }
  
  const handleProjectClick = (project: Project) => {
    if (selectedProject?.id === project.id) {
      // If clicking the same project, close it
      setIsExpanding(false);
      setTimeout(() => setSelectedProject(null), 500);
    } else {
      // If clicking a different project, show it
      setIsExpanding(true);
      setSelectedProject(project);
    }
  };
  
  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(100, 100, 255, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(100, 100, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(100, 100, 255, 0); }
        }
        
        @keyframes expand {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(30); opacity: 0; }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
      
      {/* Background stars */}
      <StarField />
      
      {/* Nebula effects */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(100, 50, 255, 0.3), transparent 30%), radial-gradient(circle at 70% 30%, rgba(50, 100, 255, 0.3), transparent 40%)'
        }}
      />
      
      {/* Header */}
      <header className="relative z-10 pt-8 pb-4 text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
           My Demo Gallery
        </h1>
      </header>
      
      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 ">
        {!selectedProject ? (
          /* Grid of project cards */
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 py-16">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project as Project)}
                className="relative w-64 h-64 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center border border-gray-700 cursor-pointer transform transition-all duration-500 hover:scale-105"
                style={{
                  animation: `float ${3 + project.id}s infinite ease-in-out`,
                  boxShadow: '0 0 20px rgba(50, 50, 200, 0.2)'
                }}
              >
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-black" />
                </div>
                
                <div className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-blue-900 to-purple-900 text-blue-300">
                    {project.icon}
                  </div>
                  <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                  <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.techStack.map((tech, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-800 rounded-full text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Expanded constellation view */
          <div 
            className="relative h-full min-h-screen flex flex-col items-center justify-start pt-8"
            style={{
              animation: isExpanding ? 'fadeIn 1s forwards' : 'none'
            }}
          >
            {/* Back button */}
            <button
              onClick={() => handleProjectClick(selectedProject)}
              className="absolute top-0 left-4 flex items-center p-2 text-gray-400 hover:text-white transition-colors"
            >
              <span className="mr-1">←</span> Back to Projects
            </button>
            
            {/* Constellation header */}
            <div className="flex items-center mb-8">
              <div className="p-3 rounded-full bg-gradient-to-br from-blue-900 to-purple-900 text-blue-300 mr-4">
                {selectedProject.icon}
              </div>
              <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
            </div>
            
            {/* Constellation visualization */}
            <div className="w-full max-w-4xl">
              {/* Media Gallery */}
              <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  {selectedProject.media[0]?.type === "video" ? (
                    <video
                      className="w-full h-full object-cover"
                      src={selectedProject.media[0].url}
                      poster={selectedProject.media[0].thumbnail}
                      controls
                      autoPlay
                      loop
                    />
                  ) : (
                    <img
                      className="w-full h-full object-cover"
                      src={selectedProject.media[0]?.url}
                      alt={selectedProject.media[0]?.alt}
                    />
                  )}
                </div>
              </div>

              {/* Achievements Section */}
              <div className="bg-black bg-opacity-50 p-6 rounded-xl border border-gray-800 mb-8">
                <h3 className="text-xl font-semibold mb-4">Key Achievements</h3>
                <ul className="space-y-3">
                  {selectedProject.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="bg-black bg-opacity-50 p-6 rounded-xl border border-gray-800 mb-8">
                <h3 className="text-xl font-semibold mb-4">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Overview */}
              <div className="bg-black bg-opacity-50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-semibold mb-4">Project Overview</h3>
                <p className="mb-4">
                  {selectedProject.description}
                </p>
                <div className="flex justify-center gap-4 mt-6">
                  <button className="px-4 py-2 rounded-md bg-blue-900 hover:bg-blue-800 text-blue-200 transition-colors">
                    Live Demo
                  </button>
                  <button className="px-4 py-2 rounded-md bg-purple-900 hover:bg-purple-800 text-purple-200 transition-colors">
                    Source Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

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
      
      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Cosmic Projects • Explore the universe of possibilities</p>
      </footer>
    </div>
  );
}