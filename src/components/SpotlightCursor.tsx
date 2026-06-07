'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

// ------------------------------------------------------------------
// Spotlight cursor — moves a soft radial gradient glow with the mouse
// Creates a distinctive interactive feel unique to this portfolio
// ------------------------------------------------------------------

const StyledSpotlight = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(127, 90, 240, 0.06) 0%,
    transparent 70%
  );
  transition: opacity 0.3s ease;
`;

const SpotlightCursor = (): React.ReactElement => {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotRef.current) {
        spotRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
        spotRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <StyledSpotlight ref={spotRef} aria-hidden="true" />;
};

export default SpotlightCursor;
