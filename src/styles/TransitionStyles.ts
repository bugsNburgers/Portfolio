import { css } from 'styled-components';

// CSS transition classes for mount/unmount animations
// Used with CSSTransition from react-transition-group or custom implementations

export const LOADER_DELAY = 2500; // ms — total loader animation duration

export const navDelay = 1000; // ms — delay before nav starts animating in
export const loaderDelay = 2000; // ms — delay for page content after loader

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.645, 0.045, 0.355, 1] as [number, number, number, number],
    },
  },
};

export const fadeDownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.645, 0.045, 0.355, 1] as [number, number, number, number],
    },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const navStaggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const sidebarSlideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 1.5,
      ease: [0.645, 0.045, 0.355, 1] as [number, number, number, number],
    },
  },
};

// CSS string for fade-up transition (for use with TransitionGroup if needed)
export const fadeUpTransition = css`
  transition: opacity 300ms ease, transform 300ms ease;

  &.fade-up-enter {
    opacity: 0;
    transform: translateY(20px);
  }
  &.fade-up-enter-active {
    opacity: 1;
    transform: translateY(0);
  }
  &.fade-up-exit {
    opacity: 1;
  }
  &.fade-up-exit-active {
    opacity: 0;
    transform: translateY(-20px);
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
