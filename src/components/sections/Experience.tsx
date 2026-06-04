'use client';

import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import experienceData from '@/data/experience';
import useInView from '@/hooks/useInView';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { fadeUpVariants } from '@/styles/TransitionStyles';

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledExperienceSection = styled.section`
  ${({ theme }) => css`
    max-width: 700px;
  `}
`;

const StyledTabsRoot = styled(Tabs.Root)`
  ${({ theme }) => css`
    display: flex;
    align-items: flex-start;
    gap: 30px;

    @media ${theme.media.md} {
      flex-direction: column;
    }
  `}
`;

const StyledTabsList = styled(Tabs.List)`
  ${({ theme }) => css`
    position: relative;
    z-index: 3;
    width: max-content;
    padding: 0;
    margin: 0;
    list-style: none;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;

    @media ${theme.media.md} {
      flex-direction: row;
      overflow-x: auto;
      width: 100%;
      margin-bottom: 30px;
      padding-bottom: 2px;
      border-left: none;
      border-bottom: 2px solid ${theme.colors.lightestNavy};
    }
  `}
`;

const StyledTabTrigger = styled(Tabs.Trigger)`
  ${({ theme }) => css`
    text-decoration: none;
    text-decoration-skip-ink: auto;
    position: relative;
    transition: ${theme.transition};
    display: flex;
    align-items: center;
    width: 100%;
    height: ${theme.sizes.tabHeight};
    padding: 0 20px 2px;
    border-left: 2px solid ${theme.colors.lightestNavy};
    background-color: transparent;
    color: ${theme.colors.slate};
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xs};
    text-align: left;
    white-space: nowrap;
    border-bottom: none;
    border-top: none;
    border-right: none;
    cursor: pointer;

    @media ${theme.media.md} {
      padding: 0 15px 2px;
      border-left: none;
      border-bottom: 2px solid ${theme.colors.lightestNavy};
      min-width: 120px;
      text-align: center;
      justify-content: center;
    }

    &:hover,
    &:focus-visible {
      background-color: ${theme.colors.greenTint};
      color: ${theme.colors.green};
      outline: none;
    }

    &[data-state='active'] {
      color: ${theme.colors.green};
      border-left-color: ${theme.colors.green};

      @media ${theme.media.md} {
        border-bottom-color: ${theme.colors.green};
        border-left-color: transparent;
      }
    }
  `}
`;

const StyledTabContent = styled(Tabs.Content)`
  ${({ theme }) => css`
    width: 100%;

    &[data-state='active'] {
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(5px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}
`;

const StyledJobTitle = styled.h3`
  ${({ theme }) => css`
    margin-bottom: 2px;
    font-size: ${theme.fontSizes.xxl};
    font-weight: 500;
    color: ${theme.colors.lightestSlate};
    line-height: 1.3;

    .company {
      color: ${theme.colors.green};

      a {
        color: ${theme.colors.green};
        transition: ${theme.transition};
        text-decoration: none;

        &:hover,
        &:focus {
          color: ${theme.colors.green};
          text-decoration: underline;
        }
      }
    }
  `}
`;

const StyledJobRange = styled.p`
  ${({ theme }) => css`
    margin-bottom: 25px;
    color: ${theme.colors.lightSlate};
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xs};
  `}
`;

const StyledBulletList = styled.ul`
  ${({ theme }) => css`
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      color: ${theme.colors.slate};
      font-size: ${theme.fontSizes.lg};

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: ${theme.colors.green};
      }
    }
  `}
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const Experience = (): React.ReactElement => {
  const [ref, isInView] = useInView();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <StyledExperienceSection
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
        variants={fadeUpVariants}
      >
        <h2 className="numbered-heading">Where I&apos;ve Worked</h2>

        <StyledTabsRoot defaultValue={experienceData[0]?.company ?? ''}>
          <StyledTabsList aria-label="Job tabs">
            {experienceData.map(({ company }) => (
              <StyledTabTrigger key={company} value={company}>
                {company}
              </StyledTabTrigger>
            ))}
          </StyledTabsList>

          {experienceData.map(({ company, companyUrl, title, dateRange, bullets }) => (
            <StyledTabContent key={company} value={company}>
              <StyledJobTitle>
                <span>{title}&nbsp;</span>
                <span className="company">
                  @{' '}
                  <a href={companyUrl} target="_blank" rel="noopener noreferrer">
                    {company}
                  </a>
                </span>
              </StyledJobTitle>

              <StyledJobRange>{dateRange}</StyledJobRange>

              <StyledBulletList>
                {bullets.map((bullet, i) => (
                  // eslint-disable-next-line react/no-danger
                  <li key={i} dangerouslySetInnerHTML={{ __html: bullet }} />
                ))}
              </StyledBulletList>
            </StyledTabContent>
          ))}
        </StyledTabsRoot>
      </motion.div>
    </StyledExperienceSection>
  );
};

export default Experience;
