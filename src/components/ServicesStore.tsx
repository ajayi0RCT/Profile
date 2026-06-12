import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_SERVICES } from '../data';
import { Service } from '../types';
import { 
  ShoppingBag, Sparkles, Layout, Briefcase, Heart, 
  GraduationCap, Zap, CheckCircle2, ChevronRight, X, PhoneCall 
} from 'lucide-react';

export default function ServicesStore() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [fastTrack, setFastTrack] = useState(false);
  const [withCopywriting, setWithCopywriting] = useState(false);
  const [extraRevisions, setExtraRevisions] = useState(false);
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('ac_sys_services');
    return saved ? JSON.parse(saved) : ALL_SERVICES;
  });

  React.useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem('ac_sys_services');
      if (saved) {
        setServices(JSON.parse(saved));
      } else {
        setServices(ALL_SERVICES);
      }
    };
    window.addEventListener('ac-services-change', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('ac-services-change', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Icon mapping helper
  const getIcon = (name: string, color: string) => {
    const props = { className: 'w-5 h-5', style: { color } };
    switch (name) {
      case 'Layout': return <Layout {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      default: return <Layout {...props} />;
    }
  };

  // Dynamic price calculation helper based on selections
  const calculatePrice = (baseRange: string) => {
    // Extract base minimum number
    const numbers = baseRange.replace(/[^0-9-]/g, '').split('-');
    let minPrice = parseInt(numbers[0]) || 500;
    let maxPrice = parseInt(numbers[1]) || 1500;

    if (fastTrack) {
      minPrice += 150;
      maxPrice += 300;
    }
    if (withCopywriting) {
      minPrice += 100;
      maxPrice += 200;
    }
    if (extraRevisions) {
      minPrice += 50;
      maxPrice += 100;
    }

    return `$${minPrice} - $${maxPrice}`;
  };

  const getWhatsAppLink = (service: Service) => {
    const calculated = calculatePrice(service.priceRange);
    const textMessage = `Hello Ajayi Covenant, I would like to order/inquire about your "${service.title}" service.
    
Service: ${service.title}
Estimated Price Range: ${calculated}
Fast Delivery Priority: ${fastTrack ? 'Yes (+150$)' : 'Standard'}
Premium Copywriting: ${withCopywriting ? 'Yes' : 'No'}
Unlimited Development Revisions: ${extraRevisions ? 'Yes' : 'No'}

Please let me know when we can connect!`;

    return `https://wa.me/2349033321568?text=${encodeURIComponent(textMessage)}`;
  };

  return (
    <div id="services-station" className="relative w-full min-h-screen py-20 bg-midnight text-primary overflow-hidden border-t border-neon-orange/15">
      {/* Background neon grids */}
      <div className="absolute inset-0 neon-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-neon-orange/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-electric-blue/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-slate-dark/50 border border-neon-orange/20 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest text-neon-orange uppercase mb-4 font-bold">
            <ShoppingBag className="w-3.5 h-3.5 text-neon-orange" />
            <span>Premium Digital Services Store</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
            Digital <span className="bg-gradient-to-r from-primary to-electric-blue bg-clip-text text-transparent">Store</span>
          </h2>
          <p className="font-mono text-xs text-secondary/60 mt-2 max-w-sm mx-auto tracking-wider font-semibold">
            Select a service panel in 3D outer space projection to configure delivery files.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              id={`service-card-${service.id}`}
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 rounded-2xl bg-slate-dark/30 hover:bg-slate-dark/45 border border-neon-orange/15 hover:border-neon-orange/45 hover:shadow-neon-orange/10 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle top decoration corner */}
              <div 
                className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl opacity-10 pointer-events-none blur-xl"
                style={{ backgroundImage: `linear-gradient(to bottom left, ${service.color}, transparent)` }}
              />

              <div className="space-y-4 text-left">
                {/* Icon Circle */}
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-neon-orange/20 shadow-lg bg-slate-dark/50"
                >
                  {getIcon(service.iconName, service.color)}
                </div>

                {/* Listing Details */}
                <div>
                  <h3 className="font-display text-base font-bold text-primary tracking-tight leading-tight uppercase">
                    {service.title}
                  </h3>
                  <p className="font-sans text-xs text-secondary leading-relaxed min-h-[50px] mt-2.5">
                    {service.description}
                  </p>
                </div>

                {/* Bullet parameters */}
                <ul className="space-y-2 border-t border-neon-orange/15 pt-4">
                  {service.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2 text-[11px] font-sans text-primary/85">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neon-orange shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Purchase specs strip */}
              <div className="mt-6 pt-4 border-t border-neon-orange/15 flex items-center justify-between font-semibold">
                <div>
                  <span className="font-mono text-[9px] text-secondary/40 tracking-widest block uppercase font-bold">Estimated Pool</span>
                  <span className="font-display font-black text-primary text-sm">{service.priceRange}</span>
                </div>
                <button
                  id={`order-btn-${service.id}`}
                  onClick={() => {
                    setSelectedService(service);
                    setFastTrack(false);
                    setWithCopywriting(false);
                    setExtraRevisions(false);
                  }}
                  className="px-4 py-2 bg-slate-dark/50 hover:bg-neon-orange hover:text-black border border-neon-orange/20 hover:border-neon-orange font-display text-[10px] tracking-wider rounded-lg transition-all flex items-center space-x-1 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>ORDER INQUIRY</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* ORDER CONFIGURATOR / INQUIRY OVERLAY */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
            >
              <div className="absolute inset-0 neon-grid opacity-15" />

              <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                className="relative w-full max-w-lg bg-slate-dark/95 backdrop-blur-md rounded-2xl border border-neon-orange/20 overflow-hidden shadow-neon-orange/10 text-left p-6 sm:p-8"
              >
                
                {/* Header detail */}
                <div className="flex justify-between items-start border-b border-neon-orange/15 pb-4 mb-6">
                  <div>
                    <span className="font-mono text-[9px] text-electric-blue tracking-wider uppercase block font-bold">Order Configurator</span>
                    <h3 className="font-display text-lg font-bold text-primary mt-1 uppercase">{selectedService.title}</h3>
                  </div>
                  <button
                    id="close-order-modal"
                    onClick={() => setSelectedService(null)}
                    className="p-1.5 hover:bg-neon-orange/10 rounded-lg text-primary/70 hover:text-primary transition-all border border-neon-orange/15 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Interactive configuration check options */}
                <div className="space-y-4">
                  <span className="font-mono text-[9px] text-secondary/55 uppercase tracking-widest block mb-1 font-bold">Tailor Delivery Speeds:</span>
                  
                  {/* Option 1: Fast Track */}
                  <label className="flex items-center justify-between p-3.5 bg-slate-dark/40 rounded-xl border border-neon-orange/15 hover:border-neon-orange/40 transition-all cursor-pointer">
                    <div className="flex items-center space-x-3 pr-2">
                      <input 
                        type="checkbox" 
                        checked={fastTrack}
                        onChange={(e) => setFastTrack(e.target.checked)}
                        className="accent-neon-orange w-4 h-4 cursor-pointer"
                      />
                      <div>
                        <span className="font-display font-semibold text-xs text-primary block">Accelerate Delivery Priority</span>
                        <span className="text-[10px] text-secondary/70 font-sans block max-w-xs mt-0.5">Cuts normal production timeline down by 35-50% (+ $150).</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-neon-orange font-bold">+$150</span>
                  </label>

                  {/* Option 2: Copywriting */}
                  <label className="flex items-center justify-between p-3.5 bg-slate-dark/40 rounded-xl border border-neon-orange/15 hover:border-neon-orange/40 transition-all cursor-pointer">
                    <div className="flex items-center space-x-3 pr-2">
                      <input 
                        type="checkbox" 
                        checked={withCopywriting}
                        onChange={(e) => setWithCopywriting(e.target.checked)}
                        className="accent-neon-orange w-4 h-4 cursor-pointer"
                      />
                      <div>
                        <span className="font-display font-semibold text-xs text-primary block">Premium Sales SEO Copywriting</span>
                        <span className="text-[10px] text-secondary/70 font-sans block max-w-xs mt-0.5">High-impact, engaging headlines to drive extreme conversion (+ $100).</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-neon-orange font-bold">+$100</span>
                  </label>

                  {/* Option 3: Extra Revisions */}
                  <label className="flex items-center justify-between p-3.5 bg-slate-dark/40 rounded-xl border border-neon-orange/15 hover:border-neon-orange/40 transition-all cursor-pointer">
                    <div className="flex items-center space-x-3 pr-2">
                      <input 
                        type="checkbox" 
                        checked={extraRevisions}
                        onChange={(e) => setExtraRevisions(e.target.checked)}
                        className="accent-neon-orange w-4 h-4 cursor-pointer"
                      />
                      <div>
                        <span className="font-display font-semibold text-xs text-primary block">Unlimited Revisions Support</span>
                        <span className="text-[10px] text-secondary/70 font-sans block max-w-xs mt-0.5">Continuous development modification checks until 100% happy (+ $50).</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-neon-orange font-bold">+$50</span>
                  </label>
                </div>

                {/* Final calculated estimation summary */}
                <div className="mt-6 p-4 bg-midnight/70 border border-neon-orange/15 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[9px] text-secondary/60 block font-bold">ESTIMATED PRICE RANGE:</span>
                    <span className="font-display text-lg font-black text-neon-orange block mt-0.5 animate-pulse">
                      {calculatePrice(selectedService.priceRange)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[9px] text-secondary/60 block font-bold">DELIVERY ESTIMATION:</span>
                    <span className="font-display text-xs text-light font-bold block mt-0.5">
                      {fastTrack ? 'Averaging 2-4 Days' : selectedService.deliveryTime}
                    </span>
                  </div>
                </div>

                {/* CTA Order Link */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center font-bold">
                  <a
                    id="submit-whatsapp-order-link"
                    href={getWhatsAppLink(selectedService)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:flex-1 py-4 bg-neon-orange hover:bg-neon-orange/80 text-black hover:scale-[1.03] active:scale-[0.97] transition-all text-center rounded-xl font-display text-xs font-black tracking-widest flex items-center justify-center space-x-2"
                  >
                    <PhoneCall className="w-4 h-4 shrink-0" />
                    <span>LAUNCH SIGNAL ORDER</span>
                  </a>
                  <button 
                    id="back-to-store-btn"
                    onClick={() => setSelectedService(null)}
                    className="w-full sm:w-fit py-4 px-6 bg-slate-dark/50 border border-neon-orange/20 rounded-xl text-primary font-display text-xs tracking-wider cursor-pointer"
                  >
                    BACK TO STORE
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
