'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import aboutData from '@/data/about';
import useInView from '@/hooks/useInView';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { fadeUpVariants } from '@/styles/TransitionStyles';

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledAboutSection = styled.section`
  ${({ theme }) => css`
    max-width: 900px;
  `}

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledText = styled.div`
  ${({ theme }) => css`
    & > p {
      margin: 0 0 15px;
      color: ${theme.colors.lightSlate};
      font-size: ${theme.fontSizes.lg};

      a {
        color: ${theme.colors.green};
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
          background-color: ${theme.colors.green};
          opacity: 0.5;
          transition: ${theme.transition};
        }

        &:hover:after,
        &:focus-visible:after {
          width: 100%;
        }
      }
    }
  `}
`;

const StyledSkillsGrid = styled.ul`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    gap: 0;
    padding: 0;
    margin: 20px 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xs};
      color: ${theme.colors.slate};

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: ${theme.colors.green};
        font-size: ${theme.fontSizes.sm};
        line-height: 12px;
      }
    }
  `}
`;

const StyledPhotoWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    max-width: 300px;

    @media ${theme.media.md} {
      margin: 50px auto 0;
    }

    .wrapper {
      display: block;
      position: relative;
      width: 100%;
      border-radius: ${theme.sizes.borderRadius};
      background-color: ${theme.colors.green};
      transition: ${theme.transition};

      &:hover,
      &:focus {
        outline: 0;
        background: transparent;

        &:after {
          top: 15px;
          left: 15px;
        }

        .img {
          filter: none;
          mix-blend-mode: normal;
        }
      }

      .img {
        position: relative;
        border-radius: ${theme.sizes.borderRadius};
        mix-blend-mode: multiply;
        filter: grayscale(100%) contrast(1);
        transition: ${theme.transition};
      }

      &:before,
      &:after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: ${theme.sizes.borderRadius};
        transition: ${theme.transition};
      }

      &:before {
        top: 0;
        left: 0;
        background-color: ${theme.colors.navy};
        mix-blend-mode: screen;
      }

      &:after {
        border: 2px solid ${theme.colors.green};
        top: 20px;
        left: 20px;
        z-index: -1;
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
    <StyledAboutSection id="about" ref={sectionRef as React.RefObject<HTMLElement>}>
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
        variants={fadeUpVariants}
      >
        <h2 className="numbered-heading">About Me</h2>

        <div className="inner">
          <StyledText>
            {paragraphs.map((para, i) => (
              // eslint-disable-next-line react/no-danger
              <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
            ))}

            <StyledSkillsGrid>
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </StyledSkillsGrid>
          </StyledText>

          <StyledPhotoWrapper>
            <div className="wrapper">
              <Image
                className="img"
                src="/images/headshot.jpg"
                alt={imageAlt}
                width={500}
                height={500}
                priority={false}
              />
            </div>
          </StyledPhotoWrapper>
        </div>
      </motion.div>
    </StyledAboutSection>
  );
};

export default About;
