import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Heart, Target, Eye, Quote } from 'lucide-react';

export default function CreatorStory() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [quote, setQuote] = useState(() => localStorage.getItem('ac_sys_quote') || '“Every great website starts with an idea, not code.”');
  const [whoText, setWhoText] = useState(() => localStorage.getItem('ac_sys_who_text') || 'My name is Ajayi Covenant, an elite digital architect and creative programmer. I craft pixels with complete mechanical accuracy, combining artistic UI philosophies with modern Web API structures to produce online products that hold maximum aesthetic weight.');
  const [whyText, setWhyText] = useState(() => localStorage.getItem('ac_sys_why_text') || 'I discovered that standard websites look identical: uninspiring squares, slow margins, clunky widgets. I saw web engineering not as a simple compilation of files, but as canvas paint. I started coding to give business owners the keys to premium digital universes.');
  const [visionText, setVisionText] = useState(() => localStorage.getItem('ac_sys_vision_text') || 'To transform legacy offline models (such as church registries, tuition calculators, and storefront folders) into hyper-fast high-retention systems, where visitors love to linger, trust the brand instantly, and secure transactions easily.');
  const [missionText, setMissionText] = useState(() => localStorage.getItem('ac_sys_mission_text') || 'Provide client service parameters with 100% Core Web Vital scores, mobile responsive grids, and exquisite interactive custom widgets. No shortcuts, no compromises.');

  useEffect(() => {
    const handleUpdate = () => {
      setQuote(localStorage.getItem('ac_sys_quote') || '“Every great website starts with an idea, not code.”');
      setWhoText(localStorage.getItem('ac_sys_who_text') || 'My name is Ajayi Covenant, an elite digital architect and creative programmer. I craft pixels with complete mechanical accuracy, combining artistic UI philosophies with modern Web API structures to produce online products that hold maximum aesthetic weight.');
      setWhyText(localStorage.getItem('ac_sys_why_text') || 'I discovered that standard websites look identical: uninspiring squares, slow margins, clunky widgets. I saw web engineering not as a simple compilation of files, but as canvas paint. I started coding to give business owners the keys to premium digital universes.');
      setVisionText(localStorage.getItem('ac_sys_vision_text') || 'To transform legacy offline models (such as church registries, tuition calculators, and storefront folders) into hyper-fast high-retention systems, where visitors love to linger, trust the brand instantly, and secure transactions easily.');
      setMissionText(localStorage.getItem('ac_sys_mission_text') || 'Provide client service parameters with 100% Core Web Vital scores, mobile responsive grids, and exquisite interactive custom widgets. No shortcuts, no compromises.');
    };
    window.addEventListener('ac-story-change', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('ac-story-change', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = 400);

    const resizeMatrix = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = 400;
    };

    window.addEventListener('resize', resizeMatrix);

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/_#@';
    const fontSize = 11;
    const columns = Math.floor(width / fontSize);

    const rainDrops: number[] = Array(columns).fill(1).map(() => Math.floor(Math.random() * -100));

    const drawMatrixRain = () => {
      ctx.fillStyle = 'rgba(11, 16, 32, 0.12)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(77, 163, 255, 0.08)'; // Subtle electric blue matrix
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
      animFrame = requestAnimationFrame(drawMatrixRain);
    };

    drawMatrixRain();

    return () => {
      window.removeEventListener('resize', resizeMatrix);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div id="creator-station" className="relative w-full min-h-screen py-20 bg-midnight text-primary overflow-hidden border-t border-neon-orange/15">
      
      {/* Matrix Code Rain Background Panel */}
      <div className="absolute inset-x-0 top-0 h-[400px] pointer-events-none opacity-40 z-0 overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight/80 to-midnight" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Massive displaying quote heading */}
        <div className="max-w-3xl mx-auto text-center mb-20 font-semibold">
          <Quote className="w-10 h-10 text-neon-orange opacity-40 mx-auto mb-4 animate-bounce" />
          <h2 className="font-display text-2xl md:text-4xl font-extrabold italic text-primary tracking-tight leading-relaxed">
            {quote}
          </h2>
          <span className="font-mono text-[10px] text-secondary/40 tracking-widest block uppercase mt-3">— AJAYI COVENANT</span>
        </div>

        {/* CINEMATIC SCROLL STORY SECTIONS */}
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Card 1: Who I Am */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-2xl bg-slate-dark/30 border border-neon-orange/15 hover:border-neon-orange/45 hover:shadow-neon-orange/10 transition-all duration-300 text-left"
          >
            <div className="md:col-span-4 flex justify-center relative group overflow-hidden rounded-xl border border-electric-blue/20 bg-midnight shadow-[0_0_20px_rgba(77,163,255,0.1)] aspect-[4/3] w-full max-w-[260px] md:max-w-none">
              <img
                src="/src/assets/images/digital_architect_1781296069903.jpg"
                alt="Digital Architectural Blueprint Core"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-electric-blue/20 border border-electric-blue/45 text-electric-blue font-mono text-[8px] rounded uppercase font-bold tracking-widest flex items-center space-x-1">
                <span className="w-1 h-1 rounded-full bg-electric-blue animate-ping" />
                <span>CORE_SYS_01</span>
              </div>
            </div>
            <div className="md:col-span-8 space-y-2 font-semibold">
              <span className="font-mono text-[10px] text-electric-blue tracking-widest uppercase block">Identity Core</span>
              <h3 className="font-display text-xl font-bold text-primary">Who I Am</h3>
              <p className="font-sans text-xs sm:text-sm text-secondary/80 leading-relaxed">
                {whoText}
              </p>
            </div>
          </motion.div>

          {/* Card 2: Why I Started Coding */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-2xl bg-slate-dark/30 border border-neon-orange/15 hover:border-neon-orange/45 hover:shadow-neon-orange/10 transition-all duration-300 text-left"
          >
            <div className="md:col-span-4 flex justify-center md:order-last relative shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] to-[#FF6A00] shadow-[0_0_25px_rgba(212,175,55,0.35)] relative group overflow-hidden">
                <img 
                  src="/src/assets/images/covenant_avatar_1781297658135.jpg"
                  alt="Ajayi Covenant Coding"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full border border-midnight transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-85 pointer-events-none" />
                <div className="absolute bottom-2.5 inset-x-0 text-center font-mono text-[7px] text-[#D4AF37] tracking-widest font-extrabold uppercase leading-none">
                  SEC_PILOT_01
                </div>
              </div>
            </div>
            <div className="md:col-span-8 space-y-2 md:order-first font-semibold">
              <span className="font-mono text-[10px] text-neon-orange tracking-widest uppercase block">The Spark</span>
              <h3 className="font-display text-xl font-bold text-primary">Why I Started Coding</h3>
              <p className="font-sans text-xs sm:text-sm text-secondary/80 leading-relaxed">
                {whyText}
              </p>
            </div>
          </motion.div>

          {/* Card 3: My Vision */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 sm:p-8 rounded-2xl bg-slate-dark/30 border border-neon-orange/15 hover:border-neon-orange/45 hover:shadow-neon-orange/10 transition-all duration-300 text-left"
          >
            <div className="md:col-span-3 flex justify-center md:justify-start">
              <div className="w-14 h-14 rounded-full bg-neon-orange/10 flex items-center justify-center text-neon-orange">
                <Eye className="w-7 h-7" />
              </div>
            </div>
            <div className="md:col-span-9 space-y-2 font-semibold">
              <span className="font-mono text-[10px] text-neon-orange tracking-widest uppercase block">Futuristic Vision</span>
              <h3 className="font-display text-xl font-bold text-primary">My Vision</h3>
              <p className="font-sans text-xs sm:text-sm text-secondary/80 leading-relaxed">
                {visionText}
              </p>
            </div>
          </motion.div>

          {/* Card 4: My Mission */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 sm:p-8 rounded-2xl bg-slate-dark/30 border border-neon-orange/15 hover:border-neon-orange/45 hover:shadow-neon-orange/10 transition-all duration-300 text-left"
          >
            <div className="md:col-span-3 flex justify-center md:justify-start md:order-last">
              <div className="w-14 h-14 rounded-full bg-electric-blue/10 flex items-center justify-center text-electric-blue">
                <Target className="w-7 h-7" />
              </div>
            </div>
            <div className="md:col-span-9 space-y-2 md:order-first font-semibold">
              <span className="font-mono text-[10px] text-electric-blue tracking-widest uppercase block">Operational Target</span>
              <h3 className="font-display text-xl font-bold text-primary">My Mission</h3>
              <p className="font-sans text-xs sm:text-sm text-secondary/80 leading-relaxed">
                {missionText}
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
