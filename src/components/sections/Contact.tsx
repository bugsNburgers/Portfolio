'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import config from '@/data/config';
import mixins from '@/styles/mixins';
import useInView from '@/hooks/useInView';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { blurInVariants } from '@/styles/TransitionStyles';

// ------------------------------------------------------------------
// Styled components — simple centered CTA (no card, no border)
// ------------------------------------------------------------------

const StyledContactSection = styled.section`
  ${({ theme }) => css`
    max-width: 600px;
    margin: 0 auto 100px;
    text-align: center;

    @media ${theme.media.md} {
      margin: 0 auto 60px;
    }
  `}
`;

const StyledOverline = styled.p`
  ${({ theme }) => css`
    display: block;
    margin-bottom: 20px;
    color: ${theme.colors.green};
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.md};
    font-weight: 400;
  `}
`;

const StyledTitle = styled.h2`
  ${({ theme }) => css`
    font-size: clamp(40px, 5vw, 60px);
    color: ${theme.colors.lightestSlate};
    margin: 0 0 20px;
    font-weight: 600;
    line-height: 1.1;
  `}
`;

const StyledDescription = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.slate};
    font-size: ${theme.fontSizes.lg};
    line-height: 1.6;
    margin: 0 auto 60px;
  `}
`;

const StyledCTA = styled.a`
  ${({ theme }) => css`
    ${mixins.bigButton};
    display: inline-block;
    margin-top: 30px;
  `}
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const Contact = (): React.ReactElement => {
  const [ref, isInView] = useInView();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { email } = config;

  return (
    <StyledContactSection id="contact" ref={ref as React.RefObject<HTMLElement>}>
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
        variants={blurInVariants}
      >
        <StyledOverline>Reach out to me!</StyledOverline>

        <StyledTitle>Get In Touch</StyledTitle>

        <StyledDescription>
          I&apos;m currently open to new opportunities, whether it&apos;s freelance
          work, a full-time role, or just a chat. My inbox is always open. I&apos;ll do my best to get back to you!
        </StyledDescription>

        <StyledCTA href={`mailto:${email}`}>
          Say Hello
        </StyledCTA>
      </motion.div>
    </StyledContactSection>
  );
};

export default Contact;
