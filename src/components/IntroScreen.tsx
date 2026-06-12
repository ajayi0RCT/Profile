import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, ArrowRight } from 'lucide-react';

interface IntroScreenProps {
  onEnter: () => void;
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const [text, setText] = useState('');
  const fullText = 'Building Digital Experiences...';
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (typingIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[typingIndex]);
        setTypingIndex((prev) => prev + 1);
      }, 70);
      return () => clearTimeout(timeout);
    } else {
      setIsDone(true);
    }
  }, [typingIndex]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B1020] overflow-hidden">
      {/* Cinematic Grid & Background Glows */}
      <div className="absolute inset-0 neon-grid opacity-20 pointer-events-none" />
      
      {/* Neon Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#FF6A00] opacity-10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#4DA3FF] opacity-10 blur-[120px] animate-pulse [animation-delay:2s]" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
        {/* Glowing AC Logo */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative mb-10 group"
        >
          {/* Outer glowing halo */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF6A00] to-[#4DA3FF] rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" />
          
          <div className="relative w-28 h-28 glass-panel-heavy rounded-2xl flex items-center justify-center border border-white/20 shadow-glow-white">
            <span className="font-display text-4xl font-extrabold tracking-wider bg-gradient-to-br from-[#FFFFFF] via-[#4DA3FF] to-[#FF6A00] bg-clip-text text-transparent">
              AC
            </span>
          </div>
          
          {/* Decorative floating orbits */}
          <div className="absolute -top-4 -right-4 w-4 h-4 rounded-full bg-[#FF6A00] shadow-neon-orange animate-bounce" />
          <div className="absolute -bottom-2 -left-4 w-3.5 h-3.5 rounded-full bg-[#4DA3FF] shadow-neon-blue animate-bounce [animation-delay:0.7s]" />
        </motion.div>

        {/* Typing Line */}
        <div className="min-h-12 flex items-center justify-center font-mono text-[#4DA3FF] tracking-wider text-sm md:text-base border-r-2 border-[#FF6A00] animate-[#FF6A00] pr-1.5 mb-12">
          <Terminal className="w-4 h-4 mr-2" />
          <span>{text}</span>
        </div>

        {/* Enter Button Action */}
        <AnimatePresence>
          {isDone && (
            <motion.button
              id="enter-portfolio-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={onEnter}
              className="group relative px-8 py-4 glass-panel hover:bg-white/5 font-display text-white tracking-widest text-sm rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 flex items-center space-x-2 border border-white/20 select-none cursor-pointer"
              whileHover={{ borderColor: 'rgba(255, 106, 0, 0.4)' }}
            >
              {/* Animated glowing streak */}
              <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out" />
              
              <span className="font-bold">ENTER PORTFOLIO</span>
              <ArrowRight className="w-4 h-4 text-[#FF6A00] group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Futuristic telemetry display text bottom */}
      <div className="absolute bottom-6 flex justify-between w-full px-8 text-[10px] font-mono text-white/30 tracking-widest">
        <span>SYSTEM: ONLINE (v2.0)</span>
        <span>COORDINATES: SEC_AC//73099</span>
      </div>
    </div>
  );
}
