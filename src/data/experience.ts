import { Job } from '@/types';

const experienceData: Job[] = [
  {
    company: 'xxxxxxxx International School',
    title: 'Freelance Software Developer',
    dateRange: 'June 2026 – Present',
    bullets: [
      "Implementing a complete <strong>redesign and modernization</strong> of the school's public website to improve user experience and accessibility.",
      'Re-architecting the platform for <strong>high performance</strong> using asset optimization and server-side caching.',
      'Reducing <strong>page load times</strong> by optimizing media delivery, implementing lazy loading, and improving frontend rendering performance.',
      'Designing a modern <strong>admissions-focused experience</strong> to improve parent engagement and inquiry conversion rates.',
    ],
  },
  {
    company: 'Shorinkai India',
    companyUrl: 'https://entrydesk.shorinkai.in',
    title: 'Software Developer Intern',
    dateRange: 'Dec 2025 to May 2026',
    bullets: [
      'Built and deployed <strong>EntryDesk</strong>, a full-stack TypeScript event management dashboard with separate organizer and coach portals for karate competition entries. It is actively used at live tournaments.',
      'Built <strong>HonorLog</strong>, a public real-time student achievement leaderboard for the dojo, tracking ranks, belts, and milestone achievements with live updates.',
      'Built a <strong>Category Management</strong> tool to handle hierarchical bracket seeding and group allocation for multi-discipline sports events, replacing a manual spreadsheet workflow.',
    ],
  },
];

export default experienceData;
