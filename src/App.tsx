import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ParticleNetwork from './components/ParticleNetwork';
import IntroScreen from './components/IntroScreen';
import HeroSection from './components/HeroSection';
import MyUniverse from './components/MyUniverse';
import CodeLab from './components/CodeLab';
import ServicesStore from './components/ServicesStore';
import CreatorStory from './components/CreatorStory';
import Testimonials from './components/Testimonials';
import ConnectionHub from './components/ConnectionHub';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

import { 
  Terminal, ShieldCheck, HeartPulse, RefreshCw, Cpu, 
  Layers, Compass, Flame, ArrowUpRight
} from 'lucide-react';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeStation, setActiveStation] = useState('home');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track page scroll percentage dynamically
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = (window.scrollY / docHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered]);

  // Sync dark theme on document element always
  useEffect(() => {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    localStorage.setItem('ac_theme', 'dark');
    window.dispatchEvent(new Event('storage'));
  }, []);

  // Handle shift + 4 (or Shift + $) trigger safely
  useEffect(() => {
    console.log(
      "%c⚡ [COVENANT CORE] ADMINISTRATIVE DECRYPTION INTERFACE ACTIVE. Access anytime via [ Shift + 4 ]", 
      "color: #FF6A00; font-family: monospace; font-size: 11px; font-weight: bold; background: #060913; padding: 6px 12px; border-radius: 6px; border: 1px solid #FF6A00;"
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === '4' || e.key === '$')) {
        const active = document.activeElement;
        if (active) {
          const tag = active.tagName.toLowerCase();
          if (tag === 'input' || tag === 'textarea' || active.hasAttribute('contenteditable')) {
            return; // Avoid triggering when typing on fields
          }
        }
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToStation = (id: string, stationName: string) => {
    setActiveStation(stationName);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-midnight text-primary selection:bg-neon-orange selection:text-black font-sans">
      
      {/* 1. CINEMATIC INTRO SCREEN */}
      <AnimatePresence>
        {!hasEntered && (
          <IntroScreen onEnter={() => setHasEntered(true)} />
        )}
      </AnimatePresence>

      {/* MAIN APPLICATION FRAME */}
      {hasEntered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative min-h-screen flex flex-col justify-between"
        >
          {/* Glowing premium gold thin progress bar at absolute top */}
          <div 
            className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#FFE79A] shadow-[0_0_12px_rgba(212,175,55,0.7),0_0_4px_rgba(212,175,55,0.4)] z-[9999] transition-all duration-75 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />

          {/* Interactive Background Particle Network Canvas */}
          <ParticleNetwork />

          {/* HOLOGRAPHIC NAVIGATION HUD DOCK */}
          <header className="sticky top-0 z-40 w-full px-4 sm:px-6 py-4 pointer-events-none">
            <div className="max-w-6xl mx-auto w-full flex items-center justify-between glass-panel px-4 sm:px-6 py-2.5 rounded-full border border-neon-orange/20 hover:border-neon-orange/35 shadow-neon-orange/5 hover:shadow-neon-orange/10 pointer-events-auto transition-all duration-300 relative select-none">
              
              {/* Dynamic Telemetry Log Left */}
              <div className="flex items-center space-x-2 shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-[9px] tracking-widest text-electric-blue hidden sm:inline uppercase font-bold">
                  SEC__COCKPIT // ONLINE
                </span>
                <span className="font-mono text-[9px] tracking-widest text-electric-blue sm:hidden uppercase font-bold">
                  SEC//AC
                </span>
              </div>

              {/* Central Quick Jump Stations */}
              <nav className="flex items-center space-x-1 md:space-x-2">
                {[
                  { label: 'HOME', targetId: 'home-station', name: 'home' },
                  { label: 'GALAXY', targetId: 'universe-station', name: 'universe' },
                  { label: 'CODE LAB', targetId: 'codelab-station', name: 'codelab' },
                  { label: 'STORE', targetId: 'services-station', name: 'services' },
                  { label: 'STORY', targetId: 'creator-station', name: 'creator' },
                  { label: 'HUB', targetId: 'contact-station', name: 'contact' }
                ].map((station) => (
                  <button
                    key={station.name}
                    onClick={() => scrollToStation(station.targetId, station.name)}
                    className={`px-2 md:px-3 py-1 sm:py-1.5 rounded-full font-mono text-[9px] tracking-widest uppercase transition-all cursor-pointer ${
                      activeStation === station.name
                        ? 'bg-neon-orange text-black font-bold shadow-neon-orange scale-105'
                        : 'text-secondary hover:text-primary hover:bg-neon-orange/10'
                    }`}
                  >
                    {station.label}
                  </button>
                ))}
              </nav>

              {/* Dynamic Signals Level Diagnostics Right */}
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="flex flex-col text-right">
                    <span className="font-mono text-[8px] text-secondary/50 tracking-widest leading-none">STREAM STATUS</span>
                    <span className="font-mono text-[9.5px] text-neon-orange tracking-widest font-bold mt-1 uppercase text-glow-orange leading-none">
                      COVENANT_GRID
                    </span>
                  </div>
                  <div className="w-[1.5px] h-6 bg-neon-orange/20" />
                  <button
                    onClick={() => scrollToStation('contact-station', 'contact')}
                    className="px-3.5 py-1.5 bg-slate-dark/50 hover:bg-neon-orange/10 uppercase font-mono text-[8.5px] tracking-widest rounded-full flex items-center space-x-1 cursor-pointer border border-neon-orange/20 hover:border-neon-orange/45 transition-all scale-95 text-primary"
                  >
                    <span>SIGNAL CAPTURE</span>
                    <ArrowUpRight className="w-3 h-3 text-neon-orange" />
                  </button>
                </div>
              </div>

            </div>
          </header>

          {/* MAIN SPACE SECTORS LAYOUT */}
          <main className="flex-1 w-full relative z-15">
            {/* Sector 1: HERO / CONTROL DASHBOARD */}
            <HeroSection 
              onNavigateToWork={() => scrollToStation('universe-station', 'universe')}
              onNavigateToContact={() => scrollToStation('contact-station', 'contact')}
            />

            {/* Sector 2: PROJECT SHOWCASE GALAXY */}
            <MyUniverse />

            {/* Sector 3: MACHINE ROOM CODE LAB */}
            <CodeLab />

            {/* Sector 4: METRIC DIGI STORE */}
            <ServicesStore />

            {/* Sector 5: STORYTELLER cinematicAbout */}
            <CreatorStory />

            {/* Sector 6: TESTIMONIAL FEEDBACK BUBBLES */}
            <Testimonials />

            {/* Sector 7: NEURAL CONNECTION INTERFACE HUB */}
            <ConnectionHub />
          </main>

          {/* SYSTEM SIGNATURE ZONE */}
          <Footer />

          {/* ADMIN CONFIGURATION MODULE PANEL (Shift + 4 KEYBIND) */}
          <AnimatePresence>
            {isAdminOpen && (
              <AdminPanel onClose={() => setIsAdminOpen(false)} />
            )}
          </AnimatePresence>

        </motion.div>
      )}

    </div>
  );
}
