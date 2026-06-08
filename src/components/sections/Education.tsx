'use client';

import React from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { blurInVariants, staggerContainerVariants } from '@/styles/TransitionStyles';

// ------------------------------------------------------------------
// Education data
// ------------------------------------------------------------------

interface EducationEntry {
  period: string;
  institution: string;
  degree: string;
  detail: string;
  icon: 'school' | 'college' | 'university';
  side: 'left' | 'right';
}

const educationData: EducationEntry[] = [
  {
    period: '2017 – 2020',
    institution: 'Delhi Public School, Bangalore South',
    degree: 'Grade 8 – 10',
    detail: 'CBSE · 10th Grade: 94.6%',
    icon: 'school',
    side: 'left',
  },
  {
    period: '2020 – 2022',
    institution: 'PES PU College',
    degree: 'Grade 11 – 12 (Science)',
    detail: '2nd PUC (12th): 92% · PCM + CS',
    icon: 'college',
    side: 'right',
  },
  {
    period: '2022 – Present',
    institution: 'PES University, Bengaluru',
    degree: 'B.Tech – Computer Science & Engineering',
    detail: 'CGPA: 7.8 · 4th Year · Expected 2026',
    icon: 'university',
    side: 'left',
  },
];

// ------------------------------------------------------------------
// Icons
// ------------------------------------------------------------------

const SchoolIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledSection = styled.section`
  ${({ theme }) => css`
    max-width: ${theme.sizes.sectionMaxWidth};
  `}
`;

const TimelineWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  /* Extra space below the last entry so the line + arrow have room */
  padding-bottom: 80px;

  /* Vertical center line */
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    bottom: 16px;
    width: 2px;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.accent},
      ${({ theme }) => theme.colors.secondary},
      ${({ theme }) => theme.colors.border}
    );

    @media ${({ theme }) => theme.media.md} {
      left: 20px;
    }
  }

  /* Downward arrowhead at bottom of the line */
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 11px solid ${({ theme }) => theme.colors.accent};

    @media ${({ theme }) => theme.media.md} {
      left: 20px;
    }
  }
`;

const TimelineRow = styled(motion.div)<{ $side: 'left' | 'right' }>`
  ${({ theme, $side }) => css`
    display: grid;
    grid-template-columns: 1fr 60px 1fr;
    align-items: center;
    gap: 0;
    margin-bottom: 48px;

    &:last-child {
      margin-bottom: 0;
    }

    @media ${theme.media.md} {
      grid-template-columns: 44px 1fr;
      gap: 0 16px;
      margin-bottom: 36px;
      align-items: start;
    }

    /* Desktop side columns */
    .edu-left,
    .edu-right {
      @media ${theme.media.md} {
        display: none;
      }
    }

    .edu-left {
      padding-right: 32px;
      text-align: right;
    }

    .edu-right {
      padding-left: 32px;
      text-align: left;
    }

    .edu-center {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 2;

      @media ${theme.media.md} {
        grid-column: 1;
        grid-row: 1;
        padding-top: 6px;
        justify-content: flex-start;
      }
    }

    /* Mobile card — hidden on desktop, shown on mobile */
    .edu-card-mobile {
      display: none;

      @media ${theme.media.md} {
        display: block;
        grid-column: 2;
        grid-row: 1;
      }
    }
  `}
`;

const NodeCircle = styled.div<{ $active?: boolean }>`
  ${({ theme }) => css`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: ${theme.colors.bgSurface};
    border: 2px solid ${theme.colors.accent};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.accent};
    box-shadow: 0 0 16px ${theme.colors.accentGlowStrong};
    flex-shrink: 0;
    overflow: hidden;

    @media ${theme.media.md} {
      width: 36px;
      height: 36px;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  `}
`;

const EduCard = styled.div<{ $align?: 'left' | 'right' }>`
  ${({ theme, $align }) => css`
    background: ${theme.colors.bgSurface};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.sizes.borderRadiusLg};
    padding: 20px 24px;
    transition: ${theme.transition};
    text-align: ${$align === 'right' ? 'right' : 'left'};

    &:hover {
      border-color: ${theme.colors.accent};
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      transform: translateY(-3px);
    }

    .edu-period {
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xxs};
      color: ${theme.colors.accent};
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 6px;
      display: block;
    }

    .edu-institution {
      font-size: ${theme.fontSizes.lg};
      font-weight: 700;
      color: ${theme.colors.textPrimary};
      letter-spacing: -0.01em;
      margin: 0 0 4px;
      line-height: 1.3;
    }

    .edu-degree {
      font-size: ${theme.fontSizes.sm};
      color: ${theme.colors.accent};
      font-weight: 500;
      margin: 0 0 8px;
    }

    .edu-detail {
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xxs};
      color: ${theme.colors.textSecondary};
      line-height: 1.5;
    }

    @media ${theme.media.md} {
      text-align: left;
      padding: 16px 18px;
    }
  `}
`;

// Period label shown on the opposite side
const PeriodLabel = styled.div`
  ${({ theme }) => css`
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xxs};
    color: ${theme.colors.textFaint};
    letter-spacing: 0.06em;
    text-transform: uppercase;
  `}
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const Education = (): React.ReactElement => {
  const [ref, isInView] = useInView();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <StyledSection id="education" ref={ref as React.RefObject<HTMLElement>}>
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
        variants={staggerContainerVariants}
      >
        <motion.div variants={blurInVariants}>
          <h2 className="numbered-heading">Education</h2>
        </motion.div>

        <motion.div variants={blurInVariants}>
          <TimelineWrapper>
            {educationData.map((entry, i) => {
              const isLeft = entry.side === 'left';
              const isUniversity = entry.icon === 'university';

              return (
                <TimelineRow
                  key={entry.institution}
                  $side={entry.side}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  {/* LEFT COLUMN */}
                  <div className="edu-left">
                    {isLeft ? (
                      <EduCard $align="right">
                        <span className="edu-period">{entry.period}</span>
                        <h3 className="edu-institution">{entry.institution}</h3>
                        <p className="edu-degree">{entry.degree}</p>
                        <p className="edu-detail">{entry.detail}</p>
                      </EduCard>
                    ) : (
                      <PeriodLabel>{entry.period}</PeriodLabel>
                    )}
                  </div>

                  {/* CENTER — icon node */}
                  <div className="edu-center">
                    <NodeCircle>
                      {isUniversity ? (
                        <Image
                          src="/images/pes-logo.png"
                          alt="PES University logo"
                          width={28}
                          height={28}
                          style={{
                            objectFit: 'contain',
                            filter: 'invert(1) sepia(1) saturate(3) hue-rotate(115deg) brightness(1.1)',
                            mixBlendMode: 'screen',
                          }}
                        />
                      ) : (
                        <SchoolIcon />
                      )}
                    </NodeCircle>
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="edu-right">
                    {!isLeft ? (
                      <EduCard $align="left">
                        <span className="edu-period">{entry.period}</span>
                        <h3 className="edu-institution">{entry.institution}</h3>
                        <p className="edu-degree">{entry.degree}</p>
                        <p className="edu-detail">{entry.detail}</p>
                      </EduCard>
                    ) : (
                      <PeriodLabel>{entry.period}</PeriodLabel>
                    )}
                  </div>

                  {/* MOBILE — always show card here */}
                  <div className="edu-card-mobile">
                    <EduCard>
                      <span className="edu-period">{entry.period}</span>
                      <h3 className="edu-institution">{entry.institution}</h3>
                      <p className="edu-degree">{entry.degree}</p>
                      <p className="edu-detail">{entry.detail}</p>
                    </EduCard>
                  </div>
                </TimelineRow>
              );
            })}
          </TimelineWrapper>
        </motion.div>
      </motion.div>
    </StyledSection>
  );
};

export default Education;
