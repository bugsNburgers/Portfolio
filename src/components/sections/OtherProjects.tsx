'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import otherProjects from '@/data/otherProjects';
import IconGitHub from '@/components/IconGitHub';
import IconExternal from '@/components/IconExternal';
import useInView from '@/hooks/useInView';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { blurInVariants, staggerContainerVariants, cardVariants } from '@/styles/TransitionStyles';

// ------------------------------------------------------------------
// Styled components — accent stripe card style (no folder icon)
// ------------------------------------------------------------------

const StyledSection = styled.section`
  ${({ theme }) => `
    max-width: ${theme.sizes.sectionMaxWidth};
  `}
`;

const StyledHeading = styled.h2`
  font-size: clamp(20px, 4vw, 26px);
  font-weight: 700;
  text-align: center;
  margin: 0 0 40px;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.02em;
`;

const ProjectsGrid = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const ProjectCard = styled(motion.li)`
  ${({ theme }) => `
    position: relative;
    border-radius: ${theme.sizes.borderRadius};
    overflow: hidden;
    transition: ${theme.transition};

    &:hover .card-inner {
      transform: translateY(-5px);
      border-color: ${theme.colors.accent};
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px ${theme.colors.accentGlow};
    }

    .card-inner {
      height: 100%;
      background: ${theme.colors.bgSurface};
      border: 1px solid ${theme.colors.border};
      border-radius: ${theme.sizes.borderRadius};
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: ${theme.transition};
      position: relative;
      overflow: hidden;

      /* Accent left stripe — replaces Brittany's folder icon pattern */
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: 100%;
        background: linear-gradient(to bottom, ${theme.colors.accent}, ${theme.colors.secondary});
        border-radius: 3px 0 0 3px;
      }
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .category-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.secondary});
        flex-shrink: 0;
      }

      .project-links {
        display: flex;
        align-items: center;
        gap: 6px;

        a {
          display: flex;
          align-items: center;
          padding: 4px;
          color: ${theme.colors.textFaint};
          transition: ${theme.transition};

          &:hover {
            color: ${theme.colors.accent};
            transform: translateY(-2px);
          }

          &:after {
            display: none !important;
          }

          svg {
            width: 17px;
            height: 17px;
          }
        }
      }
    }

    .project-title {
      font-size: ${theme.fontSizes.lg};
      font-weight: 600;
      color: ${theme.colors.textPrimary};
      letter-spacing: -0.01em;
      margin: 0;

      a {
        color: inherit;
        text-decoration: none;
        transition: ${theme.transition};

        &:hover {
          color: ${theme.colors.accent};
        }

        &:after {
          display: none !important;
        }
      }
    }

    .project-description {
      color: ${theme.colors.textSecondary};
      font-size: ${theme.fontSizes.sm};
      line-height: 1.6;
      flex: 1;
    }

    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: auto;
      padding: 0;
      list-style: none;

      li {
        font-family: ${theme.fonts.mono};
        font-size: ${theme.fontSizes.xxs};
        color: ${theme.colors.textMuted};
        background: ${theme.colors.bgElevated};
        border: 1px solid ${theme.colors.border};
        border-radius: 4px;
        padding: 2px 7px;
      }
    }
  `}
`;

const MoreButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 48px auto 0;
  padding: 12px 28px;
  color: ${({ theme }) => theme.colors.accent};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.accentGlow};
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.accentGlow};
    outline: none;
  }
`;

// ------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------

const GRID_LIMIT = 6;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const OtherProjects = (): React.ReactElement => {
  const [showMore, setShowMore] = useState(false);
  const [ref, isInView] = useInView();
  const prefersReducedMotion = usePrefersReducedMotion();

  const projectsToShow = showMore ? otherProjects : otherProjects.slice(0, GRID_LIMIT);
  const hasMore = otherProjects.length > GRID_LIMIT;

  return (
    <StyledSection ref={ref as React.RefObject<HTMLElement>}>
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
        variants={blurInVariants}
      >
        <StyledHeading>Other Projects</StyledHeading>
      </motion.div>

      <ProjectsGrid
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
        variants={staggerContainerVariants}
      >
        <AnimatePresence>
          {projectsToShow.map(({ title, description, techStack, githubUrl, externalUrl }, i) => (
            <ProjectCard key={title} variants={cardVariants} layout>
              <div className="card-inner">
                <div className="card-header">
                  <span className="category-dot" />
                  <div className="project-links">
                    {githubUrl && (
                      <a href={githubUrl} aria-label="GitHub Link" target="_blank" rel="noopener noreferrer">
                        <IconGitHub />
                      </a>
                    )}
                    {externalUrl && (
                      <a href={externalUrl} aria-label="External Link" target="_blank" rel="noopener noreferrer">
                        <IconExternal />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="project-title">
                  {externalUrl ? (
                    <a href={externalUrl} target="_blank" rel="noopener noreferrer">{title}</a>
                  ) : (
                    <span>{title}</span>
                  )}
                </h3>

                <p className="project-description">{description}</p>

                <ul className="tech-stack">
                  {techStack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            </ProjectCard>
          ))}
        </AnimatePresence>
      </ProjectsGrid>

      {hasMore && (
        <MoreButton onClick={() => setShowMore((v) => !v)}>
          {showMore ? '↑ Show Less' : '↓ Show More'}
        </MoreButton>
      )}
    </StyledSection>
  );
};

export default OtherProjects;
