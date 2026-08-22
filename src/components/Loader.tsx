'use client';

import React, { useEffect, useState, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

// ------------------------------------------------------------------
// Ultra-smooth GPU-accelerated reveal animation (0 layout/paint cost)
// ------------------------------------------------------------------

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.98);
    pointer-events: none;
  }
`;

const charReveal = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 10px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const pulseDot = keyframes`
  0%, 100% {
    opacity: 1;
    filter: drop-shadow(0 0 6px rgba(100, 255, 218, 0.6));
  }
  50% {
    opacity: 0.7;
    filter: drop-shadow(0 0 2px rgba(100, 255, 218, 0.2));
  }
`;

const StyledLoader = styled.div<{ $isMounting: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.bgDeep};
  animation: ${({ $isMounting }) => ($isMounting ? 'none' : fadeOut)} 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: opacity, transform;
`;

const LoaderText = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(28px, 6vw, 44px);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.03em;
  text-align: center;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CharSpan = styled.span<{ $delay: number; $isDot?: boolean }>`
  ${({ $delay, $isDot }) => css`
    display: inline-block;
    opacity: 0;
    transform: translate3d(0, 10px, 0);
    will-change: opacity, transform;
    animation: ${charReveal} 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: ${$delay}s;

    ${$isDot &&
    css`
      color: #64ffda;
      animation: ${charReveal} 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards,
        ${pulseDot} 2s ease-in-out infinite 0.8s;
    `}
  `}
`;

interface LoaderProps {
  finishLoading: () => void;
}

const Loader = ({ finishLoading }: LoaderProps): React.ReactElement | null => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMounting, setIsMounting] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  const text = 'suprateek.';

  const splitText = useMemo(() => {
    return text.split('').map((char, index) => {
      const isDot = char === '.';
      return (
        <CharSpan
          className="char"
          key={index}
          $delay={0.15 + index * 0.065} // Balanced, ultra-smooth stagger
          $isDot={isDot}
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

    // Preload background assets & ensure fonts are ready during loader window
    try {
      if (typeof document !== 'undefined' && 'fonts' in document) {
        document.fonts.ready.catch(() => {});
      }
      // Warm up hero video buffer in background
      const preloadVideo = document.createElement('video');
      preloadVideo.src = '/video.mp4';
      preloadVideo.preload = 'auto';
      preloadVideo.muted = true;
      preloadVideo.load();
    } catch {
      // Fallback
    }

    // Comfortable pacing: letters reveal sequentially + pause to ensure full background hydration
    const fadeOutTimer = setTimeout(() => {
      setIsMounting(false);

      const unmountTimer = setTimeout(() => {
        setIsHidden(true);
        document.body.classList.remove('hidden');
        finishLoading();
      }, 550);

      return () => clearTimeout(unmountTimer);
    }, 1750);

    return () => {
      document.body.classList.remove('hidden');
      clearTimeout(fadeOutTimer);
    };
  }, [prefersReducedMotion, finishLoading]);

  if (prefersReducedMotion || isHidden) return null;

  return (
    <StyledLoader $isMounting={isMounting} aria-hidden="true" aria-label="Loading">
      <LoaderText>{splitText}</LoaderText>
    </StyledLoader>
  );
};

export default Loader;

