'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

interface UseInViewOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

const useInView = (
  options: UseInViewOptions = {},
): [RefObject<HTMLElement>, boolean] => {
  const { triggerOnce = true, threshold = 0.1, rootMargin = '0px 0px -100px 0px', ...rest } = options;
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);

          // Disconnect after first intersection — animate once, stay visible
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin, ...rest },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [triggerOnce, threshold, rootMargin]); // eslint-disable-line react-hooks/exhaustive-deps

  return [ref, isInView];
};

export default useInView;
