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
    id: 'project-alpha',
    title: 'Project Alpha',
    subtitle: 'Real-time Collaboration Platform',
    description:
      'A high-performance collaborative workspace enabling teams to build, iterate, and ship together in real time.',
    impact: [
      'Reduced team sync latency by 94% with CRDT-based state resolution',
      '12K+ concurrent users in production with sub-50ms response',
      'Adopted by 3 enterprise clients within first quarter',
    ],
    tags: ['TypeScript', 'React', 'WebSocket', 'Redis'],
    year: 2025,
    github: 'https://github.com/dhanvi/project-alpha',
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
