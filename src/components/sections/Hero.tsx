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
    min-height: calc(100vh - ${NAV_HEIGHT});
    padding-top: ${NAV_HEIGHT};
    padding-left: ${theme.spacing.xxl};
    padding-right: ${theme.spacing.xxl};

    @media ${theme.media.md} {
      padding-left: ${theme.spacing.xl};
      padding-right: ${theme.spacing.xl};
    }
    @media ${theme.media.sm} {
      padding-left: ${theme.spacing.l};
      padding-right: ${theme.spacing.l};
    }
  `}
`;

const StyledOverline = styled.p`
  ${({ theme }) => css`
    font-family: ${theme.fonts.mono};
    color: ${theme.colors.green};
    font-size: var(--md-sys-typescale-label-large-size);
    margin-bottom: ${theme.spacing.m};
    margin-top: 0;
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

    @media ${theme.media.sm} {
      width: 100%;
    }
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
      flex-direction: column;
      align-items: stretch;
      gap: ${theme.spacing.m};
      width: 100%;
    }
  `}
`;

// Thin wrapper so VideoText sits in the right position in flow
const SubtitleRow = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacing.xs};
    width: 100%;
  `}
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const Hero = (): React.ReactElement => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { greeting, name, tagline: _tagline, description, ctaPrimary, ctaSecondary } = heroData;

  // Strip HTML tags for canvas text (VideoText renders on canvas, can't parse HTML)
  const taglinePlain = 'I build things for the internet'; // Removed dot from here

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
            {/*
              VideoText renders the tagline text on a canvas.
              Video frames are painted ONLY inside the letter shapes via source-in compositing.
              Canvas background is fully transparent — no box, no rectangle, just letters.
              Drop your video at /public/video.mp4 and it will play inside the text.
            */}
            <VideoText
              src="/video.mp4"
              suffix="."
              suffixColor="#64ffda"
              style={{
                fontFamily: 'var(--md-ref-typeface-brand)',
                fontSize: 'clamp(28px, 5.2vw, 70px)',
                fontWeight: 900,
                lineHeight: 1.15,
                color: '#8892b0', /* slate — shown as fallback before video loads */
              }}
            >
              {taglinePlain}
            </VideoText>
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
