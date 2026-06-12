import React from 'react';
import { Github, MessageCircle, Instagram, Terminal, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-midnight border-t border-neon-orange/15 py-12 overflow-hidden z-20 text-primary">
      <div className="absolute inset-0 cyber-dots opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-between gap-6 relative z-10">
        
        {/* Core HUD indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full border-b border-neon-orange/15 pb-8 mb-4 gap-6 font-semibold">
          {/* Logo glowing */}
          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-orange to-electric-blue opacity-10 blur absolute" />
            <div className="w-9 h-9 rounded-xl border border-neon-orange/20 flex items-center justify-center font-display font-black text-primary text-sm bg-midnight">
              AC
            </div>
            <div>
              <span className="font-display font-extrabold text-sm text-primary tracking-widest block">AJAYI COVENANT</span>
              <span className="font-mono text-[8px] text-secondary/40 tracking-widest block uppercase">Architectural Digital Layouts</span>
            </div>
          </div>

          {/* Social connections */}
          <div className="flex items-center space-x-4">
            <span className="font-mono text-[9px] text-secondary/40 tracking-widest uppercase hidden md:inline">Neural Pipes:</span>

            {[
              { id: 'git', icon: Github, link: 'https://github.com/ajayicovenant' },
              { id: 'wa', icon: MessageCircle, link: 'https://wa.me/2349033321568' },
              { id: 'ig', icon: Instagram, link: 'https://instagram.com/ajayi_covenant' }
            ].map((social) => (
              <a
                id={`footer-social-${social.id}`}
                key={social.id}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-dark/50 hover:bg-neon-orange/20 border border-neon-orange/20 hover:border-neon-orange text-primary/70 hover:text-primary flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom copyright and metadata signature */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full text-xs font-mono text-secondary/40 gap-4 font-semibold">
          <div className="text-center md:text-left">
            <span>© 2026 AJAYI COVENANT. All matrix coordinates protected.</span>
          </div>
          
          {/* Back to top dynamic button */}
          <button 
            id="scroll-to-top-footer-btn"
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-dark/50 border border-neon-orange/20 hover:border-neon-orange text-primary font-mono text-[9px] rounded-lg transition-all tracking-wider cursor-pointer"
          >
            <span>CHANNEL UP</span>
            <ArrowUp className="w-3.5 h-3.5 text-neon-orange" />
          </button>

          <div className="text-center md:text-right font-bold font-display text-primary text-[11px] tracking-wider">
            Designed &amp; Built by <span className="text-neon-orange">Ajayi Covenant</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
