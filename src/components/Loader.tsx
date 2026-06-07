'use client';

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

// ------------------------------------------------------------------
// Text-morph loading animation — replaces Brittany's hexagon draw-on
// ------------------------------------------------------------------

const progressSlide = keyframes`
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

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
  gap: 32px;
  background-color: ${({ theme }) => theme.colors.bgDeep};
  animation: ${({ $isMounting }) => ($isMounting ? 'none' : fadeOut)} 0.4s ease forwards;
`;

const LogoText = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(20px, 4vw, 28px);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.03em;
  animation: ${fadeInUp} 0.5s ease forwards;

  span {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const ProgressBar = styled.div`
  width: 160px;
  height: 2px;
  background: ${({ theme }) => theme.colors.bgElevated};
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.secondary});
  border-radius: 2px;
  transform-origin: left;
  animation: ${progressSlide} 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      finishLoading();
      return;
    }

    document.body.classList.add('hidden');

    // After 1.8s: start fading out
    const overlayTimer = setTimeout(() => {
      setIsMounting(false);
    }, 1800);

    // After 2.2s: fully done
    const doneTimer = setTimeout(() => {
      setIsHidden(true);
      document.body.classList.remove('hidden');
      finishLoading();
    }, 2200);

    return () => {
      clearTimeout(overlayTimer);
      clearTimeout(doneTimer);
      document.body.classList.remove('hidden');
    };
  }, [prefersReducedMotion, finishLoading]);

  if (prefersReducedMotion || isHidden) return null;

  return (
    <StyledLoader $isMounting={isMounting} aria-hidden="true" aria-label="Loading">
      <LogoText>
        suprateek<span>.</span>
      </LogoText>
      <ProgressBar>
        <ProgressFill />
      </ProgressBar>
    </StyledLoader>
  );
};

export default Loader;
