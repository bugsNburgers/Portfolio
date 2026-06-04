'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import config from '@/data/config';
import { sidebarSlideUpVariants } from '@/styles/TransitionStyles';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledSideElement = styled.div`
  ${({ theme }) => css`
    width: 40px;
    position: fixed;
    bottom: 0;
    left: auto;
    right: 40px;
    z-index: 10;
    color: ${theme.colors.lightSlate};

    @media ${theme.media.lg} {
      right: 20px;
    }

    @media ${theme.media.md} {
      display: none;
    }
  `}
`;

const StyledLinkWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    &:after {
      content: '';
      display: block;
      width: 1px;
      height: 90px;
      margin: 0 auto;
      background-color: ${theme.colors.lightSlate};
    }

    a {
      margin: 20px auto;
      padding: 10px;
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xxs};
      line-height: ${theme.fontSizes.lg};
      letter-spacing: 0.1em;
      writing-mode: vertical-rl;
      color: ${theme.colors.lightSlate};
      transition: ${theme.transition};

      &:hover,
      &:focus {
        color: ${theme.colors.green};
        transform: translateY(-3px);
      }
    }
  `}
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const EmailSidebar = (): React.ReactElement => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { email } = config;

  return (
    <StyledSideElement>
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate="visible"
        variants={sidebarSlideUpVariants}
      >
        <StyledLinkWrapper>
          <a href={`mailto:${email}`}>{email}</a>
        </StyledLinkWrapper>
      </motion.div>
    </StyledSideElement>
  );
};

export default EmailSidebar;
