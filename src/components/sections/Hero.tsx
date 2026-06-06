'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import heroData from '@/data/hero';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { fadeUpVariants, staggerContainerVariants } from '@/styles/TransitionStyles';

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledHeroSection = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    padding: 100px 0 60px !important;
    max-width: 1000px;

    @media ${theme.media.lg} {
      max-width: 100%;
    }

    @media ${theme.media.sm} {
      padding: 80px 0 40px !important;
    }
  `}
`;

const StyledGreeting = styled.h1`
  ${({ theme }) => css`
    margin: 0 0 30px 4px;
    color: ${theme.colors.green};
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.md};
    font-weight: 400;

    @media ${theme.media.sm} {
      margin: 0 0 20px 2px;
    }
  `}
`;

const StyledName = styled.h2`
  ${({ theme }) => css`
    margin: 0;
    font-size: clamp(40px, 8vw, 80px);
    color: ${theme.colors.lightestSlate};
    line-height: 1.1;
  `}
`;

const StyledTagline = styled.h3`
  ${({ theme }) => css`
    margin: 5px 0 20px;
    font-size: clamp(40px, 8vw, 80px);
    color: ${theme.colors.slate};
    line-height: 1.2;
  `}
`;

const StyledDescription = styled.p`
  ${({ theme }) => css`
    margin: 0;
    max-width: 540px;
    color: ${theme.colors.slate};
    font-size: ${theme.fontSizes.lg};
    line-height: 1.5;
  `}
`;

const StyledCTAWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 20px;
    margin-top: 30px;
    flex-wrap: wrap;

    @media ${theme.media.sm} {
      margin-top: 20px;
    }

    a {
      color: ${theme.colors.green};
      background-color: transparent;
      border: 1px solid ${theme.colors.green};
      border-radius: ${theme.sizes.borderRadius};
      padding: 1.25rem 1.75rem;
      font-size: ${theme.fontSizes.sm};
      font-family: ${theme.fonts.mono};
      line-height: 1;
      text-decoration: none;
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
    }
  `}
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const Hero = (): React.ReactElement => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { greeting, name, tagline, description, ctaPrimary, ctaSecondary } = heroData;

  return (
    <StyledHeroSection>
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate="visible"
        variants={staggerContainerVariants}
      >
        <motion.div variants={fadeUpVariants} transition={{ delay: prefersReducedMotion ? 0 : 0.1 }}>
          <StyledGreeting>{greeting}</StyledGreeting>
        </motion.div>

        <motion.div variants={fadeUpVariants} transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}>
          <StyledName>{name}</StyledName>
        </motion.div>

        <motion.div variants={fadeUpVariants} transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}>
          <StyledTagline>{tagline}</StyledTagline>
        </motion.div>

        <motion.div variants={fadeUpVariants} transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}>
          <StyledDescription>{description}</StyledDescription>
        </motion.div>

        <motion.div variants={fadeUpVariants} transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}>
          <StyledCTAWrapper>
            <a href={ctaPrimary.url}>{ctaPrimary.text}</a>
            <a href={ctaSecondary.url}>{ctaSecondary.text}</a>
          </StyledCTAWrapper>
        </motion.div>
      </motion.div>
    </StyledHeroSection>
  );
};

export default Hero;
