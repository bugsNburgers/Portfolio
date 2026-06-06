// All TypeScript interfaces and types for the portfolio

/** Site-wide configuration */
export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  siteUrl: string;
  email: string;
  socialLinks: SocialLink[];
  navLinks: NavLink[];
}

export interface SocialLink {
  name: 'GitHub' | 'LinkedIn' | 'Twitter' | 'Instagram' | 'CodePen';
  url: string;
}

export interface NavLink {
  name: string;
  url: string;
}

/** Hero section */
export interface HeroData {
  greeting: string;
  name: string;
  tagline: string;
  description: string;
  ctaPrimary: {
    text: string;
    url: string;
  };
  ctaSecondary: {
    text: string;
    url: string;
  };
}

/** About section */
export interface AboutData {
  paragraphs: string[];
  skills: string[];
  imageAlt: string;
}

/** Experience section */
export interface Job {
  company: string;
  companyUrl: string;
  title: string;
  dateRange: string;
  bullets: string[];
}

/** Featured projects */
export interface FeaturedProject {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  externalUrl?: string;
  image: string;
  imageAlt: string;
}

/** Other projects (smaller cards) */
export interface OtherProject {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  externalUrl?: string;
}

/** Now section card */
export interface NowCard {
  category: 'building' | 'learning' | 'reading' | 'exploring';
  title: string;
  description: string;
}

/** Now section data */
export interface NowData {
  cards: NowCard[];
}

/** Writing / blog entries */
export interface WritingEntry {
  title: string;
  url: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
}
