import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_PROJECTS } from '../data';
import { Project } from '../types';
import { 
  X, Compass, Cpu, Layers, ExternalLink, RefreshCw, 
  Play, Users, PlusCircle, Volume2, GraduationCap, 
  Heart, ShoppingBag, Youtube, Building2, Eye, ShieldAlert,
  ArrowLeftRight
} from 'lucide-react';

export default function MyUniverse() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('ac_sys_projects');
    return saved ? JSON.parse(saved) : ALL_PROJECTS;
  });

  React.useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem('ac_sys_projects');
      if (saved) {
        setProjects(JSON.parse(saved));
      } else {
        setProjects(ALL_PROJECTS);
      }
    };
    window.addEventListener('ac-projects-change', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('ac-projects-change', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);
  
  // Interactive sandbox states
  const [schoolStudents, setSchoolStudents] = useState([
    { name: 'Emeka Obi', class: 'Grade 12', status: 'Paid', grade: '96%' },
    { name: 'Sarah Adekoya', class: 'Grade 11', status: 'Paid', grade: '92%' },
    { name: 'John Doe', class: 'Grade 12', status: 'Pending', grade: '88%' }
  ]);
  const [isPlayingSermon, setIsPlayingSermon] = useState(false);
  const [sermonProgress, setSermonProgress] = useState(25);
  const [cartCount, setCartCount] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [youtubePlayState, setYoutubePlayState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [youtubeProgress, setYoutubeProgress] = useState(0);

  const handleSliderMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPosition(percentage);
  };

  const startResize = () => setIsResizing(true);
  const stopResize = () => setIsResizing(false);

  const handleTouchMove = (e: React.TouchEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX, container);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isResizing) return;
    const container = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, container);
  };

  // Simulated playground actions
  const addSchoolStudent = () => {
    const names = ['Azeez Ibrahim', 'Blessing Johnson', 'Chioma Nwachukwu', 'Damilola Olayemi'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    if (schoolStudents.some(s => s.name === randomName)) return;
    setSchoolStudents([
      ...schoolStudents, 
      { name: randomName, class: 'Grade 10', status: 'Paid', grade: '95%' }
    ]);
  };

  return (
    <div id="universe-station" className="relative w-full min-h-screen py-20 bg-midnight text-primary overflow-hidden border-t border-neon-orange/15">
      {/* Galaxy Grid Overlay */}
      <div className="absolute inset-0 neon-grid opacity-[0.15] pointer-events-none" />
      
      {/* Galaxy Center core glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-electric-blue/5 blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-neon-orange/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-slate-dark/50 border border-neon-orange/20 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest text-neon-orange uppercase mb-4">
            <Compass className="w-3.5 h-3.5 animate-spin-slow text-neon-orange" />
            <span>Interactive Space Layout</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
            My <span className="bg-gradient-to-r from-primary to-electric-blue bg-clip-text text-transparent">Universe</span>
          </h2>
          <p className="font-mono text-xs text-secondary mt-2 max-w-md tracking-wider font-semibold">
            Click on a floating coordinate planet to descend into Covenant&apos;s real interactive codebases.
          </p>
        </div>

        {/* GALAXY INTERFACE STAGE */}
        <div className="relative w-full max-w-4xl aspect-[16/9] min-h-[400px] bg-slate-dark/30 rounded-3xl border border-neon-orange/20 hover:border-neon-orange/45 hover:shadow-neon-orange/10 overflow-hidden flex items-center justify-center py-10 transition-all duration-300 cyber-dots">
          
          {/* Orbital rings */}
          <div className="absolute w-[220px] h-[220px] border border-white/[0.04] rounded-full pointer-events-none" />
          <div className="absolute w-[380px] h-[380px] border border-dashed border-white/[0.03] rounded-full pointer-events-none" />
          <div className="absolute w-[560px] h-[560px] border border-white/[0.02] rounded-full pointer-events-none" />

          {/* Central System Core */}
          <div className="absolute flex flex-col items-center justify-center text-center z-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-neon-orange to-electric-blue opacity-10 animate-ping absolute" />
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-slate-dark to-midnight border border-neon-orange/20 flex items-center justify-center relative shadow-neon-orange/10">
              <span className="text-[10px] font-mono text-primary font-bold">COV</span>
            </div>
            <span className="text-[8px] font-mono text-secondary/50 tracking-widest uppercase mt-3 block">Engine Core</span>
          </div>

          {/* Planet mapping stage representation */}
          <div className="absolute inset-0">
            {projects.map((project) => {
              // Custom visual icons based on category
              const isSchool = project.id === 'school';
              const isChurch = project.id === 'church';
              const isBusiness = project.id === 'business';
              const isEcomm = project.id === 'ecommerce';
              const isYoutube = project.id === 'mytube';

              return (
                <motion.button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  style={{
                    left: `${project.coordinate.x}%`,
                    top: `${project.coordinate.y}%`,
                  }}
                  whileHover={{ scale: 1.15 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10"
                >
                  {/* Planet glow back aura */}
                  <div 
                    className="absolute inset-0 rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: project.color }}
                  />

                  {/* Planet body circle */}
                  <div 
                    className="relative rounded-full flex items-center justify-center border border-white/10 shadow-lg"
                    style={{ 
                      width: `${project.planetSize}px`, 
                      height: `${project.planetSize}px`,
                      background: project.planetColor
                    }}
                  >
                    {/* Floating icon emblems */}
                    {isSchool && <GraduationCap className="w-5 h-5 text-white/95" />}
                    {isChurch && <Heart className="w-5 h-5 text-white/95" />}
                    {isBusiness && <Building2 className="w-5 h-5 text-white/95" />}
                    {isEcomm && <ShoppingBag className="w-5 h-5 text-white/95" />}
                    {isYoutube && <Youtube className="w-5 h-5 text-white/95" />}

                    {/* Orbit tag telemetry ring */}
                    <div className="absolute -inset-1.5 border border-dashed border-white/10 rounded-full group-hover:animate-spin-slow" />
                  </div>

                  {/* Satellite title bubble popover */}
                  <div className="mt-2.5 px-2.5 py-1 glass-panel text-[10px] font-mono font-bold tracking-wider rounded border border-neon-orange/20 group-hover:border-neon-orange transition-colors text-primary capitalize shadow-lg">
                    {project.title}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Map Legend telemetries */}
          <div className="absolute bottom-4 right-4 text-[9px] font-mono text-white/30 tracking-widest text-right select-none">
            <div>GALAXY_MAP: ACTIVE</div>
            <div>STATION_REVOLUTION: SEC_03</div>
          </div>
        </div>

        {/* WORKSTATION VIEW MODAL OVERLAY */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
            >
              <div className="absolute inset-0 neon-grid opacity-15" />

              <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                className="relative w-full max-w-6xl bg-slate-dark/95 backdrop-blur-md rounded-2xl border border-neon-orange/20 overflow-hidden flex flex-col max-h-[90vh] shadow-neon-orange/10"
              >
                
                {/* Modal Header */}
                <div className="p-5 border-b border-neon-orange/15 flex items-center justify-between bg-slate-dark/95 relative z-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: selectedProject.color }} />
                    <div>
                      <span className="text-[10px] font-mono text-electric-blue tracking-wider uppercase block">{selectedProject.category}</span>
                      <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-primary">{selectedProject.title}</h3>
                    </div>
                  </div>
                  <button
                    id="close-universe-modal"
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-neon-orange/10 rounded-lg border border-neon-orange/15 transition-all text-primary/70 hover:text-primary cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Widescreen body scroll */}
                <div className="flex-1 overflow-y-auto p-6 space-y-12">
                  
                  {/* Grid of details: Workspace left, interactive live sandbox preview right */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    {/* Left: Problem Solution Context */}
                    <div className="space-y-6 text-left">
                      <div>
                        <span className="font-mono text-[10px] text-neon-orange uppercase tracking-widest block mb-2 font-bold">Architectural Blueprint</span>
                        <p className="text-primary/95 font-sans leading-relaxed text-sm md:text-base">
                          {selectedProject.longDescription}
                        </p>
                      </div>

                      {/* Problem Column */}
                      <div className="bg-red-950/20 border border-red-500/10 p-4 rounded-xl space-y-1">
                        <div className="flex items-center space-x-2 text-red-500 font-mono text-xs font-semibold">
                          <ShieldAlert className="w-4 h-4" />
                          <span>THE SYSTEMIC PROBLEM</span>
                        </div>
                        <p className="font-sans text-xs text-primary/75 leading-relaxed">
                          {selectedProject.problem}
                        </p>
                      </div>

                      {/* Solution Column */}
                      <div className="bg-emerald-950/20 border border-emerald-500/10 p-4 rounded-xl space-y-1">
                        <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-semibold">
                          <Cpu className="w-4 h-4" />
                          <span>THE INTERACTIVE SOLUTION</span>
                        </div>
                        <p className="font-sans text-xs text-primary/75 leading-relaxed">
                          {selectedProject.solution}
                        </p>
                      </div>

                      {/* Technologies panel */}
                      <div>
                        <span className="text-[10px] font-mono text-secondary/55 tracking-wider block mb-2 uppercase font-bold">Integrated Fuel Tools</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tools.map((tech) => (
                            <span 
                              key={tech} 
                              className="px-2.5 py-1 bg-slate-dark/50 border border-neon-orange/15 rounded-md font-mono text-xs text-primary/75"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Interactive Simulated Sandbox Viewport */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center bg-slate-dark/40 px-3 py-1.5 rounded-lg border border-neon-orange/15">
                        <div className="flex space-x-1.5 text-secondary/40">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        </div>
                        <span className="font-mono text-[9px] text-electric-blue tracking-wider font-bold">COVENANT_LIVE_SIMULATOR.sh</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      </div>

                      {/* SANDBOX SCREEN VIEWER */}
                      <div className="w-full bg-midnight rounded-xl border border-neon-orange/15 overflow-hidden shadow-2xl p-4 md:p-6 min-h-[290px] flex flex-col justify-between">
                        
                        {/* 1. School ERP Sandbox */}
                        {selectedProject.iframeMockType === 'school' && (
                          <div className="space-y-4 text-left w-full">
                            <div className="flex justify-between items-center border-b border-light/10 pb-2">
                              <span className="font-display font-semibold text-xs text-primary">Zenith Dashboard</span>
                              <button 
                                onClick={addSchoolStudent}
                                className="flex items-center space-x-1 px-2.5 py-1 bg-electric-blue hover:bg-electric-blue/80 text-black font-semibold text-[10px] rounded transition-colors"
                              >
                                <PlusCircle className="w-3.5 h-3.5" />
                                <span>Enroll Student</span>
                              </button>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full text-[10px] font-mono">
                                <thead>
                                  <tr className="border-b border-light/5 text-secondary/60">
                                    <th className="py-1 text-left">Student</th>
                                    <th className="py-1 text-left">Grade Log</th>
                                    <th className="py-1 text-right">Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {schoolStudents.map((student, i) => (
                                    <tr key={i} className="border-b border-light/5">
                                      <td className="py-1.5 text-primary">{student.name}</td>
                                      <td className="py-1.5 text-electric-blue">{student.class} ({student.grade})</td>
                                      <td className="py-1.5 text-right text-emerald-400 font-bold">{student.status}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <p className="text-[9px] font-mono text-secondary/50 text-center">Simulated reactive data array integration. Live student state tracking.</p>
                          </div>
                        )}

                        {/* 2. Church Platform Sandbox */}
                        {selectedProject.iframeMockType === 'church' && (
                          <div className="space-y-5 text-left w-full">
                            <div className="flex justify-between items-center border-b border-light/10 pb-2">
                              <span className="font-display font-semibold text-xs text-neon-orange">Sanctuary of Grace Portal</span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 bg-neon-orange/10 text-neon-orange rounded font-bold">SUNDAY BROADCAST</span>
                            </div>
                            <div className="bg-slate-dark/50 border border-neon-orange/15 p-4 rounded-lg flex items-center space-x-4">
                              <button 
                                onClick={() => setIsPlayingSermon(!isPlayingSermon)}
                                className="w-10 h-10 rounded-full bg-neon-orange flex items-center justify-center text-black p-1 hover:scale-105 active:scale-95 transition-all outline-none"
                              >
                                {isPlayingSermon ? (
                                  <div className="w-3 h-3 bg-black" />
                                ) : (
                                  <Play className="w-4 h-4 fill-black text-black translate-x-0.5" />
                                )}
                              </button>
                              <div className="flex-1 space-y-1">
                                <div className="text-[11px] font-semibold text-primary">Sermon: Faith in the Storms (Pastor Samuel)</div>
                                <div className="flex items-center space-x-2">
                                  <div className="flex-1 bg-light/10 h-1 rounded-full overflow-hidden">
                                    <div className="bg-neon-orange h-full" style={{ width: `${isPlayingSermon ? sermonProgress : 15}%` }} />
                                  </div>
                                  <span className="text-[8px] font-mono text-secondary">12:35</span>
                                </div>
                              </div>
                            </div>
                            {/* Animated Audio Visualizer simulation */}
                            {isPlayingSermon && (
                              <div className="flex justify-center items-end space-x-1 h-8 px-8">
                                {[1,2,3,4,5,6,5,4,3,2,1,2,3,4,5,6,5,4,3,2,1].map((bar, i) => (
                                  <div 
                                    key={i} 
                                    className="bg-neon-orange w-1 rounded"
                                    style={{ 
                                      height: `${Math.floor(Math.random() * 24) + 6}px`,
                                      transition: 'height 0.2s ease-in-out'
                                    }}
                                  />
                                ))}
                              </div>
                            )}
                            <p className="text-[9px] font-mono text-secondary/50 text-center">Interactive sermon module simulator. Visualizer active upon play toggle.</p>
                          </div>
                        )}

                        {/* 3. Business Landing Sandbox */}
                        {selectedProject.iframeMockType === 'business' && (
                          <div className="space-y-4 text-left w-full">
                            <div className="text-center font-display text-xs text-primary pb-2 border-b border-light/5">Vertex Bento Segment</div>
                            <div className="grid grid-cols-3 gap-2.5">
                              <div className="col-span-2 p-3 bg-gradient-to-br from-purple-950/20 to-purple-900/10 border border-purple-500/20 rounded-lg space-y-1 hover:border-purple-500 duration-300">
                                <span className="font-mono text-[8px] text-electric-blue block">CO-DATA_DYNAMICS</span>
                                <span className="font-display font-bold text-xs text-primary">42% ROI Uplift</span>
                              </div>
                              <div className="p-3 bg-slate-dark/60 border border-neon-orange/15 rounded-lg flex flex-col justify-between hover:border-neon-orange duration-300">
                                <span className="font-mono text-[8px] text-secondary">CLIENTS</span>
                                <span className="text-xs font-bold text-neon-orange">99.9%</span>
                              </div>
                              <div className="p-3 bg-slate-dark/60 border border-neon-orange/15 rounded-lg flex flex-col justify-between hover:border-neon-orange duration-300">
                                <span className="font-mono text-[8px] text-secondary">SEC_SPEED</span>
                                <span className="text-xs font-bold text-electric-blue">0.4s</span>
                              </div>
                              <div className="col-span-2 p-3 bg-gradient-to-r from-purple-900/20 to-purple-950/10 border border-purple-500/20 rounded-lg flex items-center justify-between hover:border-purple-500 duration-300">
                                <span className="font-mono text-[8px] text-secondary/60">CONVERSION KPI PIPELINE</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                              </div>
                            </div>
                            <p className="text-[9px] font-mono text-secondary/50 text-center">Grid layout alignment matching production metrics.</p>
                          </div>
                        )}

                        {/* 4. Ecommerce Sandbox */}
                        {selectedProject.iframeMockType === 'ecommerce' && (
                          <div className="space-y-4 text-left w-full">
                            <div className="flex justify-between items-center border-b border-light/10 pb-2">
                              <span className="font-display font-semibold text-xs text-primary">Nova Thread Storefront</span>
                              <div className="relative inline-flex items-center space-x-1 px-2 py-0.5 bg-slate-dark/40 rounded border border-neon-orange/15">
                                <ShoppingBag className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-[10px] font-mono text-emerald-500 font-bold">{cartCount} items</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 items-center">
                              <div className="bg-slate-dark/45 p-2 rounded-lg border border-neon-orange/15">
                                <span className="aspect-square bg-gradient-to-br from-[#10B981]/15 to-[#062419]/5 rounded flex items-center justify-center text-[10px] font-mono text-primary/70">
                                  PREVIEW MODEL
                                </span>
                              </div>
                              <div className="space-y-2 text-xs">
                                <h4 className="font-bold text-primary text-[11px]">Nova Minimalist Parka</h4>
                                <div className="text-[10px] text-emerald-500 font-bold">$149.00</div>
                                <div className="flex space-x-1.5 pt-1">
                                  {['S', 'M', 'L'].map((size) => (
                                    <button 
                                      key={size}
                                      onClick={() => setSelectedSize(size)}
                                      className={`w-5 h-5 rounded text-[8px] font-mono font-bold border transition-colors cursor-pointer ${
                                        selectedSize === size 
                                          ? 'bg-emerald-500 border-emerald-500 text-black' 
                                          : 'bg-slate-dark/5 border-neon-orange/15 text-primary hover:border-neon-orange/50'
                                      }`}
                                    >
                                      {size}
                                    </button>
                                  ))}
                                </div>
                                <button 
                                  onClick={() => setCartCount(cartCount + 1)}
                                  className="w-full py-1 bg-gradient-to-r from-emerald-500 to-emerald-700 text-black font-bold text-[9px] uppercase tracking-wider rounded mt-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                                >
                                  Add To Cart
                                </button>
                              </div>
                            </div>
                            <p className="text-[9px] font-mono text-secondary/50 text-center">Interactive stock array variables. Click sizes/buy to increment cart count.</p>
                          </div>
                        )}

                        {/* 5. MyTube Sandbox */}
                        {selectedProject.iframeMockType === 'mytube' && (
                          <div className="space-y-4 text-left w-full">
                            <div className="flex justify-between items-center border-b border-light/5 pb-2">
                              <span className="font-display font-semibold text-xs text-red-500 flex items-center space-x-1">
                                <Youtube className="w-4 h-4 text-red-500 inline" />
                                <span>MyTube Cinema</span>
                              </span>
                              <span className="text-[8px] font-mono text-secondary">1080P UHD</span>
                            </div>
                            <div className="aspect-[16/9] bg-black border border-neon-orange/15 rounded-lg flex flex-col justify-between p-3 relative group overflow-hidden">
                              
                              {/* Overlay controls when hovering or idle */}
                              <div className="flex justify-between items-center text-[8px] font-mono text-secondary/80 z-10">
                                <span>Video ID: SEC_YT_0991</span>
                                <span className="bg-red-500/20 text-red-400 px-1 rounded uppercase tracking-widest text-[7px] font-bold">CINEMATIC PLAYER</span>
                              </div>

                              <div className="m-auto text-center z-10">
                                {youtubePlayState !== 'playing' ? (
                                  <button 
                                    onClick={() => {
                                      setYoutubePlayState('playing');
                                      let prog = 0;
                                      const interval = setInterval(() => {
                                        prog += 4;
                                        setYoutubeProgress(Math.min(100, prog));
                                        if (prog >= 100) clearInterval(interval);
                                      }, 60);
                                    }}
                                    className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform cursor-pointer border-none"
                                  >
                                    <Play className="w-5 h-5 text-white fill-white translate-x-0.5" />
                                  </button>
                                ) : (
                                  <div className="text-[9px] font-mono text-red-500 animate-pulse font-bold">PLAYING HIGH-FIDELITY SIMULATION...</div>
                                )}
                              </div>

                              <div className="space-y-1.5 z-10">
                                <div className="text-[9px] font-semibold text-white tracking-tight">Creating Stunning Web Interfaces in 2026 - Ajayi Covenant</div>
                                <div className="flex items-center space-x-2">
                                  <div className="flex-1 bg-white/10 h-0.5 rounded overflow-hidden">
                                    <div className="bg-red-500 h-full" style={{ width: `${youtubeProgress}%` }} />
                                  </div>
                                  <span className="text-[7.5px] font-mono text-white/55">{youtubeProgress}%</span>
                                </div>
                              </div>
                              
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 pointer-events-none" />
                            </div>
                            <p className="text-[9px] font-mono text-secondary/50 text-center">Immersive theater mode simulator. Click play to simulate visual progress.</p>
                          </div>
                        )}

                        {/* Sandbox refresh indicator */}
                        <div className="flex items-center justify-center space-x-1.5 text-secondary/40 pt-4 border-t border-neon-orange/15">
                          <RefreshCw className="w-3 h-3 animate-spin-slow text-neon-orange" />
                          <span className="font-mono text-[8px] tracking-wider uppercase font-semibold">Sandbox synchronized with Root Matrix</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* BEFORE / AFTER USER INTERFACE SLIDER */}
                  <div className="space-y-4 border-t border-neon-orange/15 pt-8">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-mono text-[10px] text-electric-blue uppercase tracking-widest block font-bold">Comparative UX Analysis</span>
                        <h4 className="font-display font-semibold text-primary text-sm md:text-base flex items-center space-x-1.5">
                          <ArrowLeftRight className="w-4 h-4 text-neon-orange" />
                          <span>UI Performance Contrast</span>
                        </h4>
                      </div>
                      <span className="font-mono text-[10px] text-secondary/40 block font-semibold">Slide center divider</span>
                    </div>

                    <div 
                      className="relative w-full aspect-[21/9] min-h-[160px] max-h-[300px] border border-neon-orange/20 bg-midnight rounded-xl overflow-hidden select-none cursor-ew-resize"
                      onMouseMove={handleMouseMove}
                      onTouchMove={handleTouchMove}
                      onMouseDown={startResize}
                      onMouseUp={stopResize}
                      onMouseLeave={stopResize}
                    >
                      {/* BEFORE STATE CARD */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-center bg-slate-dark/30 text-left">
                        <div className="absolute top-4 left-4 font-mono text-[10px] px-2 py-0.5 bg-red-500/20 text-red-400 rounded-sm font-bold">BEFORE STATE (LEGACY CLUNKINESS)</div>
                        <p className="font-mono text-xs sm:text-sm text-red-400/90 max-w-sm">
                          &quot;{selectedProject.beforeImage}&quot;
                        </p>
                      </div>

                      {/* AFTER STATE CARD (Overlay on right side sliding) */}
                      <div 
                        className="absolute inset-y-0 right-0 p-6 flex flex-col justify-center bg-gradient-to-tr from-slate-dark/80 to-midnight text-left overflow-hidden border-l border-neon-orange"
                        style={{ left: `${sliderPosition}%` }}
                      >
                        <div className="absolute top-4 left-4 font-mono text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-sm whitespace-nowrap font-bold">AFTER RECONSTRUCT (COVENANT DIGITAL ARCHITECT)</div>
                        <p className="font-mono text-xs sm:text-sm text-emerald-400/90 max-w-lg pr-4">
                          &quot;{selectedProject.afterImage}&quot;
                        </p>
                      </div>

                      {/* SLIDING CONTROL INDICATOR */}
                      <div 
                        className="absolute inset-y-0 w-[2px] bg-neon-orange pointer-events-none"
                        style={{ left: `${sliderPosition}%` }}
                      >
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-midnight border-2 border-neon-orange flex items-center justify-center text-neon-orange shadow-neon-orange/15 text-xs font-bold font-mono">
                          ↔
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM CTAS */}
                  <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-neon-orange/15 gap-4">
                    <span className="font-mono text-xs text-secondary/40 font-bold">AJAYI COVENANT EXP. GRID // ID_CODE_98099</span>
                    
                    <a 
                      id="launch-live-website-link"
                      href={selectedProject.liveUrl} 
                      className="px-6 py-3 bg-neon-orange hover:bg-neon-orange/80 text-black font-display text-xs tracking-wider font-bold rounded-xl flex items-center space-x-1.5 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
                    >
                      <span>LAUNCH SIMULATOR PRODUCTION</span>
                      <ExternalLink className="w-3.5 h-3.5 text-black" />
                    </a>
                  </div>

                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
