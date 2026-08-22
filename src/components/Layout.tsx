'use client';

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

const PixelBlast = dynamic(() => import('@/components/PixelBlast'), { ssr: false });

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    z-index: 2;
  `}
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): React.ReactElement => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoaderFinish = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && !prefersReducedMotion ? (
        <Loader finishLoading={handleLoaderFinish} />
      ) : null}

      {/* Full-screen interactive pixel burst background */}
      <PixelBlast
        variant="circle"
        pixelSize={4}
        color="#186f5e"
        patternScale={2}
        patternDensity={0.95}
        opacityScale={0.5}
        pixelSizeJitter={0.5}
        enableRipples={false}
        rippleSpeed={0.3}
        rippleThickness={0.12}
        rippleIntensityScale={0.5}
        liquid={false}
        liquidStrength={0.04}
        liquidRadius={1.0}
        liquidWobbleSpeed={3.0}
        speed={0.8}
        edgeFade={0.0}
        transparent={true}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <StyledContent>
        <a className="skip-to-content" href="#content">
          Skip to Content
        </a>

        <Nav isHome={!isLoading || prefersReducedMotion} />

        {/* Social FAB — bottom-right floating buttons (replaces sidebars) */}
        <SocialSidebar />

        <main id="content">{children}</main>

        <Footer />
      </StyledContent>
    </>
  );
};

export default Layout;
