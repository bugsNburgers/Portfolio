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

const StyledHeroSection = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    max-width: 1000px;
    padding: 0 !important;

    @media ${theme.media.sm} {
      min-height: auto;
      padding-top: 80px !important;
    }
  `}
`;

const StyledOverline = styled.h1`
  ${({ theme }) => css`
    margin: 0 0 20px 4px;
    color: ${theme.colors.green};
    font-family: ${theme.fonts.mono};
    font-size: clamp(${theme.fontSizes.sm}, 5vw, ${theme.fontSizes.md});
    font-weight: 400;

    @media ${theme.media.sm} {
      margin: 0 0 20px 2px;
    }
  `}
`;

const StyledTitle = styled.h2`
  ${({ theme }) => css`
    margin: 0;
    font-size: clamp(40px, 8vw, 80px);
    color: ${theme.colors.lightestSlate};
    line-height: 1.1;
  `}
`;

const StyledSubtitle = styled.h3`
  ${({ theme }) => css`
    margin-top: 5px;
    color: ${theme.colors.slate};
    line-height: 0.9;
    font-size: clamp(40px, 8vw, 80px);
  `}
`;

const StyledDescription = styled.div`
  ${({ theme }) => css`
    margin-top: 20px;
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
        content: '';
        display: block;
        width: 0;
        height: 1px;
        position: relative;
        bottom: 0.37em;
        background-color: ${theme.colors.green};
        opacity: 0.5;
        transition: ${theme.transition};
      }

      &:hover:after,
      &:focus-visible:after {
        width: 100%;
      }
    }
  `}
`;

const StyledEmailLink = styled.a`
  ${({ theme }) => css`
    ${mixins.bigButton};
    margin-top: 50px;
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
