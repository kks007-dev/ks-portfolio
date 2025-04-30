'use client';

import { useState, useEffect, useRef, JSX } from 'react';

// Type definitions
interface Project {
  id: number;
  name: string;
  type: string;
  icon: string;
  iconBg: string;
  description: string;
  // New position properties for constellation effect
  constellationX?: number;
  constellationY?: number;
  // New property for related projects
  relatedProjects?: number[];
}

interface ChangelogItem {
  date: string;
  content: string;
  link?: string;
}

export default function Page(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState<string>('Work');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projectsVisible, setProjectsVisible] = useState<boolean>(false);
  const [constellationMode, setConstellationMode] = useState<boolean>(false);
  
  const bannerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const constellationRef = useRef<HTMLCanvasElement>(null);
  
  // Handle scroll animation for gradient fade and scroll animations
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
      
      // Trigger projects visibility when user scrolls past a certain point
      if (projectsRef.current && !projectsVisible) {
        const rect = projectsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setProjectsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check for elements in viewport on load
    setTimeout(() => handleScroll(), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [projectsVisible]);

  // Generate random positions for constellation mode
  const getRandomPositions = (projects: any) => {
    return projects.map((project: any) => {
      // Clone the project
      return {
        ...project,
        constellationX: Math.random() * 80 + 10, // 10% to 90% of container width
        constellationY: Math.random() * 80 + 10, // 10% to 90% of container height
      };
    });
  };
  
  // Generate constellation effect
  useEffect(() => {
    if (constellationMode && selectedProject !== null && constellationRef.current) {
      const canvas = constellationRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      // Set canvas dimensions to match container
      const container = projectsRef.current;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Find the selected project's element
        const selectedElement = document.getElementById(`project-${selectedProject}`);
        if (!selectedElement) return;
        
        // Get center point of selected element
        const selectedRect = selectedElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        const startX = selectedRect.left + selectedRect.width / 2 - containerRect.left;
        const startY = selectedRect.top + selectedRect.height / 2 - containerRect.top;
        
        // Find all visible constellation points
        const points = document.querySelectorAll('.constellation-point');
        
        // Draw lines
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(88, 101, 242, 0.6)';
        ctx.lineWidth = 2;
        
        points.forEach((point) => {
          const pointRect = point.getBoundingClientRect();
          const endX = pointRect.left + pointRect.width / 2 - containerRect.left;
          const endY = pointRect.top + pointRect.height / 2 - containerRect.top;
          
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          
          // Add glow effect
          ctx.shadowColor = 'rgba(88, 101, 242, 0.8)';
          ctx.shadowBlur = 10;
        });
        
        ctx.stroke();
      }
    }
  }, [constellationMode, selectedProject]);
  
  // Handle window resize for constellation canvas
  useEffect(() => {
    const handleResize = () => {
      if (constellationMode && constellationRef.current && projectsRef.current) {
        constellationRef.current.width = projectsRef.current.offsetWidth;
        constellationRef.current.height = projectsRef.current.offsetHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [constellationMode]);
  
  // Handle project selection
  const handleProjectClick = (projectId: number) => {
    if (selectedProject === projectId) {
      // Deselect and exit constellation mode
      setSelectedProject(null);
      setConstellationMode(false);
    } else {
      // Select project and enter constellation mode
      setSelectedProject(projectId);
      setConstellationMode(true);
    }
  };
  
  // Example projects data with added related projects
  const projects: Project[] = [
    {
      id: 1,
      name: 'Zori',
      type: 'Product',
      icon: '⚡',
      iconBg: '#5865F2',
      description: 'Founding designer at the startup where we help people find professionals by recommendation',
      relatedProjects: [2, 5, 13]
    },
    {
      id: 2,
      name: 'Sapera',
      type: 'Product',
      icon: 'S',
      iconBg: '#4169E1',
      description: 'Lead the design of a project management platform',
      relatedProjects: [1, 4, 7]
    },
    {
      id: 3,
      name: '2+ items in an order at OLX',
      type: 'Feature',
      icon: '📦',
      iconBg: '#6A5ACD',
      description: 'Designed a way to purchase up to 5 items per deal on a platform that historically supported just 1',
      relatedProjects: [9, 11, 12]
    },
    {
      id: 4,
      name: 'Style Setuper',
      type: 'Product',
      icon: 'Aa',
      iconBg: '#7B68EE',
      description: 'Created a Figma plugin that scans your frame and suggests text styles',
      relatedProjects: [8, 12, 2]
    },
    {
      id: 5,
      name: 'thePenTool',
      type: 'Website',
      icon: '✒️',
      iconBg: '#4B0082',
      description: 'Founded thePenTool – online shop of UI design assets for designers that value their time',
      relatedProjects: [1, 6, 13]
    },
    {
      id: 6,
      name: 'companies.tools 22 recap',
      type: 'Website',
      icon: '🔗',
      iconBg: '#483D8B',
      description: 'Designed and shipped a yearly recap for companies.tools',
      relatedProjects: [5, 7, 13]
    },
    {
      id: 7,
      name: 'Obviously AI',
      type: 'Website',
      icon: '🔮',
      iconBg: '#9370DB',
      description: 'Designed a multi page marketing website for AI data prediction tool',
      relatedProjects: [2, 6, 10]
    },
    {
      id: 8,
      name: 'Better File Thumbnails',
      type: 'Product',
      icon: '🖼️',
      iconBg: '#5865F2',
      description: 'Created a Figma plugin that generates thumbnails to make it easier to find projects in the file browser',
      relatedProjects: [4, 12, 3]
    },
    {
      id: 9,
      name: 'Buyer acceptance rate at OLX',
      type: 'Feature',
      icon: '🎯',
      iconBg: '#6495ED',
      description: 'Designed a fix for a problem of sellers rejecting purchases with payment in the post office',
      relatedProjects: [3, 11, 10]
    },
    {
      id: 10,
      name: 'CureRate',
      type: 'Website',
      icon: '⏱️',
      iconBg: '#8A2BE2',
      description: 'Designed a platform for people with chronic conditions to find and review products that helped',
      relatedProjects: [7, 9, 13]
    },
    {
      id: 11,
      name: 'New deal confirmation experience at OLX',
      type: 'Feature',
      icon: '🔄',
      iconBg: '#6A5ACD',
      description: 'Redesigned the legacy flow of confirming a deal by seller',
      relatedProjects: [3, 9, 12]
    },
    {
      id: 12,
      name: 'Handy Components',
      type: 'Product',
      icon: '🧩',
      iconBg: '#7B68EE',
      description: 'Created a Figma plugin that scans your file and inserts components mimicking the style of your UI',
      relatedProjects: [4, 8, 11]
    },
    {
      id: 13,
      name: 'companies.tools',
      type: 'Website',
      icon: '🔧',
      iconBg: '#483D8B',
      description: 'Designed and launched a platform where teams share which apps and tools they use to work on their products',
      relatedProjects: [5, 6, 1]
    }
  ];

  // Get related projects for constellation view
  const getRelatedProjects = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (!project || !project.relatedProjects) return [];
    
    return project.relatedProjects.map(id => 
      projects.find(p => p.id === id)
    ).filter(p => p !== undefined) as Project[];
  };

  // Constellation effect projects (related to selected project)
  const relatedProjects = selectedProject 
    ? getRandomPositions(getRelatedProjects(selectedProject))
    : [];

  // Changelog data
  const changelog: ChangelogItem[] = [
    {
      date: 'February 17, 2024',
      content: 'Hacked together an interactive new concept: ',
      link: 'drag to open links »'
    },
    {
      date: 'January 13, 2024',
      content: 'Sold my startup ',
      link: 'companies.tools »'
    },
    {
      date: 'December 12, 2023',
      content: 'Started teaching my 3rd product design cohort at ',
      link: 'Projector Institute »'
    },
    {
      date: 'December 5, 2023',
      content: 'Received a grant from Figma for the Style Setuper plugin'
    },
    {
      date: 'November 15, 2023',
      content: 'Finished teaching my 2nd product design cohort at Projector Institute'
    }
  ];

  return (
    <div className="min-h-screen font-sans bg-black bg-opacity-95">
      {/* Space background with stars */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        {/* Small stars */}
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={`star-sm-${i}`} 
            className="absolute rounded-full bg-white"
            style={{
              width: '2px',
              height: '2px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 5 + 5}s ease-in-out infinite`
            }}
          />
        ))}
        
        {/* Medium stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={`star-md-${i}`} 
            className="absolute rounded-full bg-white"
            style={{
              width: '3px',
              height: '3px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 7 + 3}s ease-in-out infinite`
            }}
          />
        ))}
        
        {/* Large stars */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={`star-lg-${i}`} 
            className="absolute rounded-full bg-white"
            style={{
              width: '4px',
              height: '4px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 9 + 2}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Space Grotesk', sans-serif;
          background-color: #000814;
        }
        
        /* Star twinkling animation */
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        
        /* Nebula effect for gradient */
        .nebula-gradient {
          background: linear-gradient(45deg, #05000f, #05103f, #092466, #0c348f);
          background-size: 400% 400%;
          animation: nebula-shift 15s ease infinite;
        }
        
        @keyframes nebula-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Card interactions */
        .project-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 2px solid transparent;
          cursor: pointer;
          backdrop-filter: blur(4px);
        }
        
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(88, 101, 242, 0.3);
          z-index: 10;
        }

        .project-card.selected {
          border-color: rgba(88, 101, 242, 0.8);
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(88, 101, 242, 0.3);
          z-index: 20;
        }
        
        /* Fade other cards when one is hovered */
        .project-card-dimmed {
          filter: brightness(0.7);
          transform: scale(0.98);
        }
        
        /* Projects reveal animation */
        .projects-container {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .projects-container.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Constellation cards */
        .constellation-container {
          position: relative;
          height: 600px;
        }
        
        .constellation-point {
          position: absolute;
          transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 5;
          backdrop-filter: blur(4px);
        }
        
        .constellation-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 4;
        }
        
        /* Exit constellation button */
        .exit-constellation {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 30;
          transition: all 0.3s ease;
        }
        
        .exit-constellation:hover {
          transform: scale(1.1);
        }
        
        /* Stagger reveal animation for cards */
        .constellation-point:nth-child(1) { transition-delay: 50ms; }
        .constellation-point:nth-child(2) { transition-delay: 100ms; }
        .constellation-point:nth-child(3) { transition-delay: 150ms; }
        .constellation-point:nth-child(4) { transition-delay: 200ms; }
        .constellation-point:nth-child(5) { transition-delay: 250ms; }
        .constellation-point:nth-child(6) { transition-delay: 300ms; }
        
        /* Particle effect */
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>
      
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
        <div className="absolute top-0 left-0 w-full h-full nebula-gradient opacity-80"></div>
        
        {/* Space decorations */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-6 left-4 text-xl">🚀</div>
          <div className="absolute top-10 right-10 text-xl">🛰️</div>
          <div className="absolute bottom-8 left-1/4 text-xl">🌌</div>
          <div className="absolute top-1/3 right-1/3 text-xl">💫</div>
          <div className="absolute bottom-4 right-1/4 text-xl">⭐</div>
          
          {/* Code-like decorations */}
          <div className="absolute top-5 left-1/3 text-xs text-blue-300">{'<cosmos class="infinite">'}</div>
          <div className="absolute top-16 left-1/5 text-xs text-purple-300">{'function explore() {'}</div>
          <div className="absolute bottom-12 left-2/3 text-xs text-blue-300">{'const engineer = new SpaceEngineer();'}</div>
          <div className="absolute right-36 top-8 text-xs text-indigo-300">{'/* Engineering across the stars */'}</div>
          <div className="absolute bottom-6 left-16 text-xs text-purple-300">{'}</div>'}</div>
        </div>

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
              <a href="mailto:krishksingh07@gmail.com" className="block mt-2 text-white hover:underline">krishksingh07@gmail.com</a>
            </div>
          </header>
        </div>
      </div>
      {/* Border line */}
      <div className="w-full h-px bg-indigo-900"></div>
      
      <div className="max-w-7xl mx-auto px-4 py-10 relative z-10">
        {/* Main content layout with two columns */}
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Left column (main content) */}
          <div className="flex-1">
            {/* Visitor counter */}
            <div className="flex items-center mb-4">
              <span className="text-gray-400 mr-2 flex items-center">
                <span className="mr-1">👨‍🚀</span> 
                Hello, explorer
              </span>
              <div className="flex">
                {[4, 3, 5, 8].map((num, idx) => (
                  <div key={idx} className="bg-gray-900 w-6 h-6 flex items-center justify-center rounded-sm mx-0.5 text-blue-400 text-sm font-mono border border-gray-800">
                    {num}
                  </div>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-2 font-mono">// visitor_id</span>
            </div>

            {/* Ukraine support notice */}
            <div className="bg-gray-900 bg-opacity-70 p-3 rounded-lg mb-6 backdrop-filter backdrop-blur-sm">
              <p className="text-white flex items-center font-mono">
                <span className="mr-2">🇺🇦</span>
                <span><span className="text-indigo-400">console.log(</span>"newest development: stars portal"<span className="text-indigo-400">);</span></span>
              </p>
            </div>

            {/* Selected projects section */}
            <div className="mb-10" ref={projectsRef}>
              <div className="text-gray-400 mb-4 font-mono flex items-center">
                <span className="mr-2">🛰️</span>
                <span className="text-blue-400">Array</span>
                <span className="text-white">(</span>
                <span className="text-purple-400">13</span>
                <span className="text-white">)</span> selected projects
              </div>
              
              {/* Projects Container with Animation */}
              <div className={`projects-container ${projectsVisible ? 'visible' : ''}`}>
                {!constellationMode ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 project-grid">
                    {projects.map(project => (
                      <div 
                        key={project.id}
                        id={`project-${project.id}`}
                        className={`project-card bg-gray-900 bg-opacity-60 p-5 rounded-lg transition-all ${
                          selectedProject === project.id ? 'selected' : ''
                        } ${
                          hoveredCard !== null && hoveredCard !== project.id ? 'project-card-dimmed' : ''
                        }`}
                        onMouseEnter={() => setHoveredCard(project.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => handleProjectClick(project.id)}
                      >
                        <div className="flex items-start">
                          <div 
                            className="w-10 h-10 rounded-md flex items-center justify-center text-white mr-3 flex-shrink-0"
                            style={{ backgroundColor: project.iconBg }}
                          >
                            {project.icon}
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{project.name}</h3>
                            <p className="text-gray-300 text-sm mt-1">{project.description}</p>
                            <div className="mt-3">
                              <span className="inline-block bg-gray-800 text-xs text-blue-300 px-2 py-1 rounded font-mono border border-gray-700">
                                <span className="mr-1">🔭</span>{project.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="constellation-container">
                    {/* Exit constellation mode button */}
                    <button 
                      className="exit-constellation bg-gray-800 bg-opacity-70 text-white px-4 py-2 rounded-lg shadow-lg flex items-center backdrop-filter backdrop-blur-sm"
                      onClick={() => {
                        setConstellationMode(false);
                        setSelectedProject(null);
                      }}
                    >
                      <span className="mr-2">✖️</span> Exit View
                    </button>
                    
                    {/* Constellation Canvas for Drawing Lines */}
                    <canvas ref={constellationRef} className="constellation-canvas" />
                    
                    {/* Selected Project Card */}
                    {selectedProject !== null && (
                      <div 
                        id={`project-${selectedProject}`}
                        className="project-card selected bg-gray-900 bg-opacity-80 p-5 rounded-lg absolute backdrop-filter backdrop-blur-sm"
                        style={{ 
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '280px',
                          zIndex: 10
                        }}
                      >
                        {(() => {
                          const project = projects.find(p => p.id === selectedProject);
                          if (!project) return null;
                          
                          return (
                            <div className="flex items-start">
                              <div 
                                className="w-10 h-10 rounded-md flex items-center justify-center text-white mr-3 flex-shrink-0"
                                style={{ backgroundColor: project.iconBg }}
                              >
                                {project.icon}
                              </div>
                              <div>
                                <h3 className="text-white font-medium">{project.name}</h3>
                                <p className="text-gray-300 text-sm mt-1">{project.description}</p>
                                <div className="mt-3">
                                  <span className="inline-block bg-gray-800 text-xs text-blue-300 px-2 py-1 rounded font-mono border border-gray-700">
                                    <span className="mr-1">🔭</span>{project.type}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                    
                    {/* Related Project Cards */}
                    {relatedProjects.map((project: any) => (
                      <div 
                        key={`constellation-${project.id}`}
                        className="constellation-point bg-gray-900 bg-opacity-70 p-3 rounded-lg shadow-lg"
                        style={{
                          top: `${project.constellationY}%`,
                          left: `${project.constellationX}%`,
                          width: '140px',
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <div className="flex items-center">
                          <div 
                            className="w-8 h-8 rounded-md flex items-center justify-center text-white text-sm"
                            style={{ backgroundColor: project.iconBg }}
                          >
                            {project.icon}
                          </div>
                          <div className="ml-2">
                            <h3 className="text-white text-xs font-medium">{project.name}</h3>
                            <p className="text-gray-400 text-xs truncate">{project.type}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom navigation (only shown at smaller screens) */}
            <div className="flex justify-center mb-10 lg:hidden">
              <div className="bg-gray-800 bg-opacity-70 inline-flex rounded-lg backdrop-filter backdrop-blur-sm">
                {['Work', 'About', 'Lab'].map(tab => (
                  <button
                    key={tab}
                    className={`px-6 py-3 ${selectedTab === tab ? 'text-white' : 'text-gray-400'} flex items-center`}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab === 'Work' && <span className="mr-2">🚀</span>}
                    {tab === 'About' && <span className="mr-2">👨‍🚀</span>}
                    {tab === 'Lab' && <span className="mr-2">🧪</span>}
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Changelog section */}
            <div className="mb-10">
              <div className="text-gray-400 mb-4 font-mono flex items-center">
                <span className="mr-2">📡</span>
                <span className="text-blue-400">Object</span> changelog
              </div>
              
              <div className="space-y-4">
                {changelog.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="bg-gray-900 bg-opacity-60 p-4 rounded-lg border-l-4 border-indigo-500"
                  >
                    <div className="text-xs text-blue-300 font-mono mb-1">{item.date}</div>
                    <div className="text-white">
                      {item.content}
                      {item.link && <a href="#" className="text-indigo-400 hover:underline ml-1">{item.link}</a>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column (sidebar) */}
          <div className="lg:w-72 space-y-6">
            {/* Navigation Menu (only shown at larger screens) */}
            <div className="hidden lg:block mb-6">
              <div className="text-gray-400 mb-2 font-mono flex items-center">
                <span className="mr-2">🧭</span>
                <span className="text-blue-400">function</span> navigate<span className="text-white">()</span>
              </div>
              
              <div className="bg-gray-900 bg-opacity-70 rounded-lg overflow-hidden backdrop-filter backdrop-blur-sm">
                {['Work', 'About', 'Lab'].map(tab => (
                  <button
                    key={tab}
                    className={`block w-full text-left px-4 py-3 ${
                      selectedTab === tab ? 'bg-indigo-900 bg-opacity-40 text-white' : 'text-gray-300 hover:bg-gray-800'
                    } transition-colors flex items-center`}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab === 'Work' && <span className="mr-2">🚀</span>}
                    {tab === 'About' && <span className="mr-2">👨‍🚀</span>}
                    {tab === 'Lab' && <span className="mr-2">🧪</span>}
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Status indicator */}
            <div>
              <div className="text-gray-400 mb-2 font-mono flex items-center">
                <span className="mr-2">📊</span>
                <span className="text-blue-400">const</span> status
              </div>
              
              <div className="bg-gray-900 bg-opacity-70 p-4 rounded-lg backdrop-filter backdrop-blur-sm">
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                  <div className="text-gray-300">Available for hire</div>
                </div>
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <div className="text-gray-300">Working on startup</div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-blue-400 mr-2 animate-pulse"></div>
                  <div className="text-gray-300">Learning Dutch</div>
                </div>
              </div>
            </div>
            
            {/* Quick links */}
            <div>
              <div className="text-gray-400 mb-2 font-mono flex items-center">
                <span className="mr-2">🔗</span>
                <span className="text-blue-400">Array</span><span className="text-white">(4)</span> links
              </div>
              
              <div className="bg-gray-900 bg-opacity-70 rounded-lg overflow-hidden backdrop-filter backdrop-blur-sm">
                <a href="#" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 transition-colors">LinkedIn</a>
                <a href="#" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 transition-colors">GitHub</a>
                <a href="#" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 transition-colors">Twitter</a>
                <a href="#" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 transition-colors">Resume</a>
              </div>
            </div>
            
            {/* Technical skills */}
            <div>
              <div className="text-gray-400 mb-2 font-mono flex items-center">
                <span className="mr-2">🛠️</span>
                <span className="text-blue-400">Object</span> tech_stack
              </div>
              
              <div className="bg-gray-900 bg-opacity-70 p-4 rounded-lg backdrop-filter backdrop-blur-sm">
                <div className="mb-3">
                  <div className="text-white mb-1">Languages</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-800 text-xs rounded text-blue-300 border border-gray-700">JavaScript</span>
                    <span className="px-2 py-1 bg-gray-800 text-xs rounded text-blue-300 border border-gray-700">TypeScript</span>
                    <span className="px-2 py-1 bg-gray-800 text-xs rounded text-blue-300 border border-gray-700">Python</span>
                    <span className="px-2 py-1 bg-gray-800 text-xs rounded text-blue-300 border border-gray-700">Java</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="text-white mb-1">Frameworks</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-800 text-xs rounded text-blue-300 border border-gray-700">React</span>
                    <span className="px-2 py-1 bg-gray-800 text-xs rounded text-blue-300 border border-gray-700">Next.js</span>
                    <span className="px-2 py-1 bg-gray-800 text-xs rounded text-blue-300 border border-gray-700">Node.js</span>
                    <span className="px-2 py-1 bg-gray-800 text-xs rounded text-blue-300 border border-gray-700">Express</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-white mb-1">Tools</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-800 text-xs rounded text-blue-300 border border-gray-700">Figma</span>
                    <span className="px-2 py-1 bg-gray-800 text-xs rounded text-blue-300 border border-gray-700">VS Code</span>
                    <span className="px-2 py-1 bg-gray-800 text-xs rounded text-blue-300 border border-gray-700">Git</span>
                    <span className="px-2 py-1 bg-gray-800 text-xs rounded text-blue-300 border border-gray-700">AWS</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Music player */}
            <div>
              <div className="text-gray-400 mb-2 font-mono flex items-center">
                <span className="mr-2">🎵</span>
                <span className="text-blue-400">function</span> nowPlaying<span className="text-white">()</span>
              </div>
              
              <div className="bg-gray-900 bg-opacity-70 p-4 rounded-lg backdrop-filter backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-800 rounded-md mr-3 flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-xl">
                      🎧
                    </div>
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">Starship Operators</div>
                    <div className="text-gray-400 text-xs">Cosmic Funk</div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-800 h-1 rounded-full">
                    <div className="bg-indigo-500 h-1 rounded-full" style={{width: '65%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>2:15</span>
                    <span>3:30</span>
                  </div>
                </div>
                <div className="flex justify-center space-x-4 mt-3">
                  <button className="text-gray-300 hover:text-white transition-colors">⏮️</button>
                  <button className="text-white bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-indigo-500 transition-colors">▶️</button>
                  <button className="text-gray-300 hover:text-white transition-colors">⏭️</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-8 mt-10 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">© {new Date().getFullYear()} Krish Singh</p>
            <p className="text-gray-500 text-sm">Made with 💻 and ☕</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400 flex items-center justify-center md:justify-end">
              <span className="mr-2">🌌</span> Exploring space & code since 2015
            </p>
            <div className="flex space-x-4 mt-2 justify-center md:justify-end">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}