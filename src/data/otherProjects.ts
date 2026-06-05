import { OtherProject } from '@/types';

const otherProjects: OtherProject[] = [
  {
    title: 'HonorLog',
    description:
      'A public student achievement display system built for Shorinkai India. A real-time leaderboard and recognition board for martial arts dojo students, tracking achievements, ranks, and milestones.',
    techStack: ['TypeScript', 'React', 'Supabase'],
    githubUrl: 'https://github.com/ull0sm/HonorLog',
  },
  {
    title: 'Category Manager',
    description:
      'A category and content management module built as part of the Shorinkai India internal tooling suite. Handles hierarchical content organization with admin controls and live preview.',
    techStack: ['TypeScript', 'React', 'Node.js'],
  },
  {
    title: 'FTP Client with GUI',
    description:
      'A desktop FTP application with a clean graphical interface for file transfers, directory browsing, and connection management. Supports drag-and-drop uploads and real-time transfer progress.',
    techStack: ['Python', 'Tkinter', 'ftplib'],
  },
  {
    title: 'IoT Fire Alarm System',
    description:
      'A hardware-software IoT solution for fire detection using temperature and smoke sensors. Features real-time alerts, a monitoring dashboard, and automated emergency notifications.',
    techStack: ['Arduino', 'Python', 'MQTT', 'IoT'],
  },
  {
    title: 'Point of Sale (POS)',
    description:
      'A lightweight point-of-sale system with inventory management, sales tracking, receipt generation, and a clean UI for retail workflows.',
    techStack: ['Python', 'SQLite', 'Tkinter'],
  },
];

export default otherProjects;
