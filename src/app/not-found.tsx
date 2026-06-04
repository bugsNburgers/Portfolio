'use client';

import React from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledMainContainer = styled.main`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 200px 150px;

    @media ${theme.media.lg} {
      padding: 200px 100px;
    }
    @media ${theme.media.md} {
      padding: 150px 50px;
    }
    @media ${theme.media.sm} {
      padding: 125px 25px;
    }
  `}
`;

const StyledTitle = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.green};
    font-family: ${theme.fonts.mono};
    font-size: clamp(100px, 25vw, 200px);
    line-height: 1;
    margin: 0 0 20px;
  `}
`;

const StyledSubtitle = styled.h2`
  ${({ theme }) => css`
    font-size: clamp(30px, 5vw, 50px);
    font-weight: 600;
    color: ${theme.colors.lightestSlate};
    margin: 0 0 20px;
  `}
`;

const StyledHomeButton = styled(Link)`
  ${({ theme }) => css`
    color: ${theme.colors.green};
    background-color: transparent;
    border: 1px solid ${theme.colors.green};
    border-radius: ${theme.sizes.borderRadius};
    padding: 1.25rem 1.75rem;
    font-size: ${theme.fontSizes.sm};
    font-family: ${theme.fonts.mono};
    line-height: 1;
    text-decoration: none;
    margin-top: 50px;
    transition: ${theme.transition};

    &:hover,
    &:focus-visible {
      background-color: ${theme.colors.greenTint};
      outline: none;
      color: ${theme.colors.green};
    }

    &:after {
      display: none !important;
    }
  `}
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

export default function NotFound(): React.ReactElement {
  return (
    <StyledMainContainer>
      <StyledTitle>404</StyledTitle>
      <StyledSubtitle>Page Not Found</StyledSubtitle>
      <p>Looks like this page doesn&apos;t exist or has been moved.</p>
      <StyledHomeButton href="/">Go Home</StyledHomeButton>
    </StyledMainContainer>
  );
}
