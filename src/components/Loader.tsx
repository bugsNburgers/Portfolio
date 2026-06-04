'use client';

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

// ------------------------------------------------------------------
// Animation keyframes
// ------------------------------------------------------------------

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledLoader = styled.div<{ $isMounting: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.darkNavy};
  animation: ${({ $isMounting }) => ($isMounting ? fadeIn : fadeOut)} 0.5s ease forwards;
`;

const SVGWrapper = styled.div<{ $isFadingOut: boolean }>`
  width: 100px;
  height: 100px;
  color: ${({ theme }) => theme.colors.green};
  transition: opacity 0.5s ease, transform 0.5s ease;
  opacity: ${({ $isFadingOut }) => ($isFadingOut ? 0 : 1)};
  transform: ${({ $isFadingOut }) => ($isFadingOut ? 'scale(0.9)' : 'scale(1)')};
`;

// Hex path total approximate length for stroke-dashoffset animation
const hexDash = keyframes`
  from {
    stroke-dashoffset: 247;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const letterFade = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const StyledSVG = styled.svg`
  .hex-path {
    stroke-dasharray: 247;
    stroke-dashoffset: 247;
    animation: ${hexDash} 0.5s ease forwards;
  }

  .letter {
    opacity: 0;
    animation: ${letterFade} 0.5s ease 0.2s forwards;
  }
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

interface LoaderProps {
  finishLoading: () => void;
}

const Loader = ({ finishLoading }: LoaderProps): React.ReactElement | null => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMounting, setIsMounting] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      finishLoading();
      return;
    }

    // Lock scroll while loading
    document.body.classList.add('hidden');

    // After 1.5s: start fading the logo out
    const logoTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1500);

    // After 2s: start fading the entire overlay out
    const overlayTimer = setTimeout(() => {
      setIsMounting(false);
    }, 2000);

    // After 2.5s: fully done — remove overlay and unlock scroll
    const doneTimer = setTimeout(() => {
      setIsHidden(true);
      document.body.classList.remove('hidden');
      finishLoading();
    }, 2500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(overlayTimer);
      clearTimeout(doneTimer);
      document.body.classList.remove('hidden');
    };
  }, [prefersReducedMotion, finishLoading]);

  if (prefersReducedMotion || isHidden) return null;

  return (
    <StyledLoader $isMounting={isMounting} aria-hidden="true">
      <SVGWrapper $isFadingOut={isFadingOut}>
        <StyledSVG
          id="loader-logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          fill="none"
        >
          <title>Loading</title>
          <text
            className="letter"
            x="50"
            y="67"
            fill="currentColor"
            fontFamily="'SF Mono', 'Fira Code', monospace"
            fontSize="50"
            fontWeight="600"
            textAnchor="middle"
          >
            S
          </text>
          <path
            className="hex-path"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 50, 5 L 11, 27 L 11, 72 L 50, 95 L 89, 73 L 89, 28 z"
          />
        </StyledSVG>
      </SVGWrapper>
    </StyledLoader>
  );
};

export default Loader;
