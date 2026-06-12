import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, Shield, Eye, EyeOff, Loader, Check, Trash2, 
  Settings, Zap, Sparkles, RefreshCw, X, AlertTriangle, 
  Cpu, Database, ShieldAlert, Wifi, Activity, Play, Plus,
  Compass, BarChart3, Save
} from 'lucide-react';
import { ALL_PROJECTS, ALL_SKILLS, ALL_SERVICES } from '../data';
import { Project, Skill, Service } from '../types';

interface SignalMessage {
  id: string;
  sender: string;
  email: string;
  body: string;
  timestamp: string;
  status: 'transmitting' | 'dispatched' | 'relayed';
}

interface AdminPanelProps {
  onClose: () => void;
  onUpdateSystemColor?: (color: string) => void;
  onToggleHyperdrive?: (active: boolean) => void;
}

type AdminTab = 'core' | 'galaxy' | 'codelab' | 'store' | 'story' | 'hub';

export default function AdminPanel({ onClose, onUpdateSystemColor, onToggleHyperdrive }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('core');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Statistics simulated
  const [cpuUsage, setCpuUsage] = useState(42);
  const [ramUsage, setRamUsage] = useState(68);
  const [networkPing, setNetworkPing] = useState(24);
  const [coreTemp, setCoreTemp] = useState(48);

  // System Configurations
  const [matrixColor, setMatrixColor] = useState('orange');
  const [hyperdrive, setHyperdrive] = useState(false);
  const [emergencyBroadcast, setEmergencyBroadcast] = useState(false);
  const [customCounter, setCustomCounter] = useState(128);

  // Dynamic loaded collections
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  // Selected sub-items to edit
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [selectedSkillId, setSelectedSkillId] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  
  // New service form state indicators
  const [newSrvId, setNewSrvId] = useState('');
  const [newSrvTitle, setNewSrvTitle] = useState('');
  const [newSrvDescription, setNewSrvDescription] = useState('');
  const [newSrvPriceRange, setNewSrvPriceRange] = useState('');
  const [newSrvDeliveryTime, setNewSrvDeliveryTime] = useState('');
  const [newSrvFeaturesRaw, setNewSrvFeaturesRaw] = useState('');
  const [newSrvIconName, setNewSrvIconName] = useState('Layout');
  const [newSrvColor, setNewSrvColor] = useState('#4DA3FF');

  // Individual bio states
  const [bioQuote, setBioQuote] = useState('');
  const [bioWho, setBioWho] = useState('');
  const [bioWhy, setBioWhy] = useState('');
  const [bioVision, setBioVision] = useState('');
  const [bioMission, setBioMission] = useState('');

  // Global contacts states
  const [contactEmail, setLocalContactEmail] = useState('');
  const [contactWhatsapp, setLocalContactWhatsapp] = useState('');

  // Msg lists
  const [localSignals, setLocalSignals] = useState<SignalMessage[]>([]);

  // Periodically update diagnostics for sci-fi look
  useEffect(() => {
    const diagInterval = setInterval(() => {
      setCpuUsage((prev) => {
        const diff = Math.floor(Math.random() * 15) - 7;
        return Math.min(Math.max(prev + diff, 10), 95);
      });
      setRamUsage((prev) => {
        const diff = Math.floor(Math.random() * 5) - 2;
        return Math.min(Math.max(prev + diff, 40), 90);
      });
      setNetworkPing((prev) => {
        const diff = Math.floor(Math.random() * 6) - 3;
        return Math.min(Math.max(prev + diff, 12), 48);
      });
      setCoreTemp((prev) => {
        const diff = Math.floor(Math.random() * 4) - 2;
        return Math.min(Math.max(prev + diff, 42), 75);
      });
    }, 2500);

    return () => clearInterval(diagInterval);
  }, []);

  // Fetch signals and settings on initialization/auth success
  useEffect(() => {
    if (isAuthenticated) {
      loadSignals();
      
      // Load matrix configurations
      const savedColor = localStorage.getItem('ac_sys_color') || 'orange';
      const savedHyperdrive = localStorage.getItem('ac_sys_hyperdrive') === 'true';
      const savedEmergency = localStorage.getItem('ac_sys_emergency') === 'true';
      const savedCounter = Number(localStorage.getItem('ac_sys_custom_counter') || '128');
      
      setMatrixColor(savedColor);
      setHyperdrive(savedHyperdrive);
      setEmergencyBroadcast(savedEmergency);
      setCustomCounter(savedCounter);

      // Load Projects list
      const savedProjects = localStorage.getItem('ac_sys_projects');
      const loadedProjects: Project[] = savedProjects ? JSON.parse(savedProjects) : ALL_PROJECTS;
      setProjects(loadedProjects);
      if (loadedProjects.length > 0) {
        setSelectedProjectId(loadedProjects[0].id);
      }

      // Load Skills list
      const savedSkills = localStorage.getItem('ac_sys_skills');
      const loadedSkills: Skill[] = savedSkills ? JSON.parse(savedSkills) : ALL_SKILLS;
      setSkills(loadedSkills);
      if (loadedSkills.length > 0) {
        setSelectedSkillId(loadedSkills[0].id);
      }

      // Load Services list
      const savedServices = localStorage.getItem('ac_sys_services');
      const loadedServices: Service[] = savedServices ? JSON.parse(savedServices) : ALL_SERVICES;
      setServices(loadedServices);
      if (loadedServices.length > 0) {
        setSelectedServiceId(loadedServices[0].id);
      }

      // Load Bio details
      setBioQuote(localStorage.getItem('ac_sys_quote') || '“Every great website starts with an idea, not code.”');
      setBioWho(localStorage.getItem('ac_sys_who_text') || 'My name is Ajayi Covenant, an elite digital architect and creative programmer. I craft pixels with complete mechanical accuracy, combining artistic UI philosophies with modern Web API structures to produce online products that hold maximum aesthetic weight.');
      setBioWhy(localStorage.getItem('ac_sys_why_text') || 'I discovered that standard websites look identical: uninspiring squares, slow margins, clunky widgets. I saw web engineering not as a simple compilation of files, but as canvas paint. I started coding to give business owners the keys to premium digital universes.');
      setBioVision(localStorage.getItem('ac_sys_vision_text') || 'To transform legacy offline models (such as church registries, tuition calculators, and storefront folders) into hyper-fast high-retention systems, where visitors love to linger, trust the brand instantly, and secure transactions easily.');
      setBioMission(localStorage.getItem('ac_sys_mission_text') || 'Provide client service parameters with 100% Core Web Vital scores, mobile responsive grids, and exquisite interactive custom widgets. No shortcuts, no compromises.');

      // Load Contacts details
      setLocalContactEmail(localStorage.getItem('ac_sys_contact_email') || 'ajayicovenant4@gmail.com');
      setLocalContactWhatsapp(localStorage.getItem('ac_sys_contact_whatsapp') || '2349033321568');
    }
  }, [isAuthenticated]);

  const loadSignals = () => {
    const saved = localStorage.getItem('ac_transmitted_signals');
    if (saved) {
      try {
        setLocalSignals(JSON.parse(saved));
      } catch (err) {
        console.error('Error loading admin signals', err);
      }
    } else {
      setLocalSignals([]);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');

    setTimeout(() => {
      if (accessCode === '1337' || accessCode.toLowerCase() === 'admin' || accessCode === '') {
        setIsAuthenticated(true);
        if (!localStorage.getItem('ac_sys_color')) {
          localStorage.setItem('ac_sys_color', 'orange');
        }
      } else {
        setAuthError('INVALID ACCESS TOKEN. COVENANT SECURITY SYSTEM ARMED.');
      }
      setLoading(false);
    }, 1200);
  };

  // Senders simulation
  const seedDemoSignal = () => {
    const demoSenders = ['Lara Croft', 'Bruce Wayne', 'Tony Stark', 'Elon Musk', 'Linus Torvalds'];
    const demoEmails = ['lara@tombraid.io', 'bruce@waynecorp.com', 'tony@starkindustries.com', 'elon@starbase.io', 'linus@linuxfoundation.org'];
    const demoBodies = [
      'Need an ultra-modern high-performance tracking radar widget for my archaeological inventory platform.',
      'Integrating a military-grade cockpit visualization array using your modular layout schemas.',
      'Covenant Grid matches the aesthetics of the Mark 85 terminal systems. Let’s collaborate immediately on a secret project.',
      'Need premium cybernetic animations for a telemetry display in our orbital boosters.',
      'The source code layout is extremely pristine. Outstanding modular React components with superb tailwind utilities!'
    ];

    const idx = Math.floor(Math.random() * demoSenders.length);
    const timestamp = new Date().toLocaleTimeString();
    
    const newDemoSignal: SignalMessage = {
      id: `sig_${Date.now().toString().slice(-6)}`,
      sender: demoSenders[idx],
      email: demoEmails[idx],
      body: demoBodies[idx],
      timestamp,
      status: 'dispatched'
    };

    const currentSignals = [newDemoSignal, ...localSignals];
    setLocalSignals(currentSignals);
    localStorage.setItem('ac_transmitted_signals', JSON.stringify(currentSignals));
    
    // Trigger live refresh in other components
    window.dispatchEvent(new Event('storage'));
  };

  const deleteSignal = (id: string) => {
    const updated = localSignals.filter((sig) => sig.id !== id);
    setLocalSignals(updated);
    localStorage.setItem('ac_transmitted_signals', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const clearAllSignals = () => {
    if (window.confirm('Are you sure you want to permanently clear all signal logs?')) {
      localStorage.removeItem('ac_transmitted_signals');
      setLocalSignals([]);
      window.dispatchEvent(new Event('storage'));
    }
  };

  // Safe color changes dynamically
  const changeMatrixColor = (color: string) => {
    setMatrixColor(color);
    localStorage.setItem('ac_sys_color', color);
    if (onUpdateSystemColor) {
      onUpdateSystemColor(color);
    }
    window.dispatchEvent(new CustomEvent('ac-system-color-change', { detail: { color } }));
  };

  // Hyperdrive mode speeds up particles
  const toggleHyperdriveMode = () => {
    const nextState = !hyperdrive;
    setHyperdrive(nextState);
    localStorage.setItem('ac_sys_hyperdrive', String(nextState));
    if (onToggleHyperdrive) {
      onToggleHyperdrive(nextState);
    }
    window.dispatchEvent(new CustomEvent('ac-hyperdrive-toggle', { detail: { active: nextState } }));
  };

  const toggleEmergencyMode = () => {
    const nextState = !emergencyBroadcast;
    setEmergencyBroadcast(nextState);
    localStorage.setItem('ac_sys_emergency', String(nextState));
    window.dispatchEvent(new CustomEvent('ac-emergency-toggle', { detail: { active: nextState } }));
  };

  const updateCustomCounterValue = (val: number) => {
    setCustomCounter(val);
    localStorage.setItem('ac_sys_custom_counter', String(val));
    window.dispatchEvent(new CustomEvent('ac-counter-change', { detail: { val } }));
  };

  // Galaxy Project edits
  const currentProject = projects.find(p => p.id === selectedProjectId);
  const handleUpdateCurrentProject = (field: keyof Project, val: any) => {
    const updated = projects.map(p => {
      if (p.id === selectedProjectId) {
        return { ...p, [field]: val };
      }
      return p;
    });
    setProjects(updated);
  };

  const handleUpdateProjectCoordinates = (axis: 'x' | 'y', value: number) => {
    const updated = projects.map(p => {
      if (p.id === selectedProjectId) {
        return { 
          ...p, 
          coordinate: { ...p.coordinate, [axis]: value } 
        };
      }
      return p;
    });
    setProjects(updated);
  };

  const handleSaveProjects = () => {
    localStorage.setItem('ac_sys_projects', JSON.stringify(projects));
    window.dispatchEvent(new CustomEvent('ac-projects-change'));
    window.dispatchEvent(new Event('storage'));
    alert('Project orbit maps updated successfully! Galaxy rendering refreshed.');
  };

  const handleAddProject = () => {
    const nextId = `project-${Date.now()}`;
    const newProject: Project = {
      id: nextId,
      title: 'New Galactic Project',
      category: 'Interactive Application',
      description: 'A newly dispatched system module waiting for custom terminal mapping.',
      longDescription: 'This module is injected live via the Covenant Administration Interface. Customize its tools, comparative slides, orbital placements, and responsive dashboard.',
      problem: 'Legacy operations require optimized interactive visual flow.',
      solution: 'Engineered a modern visual viewport with 3D elements and responsive micro-layouts.',
      tools: ['React', 'Tailwind', 'TypeScript'],
      beforeImage: 'Stale legacy format tables with high user friction.',
      afterImage: 'Futuristic responsive canvas dashboard with golden highlights.',
      liveUrl: `#${nextId}-sandbox`,
      color: '#D4AF37',
      planetSize: 62,
      planetColor: 'radial-gradient(circle, #D4AF37 0%, #0F0F05 80%)',
      coordinate: { x: Math.floor(Math.random() * 45) + 20, y: Math.floor(Math.random() * 45) + 20 },
      iframeMockType: 'business'
    };

    const updated = [...projects, newProject];
    setProjects(updated);
    setSelectedProjectId(nextId);
    localStorage.setItem('ac_sys_projects', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('ac-projects-change'));
    window.dispatchEvent(new Event('storage'));
    alert('New planet orbit spawned! Design and position it inside the map.');
  };

  const handleRemoveProject = () => {
    if (projects.length <= 1) {
      alert('Security Protocol: The system requires at least one active project item to stabilize the orbit.');
      return;
    }
    const targetTitle = currentProject?.title || 'Selected Project';
    if (window.confirm(`Are you sure you want to completely de-orbit and remove "${targetTitle}"?`)) {
      const updated = projects.filter(p => p.id !== selectedProjectId);
      setProjects(updated);
      setSelectedProjectId(updated[0].id);
      localStorage.setItem('ac_sys_projects', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('ac-projects-change'));
      window.dispatchEvent(new Event('storage'));
      alert('Project successfully removed from Galaxy maps.');
    }
  };

  // Code Lab edits
  const currentSkill = skills.find(s => s.id === selectedSkillId);
  const handleUpdateCurrentSkill = (field: keyof Skill, val: any) => {
    const updated = skills.map(s => {
      if (s.id === selectedSkillId) {
        return { ...s, [field]: val };
      }
      return s;
    });
    setSkills(updated);
  };

  const handleSaveSkills = () => {
    localStorage.setItem('ac_sys_skills', JSON.stringify(skills));
    window.dispatchEvent(new CustomEvent('ac-skills-change'));
    window.dispatchEvent(new Event('storage'));
    alert('Code Lab skill intensities synced with reactor matrix.');
  };

  const handleAddSkill = () => {
    const nextId = `skill-${Date.now()}`;
    const newSkill: Skill = {
      id: nextId,
      name: 'Dynamic Fusion Engine',
      category: 'core',
      level: 80,
      glowColor: '#D4AF37',
      description: 'Injecting high-performance custom modular components designed to achieve absolute mechanical speed.',
      pulseSpeed: 'pulse'
    };

    const updated = [...skills, newSkill];
    setSkills(updated);
    setSelectedSkillId(nextId);
    localStorage.setItem('ac_sys_skills', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('ac-skills-change'));
    window.dispatchEvent(new Event('storage'));
    alert('New reactor cell core activated inside Code Lab matrices.');
  };

  const handleRemoveSkill = () => {
    if (skills.length <= 1) {
      alert('Security Protocol: The system requires at least one active skill reactor to maintain engine cooling systems.');
      return;
    }
    const targetName = currentSkill?.name || 'Selected Reactor';
    if (window.confirm(`Are you sure you want to completely de-couple "${targetName}" from the primary reactor stack?`)) {
      const updated = skills.filter(s => s.id !== selectedSkillId);
      setSkills(updated);
      setSelectedSkillId(updated[0].id);
      localStorage.setItem('ac_sys_skills', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('ac-skills-change'));
      window.dispatchEvent(new Event('storage'));
      alert('Reactor successfully de-coupled.');
    }
  };

  // Store config edits
  const currentService = services.find(s => s.id === selectedServiceId);
  const handleUpdateCurrentService = (field: keyof Service, val: any) => {
    const updated = services.map(s => {
      if (s.id === selectedServiceId) {
        return { ...s, [field]: val };
      }
      return s;
    });
    setServices(updated);
  };

  const handleUpdateServiceFeatures = (raw: string) => {
    const list = raw.split('\n').map(item => item.trim()).filter(Boolean);
    const updated = services.map(s => {
      if (s.id === selectedServiceId) {
        return { ...s, features: list };
      }
      return s;
    });
    setServices(updated);
  };

  const handleSaveServices = () => {
    localStorage.setItem('ac_sys_services', JSON.stringify(services));
    window.dispatchEvent(new CustomEvent('ac-services-change'));
    window.dispatchEvent(new Event('storage'));
    alert('Digital services listings successfully updated.');
  };

  const handleCreateService = () => {
    if (!newSrvId.trim() || !newSrvTitle.trim()) {
      alert('Security Protocol: Service ID and Service Title are required to establish a new service node.');
      return;
    }

    const cleanId = newSrvId.trim().toLowerCase().replace(/\s+/g, '-');

    if (services.some(s => s.id === cleanId)) {
      alert(`Security Protocol: A service node with the ID "${cleanId}" already exists.`);
      return;
    }

    const featureList = newSrvFeaturesRaw
      .split('\n')
      .map(item => item.trim())
      .filter(Boolean);

    const newServiceObj: Service = {
      id: cleanId,
      title: newSrvTitle.trim(),
      description: newSrvDescription.trim() || 'Custom digital core service parameters.',
      priceRange: newSrvPriceRange.trim() || 'Variable Quote',
      deliveryTime: newSrvDeliveryTime.trim() || 'Flexible Window',
      features: featureList,
      iconName: newSrvIconName,
      color: newSrvColor,
    };

    const updated = [...services, newServiceObj];
    setServices(updated);
    setSelectedServiceId(cleanId);
    localStorage.setItem('ac_sys_services', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('ac-services-change'));
    window.dispatchEvent(new Event('storage'));

    // Reset form states
    setNewSrvId('');
    setNewSrvTitle('');
    setNewSrvDescription('');
    setNewSrvPriceRange('');
    setNewSrvDeliveryTime('');
    setNewSrvFeaturesRaw('');
    
    alert(`Service "${newServiceObj.title}" successfully established and mapped online.`);
  };

  const handleDeleteSelectedService = () => {
    if (services.length <= 1) {
      alert('Security Protocol: The system requires at least one active digital service listing to persist the matrix.');
      return;
    }

    const target = currentService?.title || 'Selected Service';
    if (window.confirm(`Are you absolutely sure you want to completely de-couple "${target}" from the digital storefront?`)) {
      const updated = services.filter(s => s.id !== selectedServiceId);
      setServices(updated);
      setSelectedServiceId(updated[0].id);
      localStorage.setItem('ac_sys_services', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('ac-services-change'));
      window.dispatchEvent(new Event('storage'));
      alert(`Service successfully de-coupled.`);
    }
  };

  // Creator Bio updates
  const handleSaveStory = () => {
    localStorage.setItem('ac_sys_quote', bioQuote);
    localStorage.setItem('ac_sys_who_text', bioWho);
    localStorage.setItem('ac_sys_why_text', bioWhy);
    localStorage.setItem('ac_sys_vision_text', bioVision);
    localStorage.setItem('ac_sys_mission_text', bioMission);
    window.dispatchEvent(new CustomEvent('ac-story-change'));
    window.dispatchEvent(new Event('storage'));
    alert('Bio timeline quote & credentials modified.');
  };

  // Contacts coords updates
  const handleSaveContacts = () => {
    localStorage.setItem('ac_sys_contact_email', contactEmail);
    localStorage.setItem('ac_sys_contact_whatsapp', contactWhatsapp);
    window.dispatchEvent(new CustomEvent('ac-contact-change'));
    window.dispatchEvent(new Event('storage'));
    alert('Global email coordinates & WhatsApp pipeline active endpoints updated.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl transition-all duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 cyber-dots opacity-[0.12] pointer-events-none" />

      <div className="relative w-full max-w-5xl bg-[#090d1a] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,106,0,0.15)] flex flex-col max-h-[90vh]">
        
        {/* Core Header */}
        <div className="bg-[#121829] border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-[#FF6A00]/10 border border-[#FF6A00]/40 flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#FF6A00] animate-pulse" />
            </div>
            <div>
              <h2 className="font-display font-black text-sm tracking-widest text-white leading-none uppercase">COVENANT ROOT MATRIX</h2>
              <span className="font-mono text-[8px] text-[#4DA3FF] tracking-widest block uppercase mt-1">
                SYSTEM DECRYPTION PANEL // ACCESS STATION AT SHIFT+4
              </span>
            </div>
          </div>

          <button 
            id="close-admin-panel-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic navigation tabs (only if authenticated) */}
        {isAuthenticated && (
          <div className="overflow-x-auto bg-[#101423] border-b border-white/5 shrink-0 flex items-center scrollbar-none-x">
            <div className="flex space-x-1 p-2 min-w-max">
              {[
                { id: 'core', label: 'SYSTEM ENGINE', icon: Settings },
                { id: 'galaxy', label: 'MY GALAXY', icon: Compass },
                { id: 'codelab', label: 'CODE LAB', icon: Cpu },
                { id: 'store', label: 'STORE LIST', icon: BarChart3 },
                { id: 'story', label: 'CREATOR STORY', icon: Sparkles },
                { id: 'hub', label: 'HUB & CONTACTS', icon: Database },
              ].map((tab) => {
                const TabIcon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as AdminTab)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-[10px] tracking-wider font-bold uppercase cursor-pointer flex items-center space-x-1.5 transition-all ${
                      active
                        ? 'bg-[#FF6A00]/15 text-[#FF6A00] border border-[#FF6A00]/40 shadow-glow'
                        : 'text-white/45 border border-transparent hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <TabIcon className={`w-3.5 h-3.5 ${active ? 'text-[#FF6A00]' : 'text-white/40'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Body based on Auth Status */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 text-left">
          <AnimatePresence mode="wait">
            {!isAuthenticated ? (
              
              /* 1. PASSWORD DECRYPTION TERMINAL SCREEN */
              <motion.div 
                key="auth-gate"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-md mx-auto py-12 flex flex-col justify-center items-center text-center space-y-8"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-glow-orange text-2xl font-bold font-mono">
                  $
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-white tracking-wide uppercase">CYBER SECURITY BARRIER</h3>
                  <p className="font-mono text-[10px] text-white/40 tracking-wider max-w-sm">
                    Access to Covenant administrative diagnostics requires authentication. Input access token or bypass to log in.
                  </p>
                </div>

                <form onSubmit={handleAuthSubmit} className="w-full space-y-4">
                  <div className="relative">
                    <input 
                      type={showCode ? 'text' : 'password'}
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      placeholder="ENTER TOKEN [TRY '1337' OR LEAVE EMPTY]"
                      className="w-full bg-[#121829] border border-white/10 rounded-xl px-4 py-3.5 pl-10 pr-12 font-mono text-center text-xs tracking-[0.2em] text-white focus:border-[#FF6A00] outline-none transition-colors"
                      autoFocus
                    />
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowCode(!showCode)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white cursor-pointer"
                    >
                      {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {authError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-400 font-mono text-[10px] rounded-lg tracking-wider text-left flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="py-3.5 bg-[#FF6A00] hover:bg-[#E05300] text-white font-display text-xs font-bold tracking-widest rounded-xl transition-all cursor-pointer shadow-neon-orange flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin text-white" />
                          <span>SOLVING...</span>
                        </>
                      ) : (
                        <span>DECRYPT CODE</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAccessCode('1337');
                        setIsAuthenticated(true);
                      }}
                      className="py-3.5 bg-white/5 border border-white/5 hover:bg-white/10 text-white font-mono text-[10px] tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <Zap className="w-3.5 h-3.5 text-[#4DA3FF]" />
                      <span>BYPASS GATE</span>
                    </button>
                  </div>
                </form>

                <div className="p-3 border border-dashed border-white/5 bg-[#121829]/30 rounded-xl max-w-sm">
                  <span className="font-mono text-[8.5px] text-white/30 tracking-widest uppercase block mb-1">Shortcut Matrix Key</span>
                  <p className="font-mono text-[8.5px] text-[#4DA3FF] leading-normal uppercase">
                    You can close this admin cockpit at any time by pressing <span className="text-[#FF6A00] font-bold">Shift + 4</span> again.
                  </p>
                </div>
              </motion.div>

            ) : (

              /* 2. LIVE COCKPIT ADMINISTRATIVE TAB CONTENT VIEWS */
              <div className="w-full">
                
                {/* 2.1 Tab View: SYSTEM ENGINE (CORE) */}
                {activeTab === 'core' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                  >
                    <div className="lg:col-span-7 space-y-6">
                      <div className="p-5 bg-[#121829]/60 border border-white/5 rounded-2xl space-y-4">
                        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-white border-b border-white/5 pb-2">
                          <Settings className="w-4 h-4 text-[#FF6A00]" />
                          <span>SYSTEM GLOBAL INJECTION CONTROLS</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2 p-3 bg-black/30 border border-white/5 rounded-xl text-left">
                            <span className="font-mono text-[9px] text-white/40 uppercase block">Injected Star Theme Accent:</span>
                            <div className="flex items-center space-x-2 mt-1">
                              {[
                                { name: 'orange', class: 'bg-[#FF6A00] border-[#FF6A00]' },
                                { name: 'emerald', class: 'bg-emerald-500 border-emerald-500' },
                                { name: 'cyan', class: 'bg-cyan-400 border-cyan-400' },
                                { name: 'purple', class: 'bg-purple-500 border-purple-500' }
                              ].map((clr) => (
                                <button
                                  key={clr.name}
                                  onClick={() => changeMatrixColor(clr.name)}
                                  className={`w-7 h-7 rounded-lg ${clr.class} transition-all relative cursor-pointer flex items-center justify-center`}
                                >
                                  {matrixColor === clr.name && (
                                    <span className="absolute w-2 h-2 rounded-full bg-white shadow" />
                                  )}
                                </button>
                              ))}
                            </div>
                            <span className="text-[8px] font-mono text-[#4DA3FF]">Active: {matrixColor.toUpperCase()} CODE STREAM</span>
                          </div>

                          <div className="space-y-2 p-3 bg-black/30 border border-white/5 rounded-xl text-left flex flex-col justify-between">
                            <div>
                              <span className="font-mono text-[9px] text-white/40 uppercase block">Background Speed Module:</span>
                              <span className="text-[8px] font-mono text-[#4DA3FF] block mt-1">Speed multiplier for starglobe particles</span>
                            </div>
                            <button
                              onClick={toggleHyperdriveMode}
                              className={`w-full py-1.5 px-3 rounded-lg font-mono text-[9.5px] font-bold tracking-widest mt-2 flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                                hyperdrive 
                                  ? 'bg-[#FF6A00]/20 text-[#FF6A00] border border-[#FF6A00]' 
                                  : 'bg-white/5 text-white/60 border border-white/5 hover:bg-white/10'
                              }`}
                            >
                              <Zap className={`w-3.5 h-3.5 ${hyperdrive ? 'animate-bounce text-[#FF6A00]' : ''}`} />
                              <span>{hyperdrive ? 'HYPERDRIVE ACTIVE' : 'ENGAGE HYPERDRIVE'}</span>
                            </button>
                          </div>

                          <div className="space-y-2 p-3 bg-black/30 border border-[#EF4444]/10 rounded-xl text-left flex flex-col justify-between">
                            <div>
                              <span className="font-mono text-[9px] text-red-400/80 uppercase block flex items-center gap-1">
                                <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                                <span>System Warning Overlay:</span>
                              </span>
                              <span className="text-[8px] font-mono text-white/30 block mt-1">Triggers emergency grid lines and core glow values</span>
                            </div>
                            <button
                              onClick={toggleEmergencyMode}
                              className={`w-full py-1.5 px-3 rounded-lg font-mono text-[9.5px] font-bold tracking-widest mt-2 flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                                emergencyBroadcast 
                                  ? 'bg-red-500/20 text-red-400 border border-red-500' 
                                  : 'bg-white/5 text-white/60 border border-white/5 hover:bg-white/10'
                              }`}
                            >
                              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                              <span>{emergencyBroadcast ? 'WARNING FLIGHT ACTIVE' : 'SIMULATE EMERGENCY'}</span>
                            </button>
                          </div>

                          <div className="space-y-2 p-3 bg-black/30 border border-white/5 rounded-xl text-left flex flex-col justify-between">
                            <div>
                              <span className="font-mono text-[9px] text-white/40 uppercase block">Total Dynamic Injected Projects:</span>
                              <span className="text-[8px] font-mono text-[#4DA3FF] block mt-1">Adjust metric displays on landing screens</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                              <button 
                                onClick={() => updateCustomCounterValue(Math.max(customCounter - 5, 5))}
                                className="px-2 py-0.5 bg-white/5 rounded font-mono text-xs text-white border border-white/5 hover:bg-white/10 cursor-pointer"
                              >
                                -5
                              </button>
                              <span className="font-mono text-[11px] font-black text-white px-2">{customCounter}</span>
                              <button 
                                onClick={() => updateCustomCounterValue(customCounter + 5)}
                                className="px-2 py-0.5 bg-white/5 rounded font-mono text-xs text-white border border-white/5 hover:bg-white/10 cursor-pointer"
                              >
                                +5
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 bg-[#121829]/60 border border-white/5 rounded-2xl space-y-4">
                        <div className="flex items-center justify-between text-xs font-mono font-bold text-white border-b border-white/5 pb-2">
                          <div className="flex items-center space-x-2">
                            <Cpu className="w-4 h-4 text-[#4DA3FF]" />
                            <span>COVENANT INTERACTIVE CORE TELEMETRY</span>
                          </div>
                          <span className="font-mono text-[8px] text-emerald-400 tracking-wider flex items-center space-x-1">
                            <Activity className="w-3 h-3 text-emerald-400 inline" />
                            <span>DEVICES CORRELATED</span>
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="p-3 bg-black/30 border border-white/5 rounded-xl text-center">
                            <span className="font-mono text-[8px] text-white/40 uppercase block">GRID CPU</span>
                            <span className="font-display text-xl font-bold text-[#FF6A00] block mt-1 text-glow-orange">{cpuUsage}%</span>
                            <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                              <div className="bg-[#FF6A00] h-full" style={{ width: `${cpuUsage}%` }} />
                            </div>
                          </div>

                          <div className="p-3 bg-black/30 border border-white/5 rounded-xl text-center">
                            <span className="font-mono text-[8px] text-white/40 uppercase block">GRID SHIELD</span>
                            <span className="font-display text-xl font-bold text-[#4DA3FF] block mt-1">{ramUsage}%</span>
                            <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                              <div className="bg-[#4DA3FF] h-full" style={{ width: `${ramUsage}%` }} />
                            </div>
                          </div>

                          <div className="p-3 bg-black/30 border border-white/5 rounded-xl text-center">
                            <span className="font-mono text-[8px] text-white/40 uppercase block">CORE TEMP</span>
                            <span className={`font-display text-xl font-bold block mt-1 ${coreTemp > 65 ? 'text-red-400' : 'text-emerald-400'}`}>{coreTemp}°C</span>
                            <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                              <div className={`h-full ${coreTemp > 65 ? 'bg-red-500' : 'bg-emerald-400'}`} style={{ width: `${(coreTemp/100)*100}%` }} />
                            </div>
                          </div>

                          <div className="p-3 bg-black/30 border border-white/5 rounded-xl text-center">
                            <span className="font-mono text-[8px] text-white/40 uppercase block">NODE DISPATCH</span>
                            <span className="font-display text-xl font-bold text-white block mt-1">{networkPing}ms</span>
                            <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                              <div className="bg-emerald-400 h-full" style={{ width: `${(networkPing/60)*100}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-5 bg-[#121829]/60 border border-white/5 rounded-2xl">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs font-mono font-bold text-white border-b border-white/5 pb-2">
                          <div className="flex items-center space-x-2">
                            <Database className="w-4 h-4 text-[#FF6A00]" />
                            <span>QUICK TELEMETRY ASSISTANT</span>
                          </div>
                        </div>
                        <p className="font-sans text-xs text-white/60 leading-relaxed">
                          Welcome, Covenant admin. Use the dynamic tabs located in the navigation header bar above to configure real-time project variables, reactor power loads, listings and email/WhatsApp coordinates instantly.
                        </p>
                        <div className="bg-[#0c0f1d] border border-white/5 p-4 rounded-xl space-y-2">
                          <span className="font-mono text-[10px] text-emerald-400 uppercase block font-semibold">Active Status Monitoring:</span>
                          <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
                            <span>Dynamic Projects Active:</span>
                            <span className="text-white font-bold">{projects.length}</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
                            <span>Active Skill Reactors Loaded:</span>
                            <span className="text-white font-bold">{skills.length}</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
                            <span>Configured Store Services:</span>
                            <span className="text-white font-bold">{services.length}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2.2 Tab View: MY GALAXY (PROJECTS EDITOR) */}
                {activeTab === 'galaxy' && currentProject && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="p-5 bg-[#121829]/60 border border-white/5 rounded-2xl space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-white/5 pb-3">
                        <div className="flex items-center space-x-2">
                          <Compass className="w-4 h-4 text-[#FF6A00]" />
                          <span className="font-mono text-xs text-white font-bold uppercase">Galaxy Orbit Projects Showcase Configuration</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 flex-wrap gap-2">
                          <label className="font-mono text-[10px] text-white/50">SELECT PLANET:</label>
                          <select
                            value={selectedProjectId}
                            onChange={(e) => setSelectedProjectId(e.target.value)}
                            className="bg-[#0B1020] border border-white/10 rounded px-2.5 py-1 text-xs font-mono text-white tracking-wide"
                          >
                            {projects.map(p => (
                              <option key={p.id} value={p.id}>{p.title}</option>
                            ))}
                          </select>

                          <button
                            onClick={handleAddProject}
                            className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/50 rounded font-mono text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer"
                          >
                            + Add Planet
                          </button>

                          <button
                            onClick={handleRemoveProject}
                            className="px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/50 rounded font-mono text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer"
                          >
                            - Remove Current
                          </button>
                        </div>
                      </div>

                      {/* Project Edit fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-white/40 block">PLANET/PROJECT TITLE:</label>
                          <input 
                            type="text" 
                            value={currentProject.title}
                            onChange={(e) => handleUpdateCurrentProject('title', e.target.value)}
                            className="w-full bg-black/40 border border-white/5 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-white/40 block">CATEGORY / CLASSIFIER:</label>
                          <input 
                            type="text" 
                            value={currentProject.category}
                            onChange={(e) => handleUpdateCurrentProject('category', e.target.value)}
                            className="w-full bg-black/40 border border-white/5 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-white/40 block">PLANET GLOW RADIUS (PIXELS):</label>
                          <input 
                            type="number" 
                            value={currentProject.planetSize}
                            onChange={(e) => handleUpdateCurrentProject('planetSize', Number(e.target.value))}
                            className="w-full bg-black/40 border border-white/5 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                          />
                        </div>

                        {/* Coordinates */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="font-mono text-[9px] text-white/40 block">X-COORD ORBIT %:</label>
                            <input 
                              type="number" 
                              value={currentProject.coordinate.x}
                              onChange={(e) => handleUpdateProjectCoordinates('x', Number(e.target.value))}
                              className="w-full bg-black/40 border border-white/5 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="font-mono text-[9px] text-white/40 block">Y-COORD ORBIT %:</label>
                            <input 
                              type="number" 
                              value={currentProject.coordinate.y}
                              onChange={(e) => handleUpdateProjectCoordinates('y', Number(e.target.value))}
                              className="w-full bg-black/40 border border-white/5 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                          <label className="font-mono text-[9px] text-white/40 block">SHORT KEY DEMO DESCRIPTION:</label>
                          <textarea 
                            value={currentProject.description}
                            onChange={(e) => handleUpdateCurrentProject('description', e.target.value)}
                            rows={2}
                            className="w-full bg-black/40 border border-white/5 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-sans text-xs text-white outline-none resize-none"
                          />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                          <label className="font-mono text-[9px] text-white/40 block">LONG COMPREHENSIVE RECONSTRUCT SCHEMATIC DESCRIPTION:</label>
                          <textarea 
                            value={currentProject.longDescription}
                            onChange={(e) => handleUpdateCurrentProject('longDescription', e.target.value)}
                            rows={3}
                            className="w-full bg-black/40 border border-white/5 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-sans text-xs text-white outline-none resize-none"
                          />
                        </div>

                        {/* Comparative UX fields */}
                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-red-400 block">COMPARUX BEFORE STATE SLIDE LABEL:</label>
                          <input 
                            type="text" 
                            value={currentProject.beforeImage}
                            onChange={(e) => handleUpdateCurrentProject('beforeImage', e.target.value)}
                            className="w-full bg-black/40 border border-red-500/10 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-emerald-400 block">COMPARUX AFTER STATE SLIDE LABEL:</label>
                          <input 
                            type="text" 
                            value={currentProject.afterImage}
                            onChange={(e) => handleUpdateCurrentProject('afterImage', e.target.value)}
                            className="w-full bg-black/40 border border-emerald-500/10 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                          />
                        </div>

                        {/* Problem and solution */}
                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-red-400 block">SYSTEMIC PROBLEMS POSED:</label>
                          <textarea 
                            value={currentProject.problem}
                            onChange={(e) => handleUpdateCurrentProject('problem', e.target.value)}
                            rows={2}
                            className="w-full bg-black/40 border border-red-500/10 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-sans text-xs text-white outline-none resize-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-emerald-400 block">INTERACTIVE SOLUTIONS INTEGRATED:</label>
                          <textarea 
                            value={currentProject.solution}
                            onChange={(e) => handleUpdateCurrentProject('solution', e.target.value)}
                            rows={2}
                            className="w-full bg-black/40 border border-emerald-500/10 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-sans text-xs text-white outline-none resize-none"
                          />
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="pt-4 border-t border-white/5 flex justify-end">
                        <button
                          onClick={handleSaveProjects}
                          className="px-5 py-2.5 bg-[#FF6A00] text-white font-display text-xs tracking-wider font-bold rounded-xl flex items-center space-x-1.5 transition-all hover:scale-105"
                        >
                          <Save className="w-3.5 h-3.5 text-white" />
                          <span>SAVE GALAXY MODIFICATIONS</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2.3 Tab View: CODE LAB (REACTOR MODULES) */}
                {activeTab === 'codelab' && currentSkill && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="p-5 bg-[#121829]/60 border border-white/5 rounded-2xl space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-white/5 pb-3">
                        <div className="flex items-center space-x-2">
                          <Cpu className="w-4 h-4 text-[#FF6A00]" />
                          <span className="font-mono text-xs text-white font-bold uppercase">Dynamic Reactor Intensity Controls</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 flex-wrap gap-2">
                          <label className="font-mono text-[10px] text-white/50">SELECT REACTOR:</label>
                          <select
                            value={selectedSkillId}
                            onChange={(e) => setSelectedSkillId(e.target.value)}
                            className="bg-[#0B1020] border border-white/10 rounded px-2.5 py-1 text-xs font-mono text-white tracking-wide"
                          >
                            {skills.map(s => (
                              <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                          </select>

                          <button
                            onClick={handleAddSkill}
                            className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/50 rounded font-mono text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer"
                          >
                            + Add Reactor
                          </button>

                          <button
                            onClick={handleRemoveSkill}
                            className="px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/50 rounded font-mono text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer"
                          >
                            - Remove Current
                          </button>
                        </div>
                      </div>

                      {/* Skill edit fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-white/40 block">REACTOR / SKILL NAME:</label>
                          <input 
                            type="text" 
                            value={currentSkill.name}
                            onChange={(e) => handleUpdateCurrentSkill('name', e.target.value)}
                            className="w-full bg-black/40 border border-white/5 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                          />
                        </div>

                        {/* Intensity range slider */}
                        <div className="space-y-1.5 p-3 bg-black/30 border border-white/5 rounded-xl flex flex-col justify-between">
                          <div className="flex justify-between items-center text-[9px] font-mono">
                            <span className="text-white/40">REACTOR INTENSITY LOAD:</span>
                            <span className="text-emerald-400 font-bold">{currentSkill.level}% LOAD</span>
                          </div>
                          <input 
                            type="range"
                            min="1"
                            max="100"
                            value={currentSkill.level}
                            onChange={(e) => handleUpdateCurrentSkill('level', Number(e.target.value))}
                            className="w-full accent-[#FF6A00] cursor-pointer mt-2"
                          />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                          <label className="font-mono text-[9px] text-white/40 block">REACTOR SIGNAL FLOW DESCRIPTION:</label>
                          <textarea 
                            value={currentSkill.description}
                            onChange={(e) => handleUpdateCurrentSkill('description', e.target.value)}
                            rows={3}
                            className="w-full bg-black/40 border border-white/5 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-sans text-xs text-white outline-none resize-none"
                          />
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="pt-4 border-t border-white/5 flex justify-end">
                        <button
                          onClick={handleSaveSkills}
                          className="px-5 py-2.5 bg-[#FF6A00] text-white font-display text-xs tracking-wider font-bold rounded-xl flex items-center space-x-1.5 transition-all hover:scale-105"
                        >
                          <Save className="w-3.5 h-3.5 text-white" />
                          <span>APPLY REACTOR POWER LEVEL</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2.4 Tab View: STORE CONFIG (SERVICES LISTS) */}
                {activeTab === 'store' && currentService && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="p-5 bg-[#121829]/60 border border-white/5 rounded-2xl space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-white/5 pb-3">
                        <div className="flex items-center space-x-2">
                          <BarChart3 className="w-4 h-4 text-[#FF6A00]" />
                          <span className="font-mono text-xs text-white font-bold uppercase">Configure Premium Service Listings</span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          <label className="font-mono text-[10px] text-white/50">SELECT SERVICE:</label>
                          <select
                            value={selectedServiceId}
                            onChange={(e) => setSelectedServiceId(e.target.value)}
                            className="bg-[#0B1020] border border-white/10 rounded px-2.5 py-1 text-xs font-mono text-white tracking-wide"
                          >
                            {services.map(s => (
                              <option key={s.id} value={s.id}>{s.title}</option>
                            ))}
                          </select>

                          <button
                            onClick={handleDeleteSelectedService}
                            className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/30 border border-red-500/30 rounded text-red-400 font-mono text-[9px] font-bold flex items-center space-x-1 transition-all"
                            title="Delete Selected Custom Service Node"
                          >
                            <Trash2 className="w-3 h-3 text-red-400" />
                            <span>DELETE</span>
                          </button>
                        </div>
                      </div>

                      {/* Service edit fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-white/40 block">SERVICE TITLE / HEADER:</label>
                          <input 
                            type="text" 
                            value={currentService.title}
                            onChange={(e) => handleUpdateCurrentService('title', e.target.value)}
                            className="w-full bg-black/40 border border-white/5 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-white/40 block">ESTIMATED PRICE RANGE:</label>
                          <input 
                            type="text" 
                            value={currentService.priceRange}
                            onChange={(e) => handleUpdateCurrentService('priceRange', e.target.value)}
                            className="w-full bg-black/40 border border-white/5 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-white/40 block">DELIVERY TIME WINDOW:</label>
                          <input 
                            type="text" 
                            value={currentService.deliveryTime}
                            onChange={(e) => handleUpdateCurrentService('deliveryTime', e.target.value)}
                            className="w-full bg-black/40 border border-white/5 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                          />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                          <label className="font-mono text-[9px] text-white/40 block">SERVICE DISPLAY SUBDESCRIPTION:</label>
                          <textarea 
                            value={currentService.description}
                            onChange={(e) => handleUpdateCurrentService('description', e.target.value)}
                            rows={2}
                            className="w-full bg-black/40 border border-white/5 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-sans text-xs text-white outline-none resize-none"
                          />
                        </div>

                        {/* Features edit */}
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="font-mono text-[9px] text-emerald-400 block font-semibold">SERVICE INTEGRATED FEATURES (ONE PER LINE):</label>
                          <textarea 
                            value={currentService.features.join('\n')}
                            onChange={(e) => handleUpdateServiceFeatures(e.target.value)}
                            rows={4}
                            placeholder="e.g.
Custom Visual Themes
Full Interactive Prototypes"
                            className="w-full bg-black/40 border border-emerald-500/10 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none resize-none"
                          />
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="pt-4 border-t border-white/5 flex justify-end">
                        <button
                          onClick={handleSaveServices}
                          className="px-5 py-2.5 bg-[#FF6A00] text-white font-display text-xs tracking-wider font-bold rounded-xl flex items-center space-x-1.5 transition-all hover:scale-105"
                        >
                          <Save className="w-3.5 h-3.5 text-white" />
                          <span>PUBLISH DIGITAL STORE LISTING</span>
                        </button>
                      </div>
                    </div>

                    {/* Panel 2.4.2: Build a new service listing */}
                    <div className="p-5 bg-[#121829]/60 border border-white/5 rounded-2xl space-y-4">
                      <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
                        <Plus className="w-4 h-4 text-emerald-400" />
                        <span className="font-mono text-xs text-emerald-400 font-bold uppercase">Establish New Service Node</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-white/40 block">UNIQUE NODE ID (SLUG, E.G. "NEW-WEBSITE"):</label>
                          <input 
                            type="text" 
                            placeholder="e.g. mobile-app-design"
                            value={newSrvId}
                            onChange={(e) => setNewSrvId(e.target.value)}
                            className="w-full bg-black/40 border border-white/5 focus:border-emerald-400 rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-white/40 block">SERVICE TITLE / HEADER:</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Next-Gen Flutter Apps"
                            value={newSrvTitle}
                            onChange={(e) => setNewSrvTitle(e.target.value)}
                            className="w-full bg-black/40 border border-white/5 focus:border-emerald-400 rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-white/40 block">ESTIMATED PRICE RANGE:</label>
                          <input 
                            type="text" 
                            placeholder="e.g. $1,500 - $3,500"
                            value={newSrvPriceRange}
                            onChange={(e) => setNewSrvPriceRange(e.target.value)}
                            className="w-full bg-black/40 border border-white/5 focus:border-emerald-400 rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-white/40 block">DELIVERY TIME WINDOW:</label>
                          <input 
                            type="text" 
                            placeholder="e.g. 10-14 Days"
                            value={newSrvDeliveryTime}
                            onChange={(e) => setNewSrvDeliveryTime(e.target.value)}
                            className="w-full bg-black/40 border border-white/5 focus:border-emerald-400 rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-white/40 block">ICON SYMBOL CHOSEN:</label>
                          <select
                            value={newSrvIconName}
                            onChange={(e) => setNewSrvIconName(e.target.value)}
                            className="w-full bg-black/40 border border-white/5 focus:border-emerald-400 rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                          >
                            <option value="Layout">Layout (Design/Template)</option>
                            <option value="Briefcase">Briefcase (Corporate/Biz)</option>
                            <option value="Heart">Heart (Community/Spiritual)</option>
                            <option value="GraduationCap">GraduationCap (Portals/Systems)</option>
                            <option value="Zap">Zap (Dynamic/Fast Landing)</option>
                            <option value="Sparkles">Sparkles (Aesthetic Redesign)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-white/40 block">THEME HEX GLOW COLOR:</label>
                          <select
                            value={newSrvColor}
                            onChange={(e) => setNewSrvColor(e.target.value)}
                            className="w-full bg-black/40 border border-white/5 focus:border-emerald-400 rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                          >
                            <option value="#4DA3FF">Electric Blue (#4DA3FF)</option>
                            <option value="#FF6A00">Neon Orange (#FF6A00)</option>
                            <option value="#A855F7">Aura Purple (#A855F7)</option>
                            <option value="#10B981">Matrix Green (#10B981)</option>
                            <option value="#EF4444">Hot Crimson (#EF4444)</option>
                            <option value="#F7DF1E">Cyberpunk Gold (#F7DF1E)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                          <label className="font-mono text-[9px] text-white/40 block">SERVICE DISPLAY SUBDESCRIPTION:</label>
                          <textarea 
                            placeholder="Describe what core assets are delivered under this service node..."
                            value={newSrvDescription}
                            onChange={(e) => setNewSrvDescription(e.target.value)}
                            rows={2}
                            className="w-full bg-black/40 border border-white/5 focus:border-emerald-400 rounded-xl px-4 py-2.5 font-sans text-xs text-white outline-none resize-none"
                          />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                          <label className="font-mono text-[9px] text-emerald-400 block font-semibold">SERVICE INTEGRATED FEATURES (ONE PER LINE):</label>
                          <textarea 
                            placeholder="e.g.&#10;Custom Visual Themes&#10;Optimized Database Pipeline&#10;Tactile UX Animations"
                            value={newSrvFeaturesRaw}
                            onChange={(e) => setNewSrvFeaturesRaw(e.target.value)}
                            rows={3}
                            className="w-full bg-black/40 border border-emerald-500/10 focus:border-emerald-400 rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none resize-none"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex justify-end">
                        <button
                          onClick={handleCreateService}
                          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-display text-xs tracking-wider font-bold rounded-xl flex items-center space-x-1.5 transition-all hover:scale-105"
                        >
                          <Plus className="w-3.5 h-3.5 text-black" />
                          <span>ESTABLISH SERVICE LISTING</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2.5 Tab View: BIO STORY (TIMELINE TEXTS) */}
                {activeTab === 'story' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-[#121829]/60 border border-white/5 rounded-2xl space-y-4"
                  >
                    <div className="flex items-center space-x-2 border-b border-white/5 pb-2">
                      <Sparkles className="w-4 h-4 text-[#FF6A00]" />
                      <span className="font-mono text-xs text-white font-bold uppercase">Creator Story Quote & Card Details</span>
                    </div>

                    <div className="space-y-4">
                      {/* Matrix heading quote */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] text-white/40 block">CINEMATIC TIMELINE HEADING QUOTE:</label>
                        <textarea 
                          value={bioQuote}
                          onChange={(e) => setBioQuote(e.target.value)}
                          rows={2}
                          className="w-full bg-black/40 border border-white/5 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-sans text-xs text-white outline-none resize-none"
                        />
                      </div>

                      {/* Card 1: Who I Am */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] text-[#4DA3FF] block font-semibold">WHO I AM CARD DESCRIPTION:</label>
                        <textarea 
                          value={bioWho}
                          onChange={(e) => setBioWho(e.target.value)}
                          rows={3}
                          className="w-full bg-black/40 border border-blue-500/10 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-sans text-xs text-white outline-none resize-none"
                        />
                      </div>

                      {/* Card 2: Why I Started Coding */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] text-[#FF6A00] block font-semibold">WHY I STARTED CODING CARD DESCRIPTION:</label>
                        <textarea 
                          value={bioWhy}
                          onChange={(e) => setBioWhy(e.target.value)}
                          rows={3}
                          className="w-full bg-black/40 border border-orange-500/10 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-sans text-xs text-white outline-none resize-none"
                        />
                      </div>

                      {/* Card 3: My Vision */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] text-purple-400 block font-semibold">MY VISION CARD DESCRIPTION:</label>
                        <textarea 
                          value={bioVision}
                          onChange={(e) => setBioVision(e.target.value)}
                          rows={3}
                          className="w-full bg-black/40 border border-purple-500/10 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-sans text-xs text-white outline-none resize-none"
                        />
                      </div>

                      {/* Card 4: My Mission */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] text-emerald-400 block font-semibold">MY MISSION CARD DESCRIPTION:</label>
                        <textarea 
                          value={bioMission}
                          onChange={(e) => setBioMission(e.target.value)}
                          rows={3}
                          className="w-full bg-black/40 border border-emerald-500/10 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-sans text-xs text-white outline-none resize-none"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-end">
                      <button
                        onClick={handleSaveStory}
                        className="px-5 py-2.5 bg-[#FF6A00] text-white font-display text-xs tracking-wider font-bold rounded-xl flex items-center space-x-1.5 transition-all hover:scale-105"
                      >
                        <Save className="w-3.5 h-3.5 text-white" />
                        <span>APPLY CREDENTIAL TIMELINE CHANGES</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 2.6 Tab View: HUB CONNECTIONS & CHANNELS */}
                {activeTab === 'hub' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                  >
                    {/* Primary contact coordinate options (7 cols) */}
                    <div className="lg:col-span-6 space-y-6">
                      <div className="p-5 bg-[#121829]/60 border border-white/5 rounded-2xl space-y-4">
                        <div className="flex items-center space-x-2 border-b border-white/5 pb-2">
                          <Settings className="w-4 h-4 text-[#FF6A00]" />
                          <span className="font-mono text-xs text-white font-bold uppercase">Dynamic Contacts Endpoint coordinates</span>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <label className="font-mono text-[9px] text-[#4DA3FF] block uppercase">SMTP TARGET EMAIL COORDINATE:</label>
                            <input 
                              type="email" 
                              value={contactEmail}
                              onChange={(e) => setLocalContactEmail(e.target.value)}
                              className="w-full bg-black/40 border border-white/5 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="font-mono text-[9px] text-emerald-400 block uppercase">WHATSAPP ACTIVE RECIPIENT PHONE (DIGITS ONLY):</label>
                            <input 
                              type="text" 
                              value={contactWhatsapp}
                              onChange={(e) => setLocalContactWhatsapp(e.target.value)}
                              className="w-full bg-black/40 border border-white/5 focus:border-[#FF6A00] rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none"
                              placeholder="e.g. 2349033321568"
                            />
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex justify-end">
                          <button
                            onClick={handleSaveContacts}
                            className="px-5 py-2.5 bg-[#FF6A00] text-white font-display text-xs tracking-wider font-bold rounded-xl flex items-center space-x-1.5 transition-all hover:scale-105 animate-pulse"
                          >
                            <Save className="w-3.5 h-3.5 text-white" />
                            <span>REFRESH CONTACT PIPELINES</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Signal registry list (6 cols) */}
                    <div className="lg:col-span-6 p-5 bg-[#121829]/60 border border-white/5 rounded-2xl">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs font-mono font-bold text-white border-b border-white/5 pb-2">
                          <div className="flex items-center space-x-2">
                            <Database className="w-4 h-4 text-[#FF6A00]" />
                            <span>NEURAL MESSAGE REGISTRY</span>
                          </div>
                          <span className="px-2 py-0.5 bg-white/5 text-[9px] rounded-full text-[#4DA3FF] border border-white/5">
                            {localSignals.length} SIGNALS
                          </span>
                        </div>

                        {/* Seed / clear buttons */}
                        <div className="flex justify-between gap-2">
                          <button
                            onClick={seedDemoSignal}
                            className="flex-1 py-1.5 px-3 bg-[#4DA3FF]/10 hover:bg-[#4DA3FF]/20 border border-[#4DA3FF]/25 hover:border-[#4DA3FF] rounded-xl font-mono text-[10px] text-[#4DA3FF] flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#4DA3FF]" />
                            <span>SEED SIMULATED SENDER</span>
                          </button>

                          <button
                            onClick={clearAllSignals}
                            disabled={localSignals.length === 0}
                            className="py-1.5 px-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500 rounded-xl font-mono text-[10px] text-red-400 flex items-center justify-center space-x-1.5 transition-all cursor-pointer disabled:opacity-50"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                            <span>CLEAN SIGNAL LOGS</span>
                          </button>
                        </div>

                        {/* List */}
                        <div className="max-h-[300px] overflow-y-auto space-y-3 pr-1.5">
                          <AnimatePresence mode="popLayout">
                            {localSignals.length === 0 ? (
                              <div className="py-12 text-center text-white/30 space-y-2 border border-dashed border-white/5 rounded-xl bg-black/10">
                                <Wifi className="w-8 h-8 text-white/10 mx-auto animate-pulse" />
                                <div className="font-mono text-[10px] tracking-wider uppercase">NO LIVE SENDER PORTALS</div>
                              </div>
                            ) : (
                              localSignals.map((signal) => (
                                <motion.div
                                  key={signal.id}
                                  layout
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, scale: 0.9 }}
                                  className="p-3 bg-black/40 border border-white/5 rounded-xl relative group hover:border-[#FF6A00]/30 transition-all text-left"
                                >
                                  <div className="flex justify-between items-start gap-3">
                                    <div className="space-y-1">
                                      <span className="font-mono text-[8.5px] text-[#FF6A00] tracking-widest uppercase font-bold">{signal.id}</span>
                                      <h4 className="font-display font-black text-xs text-white">{signal.sender}</h4>
                                      <span className="font-mono text-[9px] text-white/40 block break-all">{signal.email}</span>
                                      <p className="font-sans text-[10.5px] text-white/70 leading-relaxed pr-2 mt-2">{signal.body}</p>
                                    </div>

                                    <button
                                      onClick={() => deleteSignal(signal.id)}
                                      className="w-7 h-7 rounded-lg bg-red-500/15 hover:bg-red-500 hover:text-white text-red-400 border border-red-500/20 flex items-center justify-center transition-all cursor-pointer opacity-80 hover:opacity-100"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <div className="mt-2.5 border-t border-white/5 pt-2 flex justify-between items-center text-[8.5px] font-mono text-white/25">
                                    <span>STATUS: <span className="text-emerald-400 font-bold uppercase">SECURED</span></span>
                                    <span>{signal.timestamp}</span>
                                  </div>
                                </motion.div>
                              ))
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
