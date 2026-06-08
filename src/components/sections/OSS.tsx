'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import writingData from '@/data/writing';
import useInView from '@/hooks/useInView';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { blurInVariants, staggerContainerVariants, cardVariants } from '@/styles/TransitionStyles';
import type { WritingEntry } from '@/types';

// ------------------------------------------------------------------
// Styled components — card-style entries
// ------------------------------------------------------------------

const StyledWritingSection = styled.section`
  ${({ theme }) => css`
    max-width: 750px;
  `}
`;

const SubLabel = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.lightSlate};
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xs};
    margin: -40px 0 64px;
    line-height: 1.8;
  `}
`;

const EntryList = styled(motion.ul)`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EntryCard = styled(motion.li)`
  ${({ theme }) => css`
    border-radius: ${theme.sizes.borderRadius};
    background: ${theme.colors.bgSurface};
    border: 1px solid ${theme.colors.border};
    transition: ${theme.transition};
    overflow: hidden;

    /* Repo-style accent on left */
    border-left: 3px solid transparent;

    &:hover {
      border-left-color: ${theme.colors.accent};
      transform: translateX(4px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .entry-inner {
      padding: 18px 20px;
    }

    .entry-title-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 8px;
      flex-wrap: wrap;

      @media ${theme.media.sm} {
        flex-direction: column;
        gap: 4px;
      }
    }

    .entry-title {
      margin: 0;
      font-size: ${theme.fontSizes.lg};
      font-weight: 600;
      letter-spacing: -0.01em;

      a {
        color: ${theme.colors.textPrimary};
        text-decoration: none;
        transition: ${theme.transition};

        &:hover {
          color: ${theme.colors.accent};
        }

        &:after {
          display: none;
        }
      }
    }

    .entry-meta {
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xxs};
      color: ${theme.colors.textFaint};
      white-space: nowrap;
      flex-shrink: 0;
      margin-top: 3px;
      background: ${theme.colors.bgElevated};
      padding: 2px 8px;
      border-radius: 4px;
    }

    .entry-excerpt {
      font-size: ${theme.fontSizes.sm};
      color: ${theme.colors.textSecondary};
      line-height: 1.6;
      margin: 0 0 10px;
    }

    .entry-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 0;
      list-style: none;

      li {
        font-family: ${theme.fonts.mono};
        font-size: ${theme.fontSizes.xxs};
        color: ${theme.colors.accent};
        background: ${theme.colors.accentGlow};
        border: 1px solid rgba(127, 90, 240, 0.2);
        padding: 2px 8px;
        border-radius: 4px;
      }
    }
  `}
`;

const SeeAllLink = styled.a`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 28px;
    color: ${theme.colors.accent};
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.sm};
    text-decoration: none;
    transition: ${theme.transition};
    padding: 8px 0;
    white-space: nowrap;

    &:after {
      display: none !important;
    }

    &:hover {
      color: ${theme.colors.accentLight};
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
        variants={staggerContainerVariants}
      >
        <motion.div variants={blurInVariants}>
          <h2 className="numbered-heading">Open Source</h2>
          <SubLabel>Merged PRs to production open source projects.</SubLabel>
        </motion.div>

        <EntryList variants={staggerContainerVariants}>
          {writingData.map(({ title, url, date, readTime, excerpt, tags }: WritingEntry) => (
            <EntryCard key={title} variants={cardVariants}>
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
            </EntryCard>
          ))}
        </EntryList>

        <SeeAllLink
          href="https://github.com/pulls?q=is%3Apr+is%3Amerged+-user%3AbugsNburgers+is%3Apublic+author%3AbugsNburgers"
          target="_blank"
          rel="noopener noreferrer"
        >
          View externally merged PRs →
        </SeeAllLink>
      </motion.div>
    </StyledWritingSection>
  );
};

export default Writing;
