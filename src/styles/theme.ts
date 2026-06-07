// Design tokens for Suprateek Yawagal's portfolio
// Custom palette: charcoal + electric violet + warm amber

const colors = {
  // Backgrounds
  bgDeep: '#08080b',
  bgBase: '#0c0c0f',
  bgSurface: '#16161a',
  bgElevated: '#1e1e24',
  bgHover: '#252530',

  // Borders
  border: '#2a2a35',
  borderLight: '#3a3a48',

  // Text
  textPrimary: '#fffffe',
  textSecondary: '#94a1b2',
  textMuted: '#72768a',
  textFaint: '#4a4d5e',

  // Accent — Electric Violet
  accent: '#7f5af0',
  accentLight: '#9d7ef5',
  accentGlow: 'rgba(127, 90, 240, 0.15)',
  accentGlowStrong: 'rgba(127, 90, 240, 0.3)',

  // Secondary — Warm Amber
  secondary: '#f5a623',
  secondaryLight: '#f7b94a',
  secondaryGlow: 'rgba(245, 166, 35, 0.12)',

  // Utility
  success: '#2cb67d',
  error: '#e53170',
  white: '#fffffe',
  shadow: 'rgba(8, 8, 11, 0.8)',
  shadowLight: 'rgba(8, 8, 11, 0.4)',

  // Legacy aliases (used sparingly in transitioned components)
  green: '#7f5af0',
  greenTint: 'rgba(127, 90, 240, 0.1)',
  lightSlate: '#94a1b2',
  lightestSlate: '#fffffe',
  slate: '#94a1b2',
  darkSlate: '#4a4d5e',
  lightNavy: '#16161a',
  lightestNavy: '#2a2a35',
  navy: '#0c0c0f',
  darkNavy: '#08080b',
  navyShadow: 'rgba(8, 8, 11, 0.8)',
} as const;

const fonts = {
  sans: "'Inter', 'Outfit', -apple-system, system-ui, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', 'Fira Mono', monospace",
} as const;

const fontSizes = {
  xxs: '11px',
  xs: '13px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '22px',
  heading: '32px',
} as const;

const sizes = {
  borderRadius: '10px',
  borderRadiusSm: '6px',
  borderRadiusLg: '16px',
  navHeight: '80px',
  navScrollHeight: '60px',
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

// New easing — snappier, spring-like feel
const easing = 'cubic-bezier(0.16, 1, 0.3, 1)';
const transition = `all 0.3s ${easing}`;

const hamburgerAnimations = {
  hamBefore: 'top 0.1s ease-in 0.2s, opacity 0.1s ease-in',
  hamBeforeActive: 'top 0.1s ease-out, opacity 0.1s ease-out 0.12s',
  hamAfter: 'bottom 0.1s ease-in 0.2s, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
  hamAfterActive: 'bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1) 0.12s',
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
