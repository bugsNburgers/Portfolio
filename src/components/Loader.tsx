'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { gsap } from 'gsap';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

// ------------------------------------------------------------------
// Letter-by-letter reveal animation
// ------------------------------------------------------------------

const fadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

const StyledLoader = styled.div<{ $isMounting: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.bgDeep};
  animation: ${({ $isMounting }) => ($isMounting ? 'none' : fadeOut)} 0.5s ease forwards;
`;

const LoaderText = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(24px, 5vw, 40px);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.02em;
  text-align: center;
  /* Prevents rotation from expanding the container bounds awkwardly */
  will-change: transform;
`;

const CharSpan = styled.span`
  display: inline-block;
  opacity: 0;
  filter: blur(10px);
  will-change: opacity, filter;
`;

interface LoaderProps {
  finishLoading: () => void;
}

const Loader = ({ finishLoading }: LoaderProps): React.ReactElement | null => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMounting, setIsMounting] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const text = "suprateek.";

  const splitText = useMemo(() => {
    return text.split('').map((char, index) => {
      if (char === ' ') return <span key={index}>&nbsp;</span>;
      return (
        <CharSpan 
          className="char" 
          key={index}
          style={char === '.' ? { color: '#64ffda' } : {}}
        >
          {char}
        </CharSpan>
      );
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      finishLoading();
      return;
    }

    document.body.classList.add('hidden');
    const el = containerRef.current;
    
    if (el) {
      const chars = el.querySelectorAll('.char');

      // 1. Base rotation for the container
      gsap.fromTo(
        el,
        { transformOrigin: '50% 50%', rotate: 5 },
        { ease: 'power3.out', rotate: 0, duration: 1.5 }
      );

      // 2. Opacity and Blur stagger for each letter
      gsap.fromTo(
        chars,
        { opacity: 0, filter: 'blur(10px)' },
        {
          ease: 'power2.out',
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.08,
          duration: 0.8,
          onComplete: () => {
            // Once the reveal finishes, wait 300ms, then trigger the fade out
            setTimeout(() => {
              setIsMounting(false);
              
              // Unmount entirely after CSS fadeOut completes (500ms)
              setTimeout(() => {
                setIsHidden(true);
                document.body.classList.remove('hidden');
                finishLoading();
              }, 500);
            }, 300);
          }
        }
      );
    }

    return () => {
      document.body.classList.remove('hidden');
      gsap.killTweensOf(el);
      gsap.killTweensOf('.char');
    };
  }, [prefersReducedMotion, finishLoading]);

  if (prefersReducedMotion || isHidden) return null;

  return (
    <StyledLoader $isMounting={isMounting} aria-hidden="true" aria-label="Loading">
      <LoaderText ref={containerRef}>
        {splitText}
      </LoaderText>
    </StyledLoader>
  );
};

export default Loader;
