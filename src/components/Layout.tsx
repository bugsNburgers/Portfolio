'use client';

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';
import SpotlightCursor from '@/components/SpotlightCursor';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

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

      {/* Cursor spotlight — unique interactive effect */}
      <SpotlightCursor />

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
