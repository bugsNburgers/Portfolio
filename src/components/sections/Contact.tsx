'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import config from '@/data/config';
import useInView from '@/hooks/useInView';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { fadeUpVariants } from '@/styles/TransitionStyles';

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledContactSection = styled.section`
  ${({ theme }) => css`
    max-width: 600px;
    margin: 0 auto 100px;
    text-align: center;

    @media ${theme.media.md} {
      margin: 0 auto 50px;
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
    font-size: clamp(40px, 8vw, 60px);
    color: ${theme.colors.lightestSlate};
    margin: 0 0 20px;
  `}
`;

const StyledDescription = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.slate};
    font-size: ${theme.fontSizes.lg};
    line-height: 1.6;
    margin: 0;
  `}
`;

const StyledEmailLink = styled.a`
  ${({ theme }) => css`
    display: inline-block;
    margin-top: 50px;
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
        variants={fadeUpVariants}
      >
        <StyledOverline className="overline">say hello.</StyledOverline>

        <StyledTitle className="medium-heading">Get In Touch</StyledTitle>

        <StyledDescription>
          Got a project idea, a question, or just want to talk code (or cats)? My inbox is open.
          I try to reply to everything, so don&apos;t hesitate.
        </StyledDescription>

        <StyledEmailLink href={`mailto:${email}`}>Say Hello</StyledEmailLink>
      </motion.div>
    </StyledContactSection>
  );
};

export default Contact;
