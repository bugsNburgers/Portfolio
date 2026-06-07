// Tech Radar data — skills categorized by proficiency ring
// Rings: Expert → Proficient → Familiar

export type TechRing = 'Expert' | 'Proficient' | 'Familiar';
export type TechQuadrant = 'Languages' | 'Frameworks' | 'Tools' | 'Platforms';

export interface TechItem {
  name: string;
  ring: TechRing;
  quadrant: TechQuadrant;
  description?: string;
}

export const techRadarData: TechItem[] = [
  // Languages
  { name: 'TypeScript', ring: 'Expert', quadrant: 'Languages', description: 'My primary language for all new projects' },
  { name: 'Python', ring: 'Proficient', quadrant: 'Languages', description: 'Scripts, ML experiments, backend services' },
  { name: 'JavaScript', ring: 'Expert', quadrant: 'Languages', description: 'ES2022+, async patterns, browser APIs' },
  { name: 'C', ring: 'Familiar', quadrant: 'Languages', description: 'Embedded systems and OS coursework' },
  { name: 'SQL', ring: 'Proficient', quadrant: 'Languages', description: 'PostgreSQL, complex queries, indexing' },

  // Frameworks
  { name: 'React', ring: 'Expert', quadrant: 'Frameworks', description: 'Hooks, context, performance patterns' },
  { name: 'Next.js', ring: 'Expert', quadrant: 'Frameworks', description: 'App router, RSC, SSR/SSG' },
  { name: 'Node.js', ring: 'Proficient', quadrant: 'Frameworks', description: 'REST APIs, Express, async patterns' },
  { name: 'Hono', ring: 'Proficient', quadrant: 'Frameworks', description: 'Edge-native API server' },
  { name: 'Styled Components', ring: 'Expert', quadrant: 'Frameworks', description: 'CSS-in-JS, theming, design systems' },

  // Tools
  { name: 'Git / GitHub', ring: 'Expert', quadrant: 'Tools', description: 'Branching, PRs, CI workflows' },
  { name: 'Docker', ring: 'Proficient', quadrant: 'Tools', description: 'Containerization, compose setups' },
  { name: 'Figma', ring: 'Familiar', quadrant: 'Tools', description: 'Wireframes, design handoff' },
  { name: 'Postman', ring: 'Proficient', quadrant: 'Tools', description: 'API testing and documentation' },

  // Platforms
  { name: 'Vercel', ring: 'Expert', quadrant: 'Platforms', description: 'Primary deployment platform' },
  { name: 'Supabase', ring: 'Proficient', quadrant: 'Platforms', description: 'Postgres, auth, realtime' },
  { name: 'GitHub Actions', ring: 'Proficient', quadrant: 'Platforms', description: 'CI/CD, release automation' },
  { name: 'Arduino / ESP32', ring: 'Familiar', quadrant: 'Platforms', description: 'IoT projects and sensors' },
];

export const ringOrder: TechRing[] = ['Expert', 'Proficient', 'Familiar'];
export const quadrants: TechQuadrant[] = ['Languages', 'Frameworks', 'Tools', 'Platforms'];
