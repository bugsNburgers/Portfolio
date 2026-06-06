import { NowData } from '@/types';

const nowData: NowData = {
  cards: [
    {
      category: 'building',
      title: 'GitVital: GitHub Health Dashboard',
      description:
        'Iterating on GitVital: adding AI-powered repo recommendations, improving the bus factor algorithm, and building out the global developer leaderboard. Live at gitvital.com.',
    },
    {
      category: 'learning',
      title: 'Systems Design & Distributed Systems',
      description:
        'Deep-diving into distributed systems: consensus algorithms, CAP theorem, and how databases handle replication. Also exploring how these concepts apply to building reliable web APIs.',
    },
    {
      category: 'reading',
      title: 'Designing Data-Intensive Applications',
      description:
        "Martin Kleppmann's book is genuinely excellent. Currently on the chapter covering replication strategies and why eventual consistency is harder than it sounds.",
    },
    {
      category: 'exploring',
      title: 'Open Source Contributions',
      description:
        'Contributing to Once UI, an indie design system for Next.js apps. Recently had 2 PRs merged: fixed touch hover behavior for Button components and added numeric sizes shorthand for the Media component.',
    },
  ],

};

export default nowData;
