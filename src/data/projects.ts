import { FeaturedProject } from '@/types';

export const featuredProjects: FeaturedProject[] = [
  {
    title: 'GitVital',
    description:
      'A composite repo-health scoring engine powered by an asynchronous BullMQ/Redis worker pipeline for multi-thousand-commit ingestion and a self-throttling GitHub GraphQL client (5,000-pt/hr quota). Features dynamic weight-redistributing health scoring, bus-factor risk analysis, and Gemini API integration for AI repo insights.',
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'Redis', 'BullMQ', 'GitHub GraphQL API', 'Gemini API'],
    githubUrl: 'https://github.com/bugsNburgers/GitVital',
    externalUrl: 'https://gitvital.com',
    image: '/images/projects/gitvital.png',
    imageAlt: 'GitVital dashboard showing repository health metrics',
  },
  {
    title: 'AI-Based Personal Stylist',
    description:
      'An AI-powered personal stylist that extracts garment-level representations from real images using DeepFashion2 annotations and CLIP embeddings, forming the foundation for outfit compatibility and trend-aware fashion recommendation.',
    techStack: ['Python', 'CLIP', 'DeepFashion2', 'PyTorch', 'Computer Vision'],
    githubUrl: 'https://github.com/bugsNburgers/AI-based-personal-stylist',
    image: '/images/projects/AIPPS.png',
    imageAlt: 'AI Personal Stylist garment detection interface',
  },
  {
    title: 'EntryDesk',
    description:
      'A TypeScript-based dashboard for managing karate and other sports events, built for Shorinkai India. Features separate organizer and coach portals to handle events, participants, and competition entries end to end.',
    techStack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'REST API'],
    githubUrl: 'https://github.com/ull0sm/EntryDesk',
    externalUrl: 'https://entrydesk.shorinkai.in',
    image: '/images/projects/entrydesk.png',
    imageAlt: 'EntryDesk sports event management dashboard',
  },
];
