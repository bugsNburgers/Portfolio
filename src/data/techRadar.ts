// Tech Radar data — technologies I work with
// Grouped by category, all skills shown are ones I actively use

export type TechCategory = 'Languages' | 'Frontend' | 'Backend' | 'Tools & Platforms';

export interface TechItem {
  name: string;
  category: TechCategory;
  description?: string;
}

export const techRadarData: TechItem[] = [
  // Languages
  { name: 'JavaScript / TypeScript', category: 'Languages', description: 'Primary languages for full-stack engineering' },
  { name: 'C / C++', category: 'Languages', description: 'Systems programming, algorithms, low-level concepts' },
  { name: 'SQL', category: 'Languages', description: 'PostgreSQL — relational database queries & schemas' },
  { name: 'HTML / CSS', category: 'Languages', description: 'Semantic markup, modern layout, web accessibility' },

  // Frontend
  { name: 'Next.js', category: 'Frontend', description: 'App router, SSR, SSG, edge caching' },
  { name: 'React', category: 'Frontend', description: 'Component architecture, hooks, state management' },
  { name: 'Styled Components', category: 'Frontend', description: 'CSS-in-JS, component theming, design systems' },
  { name: 'Framer Motion', category: 'Frontend', description: 'Fluid micro-animations and layout transitions' },

  // Backend
  { name: 'Node.js', category: 'Backend', description: 'Backend runtime, REST APIs, async I/O' },
  { name: 'Redis', category: 'Backend', description: 'In-memory data store, edge caching, analytics speedup' },
  { name: 'BullMQ', category: 'Backend', description: 'Asynchronous distributed job & message queue pipeline' },
  { name: 'RESTful APIs & WebSockets', category: 'Backend', description: 'Real-time communication and robust web APIs' },
  { name: 'Supabase', category: 'Backend', description: 'PostgreSQL, auth, realtime subscriptions' },

  // Tools & Platforms
  { name: 'Git / GitHub', category: 'Tools & Platforms', description: 'Version control, PRs, collaborative workflows' },
  { name: 'GitHub GraphQL / REST API', category: 'Tools & Platforms', description: 'Rate-limited ingestion, repo analytics & automation' },
  { name: 'Vercel', category: 'Tools & Platforms', description: 'Deployment, preview environments, edge network' },
];

export const categories: TechCategory[] = ['Languages', 'Frontend', 'Backend', 'Tools & Platforms'];
