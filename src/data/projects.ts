import { FeaturedProject } from '@/types';

export const featuredProjects: FeaturedProject[] = [
  {
    title: 'GitVital',
    description:
      'A composite repo-health scoring engine ingesting GitHub REST/GraphQL data, weighting commit velocity, issue resolution time, and contributor churn into a single score. Features a bus-factor risk model analyzing commit-distribution concentration and Redis caching with Next.js App Router.',
    techStack: ['Next.js', 'TypeScript', 'GitHub API', 'Redis'],
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
