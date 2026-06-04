'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 200px 150px;
  background-color: ${({ theme: t }) => t.colors.navy};

  @media ${({ theme: t }) => t.media.lg} {
    padding: 200px 100px;
  }
  @media ${({ theme: t }) => t.media.md} {
    padding: 150px 50px;
  }
  @media ${({ theme: t }) => t.media.sm} {
    padding: 125px 25px;
  }
`;

const StyledTitle = styled.h1`
  color: ${({ theme: t }) => t.colors.green};
  font-family: ${({ theme: t }) => t.fonts.mono};
  font-size: clamp(100px, 25vw, 200px);
  line-height: 1;
  margin: 0 0 20px;
`;

const StyledSubtitle = styled.h2`
  font-size: clamp(30px, 5vw, 50px);
  font-weight: 600;
  color: ${({ theme: t }) => t.colors.lightestSlate};
  margin: 0 0 20px;
`;

const StyledParagraph = styled.p`
  color: ${({ theme: t }) => t.colors.slate};
  font-family: ${({ theme: t }) => t.fonts.sans};
  font-size: ${({ theme: t }) => t.fontSizes.lg};
`;

const StyledHomeButton = styled(Link)`
  color: ${({ theme: t }) => t.colors.green};
  background-color: transparent;
  border: 1px solid ${({ theme: t }) => t.colors.green};
  border-radius: ${({ theme: t }) => t.sizes.borderRadius};
  padding: 1.25rem 1.75rem;
  font-size: ${({ theme: t }) => t.fontSizes.sm};
  font-family: ${({ theme: t }) => t.fonts.mono};
  line-height: 1;
  text-decoration: none;
  margin-top: 50px;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover,
  &:focus-visible {
    background-color: ${({ theme: t }) => t.colors.greenTint};
    outline: none;
    color: ${({ theme: t }) => t.colors.green};
  }

  &:after {
    display: none !important;
  }
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

export default function NotFound(): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <StyledMainContainer>
        <StyledTitle>404</StyledTitle>
        <StyledSubtitle>Page Not Found</StyledSubtitle>
        <StyledParagraph>
          Looks like this page doesn&apos;t exist or has been moved.
        </StyledParagraph>
        <StyledHomeButton href="/">Go Home</StyledHomeButton>
      </StyledMainContainer>
    </ThemeProvider>
  );
}
