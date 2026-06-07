// Design tokens — Brittany Chiang's color palette (kept, adapted for Suprateek's portfolio)
// Layout, sections, and interactions are original

const colors = {
  darkNavy: '#020c1b',
  navy: '#0a192f',
  lightNavy: '#112240',
  lightestNavy: '#233554',
  navyShadow: 'rgba(2, 12, 27, 0.7)',

  slate: '#8892b0',
  lightSlate: '#a8b2d8',
  lightestSlate: '#ccd6f6',
  white: '#e6f1ff',

  green: '#64ffda',
  greenTint: 'rgba(100, 255, 218, 0.1)',

  // Semantic aliases used by new components
  bgDeep: '#020c1b',
  bgBase: '#0a192f',
  bgSurface: '#112240',
  bgElevated: '#172a45',
  bgHover: '#1d3557',
  border: '#233554',
  borderLight: '#2d4263',

  textPrimary: '#ccd6f6',
  textSecondary: '#8892b0',
  textMuted: '#6b7690',
  textFaint: '#4a5568',

  accent: '#64ffda',
  accentLight: '#9dffea',
  accentGlow: 'rgba(100, 255, 218, 0.1)',
  accentGlowStrong: 'rgba(100, 255, 218, 0.2)',

  // Kept for secondary use cases — muted so it doesn't clash
  secondary: '#64ffda',
  secondaryLight: '#9dffea',
  secondaryGlow: 'rgba(100, 255, 218, 0.08)',

  success: '#64ffda',
  error: '#ff6b6b',
  shadow: 'rgba(2, 12, 27, 0.7)',
  shadowLight: 'rgba(2, 12, 27, 0.4)',
} as const;

const fonts = {
  sans: 'Calibre, Inter, "San Francisco", "SF Pro Text", -apple-system, system-ui, sans-serif',
  mono: '"SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace',
} as const;

const fontSizes = {
  xxs: '12px',
  xs: '13px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '22px',
  heading: '32px',
} as const;

const sizes = {
  borderRadius: '4px',
  borderRadiusSm: '3px',
  borderRadiusLg: '8px',
  navHeight: '100px',
  navScrollHeight: '70px',
  tabHeight: '42px',
  tabWidth: '120px',
  hamburgerWidth: '28px',
  maxWidth: '1600px',
  sectionMaxWidth: '1000px',
} as const;

const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1080px',
  xl: '1200px',
} as const;

const media = {
  sm: `(max-width: ${breakpoints.sm})`,
  md: `(max-width: ${breakpoints.md})`,
  lg: `(max-width: ${breakpoints.lg})`,
  xl: `(max-width: ${breakpoints.xl})`,
} as const;

const easing = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
const transition = `all 0.25s ${easing}`;

const hamburgerAnimations = {
  hamBefore: 'top 0.1s ease-in 0.2s, opacity 0.1s ease-in',
  hamBeforeActive: 'top 0.1s ease-out, opacity 0.1s ease-out 0.12s',
  hamAfter: 'bottom 0.1s ease-in 0.2s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  hamAfterActive: 'bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s',
} as const;

export const theme = {
  colors,
  fonts,
  fontSizes,
  sizes,
  breakpoints,
  media,
  easing,
  transition,
  hamburgerAnimations,
} as const;

export type Theme = typeof theme;
