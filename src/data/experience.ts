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
    dateRange: 'Dec 2025 – Present',
    roles: [
      {
        title: 'Technical Operations Lead',
        dateRange: 'June 2026 – Present',
        bullets: [
          'Direct end-to-end <strong>on-site technical operations</strong> across live championships, ensuring 100% uptime and seamless execution across all tournament platforms (EntryDesk, RingFlow, HonorLog).',
          'Led an <strong>8-member tournament operations team</strong> across two CISCE karate championships, coordinating live tournament scheduling, category assignments, score updates, and prize administration for <strong>400+ participants</strong> at each event.',
          'Lead real-time incident resolution, network/device failover management, and tournament readiness to guarantee zero disruption to live match schedules.',
        ],
      },
      {
        title: 'Software Developer Intern',
        dateRange: 'Dec 2025 – May 2026',
        bullets: [
          'Co-developed <strong>EntryDesk</strong>, a full-stack TypeScript event management platform with organizer and coach portals, contributing to its design, development, deployment, and maintenance for live karate tournaments.',
          'Co-developed <strong>RingFlow</strong> (Next.js, TypeScript, Supabase), a live tournament management system that balanced ring workloads, tracked match progress, and delivered real-time updates to athletes, coaches, and spectators via <strong>Supabase Realtime</strong>.',
          'Co-developed <strong>HonorLog</strong>, a public student-achievement directory featuring <strong>fuzzy search (Fuse.js)</strong>, tournament and medal history, role-based administration, audit logging, and JSON/XLSX bulk import.',
        ],
      },
    ],
  },
  {
    company: 'Once UI | Longhorn Developers',
    companyUrl: 'https://github.com/once-ui-system/core',
    title: 'Open Source Contributor',
    dateRange: 'Apr 2026 – Jul 2026',
    bullets: [
      "Debugged and fixed a touch-interaction defect in Once UI's <strong>Button/ToggleButton</strong> components, eliminating false hover states on mobile while preserving keyboard accessibility (<a href='https://github.com/once-ui-system/core/pull/71' target='_blank' rel='noopener noreferrer'>PR #71</a>).",
      "Designed and shipped a <strong>numeric-sizes shorthand API</strong> for Once UI's Media component, removing repetitive boilerplate for a common responsive-image use case (<a href='https://github.com/once-ui-system/core/pull/72' target='_blank' rel='noopener noreferrer'>PR #72</a>).",
      "Resolved UI/dashboard styling inconsistencies in <strong>Degree-Audit-Plus</strong> against Figma specs, improving visual accuracy across GPA and credit-tracking cards (<a href='https://github.com/Longhorn-Developers/Degree-Audit-Plus/pull/194' target='_blank' rel='noopener noreferrer'>PR #194</a>).",
    ],
  },
];

export default experienceData;

