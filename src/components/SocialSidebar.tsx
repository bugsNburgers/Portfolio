'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import IconGitHub from '@/components/IconGitHub';
import IconLinkedIn from '@/components/IconLinkedIn';
import config from '@/data/config';
import { slideUpVariants } from '@/styles/TransitionStyles';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

// ------------------------------------------------------------------
// Floating Action Button cluster — replaces fixed sidebars
// ------------------------------------------------------------------

const StyledFABWrapper = styled.div`
  ${({ theme }) => css`
    position: fixed;
    bottom: 32px;
    right: 32px;
    z-index: 50;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    @media ${theme.media.md} {
      display: none;
    }
  `}
`;

const SocialLink = styled.a`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${theme.colors.bgSurface};
    border: 1px solid ${theme.colors.border};
    color: ${theme.colors.textMuted};
    transition: ${theme.transition};
    backdrop-filter: blur(8px);

    &:hover,
    &:focus {
      color: ${theme.colors.accent};
      border-color: ${theme.colors.accent};
      background: ${theme.colors.accentGlow};
      transform: translateY(-3px);
      box-shadow: 0 8px 20px ${theme.colors.accentGlow};
      outline: none;
    }

    &:after {
      display: none !important;
    }

    svg {
      width: 18px;
      height: 18px;
    }
  `}
`;

const LineDivider = styled.div`
  ${({ theme }) => css`
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, ${theme.colors.border}, transparent);
    margin-top: 4px;
  `}
`;

// ------------------------------------------------------------------
// Icon map
// ------------------------------------------------------------------

const iconMap: Record<string, React.ReactElement> = {
  GitHub: <IconGitHub />,
  LinkedIn: <IconLinkedIn />,
};

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const SocialSidebar = (): React.ReactElement => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { socialLinks } = config;

  return (
    <StyledFABWrapper>
      <motion.div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate="visible"
        variants={slideUpVariants}
      >
        {socialLinks
          .filter(({ name }) => iconMap[name])
          .map(({ name, url }) => (
            <SocialLink
              key={name}
              href={url}
              aria-label={name}
              target="_blank"
              rel="noopener noreferrer"
            >
              {iconMap[name]}
            </SocialLink>
          ))}
        <LineDivider />
      </motion.div>
    </StyledFABWrapper>
  );
};

export default SocialSidebar;
