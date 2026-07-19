'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import heroData from '@/data/hero';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { blurInVariants, staggerContainerVariants } from '@/styles/TransitionStyles';
import mixins from '@/styles/mixins';
import VideoText from '@/components/VideoText';

const NAV_HEIGHT = '100px';

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledHeroSection = styled.section`
  ${({ theme }) => css`
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    padding: 0;
    padding-top: 60px; /* Pushes content down slightly on PC to account for navbar */

    @media ${theme.media.sm} {
      min-height: 85vh; /* Pulls the About section up */
      padding-bottom: 0; /* Automatically centers within the new height */
    }
  `}
`;

const StyledOverline = styled.p`
  ${({ theme }) => css`
    font-family: ${theme.fonts.mono};
    color: ${theme.colors.green};
    font-size: var(--md-sys-typescale-label-large-size);
    margin: 0;
    padding-bottom: 30px; /* Using padding ensures it cannot collapse with the motion.div wrapper */
  `}
`;

const StyledTitle = styled.h1`
  ${({ theme }) => css`
    margin: 0;
    font-family: ${theme.fonts.brand};
    font-size: clamp(36px, 7vw, 70px);
    color: ${theme.colors.lightestSlate};
    line-height: 1.1;
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

    @media ${theme.media.sm} {
      margin-top: 30px; /* Standard spacing */
    }

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
    justify-content: center;
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

    @media ${theme.media.sm} {
      margin-top: 40px; /* Standard spacing */
      gap: ${theme.spacing.m};
    }
  `}
`;

// Thin wrapper so VideoText sits in the right position in flow
const SubtitleRow = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacing.xs};
    width: 100%;

    @media ${theme.media.sm} {
      margin-top: 15px; /* Standard spacing */
    }
  `}
`;

const DesktopTagline = styled.div`
  display: block;
  @media ${({ theme }) => theme.media.sm} {
    display: none;
  }
`;

const MobileTagline = styled.div`
  display: none;
  @media ${({ theme }) => theme.media.sm} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px; /* Neat spacing for the two lines */
  }
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const Hero = (): React.ReactElement => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { greeting, name, tagline: _tagline, description, ctaPrimary, ctaSecondary } = heroData;

  const desktopVideoStyle = {
    fontFamily: 'var(--md-ref-typeface-brand)',
    fontSize: 'clamp(28px, 5.2vw, 70px)',
    fontWeight: 900,
    lineHeight: 1.15,
    color: '#8892b0',
  };

  const mobileVideoStyle = {
    fontFamily: 'var(--md-ref-typeface-brand)',
    fontSize: 'clamp(32px, 9vw, 45px)', /* Large enough to fill screen, small enough not to wrap */
    fontWeight: 900,
    lineHeight: 1.15,
    color: '#8892b0',
  };

  return (
    <StyledHeroSection>
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate="visible"
        variants={staggerContainerVariants}
        style={{ position: 'relative', zIndex: 2, width: '100%' }}
      >
        <motion.div variants={blurInVariants} transition={{ delay: prefersReducedMotion ? 0 : 0.1 }}>
          <StyledOverline>{greeting}</StyledOverline>
        </motion.div>

        <motion.div variants={blurInVariants} transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}>
          <StyledTitle>{name}</StyledTitle>
        </motion.div>

        <motion.div variants={blurInVariants} transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}>
          <SubtitleRow>
            {/* Desktop 1-line layout */}
            <DesktopTagline>
              <VideoText
                src="/video.mp4"
                suffix="."
                suffixColor="#64ffda"
                style={desktopVideoStyle}
              >
                I build things for the internet
              </VideoText>
            </DesktopTagline>

            {/* Mobile 2-line layout */}
            <MobileTagline>
              <VideoText src="/video.mp4" style={mobileVideoStyle}>
                I build things
              </VideoText>
              <VideoText
                src="/video.mp4"
                suffix="."
                suffixColor="#64ffda"
                style={mobileVideoStyle}
              >
                for the internet
              </VideoText>
            </MobileTagline>
          </SubtitleRow>
        </motion.div>

        <motion.div variants={blurInVariants} transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}>
          <StyledDescription dangerouslySetInnerHTML={{ __html: description }} />
        </motion.div>

        <motion.div variants={blurInVariants} transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}>
          <ButtonRow>
            {ctaSecondary && (
              <StyledEmailLink href={ctaSecondary.url}>{ctaSecondary.text}</StyledEmailLink>
            )}
          </ButtonRow>
        </motion.div>
      </motion.div>
    </StyledHeroSection>
  );
};

export default Hero;
