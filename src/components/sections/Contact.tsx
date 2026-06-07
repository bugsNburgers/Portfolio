'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import config from '@/data/config';
import useInView from '@/hooks/useInView';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { blurInVariants } from '@/styles/TransitionStyles';

// ------------------------------------------------------------------
// Styled components — Gradient card CTA (not plain centered text)
// ------------------------------------------------------------------

const StyledContactSection = styled.section`
  ${({ theme }) => css`
    max-width: 700px;
    margin: 0 auto 80px;

    @media ${theme.media.md} {
      margin: 0 auto 50px;
    }
  `}
`;

const ContactCard = styled.div`
  ${({ theme }) => css`
    position: relative;
    border-radius: ${theme.sizes.borderRadiusLg};
    overflow: hidden;
    padding: 56px 48px;
    text-align: center;

    /* Gradient background */
    background: ${theme.colors.bgSurface};
    border: 1px solid ${theme.colors.border};

    /* Animated gradient orbs inside card */
    &:before {
      content: '';
      position: absolute;
      top: -80px;
      left: -80px;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(127, 90, 240, 0.12) 0%, transparent 70%);
      pointer-events: none;
    }

    &:after {
      content: '';
      position: absolute;
      bottom: -60px;
      right: -60px;
      width: 250px;
      height: 250px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(245, 166, 35, 0.08) 0%, transparent 70%);
      pointer-events: none;
    }

    @media ${theme.media.md} {
      padding: 40px 28px;
    }
  `}
`;

const ContactLabel = styled.p`
  ${({ theme }) => css`
    display: block;
    margin: 0 0 12px;
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.accent};
    letter-spacing: 0.15em;
    text-transform: uppercase;
    position: relative;
    z-index: 1;
  `}
`;

const ContactTitle = styled.h2`
  ${({ theme }) => css`
    font-size: clamp(32px, 6vw, 52px);
    color: ${theme.colors.textPrimary};
    margin: 0 0 16px;
    letter-spacing: -0.03em;
    font-weight: 700;
    position: relative;
    z-index: 1;

    span {
      background: linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.secondary});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `}
`;

const ContactDescription = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSizes.md};
    line-height: 1.7;
    margin: 0 0 36px;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    z-index: 1;
  `}
`;

const ContactButtons = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  `}
`;

const PrimaryButton = styled.a`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    border-radius: ${theme.sizes.borderRadius};
    background: linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentLight});
    color: ${theme.colors.white};
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.sm};
    font-weight: 500;
    text-decoration: none;
    transition: ${theme.transition};

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px ${theme.colors.accentGlowStrong};
      color: ${theme.colors.white};
    }

    &:after {
      display: none !important;
    }
  `}
`;

const SecondaryButton = styled.a`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    border-radius: ${theme.sizes.borderRadius};
    background: transparent;
    color: ${theme.colors.textSecondary};
    border: 1px solid ${theme.colors.border};
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.sm};
    text-decoration: none;
    transition: ${theme.transition};

    &:hover {
      color: ${theme.colors.accent};
      border-color: ${theme.colors.accent};
      background: ${theme.colors.accentGlow};
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
        variants={blurInVariants}
      >
        <ContactCard>
          <ContactLabel>Let&apos;s work together</ContactLabel>

          <ContactTitle>
            Get In <span>Touch</span>
          </ContactTitle>

          <ContactDescription>
            I&apos;m currently open to new opportunities — freelance, full-time, or collaboration.
            Whether it&apos;s a project, a question, or just a hello — my inbox is open.
          </ContactDescription>

          <ContactButtons>
            <PrimaryButton href={`mailto:${email}`}>
              Send a Message →
            </PrimaryButton>
            <SecondaryButton
              href="https://linkedin.com/in/suprateek-yawagal"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn
            </SecondaryButton>
          </ContactButtons>
        </ContactCard>
      </motion.div>
    </StyledContactSection>
  );
};

export default Contact;
