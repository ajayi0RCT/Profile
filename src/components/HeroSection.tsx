import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal, ArrowRight, ShieldCheck, Cpu, Code2, Layers, HeartHandshake } from 'lucide-react';

interface HeroSectionProps {
  onNavigateToWork: () => void;
  onNavigateToContact: () => void;
}

export default function HeroSection({ onNavigateToWork, onNavigateToContact }: HeroSectionProps) {
  // Let's hold custom rotate angles for the interactive 3D Cube
  const [rotation, setRotation] = useState({ x: -15, y: 45 });
  const [activeFace, setActiveFace] = useState(1);

  useEffect(() => {
    // Elegant slow passive rotation
    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: prev.x + 0.12,
        y: prev.y + 0.18,
      }));
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const rotateToFace = (faceIndex: number) => {
    setActiveFace(faceIndex);
    // Explicit angles for specific face previews
    switch (faceIndex) {
      case 1: setRotation({ x: 0, y: 0 }); break; // E-comm Front
      case 2: setRotation({ x: 0, y: 180 }); break; // School Portal Back
      case 3: setRotation({ x: 0, y: -90 }); break; // Church Hub Left
      case 4: setRotation({ x: 0, y: 90 }); break; // Business Site Right
      case 5: setRotation({ x: 90, y: 0 }); break; // Code Lab Top
      case 6: setRotation({ x: -90, y: 0 }); break; // AC Core Bottom
    }
  };

  return (
    <div id="home-station" className="relative w-full min-h-screen py-16 flex items-center justify-center overflow-hidden bg-midnight text-primary">
      {/* Dynamic glow grids underneath */}
      <div className="absolute inset-0 cyber-dots opacity-[0.25] pointer-events-none" />
      
      {/* Decorative colored visual fields */}
      <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-electric-blue/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-neon-orange/10 blur-[130px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* LEFT SIDE: Control Dashboard Details */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          
          {/* Accent Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center space-x-2 bg-slate-dark/50 border border-neon-orange/20 px-4 py-1.5 rounded-full w-fit backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-neon-orange animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-[#D4AF37] font-bold">DIGITAL CONTROL EXP®</span>
          </motion.div>

          {/* Circular Profile Avatar of Ajayi Covenant with Glowing Gold Ring */}
          <div className="flex items-center space-x-5 my-2">
            <div className="relative group">
              {/* Outer rotating/pulsing absolute glowing gold ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#AA7C11] to-[#FFE79A] opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
              
              {/* Decorative golden orbit circle line */}
              <div className="absolute -inset-2.5 rounded-full border border-[#D4AF37]/35 animate-spin-reverse-slow" />
              
              {/* Main circular container */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-b from-[#FFE79A] via-[#D4AF37] to-[#AA7C11] relative overflow-hidden shrink-0 group shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 group-hover:scale-105">
                <img 
                  src="/src/assets/images/covenant_avatar_1781297658135.jpg"
                  alt="Ajayi Covenant Coding Avatar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full border-2 border-midnight transition-transform duration-700 group-hover:rotate-1 group-hover:scale-110"
                />
                {/* Dark overlay for sci-fi atmosphere */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent opacity-90 pointer-events-none" />
                
                {/* Tech digital marker inside circle */}
                <div className="absolute bottom-1.5 inset-x-0 text-center">
                  <span className="font-mono text-[7px] text-[#FFE79A] uppercase tracking-widest font-extrabold bg-[#050508]/85 px-1.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                    SYS_PILOT
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-[#D4AF37] tracking-widest uppercase block font-extrabold mb-0.5">System Pilot in Command</span>
              <h2 className="font-mono text-sm text-[#4DA3FF] tracking-wider block font-black uppercase leading-tight">
                AJAYI_COVENANT.sys
              </h2>
              <div className="flex items-center space-x-2 text-secondary/70">
                <span className="font-mono text-[8px] tracking-widest uppercase font-semibold">Status:</span>
                <span className="flex items-center space-x-1 py-0.5 px-2 bg-emerald-500/10 border border-emerald-500/30 rounded text-[8px] text-emerald-400 font-mono font-bold uppercase tracking-wider animate-pulse">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block mr-1" />
                  CODING_MATRIX_STABLE
                </span>
              </div>
            </div>
          </div>

          {/* Large Title Headers */}
          <div>
            <span className="font-mono text-xs text-neon-orange tracking-widest uppercase block mb-1">Elite Web Designer &amp; Developer</span>
            <h1 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-primary mb-2 leading-none">
              Ajayi <span className="bg-gradient-to-r from-primary via-electric-blue to-neon-orange bg-clip-text text-transparent">Covenant</span>
            </h1>
            <div className="flex flex-wrap gap-2 text-sm sm:text-lg font-mono text-secondary tracking-wide mt-2">
              <span className="text-primary hover:text-electric-blue transition-colors">Web Designer</span>
              <span>•</span>
              <span className="text-primary hover:text-neon-orange transition-colors">Front-End Developer</span>
              <span>•</span>
              <span className="text-primary hover:text-electric-blue transition-colors">Digital Creator</span>
            </div>
          </div>

          {/* Short Narrative Tagline */}
          <p className="font-sans text-secondary leading-relaxed text-base sm:text-lg max-w-lg border-l-2 border-neon-orange pl-4">
            “I don’t build typical, templated websites. I architect high-converting, premium digital experiences that command attention and drive conversion.”
          </p>

          {/* Core Interactive Action Links */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              id="view-work-cta"
              onClick={onNavigateToWork}
              className="px-8 py-4 bg-gradient-to-r from-neon-orange to-electric-blue hover:scale-105 active:scale-95 text-black font-display text-sm tracking-widest font-bold rounded-xl shadow-neon-orange/20 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer group"
            >
              <span>🚀 VIEW MY UNIVERSE</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              id="hire-me-cta"
              onClick={onNavigateToContact}
              className="px-8 py-4 glass-panel border border-neon-orange/20 hover:border-neon-orange/45 hover:shadow-neon-orange/10 text-primary font-display text-sm tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>💼 HIRE COVENANT</span>
            </button>
          </div>

          {/* Interactive controls for Cube */}
          <div className="pt-6 border-t border-neon-orange/15">
            <span className="text-[10px] font-mono text-secondary/70 tracking-wider block mb-2 uppercase">Inspect Cube Facets:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Ecom', icon: Cpu, id: 1 },
                { label: 'School', icon: Layers, id: 2 },
                { label: 'Church', icon: HeartHandshake, id: 3 },
                { label: 'Business', icon: Sparkles, id: 4 },
                { label: 'Code Lab', icon: Code2, id: 5 },
                { label: 'AC Emblem', icon: Terminal, id: 6 }
              ].map((face) => (
                <button
                  key={face.id}
                  onClick={() => rotateToFace(face.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border font-mono text-[10px] uppercase transition-all cursor-pointer ${
                    activeFace === face.id
                      ? 'bg-neon-orange/10 border-[#D4AF37] text-white'
                      : 'bg-slate-dark/65 border-neon-orange/10 text-secondary hover:text-primary hover:border-neon-orange/30'
                  }`}
                >
                  <face.icon className="w-3 h-3" />
                  <span>{face.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT SIDE: Interactive 3D preview cube & floating metrics */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center min-h-[460px] relative">
          
          {/* Orbital Orbit Line background */}
          <div className="absolute w-[360px] h-[360px] border border-neon-orange/10 rounded-full animate-spin-slow pointer-events-none" />
          <div className="absolute w-[240px] h-[240px] border border-dashed border-electric-blue/15 rounded-full animate-spin-reverse-slow pointer-events-none" />

          {/* FLOATING STATS: Surrounding the cube */}
          
          {/* Stats 1: Projects */}
          <div className="absolute -top-6 -left-1 sm:-left-6 p-4 glass-panel rounded-xl border border-neon-orange/25 shadow-neon-orange/5 flex items-center space-x-3 hover:scale-105 duration-350 z-20">
            <div className="w-2.5 h-2.5 rounded-full bg-electric-blue animate-ping" />
            <div>
              <span className="font-display font-bold text-primary text-lg">10+</span>
              <span className="font-mono text-[9px] text-secondary block tracking-widest uppercase">Elite Projects</span>
            </div>
          </div>

          {/* Stats 2: Clients */}
          <div className="absolute bottom-6 -right-1 sm:-right-8 p-4 glass-panel rounded-xl border border-neon-orange/25 shadow-neon-orange/10 flex items-center space-x-3 hover:scale-105 duration-350 z-20">
            <div className="w-2.5 h-2.5 rounded-full bg-neon-orange animate-pulse" />
            <div>
              <span className="font-display font-bold text-primary text-lg">5+</span>
              <span className="font-mono text-[9px] text-secondary block tracking-widest uppercase">Global Clients</span>
            </div>
          </div>

          {/* Stats 3: Experience */}
          <div className="absolute -bottom-8 left-12 p-3 glass-panel rounded-xl border border-neon-orange/15 flex items-center space-x-2.5 hover:scale-105 duration-300 z-20">
            <span className="font-mono text-[10px] text-electric-blue font-bold">EXPERIENCE:</span>
            <span className="font-display font-semibold text-primary text-xs tracking-wider uppercase animate-pulse">Growing Rapidly</span>
          </div>

          {/* 3D CUBE CONTAINER */}
          <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] cursor-grab active:cursor-grabbing perspective-[1000px] select-none">
            
            <div
              className="w-full h-full relative transition-transform duration-1000 ease-out preserve-3d"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              }}
            >
              
              {/* FACE 1: FRONT (Ecommerce Mock) */}
              <div
                className="absolute inset-0 w-full h-full bg-slate-dark/95 border-2 border-neon-orange/30 rounded-xl p-4 flex flex-col justify-between overflow-hidden shadow-neon-blue backface-hidden"
                style={{ transform: 'translateZ(110px)' }}
              >
                <div className="flex justify-between items-center text-[9px] font-mono text-electric-blue">
                  <span>NOVA SHOP // V2</span>
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                </div>
                <div className="my-auto space-y-1 text-center">
                  <div className="text-sm font-semibold tracking-tight text-primary font-display">Nova Apparel</div>
                  <div className="w-full bg-slate-dark h-1.5 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-neon-orange rounded-full animate-pulse" />
                  </div>
                  <div className="font-mono text-[8.5px] text-secondary">CHECKOUT FLOW STABLE</div>
                </div>
                <div className="text-[7.5px] font-mono text-secondary/40 text-center">FACET_01 // CL._ECOM</div>
              </div>

              {/* FACE 2: BACK (School Management Mock) */}
              <div
                className="absolute inset-0 w-full h-full bg-slate-dark/95 border-2 border-electric-blue/30 rounded-xl p-4 flex flex-col justify-between overflow-hidden backface-hidden"
                style={{ transform: 'rotateY(180deg) translateZ(110px)' }}
              >
                <div className="flex justify-between items-center text-[9px] font-mono text-neon-orange">
                  <span>ZENITH // PORTAL</span>
                  <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
                </div>
                <div className="my-auto space-y-1.5 text-center">
                  <div className="text-xs font-bold font-mono text-electric-blue">94.2% PERFORMANCE</div>
                  <div className="text-[10px] font-semibold text-secondary">STUDENT_REGISTRY_OK</div>
                  <div className="flex justify-center space-x-1 text-[8px] font-mono text-secondary/40">
                    <span className="px-1 py-0.5 bg-midnight rounded">CLASS A</span>
                    <span className="px-1 py-0.5 bg-midnight rounded">CLASS B</span>
                  </div>
                </div>
                <div className="text-[7.5px] font-mono text-secondary/40 text-center">FACET_02 // SYSTEM_ED</div>
              </div>

              {/* FACE 3: LEFT (Church Platform Mock) */}
              <div
                className="absolute inset-0 w-full h-full bg-slate-dark/95 border-2 border-neon-orange/30 rounded-xl p-4 flex flex-col justify-between overflow-hidden backface-hidden"
                style={{ transform: 'rotateY(-90deg) translateZ(110px)' }}
              >
                <div className="flex justify-between items-center text-[9px] font-mono text-neon-orange">
                  <span>SANCTUARY // LIVE</span>
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                </div>
                <div className="my-auto space-y-1 text-center">
                  <div className="text-xs font-semibold text-primary">Sermon Airwave</div>
                  <div className="text-[9px] font-mono text-secondary">STREAM: ACTIVE // 1080P</div>
                  <div className="inline-block px-2 py-0.5 text-neon-orange bg-neon-orange/15 border border-neon-orange/20 rounded text-[8px]">PRAISE HUB</div>
                </div>
                <div className="text-[7.5px] font-mono text-secondary/40 text-center">FACET_03 // DIV._MEDIA</div>
              </div>

              {/* FACE 4: RIGHT (Business Landing page bento) */}
              <div
                className="absolute inset-0 w-full h-full bg-slate-dark/95 border-2 border-neon-orange/20 rounded-xl p-4 flex flex-col justify-between overflow-hidden backface-hidden"
                style={{ transform: 'rotateY(90deg) translateZ(110px)' }}
              >
                <div className="flex justify-between items-center text-[9px] font-mono text-electric-blue">
                  <span>VERTEX // BENTO</span>
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                </div>
                <div className="my-auto text-left space-y-1">
                  <div className="text-[10px] font-mono font-bold text-primary tracking-tight">VERTEX_CO.TS</div>
                  <div className="grid grid-cols-2 gap-1 text-[8px] font-mono text-secondary/40">
                    <span className="p-0.5 bg-midnight rounded">Bento 1</span>
                    <span className="p-0.5 bg-midnight rounded">Bento 2</span>
                  </div>
                </div>
                <div className="text-[7.5px] font-mono text-secondary/40 text-center">FACET_04 // GRID_UX</div>
              </div>

              {/* FACE 5: TOP (Code lab screens) */}
              <div
                className="absolute inset-0 w-full h-full bg-slate-dark/95 border-2 border-neon-orange/20 rounded-xl p-4 flex flex-col justify-between overflow-hidden backface-hidden"
                style={{ transform: 'rotateX(90deg) translateZ(110px)' }}
              >
                <div className="flex justify-between items-center text-[9px] font-mono text-secondary">
                  <span>TERMINAL // ROOT</span>
                  <span className="text-[8px] text-neon-orange">SUCCESS</span>
                </div>
                <div className="my-auto font-mono text-[8px] text-neon-orange text-left space-y-0.5 bg-black/40 p-2 rounded border border-white/5">
                  <div>$ npm run build</div>
                  <div className="text-secondary/50">&gt; compiling portfolio...</div>
                  <div className="text-primary">&gt; 100% Core Web Vitals</div>
                </div>
                <div className="text-[7.5px] font-mono text-secondary/40 text-center">FACET_05 // CORE_COMP</div>
              </div>

              {/* FACE 6: BOTTOM (AC core emblem) */}
              <div
                className="absolute inset-0 w-full h-full bg-slate-dark border-2 border-neon-orange/40 rounded-xl p-4 flex flex-col justify-between overflow-hidden backface-hidden"
                style={{ transform: 'rotateX(-90deg) translateZ(110px)' }}
              >
                <div className="m-auto text-center space-y-2">
                  <div className="text-xl font-display font-extrabold tracking-widest text-neon-orange text-glow-orange">AC</div>
                  <div className="text-[9px] font-mono text-secondary/50 tracking-wider">FOUNDATION INTEGRATED</div>
                </div>
                <div className="text-[7.5px] font-mono text-secondary/40 text-center">FACET_06 // SIGNATURE</div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
