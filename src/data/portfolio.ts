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
  description: string;
  tags: string[];
  gradient: string;
  aspect: string;
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
  email: 'hello@dhanvi.dev',
  socials: [
    {
      platform: 'GitHub',
      url: 'https://github.com/dhanvi',
      label: 'github/dhanvi',
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/dhanvi',
      label: 'in/dhanvi',
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
    id: 'project-nexus',
    title: 'Nexus Engine',
    subtitle: 'AI-Powered Data Pipeline',
    description:
      'Intelligent data processing engine that automates extraction, transformation, and analysis at scale.',
    impact: [
      'Processes 2M+ records per hour with adaptive schema detection',
      'Cut manual data prep time from 6 hours to 12 minutes',
    ],
    tags: ['Python', 'Go', 'Kafka', 'ML'],
    year: 2025,
  },
  {
    id: 'project-cipher',
    title: 'Cipher Protocol',
    subtitle: 'End-to-End Encrypted Messaging',
    description:
      'Zero-knowledge messaging protocol with forward secrecy and decentralized key management.',
    impact: [
      'Zero metadata leakage verified through formal security audit',
      'Handles 50K messages/sec across distributed relay network',
      'Open-sourced with 4.2K GitHub stars',
    ],
    tags: ['Rust', 'Cryptography', 'P2P', 'WebRTC'],
    year: 2024,
    github: 'https://github.com/dhanvi/cipher',
  },
  {
    id: 'project-prism',
    title: 'Prism Engine',
    subtitle: 'GPU Spatial Simulation Engine',
    description:
      'Next-generation WebGPU graphics and physics engine delivering real-time volumetric lighting and spatial simulations in the browser.',
    impact: [
      'Sustained 120 FPS rendering across 500K+ dynamic physical particles',
      'Reduced GPU memory footprint by 65% via custom compute shader pipeline',
      'Featured in Web3D Global Showcase & ACM SIGGRAPH Community',
    ],
    tags: ['WebGPU', 'Rust', 'WGSL', 'TypeScript'],
    year: 2024,
    github: 'https://github.com/dhanvi/prism-engine',
  },
];

// ── Achievements ──

export const achievements: Achievement[] = [
  {
    id: 'achievement-hackathon',
    title: 'National Hackathon Champion',
    event: 'All India Engineering Hackathon',
    result: '1ST PLACE',
    year: 2025,
    statement: 'Built a real-time disaster response coordination system in 36 hours.',
  },
  {
    id: 'achievement-ynotme',
    title: 'Top 100 Teams',
    event: '31,000+ Builders Challenge',
    result: 'TOP 100',
    year: 2025,
    statement: 'Selected in top 100 teams out of 31,000+ builders. YnotMe — AI conversation coach focused on improving dates and getting better.',
  },
  {
    id: 'achievement-finalist',
    title: 'International Innovation Finalist',
    event: 'Global Student Innovation Challenge',
    result: 'TOP 5',
    year: 2025,
    statement: 'Selected from 2,400+ teams across 48 countries.',
  },
  {
    id: 'achievement-research',
    title: 'Published Researcher',
    event: 'IEEE & ACM Conferences',
    result: '3 PAPERS',
    year: 2024,
    statement: 'Distributed systems optimization and applied cryptography.',
  },
  {
    id: 'achievement-opensource',
    title: 'Open Source Recognition',
    event: 'GitHub Community',
    result: '10K+ STARS',
    year: 2025,
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

// ── Gallery Items (Visual Archive) ──

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-spatial-ui',
    title: 'Spatial Canvas Holography',
    category: 'Spatial Interface',
    year: 2025,
    description: 'Experimental 3D HUD interface utilizing WebGPU compute shaders, volumetric particle grids, and kinetic cursor distortion.',
    tags: ['WebGPU', 'WGSL', 'Spatial Audio', 'GLSL'],
    gradient: 'linear-gradient(135deg, #0b1e28 0%, #064047 50%, #3edcc4 100%)',
    aspect: 'wide',
    metrics: '120 FPS // 500K Particles',
  },
  {
    id: 'gal-kinetic-type',
    title: 'Kinetic Variable Glyph Engine',
    category: 'Generative Typography',
    year: 2025,
    description: 'Real-time procedural font morphing framework driven by sound frequency spectra and pointer velocity physics.',
    tags: ['Canvas 2D', 'Web Audio API', 'Physics Engine'],
    gradient: 'linear-gradient(135deg, #180924 0%, #43125e 50%, #c43e3e 100%)',
    aspect: 'square',
    metrics: 'Real-time FFT Analysis',
  },
  {
    id: 'gal-cyber-dock',
    title: 'Cybernetic Dock & HUD System',
    category: 'System Architecture',
    year: 2024,
    description: 'Industrial glassmorphic navigation shell designed for telemetry surveillance dashboards and mission control consoles.',
    tags: ['React', 'CSS Architecture', 'Hardware Accelerated'],
    gradient: 'linear-gradient(135deg, #09121a 0%, #152e3d 50%, #00f0ff 100%)',
    aspect: 'wide',
    metrics: 'Sub-millisecond Latency',
  },
  {
    id: 'gal-neural-topography',
    title: 'Neural Latent Topography',
    category: 'AI Visualization',
    year: 2024,
    description: 'Volumetric topographical landscape rendering continuous multi-dimensional latent embeddings in real-time raymarched scenes.',
    tags: ['Three.js', 'Raymarching', 'Embedding Visualization'],
    gradient: 'linear-gradient(135deg, #1f1406 0%, #4d2f09 50%, #ffd438 100%)',
    aspect: 'tall',
    metrics: '4D Dimension Projection',
  },
  {
    id: 'gal-quantum-clock',
    title: 'Quantum Orbit Chronometer',
    category: 'Interactive Installation',
    year: 2024,
    description: 'Precision atomic clock simulation tracking relativistic time dilations across gravitational wells with interactive celestial bodies.',
    tags: ['SVG Animation', 'Relativistic Math', 'GSAP Core'],
    gradient: 'linear-gradient(135deg, #0d1222 0%, #1c2748 50%, #3178c6 100%)',
    aspect: 'square',
    metrics: 'Microsecond Precision',
  },
  {
    id: 'gal-light-chamber',
    title: 'Anamorphic Light Chamber',
    category: 'Optical Simulation',
    year: 2023,
    description: 'Optical ray dispersion chamber demonstrating refraction, caustic generation, and chromatic chromaticity shifts through crystal prisms.',
    tags: ['Custom Shaders', 'Caustic Mapping', 'WebGL 2.0'],
    gradient: 'linear-gradient(135deg, #1f0b14 0%, #46142c 50%, #e70488 100%)',
    aspect: 'wide',
    metrics: 'Multi-bounce Caustics',
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
