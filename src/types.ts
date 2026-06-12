export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  tools: string[];
  beforeImage: string; // Style attributes/indicators for comparison
  afterImage: string;
  liveUrl?: string;
  color: string; // Glow color, e.g. '#FF6A00', '#4DA3FF'
  planetSize: number; // For Galaxy UI visual sizes
  planetColor: string; // Radial gradient spec
  coordinate: { x: number; y: number }; // Orbital placements
  iframeMockType: 'school' | 'church' | 'business' | 'ecommerce' | 'mytube';
}

export interface Skill {
  id: string;
  name: string;
  category: 'core' | 'design' | 'system';
  level: number; // 0-100% core energy
  glowColor: string; // Hex color
  description: string;
  pulseSpeed: string; // CSS velocity indicator
}

export interface Service {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  deliveryTime: string;
  features: string[];
  iconName: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  comment: string;
  rating: number;
  avatarSeed: string; // for custom stylized generated avatars
  date: string;
}

export interface ControlStation {
  id: string;
  label: string;
  icon: string;
}
