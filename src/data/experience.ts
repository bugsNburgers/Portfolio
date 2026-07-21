import { Job } from '@/types';

const experienceData: Job[] = [
  {
    company: 'Karnataka State Lawn Tennis Association',
    title: 'Freelance Software Developer', // Feel free to adjust the title if needed
    dateRange: 'June 2026 – Present',
    bullets: [
      "Developed and delivered the <strong>Minimum Viable Product (MVP)</strong>, successfully securing project approval and selection directly from the club's <strong>Vice President</strong>.",
      "Collaborated with an external startup on the <strong>UI/UX design</strong> while taking full ownership of the <strong>end-to-end software development</strong>.",
      "Engineered a streamlined, jargon-free platform focused on <strong>ultimate simplicity</strong>, scaling to support an anticipated <strong>2,000+ users</strong>.",
      "Currently managing the ongoing development lifecycle and analyzing current progress to define <strong>future technical requirements</strong>."
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
      'Led a team of 7 to successfully deploy the software ecosystem live at a major event at <strong>Christ ICSE Bangalore (Kengeri)</strong>, seamlessly managing <strong>400+ participants</strong> while ensuring <strong>100% system uptime</strong>.',
    ],
  },
];

export default experienceData;
