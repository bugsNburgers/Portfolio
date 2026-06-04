'use client';

import { useState, useEffect } from 'react';

type ScrollDirection = 'up' | 'down' | null;

const THRESHOLD = 10;
const NAV_HEIGHT = 100;

const useScrollDirection = (): ScrollDirection => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;

      // Don't hide nav when near the top
      if (scrollY < NAV_HEIGHT) {
        setScrollDirection(null);
        lastScrollY = scrollY;
        return;
      }

      const delta = scrollY - lastScrollY;

      if (Math.abs(delta) < THRESHOLD) return;

      setScrollDirection(delta > 0 ? 'down' : 'up');
      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', updateScrollDirection, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, []);

  return scrollDirection;
};

export default useScrollDirection;
