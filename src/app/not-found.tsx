'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

// Use direct theme values instead of prop interpolations for SSR safety
const { colors, fonts, fontSizes, sizes, media } = theme;

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
  background-color: ${colors.navy};

  @media ${media.lg} {
    padding: 200px 100px;
  }
  @media ${media.md} {
    padding: 150px 50px;
  }
  @media ${media.sm} {
    padding: 125px 25px;
  }
`;

const StyledTitle = styled.h1`
  color: ${colors.green};
  font-family: ${fonts.mono};
  font-size: clamp(100px, 25vw, 200px);
  line-height: 1;
  margin: 0 0 20px;
`;

const StyledSubtitle = styled.h2`
  font-size: clamp(30px, 5vw, 50px);
  font-weight: 600;
  color: ${colors.lightestSlate};
  margin: 0 0 20px;
`;

const StyledParagraph = styled.p`
  color: ${colors.slate};
  font-family: ${fonts.sans};
  font-size: ${fontSizes.lg};
`;

const StyledHomeButton = styled(Link)`
  color: ${colors.green};
  background-color: transparent;
  border: 1px solid ${colors.green};
  border-radius: ${sizes.borderRadius};
  padding: 1.25rem 1.75rem;
  font-size: ${fontSizes.sm};
  font-family: ${fonts.mono};
  line-height: 1;
  text-decoration: none;
  margin-top: 50px;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover,
  &:focus-visible {
    background-color: ${colors.greenTint};
    outline: none;
    color: ${colors.green};
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
    <StyledMainContainer>
      <StyledTitle>404</StyledTitle>
      <StyledSubtitle>Page Not Found</StyledSubtitle>
      <StyledParagraph>
        Looks like this page doesn&apos;t exist or has been moved.
      </StyledParagraph>
      <StyledHomeButton href="/">Go Home</StyledHomeButton>
    </StyledMainContainer>
  );
}
