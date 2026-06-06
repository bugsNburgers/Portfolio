import { OtherProject } from '@/types';

const otherProjects: OtherProject[] = [
  {
    title: 'HonorLog',
    description:
      'A real-time public student achievement display system built for Shorinkai India. Live leaderboard tracking martial arts ranks, belts, and milestone achievements for dojo students.',
    techStack: ['TypeScript', 'React', 'Supabase'],
    githubUrl: 'https://github.com/ull0sm/HonorLog',
    externalUrl: 'https://honorlog.shorinkai.in',
  },
  {
    title: 'Category Manager',
    description:
      'A bracket seeding and category management tool built for Shorinkai India sports events. Handles hierarchical content organization, group allocation, and bias-free draw systems for multi-discipline competitions.',
    techStack: ['TypeScript', 'React', 'Node.js'],
    githubUrl: 'https://github.com/ull0sm/symmetrical-spoon',
  },
  {
    title: 'FTP Application with GUI',
    description:
      'A Python client-server FTP application with a clean Tkinter GUI. Supports file uploads/downloads, directory browsing, and real-time transfer progress. Built from scratch using raw socket programming.',
    techStack: ['Python', 'Tkinter', 'Sockets'],
    githubUrl: 'https://github.com/bugsNburgers/FTP-Application-with-GUI',
  },
  {
    title: 'IoT Fire Alarm System',
    description:
      'An ESP32-based fire and smoke detection system with Blynk IoT cloud integration. Combines a flame sensor, MQ-2 smoke sensor, and DHT11 for real-time monitoring, with a Python desktop listener that auto-captures images on detection.',
    techStack: ['ESP32', 'Arduino', 'Python', 'Blynk IoT'],
    githubUrl: 'https://github.com/bugsNburgers/IOT-Fire-Alarm-System',
  },
  {
    title: 'Point of Sale (POS) Simulator',
    description:
      'A POS simulator implementing core retail transaction workflows: billing, inventory management, receipt generation, and role-based access. Built using agile/scrum practices as part of a team project.',
    techStack: ['Python', 'Streamlit', 'SQLite'],
    githubUrl: 'https://github.com/bugsNburgers/POS-Point-Of-Sales-Simulator',
  },
];

export default otherProjects;
