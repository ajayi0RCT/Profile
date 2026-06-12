import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_TESTIMONIALS } from '../data';
import { MessageSquare, Star, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Intermittent transition interval
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ALL_TESTIMONIALS.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? ALL_TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % ALL_TESTIMONIALS.length);
  };

  return (
    <div id="testimonials-station" className="relative w-full min-h-screen py-20 bg-midnight text-primary overflow-hidden border-t border-neon-orange/15 flex flex-col justify-center">
      {/* Background stardust stars */}
      <div className="absolute inset-0 cyber-dots opacity-20 pointer-events-none" />
      
      {/* Orbit paths for space feeling */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.03] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-dashed border-white/[0.04] rounded-full pointer-events-none animate-spin-reverse-slow" />

      {/* Floating accent background glows */}
      <div className="absolute top-1/3 left-10 w-72 h-72 rounded-full bg-electric-blue/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-neon-orange/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-slate-dark/50 border border-neon-orange/20 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest text-neon-orange uppercase mb-4 font-bold">
            <MessageSquare className="w-3.5 h-3.5 text-neon-orange" />
            <span>Voice of Global Clients</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
            Client <span className="bg-gradient-to-r from-primary to-electric-blue bg-clip-text text-transparent">Transmission</span>
          </h2>
          <p className="font-mono text-xs text-secondary/60 mt-2 max-w-sm mx-auto tracking-wider font-semibold">
            Observe incoming system signals from successfully integrated products across the globe.
          </p>
        </div>

        {/* TESTIMONIAL DISPLAY WORKSTATION */}
        <div className="w-full max-w-3xl relative min-h-[360px] flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            {ALL_TESTIMONIALS.map((test, index) => {
              if (index !== activeIndex) return null;

              return (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="w-full relative py-6 px-1 lg:px-6"
                >
                  {/* Glowing Chat bubble */}
                  <div className="relative p-6 sm:p-10 rounded-3xl bg-slate-dark/30 hover:bg-slate-dark/45 border border-neon-orange/15 hover:border-neon-orange/45 hover:shadow-neon-orange/5 transition-all duration-300 flex flex-col justify-between before:content-[''] before:absolute before:bottom-[-10px] before:left-12 before:w-5 before:h-5 before:bg-slate-dark before:border-r before:border-b before:border-neon-orange/15 before:rotate-45 before:z-0">
                    
                    {/* Double quote background indicator */}
                    <div className="absolute top-6 right-8 text-7xl font-serif text-white/[0.04] leading-none pointer-events-none select-none">
                      “
                    </div>

                    <div className="space-y-6">
                      {/* Rating Stars */}
                      <div className="flex items-center space-x-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < test.rating ? 'text-neon-orange fill-neon-orange' : 'text-secondary/20'}`} 
                            id={`star-${test.id}-${i}`}
                          />
                        ))}
                        <Sparkles className="w-3.5 h-3.5 text-electric-blue ml-2 animate-pulse" />
                      </div>

                      {/* Comment Message */}
                      <p className="font-sans text-sm md:text-base text-primary/95 leading-relaxed font-semibold">
                        {test.comment}
                      </p>
                    </div>

                    {/* Metadata strip */}
                    <div className="flex justify-between items-center text-[10px] font-mono text-secondary/40 border-t border-neon-orange/15 pt-4 mt-6 font-semibold">
                      <span>ORIGIN: PORT_IP//{test.id.toUpperCase()}</span>
                      <span>SEC_DATE: {test.date}</span>
                    </div>

                  </div>

                  {/* Bubble sender node bottom */}
                  <div className="flex items-center space-x-4 mt-8 pl-8">
                    {/* Avatar sphere */}
                    <div className="relative">
                      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-neon-orange to-electric-blue opacity-75 blur animate-pulse" />
                      <div className="relative w-12 h-12 rounded-full bg-midnight border border-neon-orange/20 flex items-center justify-center font-display font-extrabold text-primary text-xs">
                        {test.name.charAt(0)}{test.name.split(' ')[1]?.charAt(0) || ''}
                      </div>
                    </div>
                    {/* Credentials info */}
                    <div className="text-left font-semibold">
                      <h4 className="font-display font-bold text-sm text-primary">{test.name}</h4>
                      <p className="font-mono text-[9px] text-electric-blue uppercase tracking-wider mt-0.5">{test.role} at <span className="text-primary font-bold">{test.company}</span></p>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>

        </div>

        {/* MANUAL TABS CONTROL PANEL */}
        <div className="flex items-center space-x-4 mt-8 border-t border-neon-orange/15 pt-6 w-full max-w-sm justify-between">
          <button 
            id="testimonial-prev-btn"
            onClick={handlePrev}
            className="p-2 bg-slate-dark/50 hover:bg-neon-orange/10 border border-neon-orange/15 hover:border-neon-orange text-primary rounded-lg transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex space-x-1.5">
            {ALL_TESTIMONIALS.map((_, idx) => (
              <button
                id={`testimonial-dot-${idx}`}
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-6 h-1 rounded-full transition-all cursor-pointer ${idx === activeIndex ? 'bg-neon-orange' : 'bg-slate-dark/40 border border-neon-orange/15 hover:bg-neon-orange/30'}`}
              />
            ))}
          </div>

          <button 
            id="testimonial-next-btn"
            onClick={handleNext}
            className="p-2 bg-slate-dark/50 hover:bg-neon-orange/10 border border-neon-orange/15 hover:border-neon-orange text-primary rounded-lg transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
