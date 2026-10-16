/* ═══════════════════════════════════════════════════════════════
   DHANVI — Portfolio Data Layer
   All content separated from components.
   Components import data — never hardcode.
   ═══════════════════════════════════════════════════════════════ */

// ── Types ──

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  impact: string[];
  tags: string[];
  year: number;
  image?: string;
  images?: string[];
  imagePositions?: string[];
  tileLabels?: string[];
  link?: string;
  github?: string;
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
  result: string;
  year: number;
  statement?: string;
  images?: string[];
  imagePositions?: string[];
  tileLabels?: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  icon?: string;
}

export interface CreatorInfo {
  name: string;
  firstName: string;
  tagline: string;
  title: string;
  location: string;
  email: string;
  socials: SocialLink[];
}

export interface NavigationNode {
  id: string;
  label: string;
  description: string;
  href: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  year: number;
  date: string;
  location: string;
  description: string;
  tags: string[];
  image: string;
  note?: string;
  rotation?: number;
  gradient?: string;
  aspect?: string;
  metrics?: string;
}

export interface HobbyItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  highlights: string[];
  accentColor: string;
  tag: string;
}

export interface AboutTimeline {
  year: string;
  role: string;
  company: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

// ── Creator ──

export const creator: CreatorInfo = {
  name: 'DHANVI',
  firstName: 'Dhanvi',
  tagline: 'Builder. Creator. Engineer.',
  title: 'Full-Stack Developer & Creative Technologist',
  location: 'India',
  email: 'narra.dhanvi@gmail.com',
  socials: [
    {
      platform: 'GitHub',
      url: 'https://github.com/dhanvi',
      label: 'github/dhanvi',
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/narra-dhanvi-65a63b2b9',
      label: 'in/narra-dhanvi',
    },
    {
      platform: 'Twitter',
      url: 'https://x.com/dhanvi',
      label: '@dhanvi',
    },
  ],
};

// ── Projects ──

export const projects: Project[] = [
  {
    id: 'sih-bro',
    title: 'SIH Bro',
    subtitle: 'Smart Problem Statement Ranking Copilot',
    description:
      'Built SIH Bro for teams that are looking to win SIH 2026. Smart application that ranks teams to their appropriate problem statement mathematically.',
    impact: [
      'Over 30 concurrent users during peak team formation',
      'Helped 100+ users with their problem statement related queries',
      'Many positive reviews and strong community engagement on LinkedIn',
    ],
    tags: ['Next.js', 'TypeScript', 'CSS', 'Vercel', 'SessionStorage'],
    year: 2026,
    images: [
      '/projects/sihbro-1.png',
      '/projects/sihbro-2.png',
      '/projects/sihbro-3.png',
    ],
    tileLabels: ['01 // COPILOT UI', '02 // SESSION KEY', '03 // ARCHITECTURE'],
    link: 'https://sih-bro.vercel.app',
  },
  {
    id: 'razorpace-ai',
    title: 'Razorpace AI',
    subtitle: 'Agentic Commerce & Merchant Growth',
    description:
      'Agentic commerce platform connecting AI buyers with merchant intelligence, deterministic financial controls, and Razorpay payments.',
    impact: [
      '27.4% AOV increase — ₹14,299 → ₹15,480 in control-vs-test benchmark',
      '100% policy adherence across defined financial constraints',
      '100% machine-readable catalog with auditable Razorpay transactions',
    ],
    tags: ['TypeScript', 'LangGraph', 'Python', 'Razorpay', 'Agentic AI'],
    year: 2026,
    images: [
      '/projects/razorpace-1.png',
      '/projects/razorpace-2.png',
      '/projects/razorpace-3.png',
    ],
    imagePositions: ['left center', 'left top', 'left top'],
    tileLabels: ['01 // COMMERCE ENGINE', '02 // MERCHANT DASHBOARD', '03 // AGENT TRACE & RAILS'],
  },
  {
    id: 'hemoconnect',
    title: 'HemoConnect',
    subtitle: 'AI-Powered Thalassemia Care',
    description:
      'Unified healthcare platform combining report analysis, donor—patient matching, blood delivery tracking, and community support.',
    impact: [
      'OCR + ML converts uploaded blood reports into diagnostic insights',
      'AI donor matchmaking connects patients and donors using location/context',
      'Blockchain-backed delivery provides blood-order and tracking infrastructure',
    ],
    tags: ['React', 'Python', 'Machine Learning', 'Tesseract OCR', 'Polygon'],
    year: 2025,
    images: [
      '/projects/hemoconnect-1.png',
      '/projects/hemoconnect-2.png',
      '/projects/hemoconnect-3.png',
    ],
    imagePositions: ['center center', 'left top', 'left center'],
    tileLabels: ['01 // ECOSYSTEM HERO', '02 // AI REPORT INSIGHTS', '03 // GEO DONOR MATCH'],
  },
  {
    id: 'ynotme',
    title: 'YnotMe',
    subtitle: 'Real-Time AI Conversation Coach',
    description:
      'Real-time conversation intelligence that transcribes live conversations, extracts context, and generates contextual coaching through an evolving knowledge graph.',
    impact: [
      'Selected in Top 100 teams out of 31,000+ builders worldwide',
      '8-second rolling audio pipeline designed for live conversational feedback',
      'Sarvam AI handles speech transcription and conversation reasoning',
      'Neo4j knowledge graph persists extracted conversational context',
    ],
    tags: [
      'React Native',
      'Expo SDK 54',
      'TypeScript',
      'Express',
      'Sarvam AI',
      'Neo4j',
      'Supabase',
      'expo-audio',
    ],
    year: 2026,
    images: [
      '/projects/ynotme-1.jpeg',
      '/projects/ynotme-2.jpeg',
      '/projects/ynotme-3.jpeg',
    ],
    imagePositions: ['center top', 'center top', 'center center'],
    tileLabels: ['01 // APP INTERFACE', '02 // LIVE COACHING', '03 // MEMORY GRAPH'],
  },
];

// ── Achievements ──

export const achievements: Achievement[] = [
  {
    id: 'achievement-datavortex',
    title: 'Datavortex KLU Hackathon',
    event: 'KL University Hackathon 2025',
    result: '2ND RUNNER UP',
    year: 2025,
    statement:
      'Built an end-to-end AI application for thalassemia patients — providing automated blood report diagnostics, intelligent donor matchmaking, and blood supply logistics.',
    images: [
      '/achievements/datavortex-1.jpeg',
      '/achievements/datavortex-2.jpeg',
      '/achievements/datavortex-3.jpeg',
    ],
    imagePositions: ['center center', 'center 30%', 'center 30%'],
    tileLabels: ['01 // PARTICIPANT ACCESS', '02 // AWARD CEREMONY', '03 // 2ND RUNNER UP'],
  },
  {
    id: 'achievement-ynotme',
    title: 'Top 100 Teams',
    event: '31,000+ Builders Challenge · HackHazards \'26',
    result: 'TOP 100',
    year: 2025,
    statement:
      'Selected in top 100 teams out of 31,000+ builders worldwide. Built YnotMe — real-time AI conversation coach powered by speech intelligence and persistent memory graphs.',
    images: [
      '/achievements/top100-1.jpeg',
      '/achievements/top100-2.jpeg',
      '/achievements/top100-3.jpeg',
    ],
    imagePositions: ['center center', 'center top', 'center top'],
    tileLabels: ['01 // MEMORY GRAPH', '02 // LIVE COPILOT', '03 // OFFICIAL SELECTION'],
  },
  {
    id: 'achievement-codewithflow',
    title: 'Code With Flow',
    event: 'National Hackathon Challenge 2026',
    result: '3RD PLACE',
    year: 2026,
    statement:
      'Effectively used base44 for incorporating AI agent built websites, demonstrating high-velocity autonomous web deployment and full-stack generation.',
    images: [
      '/achievements/codewithflow-1.jpeg',
      '/achievements/codewithflow-2.jpeg',
      '/achievements/codewithflow-3.jpeg',
    ],
    imagePositions: ['center center', 'center center', 'center center'],
    tileLabels: ['01 // BASE44 SPONSOR', '02 // SHORTLISTED', '03 // 3RD PLACE RANKING'],
  },
  {
    id: 'achievement-headofevents',
    title: 'Head of Events',
    event: 'App & Web Development Club · 2025 - 2026',
    result: '1,000+ STUDENTS',
    year: 2026,
    statement:
      'Head of Events (2025 – 2026) — coordinated technical initiatives, hands-on engineering workshops, and flagship hackathons involving 1,000+ students.',
    images: [
      '/achievements/headofevents-1.jpeg',
      '/achievements/headofevents-2.jpeg',
      '/achievements/headofevents-3.jpeg',
    ],
    imagePositions: ['center 20%', 'center 20%', 'center 30%'],
    tileLabels: ['01 // LAB MENTORING', '02 // TECH WORKSHOP', '03 // ORGANIZING TEAM'],
  },
  {
    id: 'achievement-hackathonbug',
    title: 'Hackathon Bug',
    event: 'Competitive Hackathon Circuit',
    result: '4W · 18F',
    year: 2026,
    statement:
      '4-time winner and 18-time finalist across national and collegiate hackathons. Relentless builder with active participation in many more competitive sprints.',
    images: [
      '/achievements/hackathonbug-1.jpeg',
      '/achievements/hackathonbug-2.jpeg',
      '/achievements/hackathonbug-3.jpeg',
    ],
    imagePositions: ['center 25%', 'center 20%', 'center 30%'],
    tileLabels: ['01 // NIGHT SPRINT', '02 // 18X FINALIST', '03 // SPEED PROTOTYPING'],
  },
];

// ── Navigation Nodes ──

export const navigationNodes: NavigationNode[] = [
  {
    id: 'node-projects',
    label: 'Projects',
    description: 'Selected works',
    href: '#projects',
  },
  {
    id: 'node-achievements',
    label: 'Achievements',
    description: 'Recognition & impact',
    href: '#achievements',
  },
  {
    id: 'node-about',
    label: 'About',
    description: 'Experience & journey',
    href: '#about',
  },
  {
    id: 'node-contact',
    label: 'Contact',
    description: 'Get in touch',
    href: '#contact',
  },
  {
    id: 'node-gallery',
    label: 'Gallery',
    description: 'Visual archive',
    href: '#gallery',
  },
  {
    id: 'node-hobby',
    label: 'Hobby',
    description: 'Beyond the code',
    href: '#hobby',
  },
];

// ── Boot Sequence Lines ──

export const bootLines: string[] = [
  'DHANVI SYSTEMS v1.0.0',
  'Initializing runtime environment...',
  'Loading portfolio modules...',
  'Mounting creative engine...',
  'Establishing visual pipeline...',
  'All systems operational.',
];

// ── Gallery Items (Nostalgic Memory Archive) ──

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-built-with-v0',
    title: 'Built With v0 Meetup',
    category: 'Tech Meets',
    year: 2026,
    date: 'FEB 2026',
    location: 'Bengaluru, India',
    description: 'Captured in real Polaroid film — rapid AI prototyping and interface experimentation at the official v0 builders meetup.',
    note: 'Holding a genuine Polaroid instant print while live-coding v0 on the laptop.',
    tags: ['v0', 'Vercel', 'Next.js', 'Polaroid', 'AI Prototyping'],
    image: '/gallery/built-with-v0.jpeg',
    rotation: -1.8,
  },
  {
    id: 'gal-msft-neo4j',
    title: 'Microsoft & Neo4j Tech Summit',
    category: 'Tech Meets',
    year: 2026,
    date: 'JAN 2026',
    location: 'Microsoft Campus',
    description: 'Deep-dive explorations on enterprise graph databases, persistent Neo4j conversational memory graphs, and agentic workflows.',
    note: '“Aspiring Microsoft employee” moment beneath the iconic logo wall.',
    tags: ['Microsoft', 'Neo4j', 'Knowledge Graphs', 'AI Architecture'],
    image: '/gallery/msft-neo4j.jpeg',
    rotation: 1.5,
  },
  {
    id: 'gal-cube-2026-group',
    title: 'CUBE 2026 Buildathon — Architecture Circle',
    category: 'Build Sessions',
    year: 2026,
    date: 'MAR 2026',
    location: 'CUBE Tech Hub',
    description: 'Leading the developer team through core system architecture, deterministic financial safeguards, and autonomous agent loops.',
    note: 'The best engineering breakthroughs happen huddled around a single laptop.',
    tags: ['Buildathon', 'System Architecture', 'Syden Team', 'Sprint'],
    image: '/gallery/cube-2026-group.jpeg',
    rotation: -1.2,
  },
  {
    id: 'gal-cube-2026-closeup',
    title: 'In The Zone // CUBE Buildathon',
    category: 'Build Sessions',
    year: 2026,
    date: 'MAR 2026',
    location: 'CUBE Tech Hub',
    description: 'Total focus at the keyboard. Debugging concurrent state pipelines and real-time streaming sockets before the buzzer sounded.',
    note: 'Sub-millisecond latency or bust — relentless sprint mode.',
    tags: ['Focus Mode', 'High Velocity', 'Engineering', 'Sprint'],
    image: '/gallery/cube-2026-closeup.jpeg',
    rotation: 2.1,
  },
  {
    id: 'gal-devcon-group',
    title: 'Devcon Builders Night',
    category: 'Tech Meets',
    year: 2025,
    date: 'DEC 2025',
    location: 'Draper Startup House',
    description: 'Rooftop summit with passionate founders, distributed systems engineers, and builders. Discussions that spanned decentralized tech till dawn.',
    note: '“Where founders go global” — unmatched builder camaraderie.',
    tags: ['Devcon', 'Draper Startup House', 'Founders', 'Networking'],
    image: '/gallery/devcon-group.jpeg',
    rotation: -2.3,
  },
  {
    id: 'gal-ai-bhoomi',
    title: 'AI Bhoomi Startup Weekend Pitch',
    category: 'Tech Meets',
    year: 2025,
    date: 'NOV 2025',
    location: 'AI Bhoomi Innovation Lab',
    description: 'Pitching system architecture, ML diagnostic models, and market impact to industry mentors, investors, and enterprise advisors.',
    note: 'Hands in motion, articulating complex systems with clarity and passion.',
    tags: ['AI Bhoomi', 'Pitch', 'Mentorship', 'Enterprise AI'],
    image: '/gallery/ai-bhoomi-2025.jpeg',
    rotation: 1.8,
  },
  {
    id: 'gal-msft-fabric',
    title: 'Microsoft Fabric Experience',
    category: 'Tech Meets',
    year: 2025,
    date: 'OCT 2025',
    location: 'Microsoft Campus',
    description: 'Golden hour outside Microsoft headquarters after an intensive hands-on workshop on enterprise analytics and real-time data pipelines.',
    note: 'Sunset over Microsoft campus with the squad after a day of deep tech.',
    tags: ['Microsoft Fabric', 'Data Analytics', 'Lakehouse', 'Campus'],
    image: '/gallery/msft-fabric.jpeg',
    rotation: -1.6,
  },
  {
    id: 'gal-miro-qwen',
    title: 'Miro x Qwen AI Hack Night',
    category: 'Tech Meets',
    year: 2026,
    date: 'FEB 2026',
    location: 'Innovation Arena',
    description: 'Exploring multimodal LLM reasoning with Qwen and visual canvas orchestration in Miro. The winning team post-demo celebration.',
    note: 'Post-demo victory energy. Visual thinking meets generative intelligence.',
    tags: ['Miro', 'Qwen AI', 'Multimodal', 'Hack Night'],
    image: '/gallery/miro-qwen-event.jpeg',
    rotation: 2.4,
  },
  {
    id: 'gal-trackshift-2026',
    title: 'Trackshift 2026 Sprint',
    category: 'Hackathons',
    year: 2026,
    date: 'JAN 2026',
    location: 'Draper Startup House',
    description: 'Backpacks, laptops, and relentless ambition. Sprinting 36 continuous hours to deliver full-stack innovation at Trackshift.',
    note: 'Draper Startup House — standing proudly in front of the 1 million entrepreneurs wall.',
    tags: ['Trackshift 2026', 'Draper House', '36hr Sprint', 'Hackathon'],
    image: '/gallery/trackshift-2026.jpeg',
    rotation: -2.0,
  },
  {
    id: 'gal-datavortex',
    title: 'Datavortex // 2nd Runner Up Podium',
    category: 'Awards',
    year: 2025,
    date: 'SEP 2025',
    location: 'KL University',
    description: 'Podium victory for HemoConnect — automated AI blood report diagnostics, intelligent donor matchmaking, and supply logistics.',
    note: 'Holding the giant winner cheque on stage with pride and gratitude.',
    tags: ['2nd Runner Up', 'HemoConnect', 'Podium Finish', 'National Hackathon'],
    image: '/achievements/datavortex-2.jpeg',
    rotation: 1.4,
  },
  {
    id: 'gal-top100',
    title: 'Top 100 Global Builders Challenge',
    category: 'Awards',
    year: 2026,
    date: 'JAN 2026',
    location: 'HackHazards \'26',
    description: 'Selected in top 100 teams out of 31,000+ builders worldwide for YnotMe — live speech intelligence and persistent memory graphs.',
    note: 'Officially selected in top 100 out of 31,000+ builders globally.',
    tags: ['Top 100', '31K+ Builders', 'YnotMe', 'Global Challenge'],
    image: '/achievements/top100-3.jpeg',
    rotation: -1.7,
  },
  {
    id: 'gal-hackathonbug',
    title: '3:00 AM Auditorium Hack Sprint',
    category: 'Hackathons',
    year: 2026,
    date: '2025 — 2026',
    location: 'Hackathon Circuit',
    description: 'Dark auditorium, glowing monitor screens, energy drinks, and keyboard clatter. 18x finalists and 4x victories born in nights like this.',
    note: 'The raw, irreplaceable magic of hackathon sprint nights at 3:00 AM.',
    tags: ['18x Finalist', '4x Winner', 'Night Sprint', 'Pure Code'],
    image: '/achievements/hackathonbug-1.jpeg',
    rotation: 2.2,
  },
  {
    id: 'gal-headofevents',
    title: 'App & Web Dev Club Flagship',
    category: 'Build Sessions',
    year: 2026,
    date: '2025 — 2026',
    location: 'Tech Auditorium',
    description: 'Leading the flagship technical initiative and hands-on engineering workshops empowering over 1,000+ student developers.',
    note: 'Head of Events — coordinating initiatives for 1,000+ students.',
    tags: ['Club Leadership', '1000+ Students', 'Tech Community', 'Mentorship'],
    image: '/achievements/headofevents-3.jpeg',
    rotation: -1.5,
  },
  {
    id: 'gal-codewithflow',
    title: 'Code With Flow // 3rd Place',
    category: 'Awards',
    year: 2026,
    date: 'FEB 2026',
    location: 'National Arena',
    description: 'Recognized for high-velocity autonomous web deployment and AI agent-driven architecture incorporating Base44.',
    note: '3rd Place award ceremony — sponsored by Base44.',
    tags: ['3rd Place', 'Base44', 'Agentic Web', 'National Hackathon'],
    image: '/achievements/codewithflow-1.jpeg',
    rotation: 1.6,
  },
];

// ── Hobby Pursuits (Beyond the Code) ──

export const hobbyItems: HobbyItem[] = [
  {
    id: 'hobby-synth',
    title: 'Modular Synthesizers & Sound Synthesis',
    subtitle: 'Eurorack Patching & Algorithmic Frequency Modulation',
    category: 'Acoustic Engineering',
    description: 'Crafting generative ambient soundscapes and rhythmic textures through analog modular synthesis, patch cables, and CV (control voltage) feedback loops. Exploring mathematics through audible waveforms.',
    highlights: [
      'Custom Eurorack modular rack with analogue VCOs, wavefolders & granular DSP',
      'Algorithmic sequencing inspired by Euclidean rhythms and cellular automata',
      'Original sound design for interactive web experiences and kinetic installations',
    ],
    accentColor: '#3edcc4',
    tag: 'ANALOG AUDIO',
  },
  {
    id: 'hobby-astronomy',
    title: 'Astrophotography & Orbital Mechanics',
    subtitle: 'Deep-Sky Long-Exposure Imaging & Celestial Tracking',
    category: 'Space Exploration',
    description: 'Photographing emission nebulae, distant galaxies, and lunar terminator ridges from high-altitude dark sky reserves. Deeply inspired by astrophysics, telemetry, and celestial mechanics.',
    highlights: [
      'Equatorial motorized tracking mount with autoguiding precision under 0.6 arcseconds',
      'Narrowband dual-band filtration (H-Alpha & O-III) capturing deep cosmic gases',
      'Translating orbital physics equations into digital gravitational simulation code',
    ],
    accentColor: '#4285F4',
    tag: 'COSMOLOGY',
  },
  {
    id: 'hobby-hardware',
    title: 'Hardware Prototyping & Custom Keyboards',
    subtitle: 'Microcontroller Programming, PCB Routing & Tactile Mechanics',
    category: 'Physical Computing',
    description: 'Soldering custom split ergonomic mechanical keyboards, designing custom CNC switch plates, and programming firmware on RP2040 and STM32 microcontrollers using QMK and Rust.',
    highlights: [
      'Hand-wired 36-key split columnar keyboards with custom OLED telemetry screens',
      'Custom macro pads with rotary encoders mapped to audio mixing and developer tools',
      'Embedded firmware in C / Rust for sub-1ms USB polling and custom matrix scanning',
    ],
    accentColor: '#FFD438',
    tag: 'HARDWARE',
  },
  {
    id: 'hobby-scifi',
    title: 'Sci-Fi Worldbuilding & Game Architecture',
    subtitle: 'Procedural Generation, Speculative Fiction & Simulation',
    category: 'Creative Direction',
    description: 'Writing speculative technical lore, architecting fictional planetary societies, and building small procedural terrain prototypes in Godot and custom Rust game engines.',
    highlights: [
      'Procedural planetary terrain generation utilizing simplex noise & hydraulic erosion',
      'Speculative industrial design documents for retro-futuristic spacecraft avionics',
      'Interactive narrative fiction exploring AI alignment and post-scarcity economies',
    ],
    accentColor: '#c43e3e',
    tag: 'SPECULATION',
  },
];

// ── About Page Datasets ──

export const aboutTimeline: AboutTimeline[] = [
  {
    year: '2025 — PRESENT',
    role: 'Lead Creative Technologist & Full-Stack Architect',
    company: 'Independent Practice / Autonomous Systems',
    description: 'Architecting high-throughput distributed architectures, real-time collaboration engines, and cutting-edge WebGPU spatial web applications.',
  },
  {
    year: '2024 — 2025',
    role: 'Systems Engineer & Research Fellow',
    company: 'Distributed Systems & Applied Crypto Lab',
    description: 'Conducted empirical research on zero-knowledge messaging networks, low-latency state resolution, and co-authored 3 conference papers.',
  },
  {
    year: '2023 — 2024',
    role: 'Full-Stack Developer & UI Engineer',
    company: 'Interactive Media & Creative Studios',
    description: 'Engineered high-performance web products, bespoke design systems, and animated interactive platforms for tech clients globally.',
  },
  {
    year: '2022 — 2023',
    role: 'Open-Source Contributor & Hackathon Competitor',
    company: 'Global Developer Community',
    description: 'Secured national hackathon championship victories and built open-source utilities reaching over 10K+ GitHub stars worldwide.',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Core Languages',
    skills: ['TypeScript', 'JavaScript (ESNext)', 'Python', 'Rust', 'C / C++', 'SQL', 'Go'],
  },
  {
    title: 'Frameworks & Runtimes',
    skills: ['Next.js 16', 'React 19', 'Node.js', 'Express', 'Flask', 'FastAPI', 'Tailwind / Vanilla CSS'],
  },
  {
    title: 'Graphics & Creative Tech',
    skills: ['WebGPU / WGSL', 'WebGL 2.0', 'GSAP Core', 'Three.js', 'Framer Motion', 'Canvas 2D', 'Shaders'],
  },
  {
    title: 'Systems, Cloud & Infra',
    skills: ['Docker', 'PostgreSQL', 'Redis', 'WebSockets', 'WebRTC', 'Vercel Edge', 'Cloudflare Workers', 'Supabase'],
  },
  {
    title: 'AI & Machine Learning',
    skills: ['OpenAI / ChatGPT API', 'Google Gemini', 'Anthropic Claude', 'Ollama (Local LLMs)', 'NumPy', 'Pandas', 'OpenCV'],
  },
];
