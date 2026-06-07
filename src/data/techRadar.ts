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
  { name: 'TypeScript', category: 'Languages', description: 'Primary language for all new projects' },
  { name: 'JavaScript', category: 'Languages', description: 'ES2022+, async patterns, browser APIs' },
  { name: 'Python', category: 'Languages', description: 'Scripts, ML experiments, backend services' },
  { name: 'SQL', category: 'Languages', description: 'PostgreSQL — complex queries, joins, indexing' },
  { name: 'C', category: 'Languages', description: 'Embedded systems and OS coursework' },

  // Frontend
  { name: 'React', category: 'Frontend', description: 'Hooks, context, performance patterns' },
  { name: 'Next.js', category: 'Frontend', description: 'App router, RSC, SSR/SSG/ISR' },
  { name: 'Styled Components', category: 'Frontend', description: 'CSS-in-JS, theming, design systems' },
  { name: 'Framer Motion', category: 'Frontend', description: 'Animations and layout transitions' },
  { name: 'Tailwind CSS', category: 'Frontend', description: 'Utility-first rapid UI building' },

  // Backend
  { name: 'Node.js', category: 'Backend', description: 'REST APIs, Express, async I/O' },
  { name: 'Hono', category: 'Backend', description: 'Edge-native lightweight API framework' },
  { name: 'PostgreSQL', category: 'Backend', description: 'Primary database for production projects' },
  { name: 'Supabase', category: 'Backend', description: 'Postgres + auth + realtime subscriptions' },

  // Tools & Platforms
  { name: 'Git / GitHub', category: 'Tools & Platforms', description: 'Branching, PRs, CI workflows' },
  { name: 'Docker', category: 'Tools & Platforms', description: 'Containerization, compose setups' },
  { name: 'Vercel', category: 'Tools & Platforms', description: 'Primary deployment and preview platform' },
  { name: 'GitHub Actions', category: 'Tools & Platforms', description: 'CI/CD, release automation' },
  { name: 'Arduino / ESP32', category: 'Tools & Platforms', description: 'IoT sensor projects' },
];

export const categories: TechCategory[] = ['Languages', 'Frontend', 'Backend', 'Tools & Platforms'];
