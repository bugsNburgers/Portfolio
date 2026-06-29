'use client';

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import experienceData from '@/data/experience';
import useInView from '@/hooks/useInView';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { blurInVariants, staggerContainerVariants } from '@/styles/TransitionStyles';

// ------------------------------------------------------------------
// Styled components — clean left-aligned timeline
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
    gap: 0;
  `}
`;

const TimelineEntry = styled.div`
  ${({ theme }) => css`
    position: relative;
    padding-left: 36px;

    /* Vertical line */
    &:before {
      content: '';
      position: absolute;
      left: 5px;
      top: 0;
      bottom: 0;
      width: 1px;
      background: ${theme.colors.border};
    }

    /* Hide line above first dot */
    &:first-child:before {
      top: 12px;
    }

    /* Hide line below last entry */
    &:last-child:before {
      bottom: calc(100% - 12px);
    }

    @media ${theme.media.sm} {
      padding-left: 28px;
    }
  `}
`;

const Dot = styled.div<{ $active: boolean }>`
  ${({ theme, $active }) => css`
    position: absolute;
    left: 0;
    top: 6px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    border: 2px solid ${$active ? theme.colors.accent : theme.colors.border};
    background: ${$active ? theme.colors.accent : theme.colors.bgBase};
    transition: all 0.3s ease;
    z-index: 1;

    ${$active && css`
      box-shadow: 0 0 0 4px ${theme.colors.accentGlow};
    `}
  `}
`;

const EntryHeader = styled.button<{ $active: boolean }>`
  ${({ theme, $active }) => css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    flex-wrap: wrap;
    width: 100%;
    background: none;
    border: none;
    padding: 0 0 16px;
    cursor: pointer;
    text-align: left;
    transition: opacity 0.25s ease;

    &:hover {
      .entry-title {
        color: ${theme.colors.accent};
      }
    }
  `}
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const EntryTitle = styled.h3`
  ${({ theme }) => css`
    font-size: clamp(18px, 2.5vw, 22px);
    font-weight: 600;
    color: ${theme.colors.textPrimary};
    margin: 0;
    line-height: 1.3;
    transition: color 0.25s ease;
  `}
`;

const CompanyLine = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 2px;

    .at {
      color: ${theme.colors.textFaint};
      font-size: ${theme.fontSizes.sm};
    }
  `}
`;

const CompanyLink = styled.a`
  ${({ theme }) => css`
    color: ${theme.colors.accent};
    font-size: ${theme.fontSizes.md};
    font-weight: 500;
    text-decoration: none;
    transition: ${theme.transition};

    &:hover {
      text-decoration: underline;
    }

    /* Override global link :after underline */
    &:after {
      display: none !important;
    }
  `}
`;

const DateLabel = styled.span`
  ${({ theme }) => css`
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xxs};
    color: ${theme.colors.textFaint};
    white-space: nowrap;
    flex-shrink: 0;
    margin-top: 4px;
    letter-spacing: 0.02em;
  `}
`;

const BulletsList = styled(motion.div)`
  ${({ theme }) => css`
    overflow: hidden;
  `}
`;

const BulletsInner = styled.ul`
  ${({ theme }) => css`
    padding: 0 0 24px;
    margin: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `}
`;

const Bullet = styled(motion.li)`
  ${({ theme }) => css`
    position: relative;
    padding-left: 20px;
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSizes.md};
    line-height: 1.7;

    &:before {
      content: '▹';
      position: absolute;
      left: 0;
      color: ${theme.colors.accent};
      font-size: ${theme.fontSizes.sm};
      line-height: 1.7;
    }

    strong {
      color: ${theme.colors.textPrimary};
      font-weight: 600;
    }

    a {
      color: ${theme.colors.accent};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  `}
`;

// ------------------------------------------------------------------
// Animation variants
// ------------------------------------------------------------------

const bulletVariants = {
  hidden: { opacity: 0, y: 8, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.35,
      delay: i * 0.06,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

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
            {experienceData.map(({ company, companyUrl, title, dateRange, bullets }, i) => {
              const isActive = activeIndex === i;

              return (
                <TimelineEntry key={company}>
                  <Dot $active={isActive} />

                  <EntryHeader
                    $active={isActive}
                    onClick={() => setActiveIndex(isActive ? -1 : i)}
                    aria-expanded={isActive}
                  >
                    <TitleBlock>
                      <EntryTitle className="entry-title">{title}</EntryTitle>
                      <CompanyLine>
                        <span className="at">@</span>
                        <CompanyLink
                          href={companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {company}
                        </CompanyLink>
                      </CompanyLine>
                    </TitleBlock>

                    <DateLabel>{dateRange}</DateLabel>
                  </EntryHeader>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <BulletsList
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <BulletsInner>
                          {bullets.map((bullet, j) => (
                            <Bullet
                              key={j}
                              custom={j}
                              variants={bulletVariants}
                              initial="hidden"
                              animate="visible"
                              dangerouslySetInnerHTML={{ __html: bullet }}
                            />
                          ))}
                        </BulletsInner>
                      </BulletsList>
                    )}
                  </AnimatePresence>
                </TimelineEntry>
              );
            })}
          </Timeline>
        </motion.div>
      </motion.div>
    </StyledExperienceSection>
  );
};

export default Experience;
