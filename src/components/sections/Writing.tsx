'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import writingData from '@/data/writing';
import useInView from '@/hooks/useInView';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { fadeUpVariants } from '@/styles/TransitionStyles';
import type { WritingEntry } from '@/types';

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledWritingSection = styled.section`
  ${({ theme }) => css`
    max-width: 700px;
  `}
`;

const StyledSubtitle = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.green};
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.md};
    margin: 0 0 20px;
  `}
`;

const StyledEntryList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const StyledEntry = styled.li`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.lightestNavy};
    padding-left: 0;
    transition: ${theme.transition};

    &:last-of-type {
      border-bottom: none;
    }

    &:hover {
      border-left: 3px solid ${theme.colors.green};
      padding-left: 15px;
    }

    .entry-inner {
      padding: 25px 0;
    }

    .entry-title-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      flex-wrap: wrap;

      @media ${theme.media.sm} {
        flex-direction: column;
        gap: 5px;
      }
    }

    .entry-title {
      margin: 0;
      font-size: ${theme.fontSizes.xxl};
      font-weight: 500;

      a {
        color: ${theme.colors.lightestSlate};
        text-decoration: none;
        transition: ${theme.transition};

        &:hover,
        &:focus {
          color: ${theme.colors.green};
        }

        &:after {
          display: none;
        }
      }
    }

    .entry-meta {
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xxs};
      color: ${theme.colors.darkSlate};
      white-space: nowrap;
      flex-shrink: 0;
      margin-top: 4px;
    }

    .entry-excerpt {
      font-size: ${theme.fontSizes.md};
      color: ${theme.colors.slate};
      margin-top: 10px;
      line-height: 1.5;
    }

    .entry-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
      padding: 0;
      list-style: none;

      li {
        font-family: ${theme.fonts.mono};
        font-size: ${theme.fontSizes.xxs};
        color: ${theme.colors.green};
        background-color: ${theme.colors.greenTint};
        padding: 3px 8px;
        border-radius: 3px;
      }
    }
  `}
`;

const StyledSeeAllLink = styled.a`
  ${({ theme }) => css`
    display: inline-block;
    margin-top: 30px;
    color: ${theme.colors.green};
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.sm};
    text-decoration: none;
    transition: ${theme.transition};
    position: relative;

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
  `}
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const Writing = (): React.ReactElement => {
  const [ref, isInView] = useInView();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <StyledWritingSection id="writing" ref={ref as React.RefObject<HTMLElement>}>
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
        variants={fadeUpVariants}
      >
        <h2 className="numbered-heading">Open Source Contributions</h2>
        <StyledSubtitle>Merged PRs to production open source projects.</StyledSubtitle>

        <StyledEntryList>
          {writingData.map(({ title, url, date, readTime, excerpt, tags }: WritingEntry) => (
            <StyledEntry key={title}>
              <div className="entry-inner">
                <div className="entry-title-row">
                  <h3 className="entry-title">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {title}
                    </a>
                  </h3>
                  <span className="entry-meta">
                    {date} · {readTime}
                  </span>
                </div>

                <p className="entry-excerpt">{excerpt}</p>

                <ul className="entry-tags">
                  {tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </StyledEntry>
          ))}
        </StyledEntryList>

        <StyledSeeAllLink href="https://github.com/bugsNburgers" target="_blank" rel="noopener noreferrer">
          View my GitHub profile →
        </StyledSeeAllLink>
      </motion.div>
    </StyledWritingSection>
  );
};

export default Writing;
