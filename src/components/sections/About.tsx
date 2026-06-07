'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import aboutData from '@/data/about';
import useInView from '@/hooks/useInView';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { blurInVariants, staggerContainerVariants } from '@/styles/TransitionStyles';

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledAboutSection = styled.section`
  ${({ theme }) => css`
    max-width: 900px;
  `}
`;

const StyledInner = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 60px;
    align-items: start;

    @media ${theme.media.md} {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  `}
`;

const StyledText = styled.div`
  ${({ theme }) => css`
    & > p {
      margin: 0 0 16px;
      color: ${theme.colors.textSecondary};
      font-size: ${theme.fontSizes.md};
      line-height: 1.75;

      a {
        color: ${theme.colors.accent};
        text-decoration: none;
        position: relative;
        transition: ${theme.transition};

        &:after {
          content: '';
          display: block;
          width: 0;
          height: 1px;
          position: relative;
          bottom: 0.37em;
          background: linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.secondary});
          opacity: 0.6;
          transition: ${theme.transition};
        }

        &:hover:after,
        &:focus-visible:after {
          width: 100%;
        }
      }

      strong {
        color: ${theme.colors.textPrimary};
        font-weight: 600;
      }
    }
  `}
`;

// Pill-based skills grid — replaces Brittany's ▹ arrow list
const StyledSkillsGrid = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 24px;
  `}
`;

const SkillPill = styled.span`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    background: ${theme.colors.accentGlow};
    border: 1px solid rgba(127, 90, 240, 0.25);
    border-radius: 100px;
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xxs};
    color: ${theme.colors.accentLight};
    letter-spacing: 0.04em;
    transition: ${theme.transition};

    &:hover {
      background: ${theme.colors.accentGlowStrong};
      border-color: ${theme.colors.accent};
      transform: translateY(-1px);
    }
  `}
`;

// Photo with gradient border — replaces Brittany's green-tinted offset frame
const StyledPhotoWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    max-width: 280px;

    @media ${theme.media.md} {
      max-width: 240px;
      margin: 0;
    }

    /* Gradient border */
    &:before {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: ${theme.sizes.borderRadiusLg};
      background: linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.secondary});
      z-index: -1;
    }

    .img-frame {
      position: relative;
      border-radius: ${theme.sizes.borderRadius};
      overflow: hidden;
      background: ${theme.colors.bgSurface};

      /* Photo is shown in color, no grayscale filter */
      img {
        display: block;
        width: 100%;
        height: auto;
        transition: ${theme.transition};
        transform: scale(1.0);
      }

      &:hover img {
        transform: scale(1.03);
      }
    }

    /* Subtle floating label */
    .status-badge {
      position: absolute;
      bottom: -12px;
      right: -12px;
      background: ${theme.colors.bgSurface};
      border: 1px solid ${theme.colors.border};
      border-radius: ${theme.sizes.borderRadius};
      padding: 6px 12px;
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xxs};
      color: ${theme.colors.success};
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
      z-index: 1;

      &:before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${theme.colors.success};
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(0.85); }
      }
    }
  `}
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const About = (): React.ReactElement => {
  const [ref, isInView] = useInView();
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = ref as React.RefObject<HTMLElement>;

  const { paragraphs, skills, imageAlt } = aboutData;

  return (
    <StyledAboutSection id="about" ref={sectionRef}>
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
        variants={staggerContainerVariants}
      >
        <motion.div variants={blurInVariants}>
          <h2 className="numbered-heading">About Me</h2>
        </motion.div>

        <StyledInner>
          <motion.div variants={blurInVariants}>
            <StyledText>
              {paragraphs.map((para, i) => (
                // eslint-disable-next-line react/no-danger
                <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
              ))}

              <StyledSkillsGrid>
                {skills.map((skill) => (
                  <SkillPill key={skill}>{skill}</SkillPill>
                ))}
              </StyledSkillsGrid>
            </StyledText>
          </motion.div>

          <motion.div variants={blurInVariants}>
            <StyledPhotoWrapper>
              <div className="img-frame">
                <Image
                  src="/images/headshot.jpg"
                  alt={imageAlt}
                  width={500}
                  height={500}
                  priority={false}
                />
              </div>
              <div className="status-badge">Open to opportunities</div>
            </StyledPhotoWrapper>
          </motion.div>
        </StyledInner>
      </motion.div>
    </StyledAboutSection>
  );
};

export default About;
