'use client';

import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import heroData from '@/data/hero';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { blurInVariants, staggerContainerVariants } from '@/styles/TransitionStyles';

// ------------------------------------------------------------------
// Background animation — floating gradient orbs
// ------------------------------------------------------------------

const floatA = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.05); }
  66% { transform: translate(-20px, 15px) scale(0.97); }
`;

const floatB = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  40% { transform: translate(-25px, 20px) scale(1.04); }
  70% { transform: translate(20px, -15px) scale(0.98); }
`;

const StyledHeroSection = styled.section`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    align-items: center;
    min-height: 100vh;
    padding: 120px 0 80px !important;
    max-width: 100%;
    overflow: hidden;

    @media ${theme.media.sm} {
      padding: 100px 0 60px !important;
    }
  `}
`;

// Gradient orbs in background
const OrbA = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(127, 90, 240, 0.12) 0%, transparent 70%);
  top: -100px;
  right: -100px;
  animation: ${floatA} 12s ease-in-out infinite;
  pointer-events: none;
`;

const OrbB = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 166, 35, 0.08) 0%, transparent 70%);
  bottom: 50px;
  left: -80px;
  animation: ${floatB} 15s ease-in-out infinite;
  pointer-events: none;
`;

// Two-column split layout
const HeroGrid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    width: 100%;
    max-width: 1000px;

    @media ${theme.media.lg} {
      gap: 50px;
    }

    @media ${theme.media.md} {
      grid-template-columns: 1fr;
      gap: 48px;
    }
  `}
`;

const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledRole = styled.p`
  ${({ theme }) => css`
    margin: 0 0 16px;
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.accent};
    letter-spacing: 0.15em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 10px;

    &:before {
      content: '';
      display: block;
      width: 32px;
      height: 1px;
      background: linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.secondary});
    }
  `}
`;

const StyledName = styled.h1`
  ${({ theme }) => css`
    margin: 0 0 8px;
    font-size: clamp(38px, 7vw, 72px);
    color: ${theme.colors.textPrimary};
    line-height: 1.05;
    letter-spacing: -0.04em;
    font-weight: 700;

    /* Gradient on last word */
    span {
      background: linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.secondary});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `}
`;

const StyledTagline = styled.h2`
  ${({ theme }) => css`
    margin: 0 0 24px;
    font-size: clamp(18px, 3vw, 28px);
    color: ${theme.colors.textSecondary};
    line-height: 1.3;
    font-weight: 400;
    letter-spacing: -0.01em;

    strong {
      color: ${theme.colors.textPrimary};
      font-weight: 600;
    }
  `}
`;

const StyledDescription = styled.p`
  ${({ theme }) => css`
    margin: 0 0 36px;
    max-width: 480px;
    color: ${theme.colors.textMuted};
    font-size: ${theme.fontSizes.md};
    line-height: 1.7;
  `}
`;

const StyledCTAWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 14px;
    flex-wrap: wrap;

    .cta-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: ${theme.sizes.borderRadius};
      background: linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentLight});
      color: ${theme.colors.white};
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.sm};
      font-weight: 500;
      text-decoration: none;
      transition: ${theme.transition};
      cursor: pointer;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px ${theme.colors.accentGlowStrong};
        color: ${theme.colors.white};
      }

      &:after {
        display: none !important;
      }
    }

    .cta-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: ${theme.sizes.borderRadius};
      background: transparent;
      color: ${theme.colors.textSecondary};
      border: 1px solid ${theme.colors.border};
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.sm};
      font-weight: 400;
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
    }
  `}
`;

// Right column — abstract code/terminal card
const HeroRight = styled.div`
  ${({ theme }) => css`
    position: relative;

    @media ${theme.media.md} {
      display: none;
    }
  `}
`;

const TerminalCard = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.bgSurface};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.sizes.borderRadius};
    overflow: hidden;
    box-shadow:
      0 0 0 1px ${theme.colors.bgElevated},
      0 20px 60px rgba(0, 0, 0, 0.5);
    position: relative;

    /* Glow border effect */
    &:before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      background: linear-gradient(135deg, ${theme.colors.accent}40, ${theme.colors.secondary}20, transparent);
      z-index: -1;
    }
  `}
`;

const TerminalHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 12px 16px;
    background: ${theme.colors.bgElevated};
    border-bottom: 1px solid ${theme.colors.border};

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;

      &:nth-child(1) { background: #ff5f56; }
      &:nth-child(2) { background: #ffbd2e; }
      &:nth-child(3) { background: #27c93f; }
    }

    .title {
      flex: 1;
      text-align: center;
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xxs};
      color: ${theme.colors.textFaint};
    }
  `}
`;

const TerminalBody = styled.div`
  ${({ theme }) => css`
    padding: 20px;
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xs};
    line-height: 1.8;

    .line {
      display: flex;
      gap: 8px;

      .prompt { color: ${theme.colors.accent}; }
      .cmd { color: ${theme.colors.textPrimary}; }
      .comment { color: ${theme.colors.textFaint}; }
      .string { color: ${theme.colors.secondary}; }
      .keyword { color: #c792ea; }
      .value { color: #2cb67d; }
      .output { color: ${theme.colors.textMuted}; padding-left: 16px; }
    }
  `}
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const Hero = (): React.ReactElement => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { name, tagline, description, ctaPrimary, ctaSecondary } = heroData;

  const firstName = name.replace('.', '').split(' ')[0];
  const lastName = name.replace('.', '').split(' ').slice(1).join(' ');

  return (
    <StyledHeroSection>
      <OrbA />
      <OrbB />

      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate="visible"
        variants={staggerContainerVariants}
        style={{ width: '100%' }}
      >
        <HeroGrid>
          <HeroLeft>
            <motion.div variants={blurInVariants} transition={{ delay: prefersReducedMotion ? 0 : 0.1 }}>
              <StyledRole>Software Engineer</StyledRole>
            </motion.div>

            <motion.div variants={blurInVariants} transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}>
              <StyledName>
                {firstName}{' '}
                <span>{lastName}.</span>
              </StyledName>
            </motion.div>

            <motion.div variants={blurInVariants} transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}>
              <StyledTagline>
                <strong>Building</strong> things that live on the internet —<br />
                {tagline}
              </StyledTagline>
            </motion.div>

            <motion.div variants={blurInVariants} transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}>
              <StyledDescription>{description}</StyledDescription>
            </motion.div>

            <motion.div variants={blurInVariants} transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}>
              <StyledCTAWrapper>
                <a href={ctaPrimary.url} className="cta-primary">
                  {ctaPrimary.text} →
                </a>
                <a href={ctaSecondary.url} className="cta-secondary">
                  {ctaSecondary.text}
                </a>
              </StyledCTAWrapper>
            </motion.div>
          </HeroLeft>

          {/* Abstract terminal card — right column */}
          <HeroRight>
            <motion.div
              variants={blurInVariants}
              transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
            >
              <TerminalCard>
                <TerminalHeader>
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                  <span className="title">suprateek.ts</span>
                </TerminalHeader>
                <TerminalBody>
                  <div className="line">
                    <span className="keyword">const</span>
                    <span className="cmd">me</span>
                    <span className="comment">=</span>
                    <span className="value">{'{'}</span>
                  </div>
                  <div className="line">
                    <span className="output">name: <span className="string">&quot;Suprateek Yawagal&quot;</span>,</span>
                  </div>
                  <div className="line">
                    <span className="output">role: <span className="string">&quot;Full-Stack Engineer&quot;</span>,</span>
                  </div>
                  <div className="line">
                    <span className="output">location: <span className="string">&quot;Bengaluru, India&quot;</span>,</span>
                  </div>
                  <div className="line">
                    <span className="output">focus: [</span>
                  </div>
                  <div className="line">
                    <span className="output" style={{ paddingLeft: '32px' }}><span className="string">&quot;TypeScript&quot;</span>,</span>
                  </div>
                  <div className="line">
                    <span className="output" style={{ paddingLeft: '32px' }}><span className="string">&quot;React / Next.js&quot;</span>,</span>
                  </div>
                  <div className="line">
                    <span className="output" style={{ paddingLeft: '32px' }}><span className="string">&quot;Developer Tools&quot;</span>,</span>
                  </div>
                  <div className="line">
                    <span className="output">],</span>
                  </div>
                  <div className="line">
                    <span className="output">shipping: <span className="value">true</span>,</span>
                  </div>
                  <div className="line">
                    <span className="value">{'}'}</span>
                  </div>
                </TerminalBody>
              </TerminalCard>
            </motion.div>
          </HeroRight>
        </HeroGrid>
      </motion.div>
    </StyledHeroSection>
  );
};

export default Hero;
