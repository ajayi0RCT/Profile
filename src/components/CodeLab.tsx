import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ALL_SKILLS } from '../data';
import { Skill } from '../types';
import { Terminal, Cpu, Info, RefreshCw, Zap } from 'lucide-react';

const CODING_SNIPPETS: Record<string, { code: string; language: string }> = {
  html: {
    language: 'html',
    code: `<!-- HTML5 Semantic Core Structure -->
<header id="covenant-header">
  <nav class="navigation-grid">
    <a href="#home">Ajayi Covenant</a>
    <ul class="nav-links">
      <li><a href="#work">Code Labs</a></li>
      <li><a href="#story">Bio Matrix</a></li>
    </ul>
  </nav>
</header>

<main class="viewport-canvas">
  <article class="hero-module">
    <h1>Holographic Solutions</h1>
    <p>Engineered for speed & accessible SEO.</p>
  </article>
</main>`
  },
  css: {
    language: 'css',
    code: `/* Tailwind CSS & Custom Animation Framework */
@layer theme {
  :root {
    --gold-primary: #D4AF37;
    --midnight-black: #050508;
    --pure-white: #FFFFFF;
  }
}

.white-and-gold-hud {
  background-color: var(--pure-white);
  color: var(--midnight-black);
  border: 2px solid var(--gold-primary);
  box-shadow: 0 0 25px rgba(212, 175, 55, 0.35);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}`
  },
  js: {
    language: 'typescript',
    code: `// Modern JS / TypeScript State & Control Flow
import { useState, useEffect } from 'react';

export function useCovenantMatrix(channelId: string) {
  const [signalActive, setSignalActive] = useState(false);

  useEffect(() => {
    const pipe = new AudioContext();
    console.log('[HUD] Audio pipeline connected.');
    setSignalActive(true);
    return () => pipe.close();
  }, [channelId]);

  return { signalActive };
}`
  },
  uiux: {
    language: 'json',
    code: `{
  "designSystem": "Covenant Gold Suite",
  "mood": "Luxury / Swiss / Architectural",
  "typography": {
    "display": "Space Grotesk (Bold)",
    "body": "Inter",
    "monospace": "JetBrains Mono"
  },
  "tokens": {
    "background": "#FFFFFF",
    "mainText": "#000000",
    "accentGold": "#D4AF37"
  }
}`
  },
  git: {
    language: 'bash',
    code: `# Git Version Control Pipeline Actions
$ git checkout -b refactor/gold-hud
$ git add src/components/CodeLab.tsx
$ git commit -m "feat: design white background HUD screen"
$ git merge main --allow-unrelated-histories
$ git push origin production-grid

# System Status Info
[OK] deployment routed successfully.`
  }
};

const IDLE_SNIPPET = {
  language: 'typescript',
  code: `// REACTOR MATRIX IDLE PROTOCOL
// Hover to inject stream data...

import { CovenantSystem } from './core';

const portal = new CovenantSystem({
  identity: "Ajayi Covenant",
  encryption: "SSL_AES_256",
  status: "WAITING_REACTOR"
});

portal.listen((signal) => {
  if (signal) {
    status.update("PROCESSING_DATA");
  }
});`
};

function highlightCode(code: string, language: string) {
  return code.split('\n').map((line, lineIdx) => {
    if (
      line.trim().startsWith('//') || 
      line.trim().startsWith('<!--') || 
      line.trim().startsWith('/*') || 
      line.trim().startsWith('* ') || 
      line.trim().endsWith('*/') || 
      line.trim().startsWith('#') ||
      (line.trim().startsWith('[') && line.trim().endsWith(']'))
    ) {
      return (
        <div key={lineIdx} className="font-mono text-[10px] leading-relaxed text-stone-400 italic flex">
          <span className="select-none text-stone-300 mr-3 inline-block w-4 text-right shrink-0">{(lineIdx + 1)}</span>
          <span className="break-all">{line}</span>
        </div>
      );
    }
    
    const keywords = [
      'const', 'let', 'var', 'import', 'from', 'export', 'function', 'return', 'class', 'default', 'interface',
      'header', 'nav', 'ul', 'li', 'h1', 'p', 'main', 'article', 'section', 'a', 'div',
      'git', 'checkout', 'add', 'commit', 'merge', 'push', 'status'
    ];
    
    const parts = line.split(/(\s+|=|{|}|\[|\]|<|>|\(|\)|"|'|:|;|,|\/|\.)/);
    
    const tokens = parts.map((part, i) => {
      if (!part) return null;
      
      if (keywords.includes(part.trim())) {
        return <span key={i} className="text-[#AA7C11] font-bold">{part}</span>;
      }
      
      if (part.startsWith('"') || part.endsWith('"') || part.startsWith("'") || part.endsWith("'")) {
        return <span key={i} className="text-amber-700 font-semibold">{part}</span>;
      }
      
      if (['<', '>', '{', '}', '[', ']', '(', ')', '=', ':', ';', ',', '.'].includes(part.trim())) {
        return <span key={i} className="text-[#D4AF37] font-semibold">{part}</span>;
      }
      
      if (/^\d+$/.test(part.trim())) {
        return <span key={i} className="text-amber-600 font-bold">{part}</span>;
      }
      
      return <span key={i} className="text-stone-900">{part}</span>;
    });

    return (
      <div key={lineIdx} className="font-mono text-[10px] leading-relaxed whitespace-pre flex text-left">
        <span className="select-none text-stone-400 mr-3 inline-block w-4 text-right text-[9px] shrink-0">{(lineIdx + 1)}</span>
        <span className="break-all">{tokens}</span>
      </div>
    );
  });
}

export default function CodeLab() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem('ac_sys_skills');
    return saved ? JSON.parse(saved) : ALL_SKILLS;
  });

  React.useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem('ac_sys_skills');
      if (saved) {
        setSkills(JSON.parse(saved));
      } else {
        setSkills(ALL_SKILLS);
      }
    };
    window.addEventListener('ac-skills-change', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('ac-skills-change', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return (
    <div id="codelab-station" className="relative w-full min-h-screen py-20 bg-midnight text-primary overflow-hidden border-t border-neon-orange/15">
      {/* Background patterns */}
      <div className="absolute inset-0 cyber-dots opacity-[0.25] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-neon-orange/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-slate-dark/50 border border-neon-orange/20 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest text-electric-blue uppercase mb-4">
            <Cpu className="w-3.5 h-3.5 text-electric-blue animate-pulse" />
            <span>Futuristic Machine Room</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
            Skills <span className="bg-gradient-to-r from-primary to-neon-orange bg-clip-text text-transparent">Code Lab</span>
          </h2>
          <p className="font-mono text-xs text-secondary mt-2 max-w-sm mx-auto tracking-wider font-semibold">
            Position cursor over any reacting energy core to channel the skill data logs.
          </p>
        </div>

        {/* MACHINE LAB PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT PANEL: Reactor Stations */}
          <div className="lg:col-span-8 glass-panel rounded-2xl border border-neon-orange/20 hover:border-neon-orange/45 hover:shadow-neon-orange/10 p-6 md:p-8 flex flex-col justify-between transition-all duration-300">
            <div className="flex justify-between items-center text-xs font-mono text-secondary/50 border-b border-neon-orange/15 pb-4 mb-8">
              <span>SYSTEM: CORE_MATRIX_STABLE</span>
              <span>REACTOR FUEL LOADED ({skills.length}/{skills.length})</span>
            </div>

            {/* Reactors Row Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {skills.map((skill) => {
                const isHovered = activeSkill?.id === skill.id;

                return (
                  <div
                    key={skill.id}
                    onMouseEnter={() => setActiveSkill(skill)}
                    onMouseLeave={() => setActiveSkill(null)}
                    className="relative flex flex-col items-center justify-between p-6 bg-slate-dark/40 border border-neon-orange/15 hover:border-neon-orange/40 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-neon-orange/5 group select-none cursor-crosshair"
                  >
                    
                    {/* Reacting Energy Core Sphere */}
                    <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                      
                      {/* Pulsing Back Glow Aura */}
                      <div 
                        className="absolute inset-2 rounded-full blur-lg opacity-20 group-hover:opacity-60 transition-all duration-500 scale-100 group-hover:scale-125"
                        style={{ backgroundColor: skill.glowColor }}
                      />

                      {/* Rotating Outer Radar ring */}
                      <div 
                        className={`absolute inset-0 border border-dashed border-white/10 rounded-full ${
                          isHovered ? 'animate-spin-fast border-white/30' : 'animate-spin-slow'
                        }`}
                      />

                      {/* Rotating Mid wave orbit */}
                      <div 
                        className={`absolute inset-2.5 border border-[#4DA3FF]/5 rounded-full ${
                          isHovered ? 'animate-spin-reverse-fast border-neon-orange/20' : 'animate-spin-reverse-slow'
                        }`}
                      />

                      {/* Concentric Center Energy core */}
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center relative shadow-inner transition-all duration-300 border"
                        style={{ 
                          borderColor: isHovered ? skill.glowColor : 'rgba(255,255,255,0.08)',
                          boxShadow: isHovered ? `0 0 20px ${skill.glowColor}` : 'none',
                          background: `radial-gradient(circle, ${skill.glowColor}22 0%, var(--color-midnight) 80%)`
                        }}
                      >
                        <Zap 
                          className="w-4 h-4 transition-colors"
                          style={{ color: isHovered ? 'var(--text-primary)' : 'var(--color-electric-blue)' }}
                        />
                      </div>

                      {/* Animated float items */}
                      {isHovered && (
                        <>
                          <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-neon-orange animate-ping" />
                          <span className="absolute bottom-2 left-1.5 w-1.5 h-1.5 rounded-full bg-electric-blue" />
                        </>
                      )}
                    </div>

                    {/* Skill core footer labels */}
                    <div className="text-center">
                      <span className="font-display font-bold text-sm text-primary/95 group-hover:text-primary transition-colors block">
                        {skill.id.toUpperCase()} Reactor
                      </span>
                      <span className="font-mono text-[9px] text-electric-blue tracking-wider uppercase block mt-1">
                        Active Intensity: {skill.level}%
                      </span>
                    </div>

                    {/* Telemetry coordinate line */}
                    <div className="w-full bg-neon-orange/10 h-[1.5px] rounded-full overflow-hidden mt-4">
                      <div 
                        className="h-full bg-gradient-to-r transition-all duration-500"
                        style={{ 
                          width: `${skill.level}%`,
                          backgroundImage: `linear-gradient(to right, var(--color-electric-blue), ${skill.glowColor})`
                        }}
                      />
                    </div>

                  </div>
                );
              })}
            </div>

            <div className="flex items-center space-x-2 text-secondary/50 text-[9px] font-mono tracking-widest mt-8 border-t border-neon-orange/15 pt-4">
              <RefreshCw className="w-3.5 h-3.5 animate-spin-slow text-neon-orange" />
              <span>COVENANT_SIGNAL_FLOW // FULLY INTEGRATED SYSTEM</span>
            </div>
          </div>

          {/* RIGHT PANEL: Live HUD Command Output logs */}
          <div className="lg:col-span-4 bg-white text-stone-900 border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] rounded-2xl p-6 relative flex flex-col justify-between overflow-hidden transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#D4AF37]/10 to-transparent blur-xl pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center space-x-2 border-b border-stone-200 pb-3">
                <Terminal className="w-4 h-4 text-[#AA7C11]" />
                <span className="font-mono text-[10px] text-stone-600 font-bold tracking-wider">HOLOGRAPHIC_HUD.log</span>
                <span className="ml-auto px-1.5 py-0.5 text-[8px] bg-[#D4AF37]/15 text-[#AA7C11] border border-[#D4AF37]/35 rounded font-mono font-bold animate-pulse">CODING_MODE</span>
              </div>

              <div className="space-y-4 text-left">
                {/* Module title/state in gold and black */}
                <div>
                  <span className="font-mono text-[9px] text-[#AA7C11] tracking-widest uppercase block font-bold">
                    {activeSkill ? 'Selected Module' : 'System State'}
                  </span>
                  <h3 className="font-display text-base font-extrabold text-stone-950 mt-1 leading-tight flex items-center justify-between">
                    <span>{activeSkill ? activeSkill.name : 'REACTOR_MATRIX_STANDBY'}</span>
                    {activeSkill && <span className="font-mono text-[9px] font-bold text-[#AA7C11]">[{activeSkill.id.toUpperCase()}]</span>}
                  </h3>
                </div>

                {/* Interactive Syntax-highlighted coding block with Gold, Black and White */}
                <div className="relative bg-stone-50 border border-[#D4AF37]/25 rounded-xl p-4 overflow-x-auto max-h-[310px] shadow-inner select-all min-h-[160px]">
                  <div className="absolute bottom-1 right-2 text-[8px] font-mono text-stone-300 uppercase pointer-events-none tracking-widest leading-none font-bold">
                    COVENANT HUD v3.0
                  </div>
                  <div className="space-y-0.5">
                    {activeSkill 
                      ? highlightCode(CODING_SNIPPETS[activeSkill.id]?.code || '', CODING_SNIPPETS[activeSkill.id]?.language || 'typescript')
                      : highlightCode(IDLE_SNIPPET.code, IDLE_SNIPPET.language)
                    }
                  </div>
                </div>

                {/* Additional metrics, matching elegant white & gold template */}
                <div className="grid grid-cols-2 gap-3 font-mono text-[9px]">
                  <div className="p-3 bg-stone-50 rounded-xl border border-[#D4AF37]/15 text-stone-800">
                    <span className="text-stone-500 block">PULSE:</span>
                    <span className="text-stone-950 font-bold block mt-0.5 uppercase tracking-wide">
                      {activeSkill ? activeSkill.pulseSpeed : 'STABLE_ORBIT'}
                    </span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-[#D4AF37]/15 text-stone-800">
                    <span className="text-stone-500 block">STATUS:</span>
                    <span className={`font-bold block mt-0.5 ${activeSkill ? 'text-[#AA7C11]' : 'text-stone-400'}`}>
                      {activeSkill ? 'RUNNING' : 'STANDBY'}
                    </span>
                  </div>
                </div>

                {activeSkill && (
                  <div className="border border-[#D4AF37]/15 bg-stone-50 rounded-xl p-3 space-y-1">
                    <div className="flex justify-between text-[8px] font-mono text-stone-400">
                      <span>METRIC DATA:</span>
                      <span>STREAM_STABLE</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-900 text-[10px] font-semibold">
                      <span>INTELLIGENCE LOAD</span>
                      <span className="text-[#AA7C11] font-mono font-extrabold">{activeSkill.level}% LOAD</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Futuristic terminal metrics indicators at the bottom */}
            <div className="border-t border-stone-200 pt-4 text-[8.5px] font-mono text-stone-400 mt-6 tracking-widest text-left space-y-1 font-semibold">
              <div className="flex justify-between">
                <span>ADDR_LOAD: SECTOR_SKILL_PORTFOLIO</span>
                <span className="text-[#AA7C11]">OK</span>
              </div>
              <div className="flex justify-between">
                <span>MATRIX_RUN: INTEL_CORE_COVENANT</span>
                <span>SEC_01</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
