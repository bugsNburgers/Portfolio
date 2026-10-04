'use client';

import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const usePrefersReducedMotion = (): boolean => {
  // Default to false on server so initial="hidden" is rendered, preventing hydration flashes
  // Default to true on server so SSR renders initial="visible" — content is fully visible to crawlers and no-JS.
  // On client hydration, useEffect reads the real media query value to enable animations for users.
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);

    // Set initial value on mount
    setPrefersReducedMotion(mediaQueryList.matches);

    // Listen for changes
    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQueryList.addEventListener('change', onChange);

    return () => {
      mediaQueryList.removeEventListener('change', onChange);
    };
  }, []);

  return prefersReducedMotion;
};

export default usePrefersReducedMotion;
