import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, Globe, MessageSquare, Send, Check, 
  RefreshCw, MessageCircle, Mail, AlertCircle 
} from 'lucide-react';

interface SignalMessage {
  id: string;
  sender: string;
  email: string;
  body: string;
  timestamp: string;
  status: 'transmitting' | 'dispatched' | 'relayed';
}

export default function ConnectionHub() {
  const globeCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Dynamic contact details
  const [contactEmail, setContactEmail] = useState(() => localStorage.getItem('ac_sys_contact_email') || 'ajayicovenant4@gmail.com');
  const [contactWhatsapp, setContactWhatsapp] = useState(() => localStorage.getItem('ac_sys_contact_whatsapp') || '2349033321568');

  useEffect(() => {
    const handleUpdate = () => {
      setContactEmail(localStorage.getItem('ac_sys_contact_email') || 'ajayicovenant4@gmail.com');
      setContactWhatsapp(localStorage.getItem('ac_sys_contact_whatsapp') || '2349033321568');
    };
    window.addEventListener('ac-contact-change', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('ac-contact-change', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Form input variables
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [signalContent, setSignalContent] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [systemLogs, setSystemLogs] = useState<string[]>([
    'SYSTEM ENGINE COVENANT BOOTED.',
    'AWAITING NEURAL COORD SIGNALS...'
  ]);

  // Transmitted signals lists
  const [signalLogs, setSignalLogs] = useState<SignalMessage[]>([]);

  useEffect(() => {
    // Load sent signals from localStorage
    const saved = localStorage.getItem('ac_transmitted_signals');
    if (saved) {
      try {
        setSignalLogs(JSON.parse(saved));
      } catch (err) {
        console.error('Error loading signals', err);
      }
    }
  }, []);

  // 3D wireframe globe renderer loop
  useEffect(() => {
    const canvas = globeCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 280);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 280);

    const resizeGlobe = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 280;
      height = canvas.height = canvas.parentElement?.clientHeight || 280;
    };

    window.addEventListener('resize', resizeGlobe);

    // Geometry points of globe
    const radius = Math.min(width, height) * 0.42;
    const center = { x: width / 2, y: height / 2 };
    let rotationAngle = 0;

    // Build 3D grid nodes
    const latPoints = 9;
    const longPoints = 12;
    const nodes: Array<{ x3d: number; y3d: number; z3d: number }> = [];

    for (let i = 0; i < latPoints; i++) {
      const lat = (Math.PI * (i + 1)) / (latPoints + 1) - Math.PI / 2;
      for (let j = 0; j < longPoints; j++) {
        const lon = (2 * Math.PI * j) / longPoints;
        nodes.push({
          x3d: radius * Math.cos(lat) * Math.cos(lon),
          y3d: radius * Math.sin(lat),
          z3d: radius * Math.cos(lat) * Math.sin(lon)
        });
      }
    }

    const drawGlobe = () => {
      ctx.clearRect(0, 0, width, height);
      rotationAngle += 0.0035;

      const cosRot = Math.cos(rotationAngle);
      const sinRot = Math.sin(rotationAngle);

      // Projects 3D points onto 2D Canvas plane
      const projected: Array<{ x: number; y: number; z: number; originalIdx: number }> = [];

      nodes.forEach((node, idx) => {
        // Rotate around Y-axis
        const xRot = node.x3d * cosRot - node.z3d * sinRot;
        const zRot = node.x3d * sinRot + node.z3d * cosRot;

        // Simple orthogonal coordinate mapper
        projected.push({
          x: center.x + xRot,
          y: center.y + node.y3d,
          z: zRot,
          originalIdx: idx
        });
      });

      // Draw grid lines between connected latitude nodes
      ctx.lineWidth = 0.55;
      ctx.strokeStyle = 'rgba(77, 163, 255, 0.1)';

      for (let i = 0; i < latPoints; i++) {
        const offset = i * longPoints;
        ctx.beginPath();
        for (let j = 0; j < longPoints; j++) {
          const pt = projected[offset + j];
          // Simple depth backface check for subtle styling
          if (pt.z >= 0) {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Draw longitudinal connecting line tracks
      for (let j = 0; j < longPoints; j++) {
        ctx.beginPath();
        for (let i = 0; i < latPoints; i++) {
          const pt = projected[i * longPoints + j];
          if (pt.z >= 0) {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();
      }

      // Draw nodes
      projected.forEach((pt) => {
        if (pt.z >= 0) { // front face
          const size = Math.max(1, (pt.z / radius) * 2.5 + 1);

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
          // Accent glow coordinate markers on points
          if (pt.originalIdx % 14 === 0) {
            ctx.fillStyle = '#FF6A00';
            ctx.shadowBlur = 6;
            ctx.shadowColor = '#FF6A00';
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            ctx.fillStyle = 'rgba(255,255,255, 0.4)';
            ctx.fill();
          }
        }
      });

      animFrame = requestAnimationFrame(drawGlobe);
    };

    drawGlobe();

    return () => {
      window.removeEventListener('resize', resizeGlobe);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  // Dispatch custom message action
  const handleSendSignal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !signalContent) return;

    setIsTransmitting(true);
    setSystemLogs((prev) => [...prev, `INITIATING PORT RELAY STREAM FOR [${senderName.toUpperCase()}]...`]);

    setTimeout(() => {
      const timestamp = new Date().toLocaleTimeString();
      const newSignal: SignalMessage = {
        id: `sig_${Date.now().toString().slice(-6)}`,
        sender: senderName,
        email: senderEmail,
        body: signalContent,
        timestamp,
        status: 'dispatched'
      };

      const updated = [newSignal, ...signalLogs];
      setSignalLogs(updated);
      localStorage.setItem('ac_transmitted_signals', JSON.stringify(updated));

      // Trigger success sequence
      setIsTransmitting(false);
      setIsSuccess(true);
      setSystemLogs((prev) => [
        ...prev, 
        `SIGNAL DISPATCHED SUCCESSFULLY: ${newSignal.id.toUpperCase()}`,
        `SECURE ENVELOPE ROUTED EN ROUTE TO COVENANT.`
      ]);

      // Reset fields
      setSenderName('');
      setSenderEmail('');
      setSignalContent('');

      // Auto clear success indicator
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

    }, 2000);
  };

  const getWhatsAppLink = () => {
    const defaultText = `Hello Ajayi Covenant, I found your gorgeous high-tech portfolio and would love to chat about a custom digital project! Message channel active.`;
    return `https://wa.me/${contactWhatsapp}?text=${encodeURIComponent(defaultText)}`;
  };

  return (
    <div id="contact-station" className="relative w-full min-h-screen py-20 bg-midnight text-primary overflow-hidden border-t border-neon-orange/15">
      {/* Background stardust stars */}
      <div className="absolute inset-0 cyber-dots opacity-20 pointer-events-none" />
      
      {/* Top section divider decorative flows */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-blue-900/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-neon-orange/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-slate-dark/50 border border-neon-orange/20 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest text-neon-orange uppercase mb-4 font-bold">
            <Terminal className="w-3.5 h-3.5 text-neon-orange" />
            <span>Neural Connection Hub</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-2 leading-tight">
            Neural <span className="bg-gradient-to-r from-primary to-electric-blue bg-clip-text text-transparent">Connection</span>
          </h2>
          <h3 className="font-display text-neon-orange text-lg sm:text-2xl font-bold tracking-tight mt-2">
            “Send a signal. I will respond.”
          </h3>
        </div>

        {/* SYSTEM INTERFACE GRID CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* LEFT COLUMN: 3D Globe Monitor and Quick Connection pipes */}
          <div className="lg:col-span-5 bg-slate-dark/30 border border-neon-orange/15 rounded-2xl hover:border-neon-orange/45 hover:shadow-neon-orange/10 transition-all duration-300 p-6 md:p-8 flex flex-col justify-between items-center relative overflow-hidden min-h-[440px]">
            <div className="absolute inset-0 cyber-dots opacity-[0.25] pointer-events-none" />

            {/* Monitoring Telemetry Header */}
            <div className="flex justify-between items-center w-full text-xs font-mono text-secondary/40 border-b border-neon-orange/15 pb-3 font-semibold">
              <span>GLOBE_COORD_ACTIVE</span>
              <span className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-orange animate-ping" />
                <span>RELAY_ONLINE</span>
              </span>
            </div>

            {/* Canvas wireframe globe */}
            <div className="relative w-full aspect-square max-w-[260px] flex items-center justify-center my-6">
              <canvas ref={globeCanvasRef} className="w-full h-full block" />
              {/* Pulsing indicator tag inside globe */}
              <div className="absolute top-[48%] left-[48%] w-3 h-3 rounded-full bg-neon-orange shadow-neon-orange animate-pulse" />
            </div>

            {/* Direct Connect Options */}
            <div className="w-full space-y-4 border-t border-neon-orange/15 pt-6 font-semibold">
              <span className="text-[10px] font-mono text-secondary/50 tracking-wider block mb-1 uppercase">Direct Signal Streams:</span>
              
              <div className="grid grid-cols-2 gap-4">
                {/* 1. WhatsApp Connection */}
                <a
                  id="direct-whatsapp-pipe"
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-2 p-3 bg-slate-dark/50 border border-neon-orange/20 hover:border-neon-orange text-neon-orange font-mono text-[11px] font-semibold rounded-xl tracking-wider transition-all hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-neon-orange" />
                  <span>WHATSAPP PIPELINE</span>
                </a>

                {/* 2. Email Connection */}
                <a
                  id="direct-email-pipe"
                  href={`mailto:${contactEmail}?subject=Custom%20Web%20Project%20Signal`}
                  className="flex items-center justify-center space-x-2 p-3 bg-slate-dark/50 border border-neon-orange/20 hover:border-neon-orange text-electric-blue font-mono text-[11px] font-semibold rounded-xl tracking-wider transition-all hover:scale-105 active:scale-95"
                >
                  <Mail className="w-4 h-4 text-electric-blue" />
                  <span>EMAIL STREAM</span>
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Terminal Input Deck */}
          <div className="lg:col-span-7 bg-slate-dark/30 border border-neon-orange/15 rounded-2xl hover:border-neon-orange/45 hover:shadow-neon-orange/10 transition-all duration-300 p-6 md:p-8 flex flex-col justify-between overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 cyber-dots opacity-[0.15] pointer-events-none" />

            <div className="space-y-6">
              <div className="flex justify-between items-center text-xs font-mono text-neon-orange border-b border-neon-orange/15 pb-3 font-semibold">
                <span className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-neon-orange" />
                  <span>INPUT DIRECT MODULE SIGNAL</span>
                </span>
                <span>SECURE SSL v3.0</span>
              </div>

              {/* Form panel */}
              <form onSubmit={handleSendSignal} className="space-y-4 text-left font-semibold">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-secondary/60 block">SENDER NAME [TEXT]:</label>
                    <input 
                      type="text" 
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      required
                      placeholder="e.g. David Adeleke"
                      className="w-full bg-midnight/60 border border-neon-orange/20 focus:border-neon-orange rounded-xl px-4 py-3 font-mono text-xs text-primary placeholder-secondary/35 outline-none transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-secondary/60 block">EMAIL COORD [SMTP]:</label>
                    <input 
                      type="email" 
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      required
                      placeholder="e.g. client@domain.com"
                      className="w-full bg-midnight/60 border border-neon-orange/20 focus:border-neon-orange rounded-xl px-4 py-3 font-mono text-xs text-primary placeholder-secondary/35 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Message body */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-secondary/60 block">SIGNAL STREAM CONTENT [PACKET BODY]:</label>
                  <textarea 
                    value={signalContent}
                    onChange={(e) => setSignalContent(e.target.value)}
                    required
                    rows={4}
                    placeholder="Input details of your custom project vision, delivery requirements, or quick greetings..."
                    className="w-full bg-midnight/60 border border-neon-orange/20 focus:border-neon-orange rounded-xl px-4 py-3 font-sans text-xs text-primary placeholder-secondary/35 outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit button with loader */}
                <button
                  id="transmit-signal-btn"
                  type="submit"
                  disabled={isTransmitting}
                  className="w-full py-4 bg-neon-orange hover:bg-neon-orange/80 text-black font-display text-xs font-black tracking-widest rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:scale-100 uppercase"
                >
                  {isTransmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                      <span>TRANSMITTING SIGNAL DATA...</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>SIGNAL ENVELOPE ROUTED</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-black" />
                      <span>TRANSMIT SIGNAL</span>
                    </>
                  )}
                </button>
              </form>

              {/* Dynamic Transmission History Panel */}
              <AnimatePresence>
                {signalLogs.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3 pt-4 border-t border-neon-orange/15 text-left font-semibold"
                  >
                    <span className="font-mono text-[9px] text-electric-blue tracking-wider block uppercase">Transmission Logs Stream (Persistent):</span>
                    <div className="max-h-[120px] overflow-y-auto space-y-2 pr-2">
                      {signalLogs.map((log) => (
                        <div key={log.id} className="p-3 bg-midnight/60 rounded-lg border border-neon-orange/15 font-mono text-[10px] text-primary/80 flex justify-between items-start gap-2">
                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-1.5">
                              <span className="font-bold text-neon-orange uppercase font-display">{log.id}</span>
                              <span className="text-secondary/40">|</span>
                              <span className="text-electric-blue">{log.sender}</span>
                            </div>
                            <p className="text-[10px] text-secondary/50 pr-4 font-sans line-clamp-1">{log.body}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="px-1.5 py-0.5 bg-green-500/10 text-emerald-400 border border-green-500/25 rounded text-[8px] font-bold tracking-wide uppercase">
                              dispatched
                            </span>
                            <span className="block text-[8px] text-secondary/30 mt-1">{log.timestamp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Static HUD diagnostics output */}
            <div className="border-t border-neon-orange/15 pt-4 flex flex-col md:flex-row justify-between text-[8px] font-mono text-secondary/40 mt-6 sm:mt-10 tracking-wider gap-2">
              <div className="space-y-0.5">
                {systemLogs.slice(-2).map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-1">
                    <span className="text-neon-orange">&gt;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="text-left md:text-right font-semibold">
                <div>CH_IP: 234.903.332</div>
                <div>SIGNAL_STABLE: SEC_009912</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
