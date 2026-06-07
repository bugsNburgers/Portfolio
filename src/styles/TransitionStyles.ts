import { css } from 'styled-components';

// Timing constants
export const LOADER_DELAY = 2000; // ms — total loader animation duration
export const navDelay = 800;      // ms — delay before nav starts animating in
export const loaderDelay = 1600;  // ms — delay for page content after loader

// New spring-like easing
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ----------------------------------------------------------------
// Framer Motion variants
// ----------------------------------------------------------------

// Blur-in reveal (replaces Brittany's fadeUp)
export const blurInVariants = {
  hidden: { opacity: 0, filter: 'blur(8px)', y: 12 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.5,
      ease,
    },
  },
};

// Backward compatibility alias used in existing sections
export const fadeUpVariants = blurInVariants;

// Fade down for nav items
export const fadeDownVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease,
    },
  },
};

// Stagger container
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Nav stagger
export const navStaggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

// Slide in from bottom (for FAB / social links)
export const slideUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 1.2,
      ease,
    },
  },
};

// Legacy alias
export const sidebarSlideUpVariants = slideUpVariants;

// Clip-path reveal (left to right)
export const clipRevealVariants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: {
      duration: 0.6,
      ease,
    },
  },
};

// Scale + fade for cards
export const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease,
    },
  },
};

// ----------------------------------------------------------------
// CSS transition strings (legacy / CSSTransition usage)
// ----------------------------------------------------------------

export const fadeUpTransition = css`
  transition: opacity 400ms ease, transform 400ms ease, filter 400ms ease;

  &.fade-up-enter {
    opacity: 0;
    transform: translateY(16px);
    filter: blur(4px);
  }
  &.fade-up-enter-active {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0px);
  }
  &.fade-up-exit {
    opacity: 1;
  }
  &.fade-up-exit-active {
    opacity: 0;
    transform: translateY(-12px);
  }
`;

export const fadeTransition = css`
  transition: opacity 300ms ease;

  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
  }
`;
