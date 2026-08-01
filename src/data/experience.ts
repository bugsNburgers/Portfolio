import { Job } from '@/types';

const experienceData: Job[] = [
  {
    company: 'Karnataka State Lawn Tennis Association',
    title: 'Freelance Software Developer',
    dateRange: 'June 2026 – Present',
    bullets: [
      "Developed and delivered the <strong>MVP</strong>, securing project approval and selection directly from the club's <strong>Vice President</strong>.",
      "Collaborated with an external UI/UX team while owning <strong>end-to-end development</strong> of a jargon-free platform architected to scale to <strong>2,000+ active users</strong>.",
      "Own the ongoing development lifecycle, defining future technical requirements based on progress analysis and user feedback.",
    ],
  },
  {
    company: 'Shorinkai India',
    companyUrl: 'https://entrydesk.shorinkai.in',
    title: 'Software Developer Intern',
    dateRange: 'Dec 2025 – May 2026',
    bullets: [
      'Co-developed <strong>EntryDesk</strong>, a full-stack TypeScript event management platform with organizer and coach portals, contributing to its design, development, deployment, and maintenance for live karate tournaments.',
      'Analyzed, debugged, and resolved live production issues during tournament operations, maintaining <strong>100% system uptime</strong> across deployments.',
      'Co-developed <strong>RingFlow</strong> (Next.js, TypeScript, Supabase), a live tournament management system that balanced ring workloads, tracked match progress, and delivered real-time updates to athletes, coaches, and spectators via <strong>Supabase Realtime</strong>.',
      'Co-developed <strong>HonorLog</strong>, a public student-achievement directory featuring <strong>fuzzy search (Fuse.js)</strong>, tournament and medal history, role-based administration, audit logging, and JSON/XLSX bulk import.',
      'Led an <strong>8-member tournament operations team</strong> across two CISCE karate championships, coordinating live tournament scheduling, category assignments, score updates, and prize administration for <strong>400+ participants</strong> at each event.',
    ],
  },
];

export default experienceData;
