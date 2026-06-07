'use client';

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import experienceData from '@/data/experience';
import useInView from '@/hooks/useInView';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { blurInVariants, staggerContainerVariants, cardVariants } from '@/styles/TransitionStyles';

// ------------------------------------------------------------------
// Styled components — Vertical timeline / accordion
// ------------------------------------------------------------------

const StyledExperienceSection = styled.section`
  ${({ theme }) => css`
    max-width: 800px;
  `}
`;

const Timeline = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;

    /* Vertical track */
    &:before {
      content: '';
      position: absolute;
      left: 20px;
      top: 28px;
      bottom: 28px;
      width: 1px;
      background: linear-gradient(to bottom, ${theme.colors.accent}, ${theme.colors.secondary}, ${theme.colors.border});

      @media ${theme.media.md} {
        display: none;
      }
    }
  `}
`;

const TimelineItem = styled.div<{ $isActive: boolean }>`
  ${({ theme, $isActive }) => css`
    display: grid;
    grid-template-columns: 48px 1fr;
    gap: 0;

    @media ${theme.media.md} {
      grid-template-columns: 1fr;
    }
  `}
`;

const TimelineDot = styled.div<{ $isActive: boolean }>`
  ${({ theme, $isActive }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;

    @media ${theme.media.md} {
      display: none;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: ${$isActive ? theme.colors.accent : theme.colors.border};
      border: 2px solid ${$isActive ? theme.colors.accent : theme.colors.bgBase};
      box-shadow: ${$isActive ? `0 0 12px ${theme.colors.accentGlowStrong}` : 'none'};
      transition: ${theme.transition};
      flex-shrink: 0;
    }
  `}
`;

const JobCard = styled.button<{ $isActive: boolean }>`
  ${({ theme, $isActive }) => css`
    display: flex;
    flex-direction: column;
    text-align: left;
    background: ${$isActive ? theme.colors.bgSurface : 'transparent'};
    border: 1px solid ${$isActive ? theme.colors.border : 'transparent'};
    border-radius: ${theme.sizes.borderRadius};
    padding: 16px 20px;
    cursor: pointer;
    transition: ${theme.transition};
    width: 100%;

    &:hover {
      background: ${theme.colors.bgSurface};
      border-color: ${theme.colors.border};
    }

    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: ${$isActive ? '4px' : '0'};
    }

    .job-title-company {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .job-title {
      font-size: ${theme.fontSizes.lg};
      font-weight: 600;
      color: ${theme.colors.textPrimary};
      letter-spacing: -0.01em;
    }

    .at {
      color: ${theme.colors.textFaint};
      font-size: ${theme.fontSizes.sm};
    }

    .company {
      color: ${theme.colors.accent};
      font-size: ${theme.fontSizes.md};
      font-weight: 500;
      text-decoration: none;
      transition: ${theme.transition};

      &:hover {
        text-decoration: underline;
      }

      &:after {
        display: none !important;
      }
    }

    .date-range {
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xxs};
      color: ${theme.colors.textFaint};
      white-space: nowrap;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .expand-icon {
      font-size: ${theme.fontSizes.xs};
      color: ${theme.colors.accent};
      transition: transform 0.3s ease;
      transform: ${$isActive ? 'rotate(180deg)' : 'rotate(0deg)'};
      flex-shrink: 0;
    }
  `}
`;

const JobDetails = styled(motion.div)`
  ${({ theme }) => css`
    overflow: hidden;
    padding: 0 20px;

    ul {
      padding: 0;
      margin: 8px 0 16px;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    li {
      position: relative;
      padding-left: 20px;
      color: ${theme.colors.textSecondary};
      font-size: ${theme.fontSizes.md};
      line-height: 1.65;

      &:before {
        content: '—';
        position: absolute;
        left: 0;
        color: ${theme.colors.accent};
        font-size: ${theme.fontSizes.xs};
        top: 3px;
      }

      a {
        color: ${theme.colors.accent};
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
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
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <StyledExperienceSection
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
        variants={staggerContainerVariants}
      >
        <motion.div variants={blurInVariants}>
          <h2 className="numbered-heading">Experience</h2>
        </motion.div>

        <motion.div variants={blurInVariants}>
          <Timeline>
            {experienceData.map(({ company, companyUrl, title, dateRange, bullets }, i) => (
              <TimelineItem key={company} $isActive={activeIndex === i}>
                <TimelineDot $isActive={activeIndex === i}>
                  <span className="dot" />
                </TimelineDot>

                <div>
                  <JobCard
                    $isActive={activeIndex === i}
                    onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
                    aria-expanded={activeIndex === i}
                  >
                    <div className="job-header">
                      <div className="job-title-company">
                        <span className="job-title">{title}</span>
                        <span className="at">@</span>
                        <a
                          href={companyUrl}
                          className="company"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {company}
                        </a>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span className="date-range">{dateRange}</span>
                        <span className="expand-icon">▾</span>
                      </div>
                    </div>
                  </JobCard>

                  <AnimatePresence initial={false}>
                    {activeIndex === i && (
                      <JobDetails
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <ul>
                          {bullets.map((bullet, j) => (
                            // eslint-disable-next-line react/no-danger
                            <li key={j} dangerouslySetInnerHTML={{ __html: bullet }} />
                          ))}
                        </ul>
                      </JobDetails>
                    )}
                  </AnimatePresence>
                </div>
              </TimelineItem>
            ))}
          </Timeline>
        </motion.div>
      </motion.div>
    </StyledExperienceSection>
  );
};

export default Experience;
