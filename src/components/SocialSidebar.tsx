'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import IconGitHub from '@/components/IconGitHub';
import IconLinkedIn from '@/components/IconLinkedIn';
import IconTwitter from '@/components/IconTwitter';
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
    left: 40px;
    right: auto;
    z-index: 10;
    color: ${theme.colors.lightSlate};

    @media ${theme.media.lg} {
      left: 20px;
    }

    @media ${theme.media.md} {
      display: none;
    }
  `}
`;

const StyledSocialList = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;

    &:after {
      content: '';
      display: block;
      width: 1px;
      height: 90px;
      margin: 0 auto;
      background-color: ${theme.colors.lightSlate};
    }

    li {
      &:last-of-type {
        margin-bottom: 20px;
      }

      a {
        padding: 10px;
        display: inline-block;
        color: ${theme.colors.lightSlate};
        transition: ${theme.transition};

        &:hover,
        &:focus {
          color: ${theme.colors.green};
          transform: translateY(-3px);
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  `}
`;

// ------------------------------------------------------------------
// Icon map
// ------------------------------------------------------------------

const iconMap: Record<string, React.ReactElement> = {
  GitHub: <IconGitHub />,
  LinkedIn: <IconLinkedIn />,
  Twitter: <IconTwitter />,
};

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const SocialSidebar = (): React.ReactElement => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { socialLinks } = config;

  return (
    <StyledSideElement>
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate="visible"
        variants={sidebarSlideUpVariants}
      >
        <StyledSocialList>
          {socialLinks.map(({ name, url }) => (
            <li key={name}>
              <a
                href={url}
                aria-label={name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {iconMap[name] ?? null}
              </a>
            </li>
          ))}
        </StyledSocialList>
      </motion.div>
    </StyledSideElement>
  );
};

export default SocialSidebar;
