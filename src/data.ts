import { Project, Skill, Service, Testimonial } from './types';

export const ALL_PROJECTS: Project[] = [
  {
    id: 'school',
    title: 'School Management System',
    category: 'Admin Portal & ERP',
    description: 'A futuristic digital academic pipeline system designed for high-performing schools.',
    longDescription: 'Zenith Academy Portal bridges administrative blocks, class registries, and performance metrics in a cohesive real-time responsive dashboard, eliminating paperwork by 94%.',
    problem: 'Schools manage student tracking, tuition fee billing, and results publishing using disconnected clunky systems and offline spreadsheets, driving confusion.',
    solution: 'Engineered an all-in-one responsive control hub with glassmorphic cards, live grade metrics, automated reminders, and custom student profiles.',
    tools: ['React', 'Tailwind CSS', 'motion', 'Lucide Icons', 'D3 Charts'],
    beforeImage: 'Clunky spreadsheet grids with boring gray tables, slow load times, and broken styling.',
    afterImage: 'Neon energy gauges, elegant stats grids, glassmorphic student cards, and real-time query builders.',
    liveUrl: '#school-sandbox',
    color: '#4DA3FF',
    planetSize: 64,
    planetColor: 'radial-gradient(circle, #4DA3FF 0%, #0F1F3D 80%)',
    coordinate: { x: 20, y: 35 },
    iframeMockType: 'school'
  },
  {
    id: 'church',
    title: 'Church Website Platform',
    category: 'Community & Media Hub',
    description: 'Immersive Sanctuary of Grace media network facilitating streaming, devotionals, and prayers.',
    longDescription: 'Designed a highly comforting, visually spiritual online platform featuring rich color layouts, modular sermon players, and live prayer interaction lanes.',
    problem: 'Traditional faith web portals fail to engage virtual members, presenting dull sermon indexes that take too long to search or stream.',
    solution: 'Built an elegant streaming-focused terminal with custom filter buttons, reactive audio cards, and instant digital connection modules.',
    tools: ['Vite', 'Tailwind CSS', 'Framer Motion APIs', 'SVG Interactive Audio'],
    beforeImage: 'Plain text pages with low-contrast layouts and hard-to-find donation lists.',
    afterImage: 'Elegant spiritual UI, beautiful typography, background video headers, and instant donation/prayer logs.',
    liveUrl: '#church-sandbox',
    color: '#FF6A00',
    planetSize: 76,
    planetColor: 'radial-gradient(circle, #FF6A00 0%, #3D1C0F 85%)',
    coordinate: { x: 70, y: 25 },
    iframeMockType: 'church'
  },
  {
    id: 'business',
    title: 'Business Landing Page',
    category: 'Creative Corporate site',
    description: 'High-conversion interactive bento-grid landing design for modern business operations.',
    longDescription: 'Created a high-converting digital canvas centering on clean typography pairings, premium 3D responsive product cards, and instant analytics feedback graphs.',
    problem: 'Standard corporate brochures have identical layouts, missing key value propositions within primary scroll views and causing massive user exit rates.',
    solution: 'Designed a bold typographic bento grid with quick service sliders, tactile interactions, and lightning-fast scrolling mechanics.',
    tools: ['TypeScript', 'Tailwind grid syntax', 'Scroll-trigger assets'],
    beforeImage: 'Endless vertical scrolling paragraphs of text with stock images and tiny call-to-actions.',
    afterImage: 'Futuristic responsive bento sections, rich negative space, glowing buttons, and crisp display fonts.',
    liveUrl: '#business-sandbox',
    color: '#A855F7',
    planetSize: 58,
    planetColor: 'radial-gradient(circle, #A855F7 0%, #2E0B49 80%)',
    coordinate: { x: 45, y: 72 },
    iframeMockType: 'business'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Store',
    category: 'Next-Gen Apparel Shop',
    description: 'Tactile apparel shopping environment featuring custom cart mechanics and visual filters.',
    longDescription: 'An ultra-modern fashion store featuring seamless screen-swipe product carousels, dynamic inventory updates, glass drawers, and rich layout sizing cards.',
    problem: 'Sellers suffer major cart abandonments due to sluggish item edits, confusing payment procedures, and dry product list representation.',
    solution: 'Crafted a fast-buying experience with smooth cart increments, custom color swatches that animate on click, and responsive card sizing filters.',
    tools: ['React API Hooks', 'Vite Modules', 'Lucide UI', 'motion'],
    beforeImage: 'Stale catalog pages with slow-loading links, tiny checkboxes, and hidden summary tabs.',
    afterImage: 'Clean grid of beautiful items, floating animated Cart bubble, and immediate cart drawer checkout views.',
    liveUrl: '#ecommerce-sandbox',
    color: '#10B981',
    planetSize: 72,
    planetColor: 'radial-gradient(circle, #10B981 0%, #062419 80%)',
    coordinate: { x: 80, y: 68 },
    iframeMockType: 'ecommerce'
  },
  {
    id: 'mytube',
    title: 'MyTube Video Platform',
    category: 'Interactive Media Studio',
    description: 'Cinematic layout video manager featuring mock player state APIs and keyboard controls.',
    longDescription: 'Built a sleek display platform targeting custom video producers, allowing quick immersive screenings, metadata tabs, and beautiful overlay cards.',
    problem: 'Video creators rely on generic sharing apps heavily polluted with recommendations and ads, losing prospective subscribers.',
    solution: 'Engineered a theater-focused interface with dynamic fluid grids, responsive playlist menus, and dark ambient side panels.',
    tools: ['TypeScript React', 'Local Storage logs', 'Tailwind transitions', 'motion layouts'],
    beforeImage: 'Confused layout with comments overflowing video grids and low-resolution thumbnails.',
    afterImage: 'Cinematic theater main panel, scrolling clean tabs, fluid video progress simulator, and high-fidelity gradients.',
    liveUrl: '#mytube-sandbox',
    color: '#EF4444',
    planetSize: 68,
    planetColor: 'radial-gradient(circle, #EF4444 0%, #300A0A 80%)',
    coordinate: { x: 15, y: 78 },
    iframeMockType: 'mytube'
  }
];

export const ALL_SKILLS: Skill[] = [
  {
    id: 'html',
    name: 'HTML5 Semantic Core',
    category: 'core',
    level: 98,
    glowColor: '#FF6A00',
    description: 'Architecting fully standards-compliant, web-accessible DOM structures that search engines crawl flawlessly.',
    pulseSpeed: 'spin-slow'
  },
  {
    id: 'css',
    name: 'Tailwind CSS & Animation',
    category: 'core',
    level: 95,
    glowColor: '#4DA3FF',
    description: 'Forging fluid custom configurations, responsive layout grids, and complex GPU-accelerated transition curves.',
    pulseSpeed: 'spin-reverse-slow'
  },
  {
    id: 'js',
    name: 'Modern JS / TypeScript',
    category: 'core',
    level: 90,
    glowColor: '#F7DF1E',
    description: 'Integrating component-driven architecture, declarative state management, custom hooks, and absolute type safety.',
    pulseSpeed: 'pulse'
  },
  {
    id: 'uiux',
    name: 'Holographic UI/UX Design',
    category: 'design',
    level: 94,
    glowColor: '#A855F7',
    description: 'Crafting responsive wireframes, pixel-perfect layouts, color systems, typography pairs, and user-centered design sprints.',
    pulseSpeed: 'spin-slow'
  },
  {
    id: 'git',
    name: 'Git & Version Pipelines',
    category: 'system',
    level: 88,
    glowColor: '#10B981',
    description: 'Collaborative development tracking, precise commits, merge conflict resolution, and immediate production deployment pipelines.',
    pulseSpeed: 'spin-fast'
  }
];

export const ALL_SERVICES: Service[] = [
  {
    id: 'web-design',
    title: 'Elite UI/UX Website Design',
    description: 'Pixel-perfect, gorgeous mockups and custom interactive visual prototypes in Figma and live React code.',
    priceRange: '$500 - $1,500',
    deliveryTime: '5-7 Days',
    features: ['Custom Visual Themes', 'Full Interactive Prototypes', 'Responsive Grid Strategy', 'Clean Typography Pairings', 'Premium Icon Assets'],
    iconName: 'Layout',
    color: '#4DA3FF'
  },
  {
    id: 'business-site',
    title: 'Premium Business Websites',
    description: 'Highly credible digital real estate designed specifically to drive company leads, sales, and client trust.',
    priceRange: '$1,200 - $3,000',
    deliveryTime: '10-14 Days',
    features: ['High-Conversion Landing Grid', 'SEO Content Strategy Ready', 'Lead Capture Automation', 'Interactive Contact Lanes', 'Analytics Dashboard Integration'],
    iconName: 'Briefcase',
    color: '#A855F7'
  },
  {
    id: 'church-platform',
    title: 'Church Platforms & Hubs',
    description: 'Digital hubs designed to host sermons, accept donations, log prayers, and keep congregations connected.',
    priceRange: '$900 - $2,500',
    deliveryTime: '8-12 Days',
    features: ['Media Player Integration', 'Interactive Prayer Walls', 'Secure Donation Connections', 'Mobile-First Event Schedules', 'Digital Bulletins Archive'],
    iconName: 'Heart',
    color: '#FF6A00'
  },
  {
    id: 'school-system',
    title: 'School Management Portals',
    description: 'Comprehensive administrative dashboard pipelines facilitating smooth class logs, grades, and records.',
    priceRange: '$2,000 - $5,000',
    deliveryTime: '14-21 Days',
    features: ['Administrative Control Panel', 'Student Performance Analytics', 'Fast Results Creator', 'Billing Status Trackers', 'SMS/Email Alerts Dispatcher'],
    iconName: 'GraduationCap',
    color: '#10B981'
  },
  {
    id: 'landing-page',
    title: 'High-Impact Landing Pages',
    description: 'Ultra-fast, single-focus landing pages tailored for product launches, ad campaigns, and list subscriptions.',
    priceRange: '$400 - $800',
    deliveryTime: '3-5 Days',
    features: ['Scroll-Trigger Animations', 'High Contrast Call-to-Actions', 'A/B Test Ready Structures', 'Responsive Image CDN Setup', 'Fast Contact Channels'],
    iconName: 'Zap',
    color: '#F7DF1E'
  },
  {
    id: 'web-redesign',
    title: 'Complete Website Redesigns',
    description: 'Transforming legacy, outdated, or slow platforms into modern, pixel-perfect, hyper-fast digital experiences.',
    priceRange: '$700 - $2,000',
    deliveryTime: '5-10 Days',
    features: ['UX Usability Overhaul', 'Aesthetic Modernization', 'Speed Optimization (100% Core Web Vitals)', 'Broken Link Remediation', 'Modern Framework Upgrades'],
    iconName: 'Sparkles',
    color: '#EF4444'
  }
];

export const ALL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'David Adeleke',
    role: 'Principal Administrator',
    company: 'Supreme Academy',
    comment: "Ajayi built our administrative school system, and it changed how we track student registries and fee details. The dashboard is shockingly simple to navigate, and parents love the layout. He is a genius!",
    rating: 5,
    avatarSeed: 'supreme',
    date: 'Jan 2026'
  },
  {
    id: 't2',
    name: 'Pastor Samuel Adebayo',
    role: 'Lead Shepherd',
    company: 'Sanctuary of Grace Ministry',
    comment: 'The spiritual care and aesthetic precision Ajayi brought to our platform is remarkable. Users browse live stream services seamlessly, and we have received comments globally on how warm and professional the portal feels.',
    rating: 5,
    avatarSeed: 'sanctuary',
    date: 'Mar 2026'
  },
  {
    id: 't3',
    name: 'Amanda Jenkins',
    role: 'Marketing Director',
    company: 'Vertex Digital Solutions',
    comment: 'Most developers write code but ignore design. Ajayi Covenant combines world-class UX research with rapid React engineering. Our landing page conversion rate increased by 42% in weeks. Absolutely recommended!',
    rating: 5,
    avatarSeed: 'vertex',
    date: 'May 2026'
  },
  {
    id: 't4',
    name: 'Michael Chen',
    role: 'Founder',
    company: 'Nova Apparel Group',
    comment: 'Our e-commerce store is exceptionally tactile. The animations on items, the smooth transition when moving products to the card, and the sizing chart designed by Ajayi are stellar. A top-tier front-end engineer.',
    rating: 5,
    avatarSeed: 'nova',
    date: 'Apr 2026'
  }
];
