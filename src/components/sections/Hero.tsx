'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import heroData from '@/data/hero';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { blurInVariants, staggerContainerVariants } from '@/styles/TransitionStyles';
import mixins from '@/styles/mixins';

// ------------------------------------------------------------------
// Styled components — Brittany-style left-aligned single column
// ------------------------------------------------------------------

// Nav height is 100px (theme.sizes.navHeight). We use it to push content below
// the fixed nav so "Hi, my name is" is never hidden behind the bar.
const NAV_HEIGHT = '100px';

const StyledHeroSection = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    /* Full viewport minus nav so content is truly centred in the visible area */
    min-height: calc(100vh - ${NAV_HEIGHT});
    max-width: 1000px;
    /* Override global section padding — use nav height as top offset */
    padding-top: ${NAV_HEIGHT} !important;
    padding-bottom: 0 !important;

    @media ${theme.media.sm} {
      min-height: auto;
      padding-top: calc(${NAV_HEIGHT} + 20px) !important;
    }
  `}
`;

const StyledOverline = styled.h1`
  ${({ theme }) => css`
    margin: 0 0 16px 4px;
    color: ${theme.colors.lightestSlate};
    font-family: ${theme.fonts.mono};
    font-size: clamp(${theme.fontSizes.sm}, 5vw, ${theme.fontSizes.md});
    font-weight: 400;
    letter-spacing: 0.05em;

    @media ${theme.media.sm} {
      margin: 0 0 12px 2px;
    }
  `}
`;

/* Scale title down so the whole hero fits in one screen */
const StyledTitle = styled.h2`
  ${({ theme }) => css`
    margin: 0;
    font-size: clamp(36px, 7vw, 70px);
    color: ${theme.colors.lightestSlate};
    line-height: 1.1;
  `}
`;

const StyledSubtitle = styled.h3`
  ${({ theme }) => css`
    margin-top: 4px;
    color: ${theme.colors.slate};
    line-height: 0.95;
    font-size: clamp(36px, 7vw, 70px);
  `}
`;

const StyledDescription = styled.div`
  ${({ theme }) => css`
    margin-top: 18px;
    max-width: 540px;
    color: ${theme.colors.slate};
    font-size: ${theme.fontSizes.lg};
    line-height: 1.6;

    a {
      display: inline-block;
      position: relative;
      color: ${theme.colors.green};
      transition: ${theme.transition};

      &:after {
        display: none !important;
      }
    }
  `}
`;

const StyledEmailLink = styled.a`
  ${({ theme }) => css`
    ${mixins.bigButton};
    margin-top: 40px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  `}
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const Hero = (): React.ReactElement => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { greeting, name, tagline, description, ctaPrimary } = heroData;

  return (
    <StyledHeroSection>
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate="visible"
        variants={staggerContainerVariants}
      >
        <motion.div
          variants={blurInVariants}
          transition={{ delay: prefersReducedMotion ? 0 : 0.1 }}
        >
          <StyledOverline>{greeting}</StyledOverline>
        </motion.div>

        <motion.div
          variants={blurInVariants}
          transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          <StyledTitle>{name}</StyledTitle>
        </motion.div>

        <motion.div
          variants={blurInVariants}
          transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
        >
          <StyledSubtitle>{tagline}</StyledSubtitle>
        </motion.div>

        <motion.div
          variants={blurInVariants}
          transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
        >
          <StyledDescription
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </motion.div>

        <motion.div
          variants={blurInVariants}
          transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}
        >
          <StyledEmailLink href={ctaPrimary.url}>
            {ctaPrimary.text}
          </StyledEmailLink>
        </motion.div>
      </motion.div>
    </StyledHeroSection>
  );
};

export default Hero;
