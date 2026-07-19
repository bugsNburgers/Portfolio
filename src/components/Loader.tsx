'use client';

import React, { useEffect, useState, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

// ------------------------------------------------------------------
// Letter-by-letter reveal animation
// ------------------------------------------------------------------

const fadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

const blurReveal = keyframes`
  0% {
    opacity: 0;
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
  }
`;

const rotateIn = keyframes`
  0% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
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
  will-change: transform;
  transform-origin: 50% 50%;
  animation: ${rotateIn} 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
`;

const CharSpan = styled.span<{ $delay: number }>`
  display: inline-block;
  opacity: 0;
  filter: blur(10px);
  will-change: opacity, filter;
  animation: ${blurReveal} 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  animation-delay: ${({ $delay }) => $delay}s;
`;

interface LoaderProps {
  finishLoading: () => void;
}

const Loader = ({ finishLoading }: LoaderProps): React.ReactElement | null => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMounting, setIsMounting] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  const text = "suprateek.";

  const splitText = useMemo(() => {
    return text.split('').map((char, index) => {
      if (char === ' ') return <span key={index}>&nbsp;</span>;
      return (
        <CharSpan 
          className="char" 
          key={index}
          $delay={index * 0.05} // 50ms stagger per letter
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
    
    // Total animation time: 10 chars * 50ms = 500ms + 600ms duration = 1100ms
    // We wait 1200ms before fading out for a snappy experience
    const fadeOutTimer = setTimeout(() => {
      setIsMounting(false);
      
      const unmountTimer = setTimeout(() => {
        setIsHidden(true);
        document.body.classList.remove('hidden');
        finishLoading();
      }, 500); // Wait for fadeOut animation to finish
      
      return () => clearTimeout(unmountTimer);
    }, 1200);

    return () => {
      document.body.classList.remove('hidden');
      clearTimeout(fadeOutTimer);
    };
  }, [prefersReducedMotion, finishLoading]);

  if (prefersReducedMotion || isHidden) return null;

  return (
    <StyledLoader $isMounting={isMounting} aria-hidden="true" aria-label="Loading">
      <LoaderText>
        {splitText}
      </LoaderText>
    </StyledLoader>
  );
};

export default Loader;
