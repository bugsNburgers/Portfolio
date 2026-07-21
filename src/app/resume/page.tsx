'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

const { colors, fonts, fontSizes, sizes, media } = theme;

const StyledMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 100px 40px;
  background-color: ${colors.navy};
  text-align: center;

  @media ${media.md} {
    padding: 80px 20px;
  }
`;

const StyledBadge = styled.span`
  color: ${colors.green};
  font-family: ${fonts.mono};
  font-size: ${fontSizes.md};
  margin-bottom: 20px;
  letter-spacing: 0.05em;
`;

const StyledSubtitle = styled.h1`
  font-size: clamp(32px, 5vw, 54px);
  font-weight: 700;
  color: ${colors.lightestSlate};
  margin: 0 0 20px;
  line-height: 1.2;
`;

const StyledParagraph = styled.p`
  color: ${colors.slate};
  font-family: ${fonts.sans};
  font-size: ${fontSizes.lg};
  max-width: 500px;
  line-height: 1.6;
  margin-bottom: 40px;
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
  margin-top: 48px;
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

export default function ResumePage(): React.ReactElement {
  return (
    <StyledMainContainer>
      <StyledBadge>📄 Resume Status</StyledBadge>
      <StyledSubtitle>Resume Coming Soon</StyledSubtitle>
      <StyledParagraph>
        The updated resume will be uploaded shortly. Please check back soon!
      </StyledParagraph>
      <StyledHomeButton href="/">← Back to Portfolio</StyledHomeButton>
    </StyledMainContainer>
  );
}
