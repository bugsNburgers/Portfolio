'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import heroData from '@/data/hero';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { blurInVariants, staggerContainerVariants } from '@/styles/TransitionStyles';
import mixins from '@/styles/mixins';

const PixelBlast = dynamic(() => import('@/components/PixelBlast'), { ssr: false });

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
    padding-bottom: 80px !important;
    
    position: relative;

    @media ${theme.media.sm} {
      min-height: auto;
      padding-top: calc(${NAV_HEIGHT} + 20px) !important;
    }
  `}
`;

const StyledOverline = styled.h1`
  ${({ theme }) => css`
    margin: 0 0 ${theme.spacing.l} ${theme.spacing.xs};
    color: ${theme.colors.lightestSlate};
    font-family: ${theme.fonts.mono};
    font-size: clamp(${theme.fontSizes.sm}, 5vw, ${theme.fontSizes.md});
    font-weight: var(--md-ref-typeface-weight-regular);
    letter-spacing: 0.05em;

    @media ${theme.media.sm} {
      margin: 0 0 ${theme.spacing.m} ${theme.spacing.xs};
    }
  `}
`;

/* Scale title down so the whole hero fits in one screen */
const StyledTitle = styled.h2`
  ${({ theme }) => css`
    margin: 0;
    font-family: ${theme.fonts.brand};
    font-size: clamp(36px, 7vw, 70px);
    color: ${theme.colors.lightestSlate};
    line-height: 1.1;
    font-weight: var(--md-ref-typeface-weight-bold);
  `}
`;

const StyledSubtitle = styled.h3`
  ${({ theme }) => css`
    margin-top: ${theme.spacing.xs};
    font-family: ${theme.fonts.brand};
    color: ${theme.colors.slate};
    line-height: 0.95;
    font-size: clamp(28px, 5.2vw, 70px);
    font-weight: var(--md-ref-typeface-weight-bold);
  `}
`;

const StyledDescription = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacing.xl};
    max-width: 540px;
    color: ${theme.colors.slate};
    font-family: ${theme.fonts.sans};
    font-size: var(--md-sys-typescale-body-large-size);
    line-height: var(--md-sys-typescale-body-large-line-height);
    letter-spacing: var(--md-sys-typescale-body-large-tracking);

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
    display: inline-flex;
    align-items: center;
    gap: ${theme.spacing.s};
  `}
`;



const ButtonRow = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.l};
    margin-top: calc(${theme.spacing.xl} * 1.5);
    flex-wrap: wrap;
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
      <PixelBlast
        variant="circle"
        pixelSize={4}
        color="#186f5e"
        patternScale={2}
        patternDensity={0.95}
        opacityScale={0.5}
        pixelSizeJitter={0.5}
        enableRipples={true}
        rippleSpeed={0.3}
        rippleThickness={0.12}
        rippleIntensityScale={0.8}
        liquid={false}
        liquidStrength={0.04}
        liquidRadius={1.0}
        liquidWobbleSpeed={3.0}
        speed={1.2}
        edgeFade={0.0}
        transparent={true}
        style={{
          position: 'absolute',
          top: `-${NAV_HEIGHT}`,
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          height: 'auto',
          zIndex: 1,
          opacity: 1.0,
        }}
      />
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate="visible"
        variants={staggerContainerVariants}
        style={{ position: 'relative', zIndex: 2, width: '100%' }}
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
          <ButtonRow>
            <StyledEmailLink href={ctaPrimary.url}>
              {ctaPrimary.text}
            </StyledEmailLink>
            {ctaSecondary && (
              <StyledEmailLink href={ctaSecondary.url}>
                {ctaSecondary.text}
              </StyledEmailLink>
            )}
          </ButtonRow>
        </motion.div>
      </motion.div>
    </StyledHeroSection>
  );
};

export default Hero;
